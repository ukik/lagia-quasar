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

function finalPriceAnak(item) {
  // console.log('getTotalAmount', { general, discount, cashback })
  const general = item?.generalPriceChild
  const discount = item?.discountPrice
  const cashback = item?.cashbackPrice

  const total = (Number(general) - ((Number(general) * Number(discount) / 100)) - Number(cashback))
  // console.log('getTotalAmount', total)
  return total;
}

// no need to import defineStore and acceptHMRUpdate
export const useTourCartSelectedStore = defineStore('TourCartSelectedStore', {
  id: 'TourCartSelectedStore',

  state: () => ({
    selected: [],
    vat: 5555,
    coupon: 0,
    item: {
      total: 0,
      coupon: 0,
      vat: null,
      grand: 0, //Number(total - this.vat - this.coupon),
    },

    filter: "",


    min_participant: null, // ref tour_prices


    // prompt: false,
    // quantity: 1,


    date_start: null,
    participant_adult: null,
    participant_young: null,
    description: null,
    hotel: 'Pilih Hotel',

    date_checkin: [],

    loading: false,
  }),

  getters: {
    getSelectedTourPrice: state => {
      if(state.selected.length > 0) return state.selected[0]?.tourPrice
      return []
    },
    subTotalAnak: state => {
      if(state.selected.length <= 0) return 111111
      return state.participant_young * finalPriceAnak(state.selected[0]?.tourPrice);
    },
    subTotalDewasa: state => {
      if(state.selected.length <= 0) return 22222
      return state.participant_adult * finalPrice(state.selected[0]?.tourPrice);
    },
    calculate: state => {
      if (!state.selected) return;
      let total = 0;
      for (let i = 0; i < state.selected.length; i++) {
        total += Number(state.selected[i]["price"] * state.selected[i]["quantity"]);
      }
      return {
        total: total,
        coupon: state.coupon,
        vat: state.vat,
        grand: Number(total - state.vat - state.coupon),
      };
    },
  },
  actions: {
    calculateSingle() {
      if (!this.selected) return;
      console.log("this.selected", this.selected[0]);

      const total =
        this.$finalPrice(this.selected[0]?.tourPrice) +
        this.$finalPriceAnak(this.selected[0]?.tourPrice);

      const grand = Number(total) - Number(this.coupon);

      this.item = {
        total: this.$currency(total),
        coupon: this.coupon,
        vat: this.vat,
        grand: this.$currency(grand), //Number(total - this.vat - this.coupon),
      };
    },











    onOpen() {
      this.prompt = true
    },
    // onAdd() {
    //   if(this.quantity >= 999) {
    //     this.quantity = 999
    //     return
    //   }
    //   this.quantity = Number(this.quantity) + 1
    // },
    // onRemove() {
    //   if(this.quantity <= 1) {
    //     this.quantity = 1
    //     return
    //   }
    //   this.quantity = Number(this.quantity) - 1
    // },

    async onAddToCart({ price_id, slug }) {

      console.log('onAddToCart', price_id, slug)

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

      formData.append('price_id', price_id);

      // if(slug == 'lodge') {
      //   formData.append('quantity', this.date_checkin.length);

      //   console.log('date_checkin',this.date_checkin)

      //   let temp = [];
      //   this.date_checkin.forEach((element, index) => {
      //     temp.push({"id":element,"date":element})
      //   });
      //   formData.append('date_checkin', JSON.stringify(temp));

      // } else {
      //   formData.append('quantity', this.quantity);
      // }

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
        url: `/api/typehead/${slug}/add_to_cart`,
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
          console.log('TourCartSelectedStore error', err?.response)
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
    setSelected(val) {
      this.selected = val
      console.log('setSelected', val)
    },
    onReset() {
        // this.prompt = false
        // this.quantity = 1
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
