import { defineStore } from 'pinia';

// import domains from 'src/settings/domains'
// import { api } from 'src/settings/axios'

// const { apiDomain } = domains()

import axios from 'axios'

import { Notify, Cookies } from 'quasar'

// const _id = Math.round(Math.random() * 100000000000000)

// no need to import defineStore and acceptHMRUpdate
export const useTravelReservationStore = defineStore('TravelReservationStore', {
  id: 'TravelReservationStore',

  state: () => ({
    form: {
      id:'',
      uuid:'',
      customer_id:'',
      prices_public_id:'',
      name_passanger:'',
      ktp_passanger:'',
      birth_date:'',
      category:'Category',
      seat_no:'',
      min_budget:'',
      max_budget:'',
      ticket_status:'Ticket Status',
      description:'',
      starting_date:'',
      starting_time:'',
      starting_location:'',
      arrival_location:'',
      starting_terminal:'',
      arrival_terminal:'',
      is_reserved:'',
      code_table:'',
      created_at:'',
      updated_at:'',
      deleted_at:'',
    },
    loading: false,
  }),

  getters: {
    getForm: state => state.form,
    getLoading: state => state.loading,
  },

  actions: {
    async onRequestReservation() {

      if (this.loading) return false;

      this.loading = true;

      const formData = new FormData();
      for (const key in this) {
        const value = JSON.parse(JSON.stringify(this[key]))
        console.log(key, value)
        formData.append(key, value);
      }

      console.log('formData', this)

      const resp = await axios({
        url: '/trevolia-api/v1/auth/login',
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
        return response
      })
      .catch((err) => {
        Notify.create({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          caption: err?.data?.meta?.message[0],
          icon: 'report_problem'
        })
      })

      this.loading = false
      console.log('onLogin', resp)

      if (!resp?.data) return this.loading = false

      this.form = resp?.data

    },

    async onClearReservationForm() {
      this.form = {
        id:'',
        uuid:'',
        customer_id:'',
        prices_public_id:'',
        name_passanger:'',
        ktp_passanger:'',
        birth_date:'',
        category:'Category',
        seat_no:'',
        min_budget:'',
        max_budget:'',
        ticket_status:'Ticket Status',
        description:'',
        starting_date:'',
        starting_time:'',
        starting_location:'',
        arrival_location:'',
        starting_terminal:'',
        arrival_terminal:'',
        is_reserved:'',
        code_table:'',
        created_at:'',
        updated_at:'',
        deleted_at:'',
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTravelReservationStore, import.meta.hot));
}

