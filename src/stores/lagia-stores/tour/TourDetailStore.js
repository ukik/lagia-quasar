import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useTourDetailStore = defineStore('TourDetailStore', {
  id: 'TourDetailStore',

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
        url: '/trevolia-api/v1/entities/tour-stores/read',
        method: 'get',
        params: {
          slug: 'tour-stores',
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

      // console.log('stores/lagia-stores/TourDetailStore 1', response)

      if (!response?.data) return this.loading = false

      try {
        if (response?.data?.data['image']) response.data.data['image'] = JSON.parse(response?.data?.data['image'])
      } catch (error) {
        if (response?.data?.data['image']) response.data.data['image'] = [response?.data?.data['image']]
      }

      try {
        response?.data?.data?.talentSkills?.forEach(element => {
          if (element?.image) element['image'] = JSON.parse(element['image'])
        });
      } catch (error) {
        response?.data?.data?.talentSkills?.forEach(element => {
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

      console.log('stores/lagia-stores/TourDetailStore 2', this.record)
      return this.record

    },

    async onFetchDetailStore(id) {

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

      this.record_store = response?.data?.data;

      console.log('stores/lagia-stores/TourDetailStore tourismFacilities', this.record_store)
      return this.record_store

    },
  }
});
