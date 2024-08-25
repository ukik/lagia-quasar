import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, Loading, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useTourOrderDetailStore = defineStore('TourOrderDetailStore', {
  id: 'TourOrderDetailStore',

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
    dibayar_nominal: null,

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
    getFormCheck: state => {
      if(!state.date_start) return false
      if(!state.participant_adult) return false
      // if(!state.participant_young) return false
      // if(!state.description) return false
      if(!state.hotel || state.hotel == 'Pilih Hotel') return false
      if(!state.dibayar) return false
      // if(!state.dibayar_nominal) return false

      if(!state.name) return false
      if(!state.email) return false
      if(!state.phone) return false
      // if(!state.instance) return false
      if(!state.city) return false
      if(!state.address) return false
      return true
    },


  },

  actions: {
    onReset() {
      this.date_start = null
      // this.participant_adult = 1
      this.participant_young = null
      this.description = null
      this.hotel = 'Pilih Hotel'

      this.loading = false
    },
    async onFetch(id) {

      if (this.loading_store) return false;

      this.loading_store = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/tour-products/read',
        method: 'get',
        params: {
          slug: 'tour-products',
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


      this.record = response?.data?.data;

      console.log('stores/lagia-stores/TourOrderDetailStore', this.record)
      return this.record

    },
    onNotify(message) {
      Notify.create({
        color: "negative",
        message: message,
        position: "top",
      })
    },
    onCheckoutVerify() {
      if(!this.date_start) {
        this.onNotify('Tanggal Berangkat (wajib)')
        return false
      }
      if(!this.participant_adult) {
        this.onNotify('Peserta (wajib)')
        return false
      }
      // if(!state.participant_young) return false
      // if(!state.description) return false
      if(!this.hotel || this.hotel == 'Pilih Hotel') {
        this.onNotify('Hotel (wajib)')
        return false
      }
      if(!this.dibayar) {
        this.onNotify('Pilih Nominal Dibayar (wajib)')
        return false
      }
      // if(!this.dibayar_nominal) {
      //   this.onNotify('Pilih Nominal Dibayar (wajib)')
      //   return false
      // }

      if(!this.name) {
        this.onNotify('Nama Lengkap (wajib)')
        return false
      }
      if(!this.email) {
        this.onNotify('Email (wajib)')
        return false
      }
      if(!this.phone) {
        this.onNotify('Telepon (wajib)')
        return false
      }
      // if(!state.instance) return false
      if(!this.city) {
        this.onNotify('Kota Asal (wajib)')
        return false
      }
      if(!this.address) {
        this.onNotify('Alamat (wajib)')
        return false
      }
      return true
    },
    async onCheckout() {

      console.log('onCheckout', this.getFormCheck)

      if(!this.getFormCheck) return false;

      if (this.loading) return false;

      this.loading = true;

      Loading.show()

      // const accessToken = Cookies.get("accessTokent");
      // const csrf = Cookies.get("XSRF-TOKEN");

      const formData = new FormData();
      // for (const slug in this.form_login) {
      //   const value = JSON.parse(JSON.stringify(this.form_login[slug]))
      //   console.log(slug, value)
      //   formData.append(slug, value);
      // }

      formData.append('price_id', this.record?.tourPrice?.id);

      formData.append('date_start', this.date_start);
      formData.append('participant_adult', this.participant_adult);
      formData.append('participant_young', !this.participant_young ? 0 : this.participant_young);
      formData.append('description', this.description);
      formData.append('hotel', this.hotel);
      formData.append('dibayar', this.dibayar);
      formData.append('dibayar_nominal', this.dibayar_nominal);

      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('phone', this.phone);
      formData.append('instance', this.instance);
      formData.append('city', this.city);
      formData.append('address', this.address);

      formData.append('payload', JSON.stringify([ { id: this.record.id, priceId: this.record.tourPrice.id } ]))

      const resp = await axios({
        url: `/trevolia-api/v1/entities/tour-bookings/lagia/add`,
        method: 'post',
        data: formData,
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
          if(response.data.data)  return true
          return false
          return response
        })
        .catch((err) => {
          console.log('AddToCartStore error', err?.response)
          if(err?.response?.status == 401) {
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
          return err?.response
        })

      this.loading = false
      Loading.hide()


      if(resp) this.onReset()

      return resp


      // if (!resp?.data) return this.loading = false

      // resp.data.data['roles'] = JSON.parse(resp?.data?.data['roles'])

      // this.auth = resp?.data
      // console.log('stores/lagia-stores/auth/AuthStore/onInit', this.auth)

    },
  }
});
