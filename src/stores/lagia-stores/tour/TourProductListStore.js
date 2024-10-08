import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useTourProductListStore = defineStore('TourProductListStore', {
  id: 'TourProductListStore',

  state: () => ({
    slug: 'tour-products',
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
    perPage: 24,  // perPage & rowPerPage itu sama
    to: 0,

    isAvailable: '',
    venueId: '',

    loading: false,
    init: false,

    additional: {
      // provinceOptions:[],
      // cityOptions:[],
      // countryOptions:[],
    },


    // FILTER
    name:'',
    category:'',
    durasi:'',
    level:'',
    province:'',
    city:'',
    country :'',
    price_min: '',
    price_max: '',


    is_loadmore: false,
  }),

  getters: {
    getRecords: state => state.records,
  },

  actions: {
    setQuery(key,val) {
      this[key] = val
    },


    // WASAPDA debounce membuat data dari server tidak tampil / SSR gagal
    async onFetch ({ currentPage, query }) {

      console.log("this.loading", this.loading, this.is_loadmore)

      if (this.loading) return false;

      this.loading = true;

      const response = await axios({
          url: '/trevolia-api/v1/entities/tour-products/lagia',
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

      console.log('stores/lagia-stores/TourProductListStore 1', response?.data)

      if (!response?.data) return this.loading = false

      this.init = true

      try {
        response?.data?.data?.data.forEach(element => {
          if(element?.image) element['image'] = JSON.parse(element['image'])
          // if(element?.category) element['category'] = JSON.parse(element['category'])
        });
      } catch (error) {
        response?.data?.data?.data.forEach(element => {
          if(element?.image) element['image'] = [element['image']]
          // if(element?.category) element['category'] = [element['category']]
        });
      }

      this.lastPage = response?.data?.data?.lastPage
      this.currentPage = response?.data?.data?.currentPage
      this.perPage = response?.data?.data?.perPage
      this.to = response?.data?.data?.to
      this.totalItem = response?.data?.data?.total

      // this.data = response?.data?.data;

      if(this.is_loadmore) {
        let arr = [
          ...this.records,
          ...response?.data?.data?.data
        ]
        this.records = arr
      } else {
        this.records = response?.data?.data?.data;
      }
      this.is_loadmore = false

      console.log('stores/lagia-stores/TourProductListStore 2', this.data, this.records, this.lastPage, this.currentPage, this.perPage, this.totalItem)

      if (response?.data?.additional?.image) response.data.additional['image'] = JSON.parse(response.data.additional['image'])
      // if (response?.data?.additional?.category) response.data.additional['category'] = JSON.parse(response.data.additional['category'])
      this.additional = response?.data?.additional

      console.log('additional', this.additional)
    },

    onPaginate: debounce(async function ({ currentPage, query }) {
      this.onFetch({ currentPage, query })
    }, 0),

    async onClearRegister() {

    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTourProductListStore, import.meta.hot));
}
