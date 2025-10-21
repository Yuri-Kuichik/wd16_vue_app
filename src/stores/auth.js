import {defineStore} from 'pinia'
import cookie from 'js-cookie'
import {jwtDecode} from "jwt-decode"

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            refreshToken: '',
            accessToken: '',
            refreshTokenKey: 'postApp__refreshToken',
            accessTokenKey: 'postApp__accessToken'
        }
    },

    actions: {
        async login(userData) {
            try {
                const authResponse = await fetch('https://studapi.teachmeskills.by/auth/jwt/create/)', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                if (authResponse.ok) {
                    const authData = await authResponse.json()
                    this.refreshToken = authData.refresh
                    this.accessToken = authData.access
                    this.setCookies()
                    this.router.push("/")
                } else {
                    const authError = await authResponse.json()
                    throw new Error(authError.detail)
                }
            } catch (error) {
                console.log(error.message)
            }
        },

        logout() {
            this.refreshToken = ''
            this.accessToken = ''
            this.clearAllCookies()
            this.router.push('/login')
        },

        setAccessCookie() {
            const decodedAccessJWT = jwtDecode(this.accessToken)
            const expDate = new Date(decodedAccessJWT.exp * 1000)
            cookie.set(this.accessTokenKey, this.accessToken, {expires: expDate})
        },

        setRefreshCookie() {
            cookie.set(this.refreshTokenKey, this.refreshToken)
        },

        setCookies() {
            this.setAccessCookie()
            this.setRefreshCookie()
        },

        getAccessCookie() {
            return cookie.get(this.accessTokenKey)
        },

        clearAllCookies() {
            cookie.remove(this.refreshTokenKey)
            cookie.remove(this.accessTokenKey)
        },

        async changeEmail(newEmail, password) {
            const isAccessAllowed = this.getAccessCookie()

            if (!isAccessAllowed) {
               await this.updateAccessToken()
            }

            try {
                const updateEmailData = {
                    current_password: password,
                    new_email: newEmail
                }
                const emailChangeResponse = await fetch('https://studapi.teachmeskills.by/auth/users/set_email/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.getAccessCookie()}`
                    },
                    body: JSON.stringify(updateEmailData)
                })
                if (emailChangeResponse.ok) {
                    console.log(await emailChangeResponse)
                } else {
                    const changeEmailError = emailChangeResponse.json()
                    throw new Error(changeEmailError.detail)
                }

            } catch (error) {
                console.log(error.message)
            }
        },

        async updateAccessToken() {
            const refreshData = {
                refresh: cookie.get(this.refreshTokenKey)
            }

            try {
                const newAccessTokenResponse = await fetch('https://studapi.teachmeskills.by/auth/jwt/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(refreshData)
                })
                if (newAccessTokenResponse.ok) {
                    const newAccessTokenData = await newAccessTokenResponse.json()

                    this.accessToken = newAccessTokenData.access
                    this.setAccessCookie()
                } else {
                    const refreshError = await newAccessTokenResponse.json()
                    throw new Error(refreshError.detail)
                }

            } catch (error) {
                console.log(error.message)
            }
        },

        isAuth() {
            return !!cookie.get(this.refreshTokenKey)
        }
    }
})