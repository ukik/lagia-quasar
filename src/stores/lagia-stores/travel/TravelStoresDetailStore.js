import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useTravelStoresDetailStore = defineStore('TravelStoresDetailStore', {
  id: 'TravelStoresDetailStore',

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
    async onFetch (id) {

      if (this.loading) return false;

      this.loading = true;

      const response = await axios({
          url: '/trevolia-api/v1/entities/travel-stores/read',
          method: 'get',
          params: {
            slug: 'travel-stores',
            id: id,
          }
        })
        .then((response) => {
          // Notify.create({
          //   color: 'positive',
          //   position: 'top',
          //   message: 'Loading success',
          //   caption: 'data berhasil diproses',
          //   icon: 'done'
          // })
          return response
        })
        .catch((err) => {
          // Notify.create({
          //   color: 'negative',
          //   position: 'top',
          //   message: 'Loading failed',
          //   caption: err?.data?.meta?.message[0],
          //   icon: 'report_problem'
          // })
          return err
        })

      this.loading = false

      // console.log('stores/lagia-stores/TravelStoresDetailStore 1', response)

      if (!response?.data) return this.loading = false

      response.data.data['image'] = JSON.parse(response?.data?.data['image'])

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/TravelStoresDetailStore 2', this.record)
      return this.record

    },
  }
});
