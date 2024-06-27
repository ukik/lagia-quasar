import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useTransportPriceListStore = defineStore('TransportPriceListStore', {
  id: 'TransportPriceListStore',

  state: () => ({
    slug: 'transport-prices',
    errors: {},
    data: {},
    paginate: [5, 10, 25, 50, 75, 100],
    records: [],
    totalItem: 0,
    page: 1,
    orderField: "",
    orderDirection: "",
    isShowDataRecycle: false,
    search: '', // filter & search itu sama
    lastPage: 0,
    currentPage: 1,
    perPage: 25,  // perPage & rowPerPage itu sama

    isAvailable: '',

    loading: false,
    init: false,

    additional: '',
  }),

  getters: {
    getRecords: state => state.records,
  },

  actions: {
    // WASAPDA debounce membuat data dari server tidak tampil / SSR gagal
    async onFetch({ currentPage, query }) {

      if (this.loading) return false;

      this.loading = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/transport-prices/lagia',
        method: 'get',
        params: {
          slug: this.slug,
          page: this.page,
          orderField: caseConvert.snake(this.orderField),
          orderDirection: caseConvert.snake(this.orderDirection),
          showSoftDelete: this.isShowDataRecycle,
          isAvailable: this.isAvailable,
          search: this.search,
          perPage: this.perPage,
          page: currentPage, //this.currentPage,
          payload: [],
          loading: false,

          ...query
        }
      })
        .then((response) => {
          // Notify.create({
          //   color: 'positive',
          //   position: 'top',
          //   message: 'Loading success',
          //   caption: 'data berhasil diproses',
          //   icon: 'done'
          // })
          return response
        })
        .catch((err) => {
          // Notify.create({
          //   color: 'negative',
          //   position: 'top',
          //   message: 'Loading failed',
          //   caption: err?.data?.meta?.message[0],
          //   icon: 'report_problem'
          // })
        })

      this.loading = false

      console.log('stores/lagia-stores/TransportPriceListStore 1', response?.data)

      if (!response?.data) return this.loading = false

      this.init = true


      // response?.data?.data?.data.forEach(element => {
      //   if(element?.transportRental?.image) element['transportRental']['image'] = JSON.parse(element['transportRental']['image'])
      //   if(element?.transportVehicle?.image) element['transportVehicle']['image'] = JSON.parse(element['transportVehicle']['image'])
      // });

      try {
        response?.data?.data?.data.forEach(element => {
          if (element?.transportRental?.image) element['transportRental']['image'] = JSON.parse(element['transportRental']['image'])
        });
      } catch (error) {
        response?.data?.data?.data.forEach(element => {
          if (element?.transportRental?.image) element['transportRental']['image'] = [element['transportRental']['image']]
        });
      }

      try {
        response?.data?.data?.data.forEach(element => {
          if (element?.transportVehicle?.image) element['transportVehicle']['image'] = JSON.parse(element['transportVehicle']['image'])
        });
      } catch (error) {
        response?.data?.data?.data.forEach(element => {
          if (element?.transportVehicle?.image) element['transportVehicle']['image'] = [element['transportVehicle']['image']]
        });
      }

      this.lastPage = response?.data?.data?.lastPage
      this.currentPage = response?.data?.data?.currentPage
      this.perPage = response?.data?.data?.perPage
      this.totalItem = response?.data?.data?.total
      this.data = response?.data?.data;
      this.records = response?.data?.data?.data;

      console.log('stores/lagia-stores/TransportPriceListStore 2', this.data, this.records, this.lastPage, this.currentPage, this.perPage, this.totalItem)

      if (response?.data?.additional?.image) response.data.additional['image'] = JSON.parse(response.data.additional['image'])
      if (response?.data?.additional?.transportRental?.image) response.data.additional['transportRental']['image'] = JSON.parse(response?.data?.additional?.transportRental?.image)
      // if (response?.data?.additional?.category) response.data.additional['category'] = JSON.parse(response.data.additional['category'])
      this.additional = response?.data?.additional
      console.log('additional', this.additional)
    },

    onPaginate: debounce(async function ({ currentPage, query }) {
      this.onFetch({ currentPage, query })
    }, 500),

    async onClearRegister() {

    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransportPriceListStore, import.meta.hot));
}
