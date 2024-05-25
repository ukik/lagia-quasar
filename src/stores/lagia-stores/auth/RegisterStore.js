import { defineStore } from 'pinia';

import domains from 'src/settings/domains'

const { apiDomain } = domains()

import axios from 'axios'

import { Notify, Cookies } from 'quasar'

const _id = Math.round(Math.random() * 100000000000000)

// no need to import defineStore and acceptHMRUpdate
export const useRegisterStore = defineStore('useRegisterStore', {
  id: 'useRegisterStore',

  state: () => ({
    form: {
      name: 'demo@gmail.com' + _id,
      username: _id,
      email: 'demo' + _id + '@gmail.com',
      phone: _id,
      password: '123456789',
      passwordConfirmation: '123456789',
      gender: 'Gender',
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
        const value = JSON.parse(JSON.stringify(this.form[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this.form)

      const resp = await axios({
        url: '/trevolia-api/v1/auth/register',
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
            message: 'Loading success',
            caption: 'data berhasil diproses',
            icon: 'done'
          })
          return response
        })
        .catch((err) => {
          Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            caption: err?.data?.meta?.message[0],
            icon: 'report_problem'
          })
        })

      this.loading.form = false
      console.log('onRegister', resp)

      if (!resp?.data) return this.loading.form = false

      // return resp?.data // JSON.parse(JSON.stringify(resp))
    },
    async onClear() {
      this.form = {
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirm: '',
        gender: 'Gender',
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRegisterStore, import.meta.hot));
}

// https://trefeltour.labsnip.com/trevolia-api/v1/auth/login
