import { defineStore } from 'pinia';
import axios from 'axios'
//import { useRouterStore } from 'src/stores/router-store'
import { Loading, Notify, Cookies, QSpinnerClock, Platform } from 'quasar'

import { host } from 'src/boot/common'

function errorNotify() {
  Notify.create({
    message: 'Proses Gagal',
    caption: 'something error happened',
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



export const useFormStore = defineStore('forms-accounts-preview', {
  state: () => ({
    id: '',
    // description: '',
    media: null,
    // cover: null,
    file_media: null,
    // file_cover: null,
    // status: '0',
    // tags: null,
    // genre: null,
    loading: false,
    loading_create: false,

  }),
  // getters: {
  //   get_detail: (state) => state.detail,
  // },
  actions: {

    async form_edit (payload = null) {

      if(this.loading) return

      // if(!payload.id) return
      // const { parent_id } = route.getParams // gak support preFetch

      this.loading = true

      const results = await axios.get(`api/accounts/preview`)
      .catch(err => {
        errorNotify()
        return null
      })

      this.loading = false

      // console.log(results)

      if(!results) return
      if(!results.data.payload.user) return

      const file = results.data.payload.user.preview
      const id = results.data.payload.user.id

      // this.media = file ? host+file : null
      this.media = file ? file : null
      this.id = id ? id : null
    },

    async form_create (payload = null) {

      if(!this.file_media) return

      if(this.loading_create) return

      let formData = new FormData();
      formData.append('media', !this.file_media ? '' : this.file_media)

      this.loading_create = true

      const results = await axios({
        method: 'post',
        url: `api/accounts/preview/create`,
        data: formData
      })
      .catch(err => {
        errorNotify()
        return null
      })

      this.loading_create = false

      if(!results) return

      successNotify()

      this.file_media = null

      return true

    },


    async form_delete_single (payload = null) {
      console.log('form_delete_single i am here', payload)

      if(this.loading_create) return

      this.loading_create = true

      let formData = new FormData();

      const results = await axios({
        method: 'post',
        url: `api/accounts/preview/delete-cover/${payload.id}`,
        data: formData,
      })
      .catch(err => {
        errorNotify()
        return null
      })

      this.loading_create = false

      if(!results) return

      this.media = null
      this.file_media = null

      successNotify()

      return true
    },


  },
});
