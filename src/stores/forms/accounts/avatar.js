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




export const useFormStore = defineStore('forms-accounts-avatar', {
  state: () => ({
    id: '',
    // description: '',
    cover: [],
    file_cover: [],
    // status: '0',
    // tags: null,
    // genre: null,
    max: 1,
    loading: false,
    loading_create: false,

  }),
  getters: {
    get_lightbox: (state) => {
      let imgs = []
      state.cover.forEach(element => {
        imgs.push(element.file)
      });
      return imgs
    }
  },
  actions: {

    async form_edit (payload = null) {

      if(this.loading) return

      // if(!payload.id) return
      // const { parent_id } = route.getParams // gak support preFetch

      this.loading = true

      const results = await axios.get(`api/accounts/avatar`)
      .catch(err => {
        errorNotify()
        return null
      })

      this.loading = false

      // console.log(results)

      if(!results) return
      if(!results.data.payload.user) return

      const images = [results.data.payload.user.avatar]
      const id = results.data.payload.user.id

      let arr = []
      if(results.data.payload.user.avatar) {
        images.forEach((element, index) => {
          if(element.includes("http")) {
            arr.push({
              file: element,
              id: index
            })
          } else {
            arr.push({
              file: host+element,
              id: index
            })
          }
        });
      }

      this.cover = images.length > 0 ? arr : []
      this.id = id ? id : null

    },

    async form_create (payload = null) {

      console.log('form_create', this.file_cover)
      if(this.file_cover.length <= 0) return

      if(this.loading_create) return

      let formData = new FormData();
      for (let i = 0; i < this.file_cover.length; i++) {
        formData.append('cover[]', this.file_cover[i].file);
      }

      this.loading_create = true

      const results = await axios({
        method: 'post',
        url: `api/accounts/avatar/create`,
        data: formData
      })
      .catch(err => {
        errorNotify()
        return null
      })

      this.loading_create = false

      if(!results) return

      successNotify()

      this.file_cover = []

    },

    async form_delete_single (payload = null) {
      if(!payload.id) { // form CREATE
        this.cover.splice(payload.index, 1)
        this.file_cover.splice(payload.index, 1)
        return true
      }

      if(this.loading_create) return

      this.loading_create = true

      let formData = new FormData();
      formData.append('user_image_file_id', payload?.selected?.id)

      const results = await axios({
        method: 'post',
        url: `api/accounts/avatar/delete-cover/${payload.id}`,
        data: formData,
      })
      .catch(err => {
        errorNotify()
        return null
      })

      this.loading_create = false

      if(!results) return

      this.cover.splice(payload.index, 1)
      this.file_cover.splice(payload.index, 1)

      successNotify()

      return true
    },

  },
});
