import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce, Loading, Cookies } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useTourBookingPaymentListStore = defineStore('TourBookingPaymentListStore', {
  id: 'TourBookingPaymentListStore',

  state: () => ({
    dataType: {},
    records: [],
    isMaintenance: false,
  }),

  getters: {
    getRecord: state => state.records,
  },

  actions: {
    onFetchCookies() {
      const cookies_name = 'TourBookingPayment'
      if (!Cookies.has(cookies_name)) {
        return Notify.create({
          color:"negative",
          icon: "warning",
          message: "Riwayat pemesanan di browser kosong",
        })
      };

      this.records = Cookies.get(cookies_name);
      console.log('GET COOKIES TourBookingPaymentListStore', this.records, Cookies.get(cookies_name))

    }
  }
});
