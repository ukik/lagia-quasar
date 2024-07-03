import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useTransportPriceDetailStore = defineStore('TransportPriceDetailStore', {
  id: 'TransportPriceDetailStore',

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

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/TransportPriceDetailStore', this.record)
      return this.record

    },
  }
});
