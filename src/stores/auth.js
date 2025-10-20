import {defineStore} from 'pinia'
import cookie from 'js-cookie'

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
                } else {
                    const error = await authResponse.json()
                    throw new Error(error.detail)
                }
            } catch (error) {
                this.refreshToken = 'testRefreshTokenStr'
                this.accessToken = 'testAccessTokenStr'
                cookie.remove(this.refreshTokenKey)
                cookie.remove(this.accessTokenKey)
                this.setCookies()
            }
        },
        setCookies() {
            cookie.set(this.refreshTokenKey, this.refreshToken)
            // Устанавливаем время существования куки равным одной минуте.
            cookie.set(this.accessTokenKey, this.accessToken, { expires: 1 })
        },

        isAuth() {
            return !!cookie.get(this.accessTokenKey)
        }
    }
})