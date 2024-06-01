import { defineStore } from 'pinia';
import domains from 'src/settings/domains'
const { apiDomain } = domains()
import { api } from 'src/settings/axios'

import { Notify, Cookies } from 'quasar'

// no need to import defineStore and acceptHMRUpdate
export const useAuthStore = defineStore('AuthStore', {
    id: 'AuthStore',

    state: () => ({
        isLoggedIn: true,
        form_login: {
            "email": "admin@gmail.com",
            "password": "123456"
        },
        auth: {
            "message": "",
            "errors": null,
            "data": {
                "accessTokent": "",
                "tokenType": "",
                "user": {
                    "id": "",
                    "name": "",
                    "username": "",
                    "email": "",
                    "additionalInfo": "",
                    "gender": null,
                    "avatar": null,
                    "phone": null,
                    "address": null,
                    "emailVerifiedAt": "",
                    "password": "",
                    "rememberToken": null,
                    "lastSentTokenAt": null,
                    "createdAt": "",
                    "updatedAt": "",
                    "deletedAt": null
                },
                "expiresIn": 0
            }
        },
        loading: {
            fetchCSRF: false,
            fetchLoginAuth: false,
            fetchInitAuth: false, // true after refresh (1x request only)
        }
    }),

    getters: {
        getAuth: state => state.auth
    },

    actions: {
        async fetchCSRF() {
            if (this.loading.fetchCSRF) return false;

            this.loading.fetchCSRF = true;

            console.log('AuthStore fetchCSRF')

            api.get('/sanctum/csrf-cookie', {
                withCredentials: true // jika pakai ini maka onResponse tidak berjalan
            })
            .then((response) => {
                //   data.value = response.data
                console.log('fetchCSRF AXIOS', response.headers['Set-Cookie'], JSON.parse(JSON.stringify(response.headers)))
                Notify.create({
                    color: 'positive',
                    position: 'top',
                    message: 'Loading failed',
                    icon: 'report_problem'
                })
            })
            .catch(() => {
                // Notify.create({
                //     color: 'negative',
                //     position: 'top',
                //     message: 'Loading failed',
                //     icon: 'report_problem'
                // })
            })

            // digunakan untuk mengisi FORM  (CLIENT SIDE)
            // pakai axios saja, kalo pake ini request 2X gak tau kenapa
            /*
            await useFetch(apiDomain + "/sanctum/csrf-cookie", {
                credentials: "include", // jika pakai ini maka onResponse tidak berjalan
                headers: {
                    Accept: 'application/json'
                },
                raw: true,
                async onResponse({ response }) {
                  console.log('Headers', response.headers['Set-Cookie']);
                },
            });
            */

            this.loading.fetchCSRF = false

        },
        async fetchInitAuth() {

            if (this.loading.fetchInitAuth) return false;

            this.loading.fetchInitAuth = true;

            const accessToken = Cookies.get("accessTokent");
            console.log('accessToken', accessToken)

            const resp = await api.get('/trevolia-api/v1/dashboard', {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                // console.log('fetchCSRF AXIOS', response.headers['Set-Cookie'], JSON.parse(JSON.stringify(response.headers)))
                Notify.create({
                    color: 'positive',
                    position: 'top',
                    message: 'Loading failed',
                    icon: 'report_problem'
                })
                return response
            })
            .catch(() => {
                Notify.create({
                    color: 'negative',
                    position: 'top',
                    message: 'Loading failed',
                    icon: 'report_problem'
                })
            })

            console.log('AuthStore fetchInitAuth', resp?.data)

            if(!resp?.data) return this.loading.fetchInitAuth = false

            this.isLoggedIn = true // resp

            return resp?.data // JSON.parse(JSON.stringify(resp))
        },
        async fetchLoginAuth() {

            console.log('this.loading.fetchLoginAuth', this.loading.fetchLoginAuth)
            if (this.loading.fetchLoginAuth) return false;

            this.loading.fetchLoginAuth = true;

            console.log('AuthStore fetchLoginAuth')

            const token = Cookies.get("XSRF-TOKEN");
            console.log('XSRF-TOKEN', token)

            const data = await api.post('/trevolia-api/v1/auth/login', {
                body: {
                        email: this.form_login.email,
                        password: this.form_login.password,
                    },
                headers: {
                    "X-XSRF-TOKEN": token, // tapi undefined, katanya hanya bisa sama domain/sub domain
                }
            })
            .then((response) => {
                Notify.create({
                    color: 'positive',
                    position: 'top',
                    message: 'Loading failed',
                    icon: 'report_problem'
                })
                return response.data
            })
            .catch((error) => {
                Notify.create({
                    color: 'negative',
                    position: 'top',
                    message: 'Loading failed',
                    icon: 'report_problem'
                })
                return error
            })

            this.loading.fetchLoginAuth = false

            console.log('AuthStore fetchLoginAuth ERROR', data)
            return
            if (!data?.data) return false

            if (data) {
                this.auth = data;

                const accessToken = Cookies.get("accessTokent");
                accessToken = this.auth?.data?.accessToken

                this.isLoggedIn = true
            }

            return true
        },
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

// https://trefeltour.labsnip.com/trevolia-api/v1/auth/login
