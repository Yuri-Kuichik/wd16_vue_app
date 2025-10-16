import { defineStore } from 'pinia'
import cookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            refreshToken: '',
            accessToken: '',
            tokenKey: 'postApp__accessToken',
            refreshTokenKey: 'postApp__refreshToken',
            loading: false
        }
    },

    getters: {
        
    },

    actions: {
        async login(data) {
            this.loading = true;
            try {
                const res = await fetch('https://studapi.teachmeskills.by//auth/jwt/create/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                if (res.ok) {
                    const data = await res.json()
                    this.accessToken = data.access
                    this.refreshToken = data.refresh

                    this.setCookie()
                    this.router.push('/')
                } else {
                    const error = await res.json()
                    throw new Error(error.detail)
                }
            } catch(error) {
                console.log(error.message)
            } finally {
                this.loading = false
            }
        },

        async registration(data) {
            this.loading = true;
            try {
                const res = await fetch('https://studapi.teachmeskills.by//auth/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
            } catch(error) {
                console.log(error.message)
            } finally {
                this.loading = false
            }
        },

        async activateUser(data) {
            this.loading = true;
            try {
                const res = await fetch('https://studapi.teachmeskills.by//auth/users/activation/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
            } catch(error) {
                console.log(error.message)
            } finally {
                this.loading = false
            }
        },

        async setNewEmail(newEmail, password) {
            this.loading = true;

            const data = {
                "current_password": password,
                "new_email": newEmail
            }

            if (!this.isTokenExist() && this.isRefreshTokenExist()) {
                try {
                    await this.getNewToken()
                } catch(error) {
                    console.log(error.message)
                }
            } else {
                this.accessToken = this.getAccessToken()
            }

            try {
                await fetch('https://studapi.teachmeskills.by//auth/users/set_email/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.accessToken}`
                    },
                    body: JSON.stringify(data)
                })
            } catch(error) {
                console.log(error.message)
            } finally {
                this.loading = false
            }
        },
        
        async getNewToken() {
            this.refreshToken = this.getRefreshToken()

            if(this.refreshToken) {
                try {
                    const res = await fetch('https://studapi.teachmeskills.by//auth/jwt/refresh/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            refresh: this.refreshToken
                        })
                    })

                    if (res.ok) {
                        const data = await res.json()
                        this.accessToken = data.access
                        this.setCookie();
                    }
                } catch(error) {
                    console.log(error.message)
                }
            }
        },
        
        setCookie() {
            const decoded = jwtDecode(this.accessToken);

            const expTime = new Date(decoded.exp * 1000)
            console.log('Date expire: ', expTime)
            
            cookie.set(
                this.tokenKey, 
                this.accessToken, 
                { expires: expTime }
            )
            cookie.set(this.refreshTokenKey, this.refreshToken)
        },

        isAuth() {
            return this.isTokenExist() || this.isRefreshTokenExist()
        },

        isTokenExist() {
            return !!cookie.get(this.tokenKey);
        },

        isRefreshTokenExist() {
            return !!cookie.get(this.refreshTokenKey);
        },

        getAccessToken() {
            return cookie.get(this.tokenKey)
        },

        getRefreshToken() {
            return cookie.get(this.refreshTokenKey)
        },

        removeCookies() {
            cookie.remove(this.tokenKey);
            cookie.remove(this.refreshTokenKey);
        },

        signOut() {
            this.accessToken = '';
            this.refreshToken = '';
            this.removeCookies();
        }
    } 
})