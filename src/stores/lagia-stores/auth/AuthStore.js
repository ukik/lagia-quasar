import { defineStore } from 'pinia';

import domains from 'src/settings/domains'
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
    form_login: {
      email: "demo77338880643600@gmail.com",
      password: "123456789"
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
        "expiresIn": 0
      }
    },
    loading: {
      fetchCSRF: false,
      fetchLoginAuth: false,
      fetchInitAuth: false, // true after refresh (1x request only)

      form_register: false,
      form_login: false,
      form_reset_password: false,
      form_forgot_password: false,
    }
  }),

  getters: {
    getAuth: state => state.auth,
    isLogin: state => state.auth.isLogin,
    accessToken: state => state.auth.data.accessToken
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

        const accessToken = Cookies.get("accessToken");
        accessToken = this.auth?.data?.accessToken

        this.isLoggedIn = true
      }

      return true
    },

    async onLogin() {

      if (this.loading.form_login) return false;

      this.loading.form_login = true;

      // const accessToken = Cookies.get("accessToken");
      const csrf = Cookies.get("XSRF-TOKEN");

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

      this.loading.form_login = false
      console.log('onLogin', resp)

      if (!resp?.data) return this.loading.form_login = false

      this.auth = resp?.data
    },

    async onRegister() {

      if (this.loading.form_register) return false;

      this.loading.form_register = true;

      // const accessToken = Cookies.get("accessToken");
      const csrf = Cookies.get("XSRF-TOKEN");

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

      this.loading.form_register = false
      console.log('onRegister', resp)

      if (!resp?.data) return this.loading.form_register = false

      this.auth = resp?.data
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
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
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

      this.loading.form_reset_password = false
      console.log('onLogin', resp)

      if (!resp?.data) return this.loading.form_reset_password = false
    },

    async onForgotPassword() {

      if (this.loading.form_forgot_password) return false;

      this.loading.form_forgot_password = true;

      // const accessToken = Cookies.get("accessToken");
      const csrf = Cookies.get("XSRF-TOKEN");

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
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${accessToken}`,
          "X-XSRF-TOKEN": csrf, // tapi undefined, katanya hanya bisa sama domain/sub domain (tambahan tidak penting untuk saat ini)
        }
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

    async onClearResetPassword() {
      this.form_reset_password = {
        email: "",
        password: "",
        passwordConfirmation: "",
        token: "",
      }
    },

    async onClearForgotPassword() {
      this.form_forgot_password = {
        email: "",
      }
    },
    async onClear() {
      this.form_register = {
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirm: '',
        gender: 'Gender',
      }

      this.form_login = {
        "email": "",
        "password": ""
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

// https://trefeltour.labsnip.com/trevolia-api/v1/auth/login
