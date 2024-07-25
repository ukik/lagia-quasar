import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useTourPriceDetailStore = defineStore('TourPriceDetailStore', {
  id: 'TourPriceDetailStore',

  state: () => ({
    dataType: {},
    record: {},
    isMaintenance: false,

    loading: false,
    loading_store: false,
  }),

  getters: {
    getRecord: state => state.record,
  },

  actions: {
    async onFetch(id) {

      if (this.loading_store) return false;

      this.loading_store = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/tour-prices/read',
        method: 'get',
        params: {
          slug: 'tour-prices',
          id: id,
        }
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err
        })

      this.loading_store = false

      if (!response?.data) return this.loading_store = false

      try {
        if (response?.data?.data?.tourStore['image']) response.data.data['tourStore']['image'] = JSON.parse(response?.data?.data['tourStore']['image'])
      } catch (error) {
        if (response?.data?.data?.tourStore['image']) response.data.data['tourStore']['image'] = [response?.data?.data['tourStore']['image']]
      }

      try {
        if (response?.data?.data?.tourProduct['image']) response.data.data['tourProduct']['image'] = JSON.parse(response?.data?.data['tourProduct']['image'])
      } catch (error) {
        if (response?.data?.data?.tourProduct['image']) response.data.data['tourProduct']['image'] = [response?.data?.data['tourProduct']['image']]
      }

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/TourPriceDetailStore', this.record)
      return this.record

    },
  }
});
