import { defineStore } from 'pinia';
import axios from 'axios'
import { Loading, Notify, Cookies, QSpinnerClock, Platform } from 'quasar'

import { host } from 'src/boot/common'

function errorNotify(caption = 'something error happened') {
  Notify.create({
    message: 'Proses Gagal',
    caption: caption,
    color: 'negative',
    icon: 'highlight_off',
    position: 'top',
  })
}

function successNotify() {
  Notify.create({
    message: 'Success',
    // caption: 'something error happened',
    color: 'positive',
    icon: 'done',
    position: 'top',
  })
}

// JANGAN PASANG pinia useRouterStore() nanti CONFLICT (PENTING)

const payload = {
  "user": {
      "id": null,
      "name": "",
      "role": "",
      "avatar": "",
      "email_verified_at": null,
      "phone_verified_at": null,
  },
  "logged": false,
  "token": "",
  "csrf": "",
  "type": ""
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: '',
    password: '',
    form_register: {
      email: '',
      password: '',
      name: '',
      username: '',
    },
    form_forget: {
      email: '',
      note: null,
    },
    form_reset: {
      password: null,
      confirm: null,
    },
    payload,
    verified: null,
    loading: false,
    loading_create: false,
    loading_login: false,
    loading_forget: false,
    loading_reset: false,
    loading_logout: false,

    email_verify_limit: false,
    message: '',
  }),
  getters: {
    get_user: (state) => state.payload.user,
    is_logged: (state) => state.payload.logged,
    auth_id: (state) => state.payload.user?.id,
  },
  actions: {
    async redirect (payload = null) {

      if(this.loading) return

      this.loading = true

      const results = await axios.get(`${host}api/auth/init`, {
        headers: {
          Authorization: `Bearer ${payload.token}`
        }
      })
      .catch(err => {
        console.log(err?.response)
        const message = err?.response?.data?.meta?.message
        if(message) {
          if(message == "could_not_create_token") {
            this.payload = payload
          }
        }
        // errorNotify()
        return null
      })

      this.loading = false

      if(!results) return
      if(!results.data.payload) return

      this.payload = results.data.payload

      return true
    },

    async sendForgetEmail () {

      if(this.loading_forget) return

      this.loading_forget = true

      let formData = new FormData();
      formData.append('email', this.form_forget.email)

      const results = await axios({
        method: 'post',
        url: `api/auth/send-forget-email`,
        data: formData
      })
      .catch(err => {
        console.log(err?.response)
        const message = err?.response?.data?.meta?.message
        if(message == "undefined") {
          errorNotify('email tidak ditemukan')
        }
        return null
      })

      this.loading_forget = false

      // console.log(results)

      if(!results) return

      const message = results.data?.meta?.message
      if(message == "sent") {
        this.form_forget.note = {
          message: 'sent',
          desc: 'email has been sent',
        }
        Notify.create({
          message: 'Success',
          caption: 'email has been sent',
          color: 'positive',
          icon: 'done',
          position: 'top',
        })
      }
      if(message == "limit") {
        errorNotify('mencapai batas maksimal kirim email')
        this.form_forget.note = {
          message: 'limit',
          desc: 'mencapai batas maksimal kirim email',
        }
      }
      return true
    },

    async sendVerifyEmail () {

      if(this.loading) return

      this.loading = true

      const results = await axios.get(`api/auth/send-verify-email`)
      .catch(err => {
        console.log(err?.response)
        const message = err?.response?.data?.meta?.message
        if(message == "limit") {
          this.message = "email sudah dikirim, mencapai batas maksimal kirim email hari ini"
          this.email_verify_limit = true
          errorNotify('mencapai batas maksimal kirim email hari ini')
        }
        return null
      })

      this.loading = false

      if(!results) return

      const message = results.data?.meta?.message

      if(message == "sent") {
        this.message = "email sudah dikirim"
        Notify.create({
          message: 'Success',
          caption: 'email has been sent',
          color: 'positive',
          icon: 'done',
          position: 'top',
        })
      }
      if(message == "verified") {
        Notify.create({
          message: 'Success',
          caption: 'email has been verified',
          color: 'positive',
          icon: 'done',
          position: 'top',
        })
      }
    },

    async verifyAccount (payload = null) {

      if(this.loading) return

      this.loading = true

      const results = await axios.get(`api/auth/verify-account/${payload.token}`)
      .catch(err => {
        console.log(err?.response)
        this.verified = 'wrong'
        errorNotify()
        return null
      })

      this.loading = false

      // console.log(results)

      if(!results) return

      Notify.create({
        message: 'Success',
        caption: 'email has been verified',
        color: 'positive',
        icon: 'done',
        position: 'top',
      })

      this.verified = 'verified'
    },

    async init () {

      if(this.payload.logged) return

      if(this.loading) return

      this.loading = true

      const results = await axios.get(`api/auth/init`)
      .catch(err => {
        console.log(err?.response)
        const message = err?.response?.data?.meta?.message
        if(message) {
          if(message == "could_not_create_token") {
            this.payload = payload
          }
        }
        // errorNotify()
        return null
      })

      this.loading = false

      if(!results) return
      if(!results.data.payload) return

      this.payload = results.data.payload
    },

    async login () {

      if(this.loading_login) return

      let formData = new FormData();
      formData.append('email', this.email)
      formData.append('password', this.password)

      this.loading_login = true

      const results = await axios({
        method: 'post',
        url: `api/auth/login`,
        data: formData
      })
      .catch(err => {
        console.log(err?.response)
        const message = err?.response?.data?.meta?.message
        if(message) {
          if(message == "could_not_create_token") {
            this.payload = payload
          }
        }
        errorNotify()
        return null
      })

      this.loading_login = false

      if(!results) return
      if(!results.data.payload) return

      successNotify()

      this.payload = results.data.payload

      return this.payload?.logged
    },

    async register () {

      if(this.loading_register) return

      let formData = new FormData();
      formData.append('username', this.form_register.username)
      formData.append('name', this.form_register.name)
      formData.append('email', this.form_register.email)
      formData.append('password', this.form_register.password)

      this.loading_register = true

      const results = await axios({
        method: 'post',
        url: `api/auth/register`,
        data: formData
      })
      .catch(err => {
        console.log(err?.response)
        if(err?.response?.data?.meta?.message) {
          const object = err?.response?.data?.meta?.message
          for (const key in object) {
            const element = object[key];
            errorNotify(element)
          }
        }
        // errorNotify()
        return null
      })

      this.loading_register = false

      if(!results) return
      if(!results.data.payload) return

      successNotify()

      this.payload = results.data.payload

      return this.payload?.logged
    },

    async resetPassword () {

      if(this.loading_reset) return

      let formData = new FormData();
      formData.append('password', this.form_reset.password)
      formData.append('confirm', this.form_reset.confirm)

      this.loading_reset = true

      const results = await axios({
        method: 'post',
        url: `api/auth/reset-password`,
        data: formData
      })
      .catch(err => {
        console.log(err.response.data?.meta?.message)
        try {
          errorNotify(Object.values(err.response.data?.meta?.message))
        } catch (error) {
          errorNotify()
        }
        return null
      })

      this.loading_reset = false

      if(!results) return
      if(!results.data.payload) return

      successNotify()

      this.form_reset = {
        password: null,
        confirm: null,
      }
    },




    async logout (payload = null) {

      if(this.loading_logout) return

      this.loading_logout = true

      const results = await axios({
        method: 'post',
        url: `api/auth/logout`,
      })
      .catch(err => {
        errorNotify()
        return null
      })

      this.loading_logout = false

      console.log('logout', results)

      if(!results) return
      if(!results.data.payload) return

      this.email = ''
      this.password = ''
      this.form_register = {
        email: '',
        password: '',
        name: '',
        username: '',
      }
      this.form_forget = {
        email: '',
        note: null,
      }
      this.form_reset = {
        password: null,
        confirm: null,
      }
      this.payload = payload
      this.verified = null
      this.message = ''
      this.email_verify_limit = false

      successNotify()

      return true
    },

  },
});
