import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useLodgeRoomListStore = defineStore('LodgeRoomListStore', {
  id: 'LodgeRoomListStore',

  state: () => ({
    slug: 'lodge-rooms',
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
  }),

  getters: {
    getRecords: state => state.records,
  },

  actions: {
    // WASAPDA debounce membuat data dari server tidak tampil / SSR gagal
    async onFetch ({ currentPage }) {

      if (this.loading) return false;

      this.loading = true;

      const response = await axios({
          url: '/trevolia-api/v1/entities/lodge-rooms',
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
            loading: false
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

      console.log('stores/lagia-stores/LodgeRoomListStore 1', response?.data)

      if (!response?.data) return this.loading = false

      this.init = true


      // response?.data?.data?.data.forEach(element => {
      //   if(element?.image) element['image'] = JSON.parse(element['image'])
      //   if(element?.category) element['category'] = JSON.parse(element['category'])
      // });

      try {
        response?.data?.data?.data.forEach(element => {
          if(element?.image) element['image'] = JSON.parse(element['image'])
        });
      } catch (error) {
        response?.data?.data?.data.forEach(element => {
          if(element?.image) element['image'] = [element['image']]
        });
      }

      // try {
      //   response?.data?.data?.data.forEach(element => {
      //     if(element?.category) element['category'] = JSON.parse(element['category'])
      //   });
      // } catch (error) {
      //   response?.data?.data?.data.forEach(element => {
      //     if(element?.category) element['category'] = [element['category']]
      //   });
      // }


      this.lastPage = response?.data?.data?.lastPage
      this.currentPage = response?.data?.data?.currentPage
      this.perPage = response?.data?.data?.perPage
      this.totalItem = response?.data?.data?.total
      this.data = response?.data?.data;
      this.records = response?.data?.data?.data;

      console.log('stores/lagia-stores/LodgeRoomListStore 2', this.data, this.records, this.lastPage, this.currentPage, this.perPage, this.totalItem)

    },

    onPaginate: debounce(async function ({ currentPage }) {
      this.onFetch({ currentPage })
    }, 500),

    async onClearRegister() {

    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLodgeRoomListStore, import.meta.hot));
}
