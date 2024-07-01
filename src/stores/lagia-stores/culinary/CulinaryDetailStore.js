import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useCulinaryDetailStore = defineStore('CulinaryDetailStore', {
  id: 'CulinaryDetailStore',

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
        url: '/trevolia-api/v1/entities/culinary-stores/read',
        method: 'get',
        params: {
          slug: 'culinary-stores',
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

      // console.log('stores/lagia-stores/CulinaryDetailStore 1', response)

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

      console.log('stores/lagia-stores/CulinaryDetailStore 2', this.record)
      return this.record

    },

    async onFetchDetailStore(id) {

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

      this.record_store = response?.data?.data;

      console.log('stores/lagia-stores/CulinaryDetailStore tourismFacilities', this.record_store)
      return this.record_store

    },
  }
});
