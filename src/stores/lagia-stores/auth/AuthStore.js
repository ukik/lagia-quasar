import { defineStore } from 'pinia';

// import domains from 'src/settings/domains'
import { api } from 'src/settings/axios'

// const { apiDomain } = domains()

import axios from 'axios'

import { Notify, Cookies } from 'quasar'

const _id = Math.round(Math.random() * 100000000000000)

// no need to import defineStore and acceptHMRUpdate
export const useAuthStore = defineStore('AuthStore', {
  id: 'AuthStore',

  state: () => ({
    form_forgot_password: {
      email: "demo77338880643600@gmail.com",
    },
    form_verify: {
      email: "demo77338880643600@gmail.com",
      token: "123456789"
    },
    form_login: {
      email: "demo77338880643600@gmail.com",
      password: "123456789",
      remember: false,
    },
    form_reset_password: {
      email: "demo77338880643600@gmail.com",
      password: "123456789",
      passwordConfirmation: "123456789",
      token: "501023", // dari badaso_password_resets->token, di create dari forgot-password badaso
    },
    form_register: {
      name: 'demo@gmail.com' + _id,
      username: _id,
      email: 'demo' + _id + '@gmail.com',
      phone: _id,
      password: '123456789',
      passwordConfirmation: '123456789',
      gender: 'Gender',
    },
    auth: {
      "isLogin": null,
      "message": "",
      "errors": null,
      "data": {
        "accessToken": "",
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
        "roles": null,
        "expiresIn": 0
      }
    },
    loading: {
      fetchCSRF: false,
      fetchInitAuth: false, // true after refresh (1x request only)

      init: false,
      relogin: false,
      form_register: false,
      form_login: false,
      form_reset_password: false,
      form_forgot_password: false,
      form_verify: false,
    }
  }),

  getters: {
    getAuth: state => state.auth,
    getIsLogin: state => state.auth.isLogin,
    getAccessToken: state => state.auth.data.accessToken,
    getLoading: state => state.loading,
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

      const accessToken = Cookies.get("accessToken");
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

      if (!resp?.data) return this.loading.fetchInitAuth = false

      return resp?.data // JSON.parse(JSON.stringify(resp))
    },





    async onRelogin() {

      if (this.loading.relogin) return false;

      this.loading.relogin = true;

      const resp = await axios({
        url: '/trevolia-api/v1/auth/init',
        method: 'get',
      })
      .catch(error => { // wajib ada agar jika error server tidak error UI
        console.log('store/lagia-stores/auth/AuthStore', error.response)
      })

      this.loading.relogin = false

      if (!resp?.data) return this.loading.relogin = false

      resp.data.data['roles'] = JSON.parse(resp?.data?.data['roles'])

      this.auth = resp?.data
      console.log('stores/lagia-stores/auth/AuthStore/onRelogin', this.auth)
    },

    async onInit() {

      if (this.loading.init) return false;

      this.loading.init = true;

      const resp = await axios({
        url: '/trevolia-api/v1/auth/init',
        method: 'get',
      })
      .catch(error => { // wajib ada agar jika error server tidak error UI
        console.log('store/lagia-stores/auth/AuthStore', error.response)
      })

      // this.loading.init = false
      // console.log('onInit', resp)

      if (!resp?.data) return this.loading.init = false

      resp.data.data['roles'] = JSON.parse(resp?.data?.data['roles'])

      this.auth = resp?.data
      console.log('stores/lagia-stores/auth/AuthStore/onInit', this.auth)
    },


    async onLogin() {

      if (this.loading.form_login) return false;

      this.loading.form_login = true;

      // const accessToken = Cookies.get("accessToken");
      // const csrf = Cookies.get("XSRF-TOKEN");

      const formData = new FormData();
      for (const key in this.form_login) {
        const value = JSON.parse(JSON.stringify(this.form_login[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this.form_login)

      const resp = await axios({
        url: '/trevolia-api/v1/auth/login',
        method: 'post',
        data: formData,
        // headers: {
        //   "Content-Type": "application/json",
        //   // authorization: `Bearer ${accessToken}`,
        //   // "X-XSRF-TOKEN": csrf, // tapi undefined, katanya hanya bisa sama domain/sub domain (tambahan tidak penting untuk saat ini)
        // }
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

      this.loading.form_login = false
      console.log('onLogin', resp)

      if (!resp?.data) return this.loading.form_login = false

      resp.data.data['roles'] = JSON.parse(resp?.data?.data['roles'])

      this.auth = resp?.data
      console.log('stores/lagia-stores/auth/AuthStore/onInit', this.auth)

    },

    async onRegister() {

      if (this.loading.form_register) return false;

      this.loading.form_register = true;

      // const accessToken = Cookies.get("accessToken");
      // const csrf = Cookies.get("XSRF-TOKEN");

      const formData = new FormData();
      for (const key in this.form_register) {
        const value = JSON.parse(JSON.stringify(this.form_register[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this.form_register)

      const resp = await axios({
        url: '/trevolia-api/v1/auth/register',
        method: 'post',
        data: formData,
        // headers: {
        //   "Content-Type": "application/json",
        //   // authorization: `Bearer ${accessToken}`,
        //   // "X-XSRF-TOKEN": csrf, // tapi undefined, katanya hanya bisa sama domain/sub domain (tambahan tidak penting untuk saat ini)
        // }
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

      this.loading.form_register = false
      console.log('onRegister', resp)

      if (!resp?.data) return this.loading.form_register = false


      resp.data.data['roles'] = JSON.parse(resp?.data?.data['roles'])

      this.auth = resp?.data
      console.log('stores/lagia-stores/auth/AuthStore/onInit', this.auth)
    },

    async onResetPassword() {

      if (this.loading.form_reset_password) return false;

      this.loading.form_reset_password = true;

      const accessToken = Cookies.get("accessToken");
      const csrf = Cookies.get("XSRF-TOKEN");

      const formData = new FormData();
      for (const key in this.form_reset_password) {
        const value = JSON.parse(JSON.stringify(this.form_reset_password[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this.form_reset_password)

      const resp = await axios({
        url: '/trevolia-api/v1/auth/reset-password',
        method: 'post',
        data: formData,
        // headers: {
        //   // "Content-Type": "application/json",
        //   // authorization: `Bearer ${accessToken}`,
        //   // "X-XSRF-TOKEN": csrf, // tapi undefined, katanya hanya bisa sama domain/sub domain (tambahan tidak penting untuk saat ini)
        // }
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

      this.loading.form_reset_password = false
      console.log('onLogin', resp)

      if (!resp?.data) return this.loading.form_reset_password = false
    },

    async onForgotPassword() {

      if (this.loading.form_forgot_password) return false;

      this.loading.form_forgot_password = true;

      // const accessToken = Cookies.get("accessToken");
      // const csrf = Cookies.get("XSRF-TOKEN");

      const formData = new FormData();
      for (const key in this.form_forgot_password) {
        const value = JSON.parse(JSON.stringify(this.form_forgot_password[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this.form_forgot_password)

      const resp = await axios({
        url: '/trevolia-api/v1/auth/forgot-password',
        method: 'post',
        data: formData,
        // headers: {
        //   "Content-Type": "application/json",
        //   // authorization: `Bearer ${accessToken}`,
        //   "X-XSRF-TOKEN": csrf, // tapi undefined, katanya hanya bisa sama domain/sub domain (tambahan tidak penting untuk saat ini)
        // }
      })
        .then((response) => {
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

      this.loading.form_forgot_password = false
      console.log('onLogin', resp)

      if (!resp?.data) return this.loading.form_forgot_password = false
    },

    async onVerify(slug = 'verify') {

      if (this.loading.form_verify) return false;

      this.loading.form_verify = true;

      // const accessToken = Cookies.get("accessToken");
      // const csrf = Cookies.get("XSRF-TOKEN");

      const formData = new FormData();
      for (const key in this.form_verify) {
        const value = JSON.parse(JSON.stringify(this.form_verify[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this.form_verify)

      const resp = await axios({
        url: '/trevolia-api/v1/auth/'+slug,
        method: 'post',
        data: formData,
        // headers: {
        //   "Content-Type": "application/json",
        //   // authorization: `Bearer ${accessToken}`,
        //   // "X-XSRF-TOKEN": csrf, // tapi undefined, katanya hanya bisa sama domain/sub domain (tambahan tidak penting untuk saat ini)
        // }
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

      this.loading.form_verify = false
      console.log('onLogin', resp)

      if (!resp?.data) return this.loading.form_verify = false
    },

    async onRequestVerification() {
      this.onVerify('re-request-verification')
    },

    async onClearResetPassword() {
      this.form_reset_password = {
        email: "",
        password: "",
        passwordConfirmation: "",
        token: "",
      }
    },
    async onClearVerify() {
      this.form_verify = {
        email: "",
        token: ""
      }
    },

    async onClearForgotPassword() {
      this.form_forgot_password = {
        email: "",
      }
    },

    async onClearLogin() {
      this.form_login = {
        email: "",
        password: "",
        remember: false,
      }
    },

    async onClearRegister() {
      this.form_register = {
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
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

// https://trefeltour.labsnip.com/trevolia-api/v1/auth/login
