import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useLodgePriceDetailStore = defineStore('LodgePriceDetailStore', {
  id: 'LodgePriceDetailStore',

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
        url: '/trevolia-api/v1/entities/lodge-prices/read',
        method: 'get',
        params: {
          slug: 'lodge-prices',
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
        if (response?.data?.data?.lodgeProfile['image']) response.data.data['lodgeProfile']['image'] = JSON.parse(response?.data?.data['lodgeProfile']['image'])
      } catch (error) {
        if (response?.data?.data?.lodgeProfile['image']) response.data.data['lodgeProfile']['image'] = [response?.data?.data['lodgeProfile']['image']]
      }

      try {
        if (response?.data?.data?.lodgeProfile['category']) response.data.data['lodgeProfile']['category'] = JSON.parse(response?.data?.data['lodgeProfile']['category'])
      } catch (error) {
        if (response?.data?.data?.lodgeProfile['category']) response.data.data['lodgeProfile']['category'] = [response?.data?.data['lodgeProfile']['category']]
      }

      try {
        if (response?.data?.data?.lodgeRoom['image']) response.data.data['lodgeRoom']['image'] = JSON.parse(response?.data?.data['lodgeRoom']['image'])
      } catch (error) {
        if (response?.data?.data?.lodgeRoom['image']) response.data.data['lodgeRoom']['image'] = [response?.data?.data['lodgeRoom']['image']]
      }

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/LodgePriceDetailStore', this.record)
      return this.record

    },
  }
});
