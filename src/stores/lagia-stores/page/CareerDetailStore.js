import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useCareerDetailStore = defineStore('CareerDetailStore', {
  id: 'CareerDetailStore',

  state: () => ({
    dataType: {},
    record: null, // {}
    isMaintenance: false,

    additional: '',
    loading: false,
  }),

  getters: {
    getRecord: state => state.record,
  },

  actions: {
    async onFetch(id = 1) {

      if (this.loading) return false;

      this.loading = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/page-career/read',
        method: 'get',
        params: {
          slug: 'page-career',
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

      // if (response?.data?.additional?.image) response.data.additional['image'] = JSON.parse(response.data.additional['image'])
      //   if (response?.data?.additional?.culinaryStore?.image) response.data.additional['culinaryStore']['image'] = JSON.parse(response.data.additional['culinaryStore']['image'])
      this.additional = response?.data?.additional
      console.log('additional', this.additional)


      console.log('stores/lagia-stores/CareerDetailStore', this.record)
      return this.record

    },
  }
});
