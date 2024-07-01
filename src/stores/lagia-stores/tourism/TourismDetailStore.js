import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useTourismDetailStore = defineStore('TourismDetailStore', {
  id: 'TourismDetailStore',

  state: () => ({
    dataType: {},
    record: {},
    record_store: {},
    isMaintenance: false,

    loading: false,
    loading_store: false,
  }),

  getters: {
    getRecord: state => state.record,
    getRecordDetailStore: state => state.record_store,
  },

  actions: {
    async onFetch(id) {

      if (this.loading) return false;

      this.loading = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/tourism-venues/read',
        method: 'get',
        params: {
          slug: 'tourism-venues',
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

      // console.log('stores/lagia-stores/TourismDetailStore 1', response)

      if (!response?.data) return this.loading = false

      try {
        if (response?.data?.data['image']) response.data.data['image'] = JSON.parse(response?.data?.data['image'])
      } catch (error) {
        if (response?.data?.data['image']) response.data.data['image'] = [response?.data?.data['image']]
      }

      try {
        response?.data?.data?.tourismFacilities?.forEach(element => {
          if (element?.image) element['image'] = JSON.parse(element['image'])
        });
      } catch (error) {
        response?.data?.data?.tourismFacilities?.forEach(element => {
          if (element?.image) element['image'] = [element['image']]
        });
      }

      try {
        response?.data?.data?.tourismPrices?.forEach(element => {
          if (element?.image) element['image'] = JSON.parse(element['image'])
        });
      } catch (error) {
        response?.data?.data?.tourismPrices?.forEach(element => {
          if (element?.image) element['image'] = [element['image']]
        });
      }

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/TourismDetailStore 2', this.record)
      return this.record

    },

    async onFetchDetailStore(id) {

      if (this.loading_store) return false;

      this.loading_store = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/tourism-prices/read',
        method: 'get',
        params: {
          slug: 'tourism-prices',
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
        if (response?.data?.data?.tourismVenue['image']) response.data.data['tourismVenue']['image'] = JSON.parse(response?.data?.data['tourismVenue']['image'])
      } catch (error) {
        if (response?.data?.data?.tourismVenue['image']) response.data.data['tourismVenue']['image'] = [response?.data?.data['tourismVenue']['image']]
      }

      // try {
      //   if (response?.data?.data?.tourismFacilities['image']) response.data.data['tourismFacilities']['image'] = JSON.parse(response?.data?.data['tourismFacilities']['image'])
      // } catch (error) {
      //   if (response?.data?.data?.tourismFacilities['image']) response.data.data['tourismFacilities']['image'] = [response?.data?.data['tourismFacilities']['image']]
      // }

      this.record_store = response?.data?.data;

      console.log('stores/lagia-stores/TourismDetailStore tourismFacilities', this.record_store)
      return this.record_store

    },
  }
});
