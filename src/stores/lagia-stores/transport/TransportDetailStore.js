import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useTransportDetailStore = defineStore('TransportDetailStore', {
  id: 'TransportDetailStore',

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
        url: '/trevolia-api/v1/entities/transport-rentals/read',
        method: 'get',
        params: {
          slug: 'transport-rentals',
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

      // console.log('stores/lagia-stores/TransportDetailStore 1', response)

      if (!response?.data) return this.loading = false

      try {
        if (response?.data?.data['image']) response.data.data['image'] = JSON.parse(response?.data?.data['image'])
      } catch (error) {
        if (response?.data?.data['image']) response.data.data['image'] = [response?.data?.data['image']]
      }

      try {
        response?.data?.data?.transportVehicles?.forEach(element => {
          if (element?.image) element['image'] = JSON.parse(element['image'])
        });
      } catch (error) {
        response?.data?.data?.transportVehicles?.forEach(element => {
          if (element?.image) element['image'] = [element['image']]
        });
      }

      try {
        response?.data?.data?.transportPrices?.forEach(element => {
          if (element?.image) element['image'] = JSON.parse(element['image'])
        });
      } catch (error) {
        response?.data?.data?.transportPrices?.forEach(element => {
          if (element?.image) element['image'] = [element['image']]
        });
      }

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/TransportDetailStore 2', this.record)
      return this.record

    },

    async onFetchDetailStore(id) {

      if (this.loading_store) return false;

      this.loading_store = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/transport-prices/read',
        method: 'get',
        params: {
          slug: 'transport-prices',
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
        if (response?.data?.data?.transportRental['image']) response.data.data['transportRental']['image'] = JSON.parse(response?.data?.data['transportRental']['image'])
      } catch (error) {
        if (response?.data?.data?.transportRental['image']) response.data.data['transportRental']['image'] = [response?.data?.data['transportRental']['image']]
      }

      try {
        if (response?.data?.data?.transportVehicle['image']) response.data.data['transportVehicle']['image'] = JSON.parse(response?.data?.data['transportVehicle']['image'])
      } catch (error) {
        if (response?.data?.data?.transportVehicle['image']) response.data.data['transportVehicle']['image'] = [response?.data?.data['transportVehicle']['image']]
      }

      this.record_store = response?.data?.data;

      console.log('stores/lagia-stores/TransportDetailStore transportVehicle', this.record_store)
      return this.record_store

    },
  }
});
