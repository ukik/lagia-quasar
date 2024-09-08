import { defineStore, storeToRefs } from 'pinia';

import axios from 'axios'

import { Notify, debounce, Loading } from 'quasar'

// no need to import defineStore and acceptHMRUpdate
export const usereRequestVerification = defineStore('reRequestVerification', {
  id: 'reRequestVerification',

  state: () => ({
    email: '',
    loading: false,
  }),

  getters: {
    getRecord: state => state.record,
  },

  actions: {
    async onUpdate() {

      if (this.loading) return false;

      this.loading = true;

      Loading.show()

      const formData = new FormData();
      // for (const slug in this.form_login) {
      //   const value = JSON.parse(JSON.stringify(this.form_login[slug]))
      //   console.log(slug, value)
      //   formData.append(slug, value);
      // }

      formData.append('email', this.email);
      // const {
      //   name,
      //   email,
      //   phone,
      //   instance,
      //   city,
      //   address,
      // } = useTourOrderDetailStore()

      // const data = {
      //   address,
      // }

      const resp = await axios({
        url: "/trevolia-api/v1/auth/re-request-verification",
        method: 'post',
        data: formData,
        // data: {
        //   data
        // }
      })
        .then((response) => {
          Notify.create({
            color: 'positive',
            position: 'top',
            message: 'Loading success',
            // caption: 'data berhasil diproses',
            caption: err?.response?.data?.message?.toString(),
            icon: 'done'
          })
          return response
        })
        .catch((err) => {
          console.log('AddToCartStore error', err?.response)
          Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            caption: err?.response?.data?.message?.toString(),
            icon: 'report_problem'
          })
          return false
          return err?.response
        })

      this.loading = false

      Loading.hide()

      return false;

    },
  }
});
