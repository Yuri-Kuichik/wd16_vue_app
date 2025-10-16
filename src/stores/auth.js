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
        
        async getNewToken() {
            const token = cookie.get(this.refreshTokenKey)

            if(token) {
                const data = {refresh: token}

                try {
                    const res = await instanceAxios.post('/auth/jwt/refresh/', data);
                    this.accessToken = res.data.access;
                    this.setCookie();
                } catch(error) {
                    console.log(error.message)
                }
            }
        },
        
        setCookie() {
            const decoded = jwtDecode(this.accessToken);

            let expTime = new Date(decoded.exp * 1000)
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

        removeCookies() {
            console.log('removeCookies')
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