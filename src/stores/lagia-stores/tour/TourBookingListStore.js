import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

import { useTourCartSelectedStore } from "./TourCartSelectedStore"
import { storeToRefs } from "pinia";

// no need to import defineStore and acceptHMRUpdate
export const useTourBookingListStore = defineStore('TourBookingListStore', {
  id: 'TourBookingListStore',

  state: () => ({
    slug: 'tour-bookings',
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
    lastPage: 1,
    currentPage: 1,
    perPage: 25,  // perPage & rowPerPage itu sama

    isAvailable: '',
    venueId: '',

    loading: false,
    init: false,

    additional:'', // { customer, hotel_price_range }
  }),

  getters: {
    getRecords: state => state.records,
  },

  actions: {
    // WASAPDA debounce membuat data dari server tidak tampil / SSR gagal
    async onFetch ({ currentPage, query }) {

      if (this.loading) return false;

      this.loading = true;

      const response = await axios({
          url: '/trevolia-api/v1/entities/tour-bookings/lagia',
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

      console.log('stores/lagia-stores/TourBookingListStore 1', response?.data)

      if (!response?.data) return this.loading = false

      this.init = true

      try {
        response?.data?.data?.data.forEach(element => {
          if(element?.tourStore?.tourProduct?.image) element.tourStore.tourProduct['image'] = JSON.parse(element.tourStore?.tourProduct['image'])
          // if(element?.category) element['category'] = JSON.parse(element['category'])
        });
      } catch (error) {
        response?.data?.data?.data.forEach(element => {
          if(element?.tourStore?.tourProduct?.image) element.tourStore.tourProduct['image'] = [element.tourStore?.tourProduct['image']]
          // if(element?.category) element['category'] = [element['category']]
        });
      }

      this.lastPage = response?.data?.data?.lastPage
      this.currentPage = response?.data?.data?.currentPage
      this.perPage = response?.data?.data?.perPage
      this.totalItem = response?.data?.data?.total
      this.data = response?.data?.data;
      this.records = response?.data?.data?.data;

      console.log('stores/lagia-stores/TourBookingListStore 2', this.data, this.records, this.lastPage, this.currentPage, this.perPage, this.totalItem)

      console.log('TourBookingListStore', query)
      // ini auto SELECTED setelah FETCH
      // ini redirect dari AddToCart yang baru dilakukan user
      if(query?.selected_id) {
        const selectedStore = useTourCartSelectedStore()
        // const { selected } = storeToRefs(selectedStore)
        const { setSelected } = selectedStore
        this.records.forEach((element, index) => {
          if(element.id == query?.selected_id) setSelected([element])
        });
      }

      // if (response?.data?.additional?.image) response.data.additional['image'] = JSON.parse(response.data.additional['image'])
      // if (response?.data?.additional?.category) response.data.additional['category'] = JSON.parse(response.data.additional['category'])
      this.additional = response?.data?.additional
      console.log('additional', this.additional)
    },

    onPaginate: debounce(async function ({ currentPage, query }) {
      this.onFetch({ currentPage, query })
    }, 500),

    async onClearRegister() {

    },

    onRecordRemove(id, index = null) {
      this.records.forEach((el,i) => {
        if(el.id == id) {
          this.records.splice(i, 1);
          return
        }
      })

      return
      // gak usah pakai index dari qtable soalnya susah kalo ke children component
      this.records.splice(index, 1);

    }

  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTourCartListStore, import.meta.hot));
}
