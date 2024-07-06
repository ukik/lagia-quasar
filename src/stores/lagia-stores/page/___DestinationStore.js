import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useContactStore = defineStore('ContactStore', {
  id: 'ContactStore',

  state: () => ({
    dataType: {},
    record: null, // {}
    isMaintenance: false,

    loading: false,
  }),

  getters: {
    getRecord: state => state.record,
  },

  actions: {
    async onFetch(id) {

      if (this.loading) return false;

      this.loading = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/page-contact/read',
        method: 'get',
        params: {
          slug: 'page-contact',
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

      try {
        if (response?.data?.data['image']) response.data.data['image'] = JSON.parse(response?.data?.data['image'])
      } catch (error) {
        if (response?.data?.data['image']) response.data.data['image'] = [response?.data?.data['image']]
      }

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/ContactStore', this.record)
      return this.record

    },
  }
});
