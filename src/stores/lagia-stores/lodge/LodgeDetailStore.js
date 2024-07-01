import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useLodgeDetailStore = defineStore('LodgeDetailStore', {
  id: 'LodgeDetailStore',

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
        url: '/trevolia-api/v1/entities/lodge-profiles/read',
        method: 'get',
        params: {
          slug: 'lodge-profiles',
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

      // console.log('stores/lagia-stores/LodgeDetailStore 1', response)

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

      console.log('stores/lagia-stores/LodgeDetailStore 2', this.record)
      return this.record

    },

    async onFetchDetailStore(id) {

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

      this.record_store = response?.data?.data;

      console.log('stores/lagia-stores/LodgeDetailStore tourismFacilities', this.record_store)
      return this.record_store

    },
  }
});
