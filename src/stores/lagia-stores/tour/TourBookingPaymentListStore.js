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

    // date_start: null,
    // participant_adult: null,
    // participant_young: null,
    // description: null,
    // hotel: 'Pilih Hotel',
    // dibayar: null,
    // dibayar_percent: null,

    // room_qty: null,
    // room_budget: null,

    // name: null,
    // email: null,
    // phone: null,
    // instance: null,
    // city: null,
    // address: null,

    // loading: false,
    // loading_store: false,
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
      // const cookies = this.$q.cookies.get(cookies_name);
      // console.log("getDateDiff", this.getDateDiff(cookies.state.date_start));

      // if (this.getDateDiff(cookies.state.date_start) >= 0) {
      //   this.date_start = cookies.state.date_start;
      // } else {
      //   this.date_start = formattedString
      // }

      // this.participant_adult = cookies.state.participant_adult;
      // this.participant_young = cookies.state.participant_young;
      // this.description = cookies.state.description;
      // this.hotel = cookies.state.hotel;
      // this.dibayar = cookies.state.dibayar;
      // this.dibayar_percent = cookies.state.dibayar_percent;

      // this.room_qty = cookies.state.room_qty;
      // this.room_budget = cookies.state.room_budget;

      // this.name = cookies.state.name;
      // this.email = cookies.state.email;
      // this.phone = cookies.state.phone;
      // this.instance = cookies.state.instance;
      // this.city = cookies.state.city;
      // this.address = cookies.state.address;


    }
  }
});
