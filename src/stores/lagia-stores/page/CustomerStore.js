import { defineStore, storeToRefs } from 'pinia';

import axios from 'axios'

import { Notify, debounce, Loading } from 'quasar'

import caseConvert from 'src/utils/case-convert';

import { useTourOrderDetailStore } from "src/stores/lagia-stores/tour/TourOrderDetailStore";

// no need to import defineStore and acceptHMRUpdate
export const useCustomerStore = defineStore('CustomerStore', {
  id: 'CustomerStore',

  state: () => ({
    dataType: {},
    record: {},
    isMaintenance: false,

    loading: false,
  }),

  getters: {
    getRecord: state => state.record,
  },

  actions: {
    async onFetch(id = null) {

      if (this.loading) return false;

      this.loading = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/page-customer/read/lagia',
        method: 'get',
        params: {
          slug: 'page-customer',
          id: id,
        }
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err
        })

      this.loading = false

      if (!response?.data) return this.loading = false

      this.record = response?.data?.data;

      const store = useTourOrderDetailStore()
      const { onUpdateCustomerData } = store
      onUpdateCustomerData(this.record)

      console.log('stores/lagia-stores/CustomerStore', this.record)
      return this.record

    },

    async onUpdate() {

      if (this.loading) return false;

      this.loading = true;

      Loading.show()

      // const formData = new FormData();
      // for (const slug in this.form_login) {
      //   const value = JSON.parse(JSON.stringify(this.form_login[slug]))
      //   console.log(slug, value)
      //   formData.append(slug, value);
      // }

      const {
        name,
        email,
        phone,
        instance,
        city,
        address,
      } = useTourOrderDetailStore()

      const data = {
        'id': this.record?.id,
        'user_id': this.record?.userId,
        full_name: name,
        email,
        phone,
        instance,
        city,
        address,
      }

      const response = await axios({
        url: "/trevolia-api/v1/entities/page-customer/edit",
        method: 'put',
        data: {
          data
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
          // if (response.data.data) return true
          // return false
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

      this.record = response?.data?.data;

      return false;
      // return false
      // if (!resp.data?.data) return false
      // if (!resp) return false

    },
  }
});
