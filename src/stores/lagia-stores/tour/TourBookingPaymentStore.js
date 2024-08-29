import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce, Loading } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useTourBookingPaymentStore = defineStore('TourBookingPaymentStore', {
  id: 'TourBookingPaymentStore',

  state: () => ({
    dataType: {},
    record: {},
    isMaintenance: false,

    date_start: null,
    participant_adult: null,
    participant_young: null,
    description: null,
    hotel: 'Pilih Hotel',
    dibayar: null,
    dibayar_percent: null,

    room_qty: null,
    room_budget: null,

    name: null,
    email: null,
    phone: null,
    instance: null,
    city: null,
    address: null,

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
        url: '/trevolia-api/v1/entities/tour-booking-payments/read',
        method: 'get',
        params: {
          slug: 'tour-booking-payments',
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
        if (response?.data?.data?.image) response.data.data['image'] = JSON.parse(response?.data?.data['image'])
      } catch (error) {

        if (response?.data?.data?.image) response.data.data['image'] = [response?.data?.data['image']]

      }


      try {
        if (response?.data?.data?.tourStore?.image) response.data.data.tourStore['image'] = JSON.parse(response?.data?.data?.tourStore['image'])
      } catch (error) {

        if (response?.data?.data?.tourStore?.image) response.data.data.tourStore['image'] = [response?.data?.data?.tourStore['image']]

      }

      try {
        if (response?.data?.data?.tourProduct?.image) response.data.data.tourProduct['image'] = JSON.parse(response?.data?.data?.tourProduct['image'])
      } catch (error) {

        if (response?.data?.data?.tourProduct?.image) response.data.data.tourProduct['image'] = [response?.data?.data?.tourProduct['image']]

      }

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/TourBookingPaymentStore', this.record)
      return this.record

    },

    async onUpdate(payload) {

      if (this.loading) return false;

      this.loading = true;

      Loading.show()

      const formData = new FormData();
      // for (const slug in payload) {
      //   // const value = JSON.parse(JSON.stringify(this.form_login[slug]))
      //   console.log(slug, value)
      //   formData.append(slug, value);
      // }

      // for (const key in payload) {
      //   if (Object.prototype.hasOwnProperty.call(payload, key)) {
      //     const element = payload[key];
      //     formData.append(key, element);
      //   }
      // }

      // formData.append('getContent', JSON.stringify(payload))

      const response = await axios({
        url: `/api/payment_notifikasi/payment_notification`,
        method: 'post',
        data: payload,
      })
        .then((response) => {
          // console.log('fetchCSRF AXIOS', response.headers['Set-Cookie'], JSON.parse(JSON.stringify(response.headers)))
          Notify.create({
            color: 'positive',
            position: 'top',
            message: 'Loading success',
            caption: 'data berhasil diproses',
            icon: 'done'
          })
          // if (response.data.data) return true
          // return false
          return response
        })
        .catch((err) => {
          console.log('TourBookingPaymentStore error', err?.response)
          if (err?.response?.status == 401) {
            Notify.create({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              caption: 'harus login',
              icon: 'report_problem'
            })

          } else {
            Notify.create({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              // caption: err?.data?.meta?.message[0],
              icon: 'report_problem'
            })

          }
          return false
        })

      this.loading = false

      Loading.hide()

      if (!response?.data) return false

      try {
        if (response?.data?.data?.image) response.data.data['image'] = JSON.parse(response?.data?.data['image'])
      } catch (error) {

        if (response?.data?.data?.image) response.data.data['image'] = [response?.data?.data['image']]

      }


      try {
        if (response?.data?.data?.tourStore?.image) response.data.data.tourStore['image'] = JSON.parse(response?.data?.data?.tourStore['image'])
      } catch (error) {

        if (response?.data?.data?.tourStore?.image) response.data.data.tourStore['image'] = [response?.data?.data?.tourStore['image']]

      }

      try {
        if (response?.data?.data?.tourProduct?.image) response.data.data.tourProduct['image'] = JSON.parse(response?.data?.data?.tourProduct['image'])
      } catch (error) {

        if (response?.data?.data?.tourProduct?.image) response.data.data.tourProduct['image'] = [response?.data?.data?.tourProduct['image']]

      }

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/TourBookingPaymentStore', this.record)
      return this.record

      return false
      if (!resp.data?.data) return false
      if (!resp) return false

      resp.data.data.forEach(element => {
        console.log('GOTO PURCHASE PAGE', element)
        this.router.push({
          name: "/tour/payment-detail",
          params: {
            slug: element?.orderId,
          }
        })
      });

      return true;

    },
  }
});
