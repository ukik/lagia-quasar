import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useSouvenirPriceDetailStore = defineStore('SouvenirPriceDetailStore', {
  id: 'SouvenirPriceDetailStore',

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
        url: '/trevolia-api/v1/entities/souvenir-prices/read',
        method: 'get',
        params: {
          slug: 'souvenir-prices',
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
        if (response?.data?.data?.souvenirStore['image']) response.data.data['souvenirStore']['image'] = JSON.parse(response?.data?.data['souvenirStore']['image'])
      } catch (error) {
        if (response?.data?.data?.souvenirStore['image']) response.data.data['souvenirStore']['image'] = [response?.data?.data['souvenirStore']['image']]
      }

      try {
        if (response?.data?.data?.souvenirProduct['image']) response.data.data['souvenirProduct']['image'] = JSON.parse(response?.data?.data['souvenirProduct']['image'])
      } catch (error) {
        if (response?.data?.data?.souvenirProduct['image']) response.data.data['souvenirProduct']['image'] = [response?.data?.data['souvenirProduct']['image']]
      }

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/SouvenirPriceDetailStore', this.record)
      return this.record

    },
  }
});
