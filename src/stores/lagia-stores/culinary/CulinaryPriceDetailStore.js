import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useCulinaryPriceDetailStore = defineStore('CulinaryPriceDetailStore', {
  id: 'CulinaryPriceDetailStore',

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
        url: '/trevolia-api/v1/entities/culinary-prices/read',
        method: 'get',
        params: {
          slug: 'culinary-prices',
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
        if (response?.data?.data?.culinaryStore['image']) response.data.data['culinaryStore']['image'] = JSON.parse(response?.data?.data['culinaryStore']['image'])
      } catch (error) {
        if (response?.data?.data?.culinaryStore['image']) response.data.data['culinaryStore']['image'] = [response?.data?.data['culinaryStore']['image']]
      }

      try {
        if (response?.data?.data?.culinaryProduct['image']) response.data.data['culinaryProduct']['image'] = JSON.parse(response?.data?.data['culinaryProduct']['image'])
      } catch (error) {
        if (response?.data?.data?.culinaryProduct['image']) response.data.data['culinaryProduct']['image'] = [response?.data?.data['culinaryProduct']['image']]
      }

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/CulinaryPriceDetailStore', this.record)
      return this.record

    },
  }
});
