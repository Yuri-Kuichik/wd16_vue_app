import { defineStore } from 'pinia'
import cookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            refreshToken: '',
            accessToken: '',
            tokenKey: 'postApp__accessToken',
            tokenRefreshKey: 'postApp__refreshToken',
            loading: false
        }
    },

    getters: {
        // isAuth() {
        //     return true
        // }
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
            cookie.remove(this.tokenRefreshKey)
            cookie.remove(this.tokenKey)

            const decoded = jwtDecode(this.accessToken);
            console.log('decoded token: ', decoded)
            const dateExp = new Date(decoded.exp * 1000)

            console.log('setCookie')
            
            cookie.set(
                this.tokenKey, 
                this.accessToken, 
                { expires: dateExp }
            )
            cookie.set(this.tokenRefreshKey, this.refreshToken)
        },

        setCookie() {
            const payload = jwtDecode(this.accessToken)

            let expTime = payload.exp * 1000
            console.log('Date expire: ', new Date(expTime))

            // let curTime = new Date().getTime();
            // let expTimeOneMinute = curTime + 30*1000
            // console.log('Date expire one minute: ', new Date(expTimeOneMinute))

            cookie.set(
                this.tokenKey, 
                this.accessToken,
                {expires: new Date(expTime)} 
            )
            cookie.set(this.refreshTokenKey, this.refreshToken)
        },

        isAuth() {
            return !!cookie.get(this.tokenKey);
        },

        isTokenExist() {
            this.isAuth();
        },

        isRefreshTokenExist() {
            return !!cookie.get(this.refreshTokenKey);
        },

        removeCookie() {
            cookie.remove(this.tokenKey);
            cookie.remove(this.refreshTokenKey);
        },

        signOut() {
            this.accessToken = '';
            this.refreshToken = '';
            this.removeCookie();
        }
    } 
})