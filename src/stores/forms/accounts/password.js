import { defineStore } from 'pinia';
import axios from 'axios'
//import { useRouterStore } from 'src/stores/router-store'
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



export const useFormStore = defineStore('forms-accounts-password', {
  state: () => ({
    user: {
      id: '',
      old: '',
      new: '',
      confirm: '',
    },
    loading: false,
    loading_create: false,
  }),
  getters: {
    get_user: (state) => state.user,
  },
  actions: {

    async form_edit (payload = null) {

      if(this.loading) return

      this.loading = true

      const results = await axios.get(`api/accounts/password`)
      .catch(err => {
        errorNotify()
        return null
      })

      this.loading = false

      if(!results) return
      if(!results.data.payload.user) return

      this.user = results.data.payload.user
    },

    async form_create (payload = null) {

      if(this.loading_create) return

      let formData = new FormData();
      formData.append('id', !this.user.id ? '' : this.user.id)
      formData.append('old', !this.user.old ? '' : this.user.old)
      formData.append('new', !this.user.new ? '' : this.user.new)
      formData.append('confirm', !this.user.confirm ? '' : this.user.confirm)

      this.loading_create = true

      const results = await axios({
        method: 'post',
        url: `api/accounts/password/create`,
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


      this.loading_create = false

      if(!results) return

      successNotify()

      this.router.replace({
        name:'form_accounts_password',
        params: {
          id: results.data.payload?.user.id
        }
      })

      // return results.data.payload?.content
    },


  },
});
