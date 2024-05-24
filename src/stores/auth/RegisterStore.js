import { defineStore } from 'pinia';

import domains from 'src/settings/domains'

const { apiDomain } = domains()
import { api, axios } from 'src/settings/axios'

import { Notify, Cookies } from 'quasar'

// no need to import defineStore and acceptHMRUpdate
export const useRegisterStore = defineStore('useRegisterStore', {
    id: 'useRegisterStore',

    state: () => ({
        form: {
            name:'',
            username:'',
            email:'',
            phone:'',
            password:'',
            confirm:'',
            gender:'Gender',
        },
        loading: {
            form: false,
        }
    }),

    getters: {
        getForm: state => state.form
    },

    actions: {
        async onRegister() {

            if (this.loading.form) return false;

            this.loading.form = true;

            // const accessToken = Cookies.get("accessToken");
            const csrf = Cookies.get("XSRF-TOKEN");

            const formData = new FormData();
            for (const key in this.form) {
                formData.append(key, this.form[key]);
            }

            const resp = await axios({
                url: '/trevolia-api/v1/dashboard',
                method: 'post',
                data: formData,
                headers: {
                    "Content-Type": "application/json",
                    // authorization: `Bearer ${accessToken}`,
                    "X-XSRF-TOKEN": csrf, // tapi undefined, katanya hanya bisa sama domain/sub domain (tambahan tidak penting untuk saat ini)
                }
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

            // console.log('useRegisterStore', resp)

            if(!resp?.data) return this.loading.form = false

            // return resp?.data // JSON.parse(JSON.stringify(resp))
        },

    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRegisterStore, import.meta.hot));
}

// https://trefeltour.labsnip.com/trevolia-api/v1/auth/login
