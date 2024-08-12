import { defineStore } from 'pinia';
import { storeToRefs } from "pinia";

import axios from 'axios'

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { useAuthStore } from '../auth/AuthStore';

function finalPrice(item) {
  // console.log('getTotalAmount', { general, discount, cashback })
  const general = item?.generalPrice
  const discount = item?.discountPrice
  const cashback = item?.cashbackPrice

  const total = (Number(general) - ((Number(general) * Number(discount) / 100)) - Number(cashback))
  // console.log('getTotalAmount', total)
  return total;
}

// no need to import defineStore and acceptHMRUpdate
export const useAddToBookStore = defineStore('AddToBookStore', {
  id: 'AddToBookStore',

  state: () => ({
    prompt: false,
    quantity: 1,
    date_start: null,
    participant_adult: null,
    participant_young: null,
    description: null,
    hotel: 'Pilih Hotel',

    date_checkin: [],

    loading: false,
  }),

  getters: {
    // getRecord: state => state.record,
  },
  actions: {


    async onAddToBook({ price_id }) {

      console.log('AddToBook', price_id)

      if (this.loading) return false;

      this.loading = true;

      Loading.show()

      const formData = new FormData();
      // for (const slug in this.form_login) {
      //   const value = JSON.parse(JSON.stringify(this.form_login[slug]))
      //   console.log(slug, value)
      //   formData.append(slug, value);
      // }

      formData.append('price_id', price_id);

      formData.append('date_start', this.date_start);
      formData.append('participant_adult', this.participant_adult);
      formData.append('participant_young', !this.participant_young ? 0 : this.participant_young);
      formData.append('hotel', this.hotel);

      const auth = useAuthStore()
      const { getAuth } = auth
      const user_id = getAuth?.data?.user?.id

      formData.append('customer_id', user_id);

      // console.log('formData', this.form_login)

      const resp = await axios({
        url: `/trevolia-api/v1/entities/tour-carts/add`,
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
          return true
          return response
        })
        .catch((err) => {
          console.log('AddToBookStore error', err?.response)
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

    onReset() {
        this.prompt = false
        this.quantity = 1
        this.date_start = null
        // this.participant_adult = 1
        this.participant_young = null
        this.description = null
        this.hotel = 'Pilih Hotel'

        this.date_checkin = []

        this.loading = false
    }

  }
});
