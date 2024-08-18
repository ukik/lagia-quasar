import { defineStore } from 'pinia';
import { storeToRefs } from "pinia";

import axios from 'axios'

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

import { useAuthStore } from '../auth/AuthStore';

import { useInitStore } from '../page/InitStore';

import { useTourCartListStore } from './TourCartListStore';


function finalPrice(item) {
  // console.log('getTotalAmount', { general, discount, cashback })
  const general = item?.generalPrice
  const discount = item?.discountPrice
  const cashback = item?.cashbackPrice

  const total = (Number(general) - ((Number(general) * Number(discount) / 100)) - Number(cashback))
  // console.log('getTotalAmount', total)
  return total <= 0 ? 0 : total;

}

function finalPriceAnak(item) {
  // console.log('getTotalAmount', { general, discount, cashback })
  const general = item?.generalPriceChild
  const discount = item?.discountPrice
  const cashback = item?.cashbackPrice

  const total = (Number(general) - ((Number(general) * Number(discount) / 100)) - Number(cashback))
  // console.log('getTotalAmount', total)
  return total <= 0 ? 0 : total;

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

    date_start: null,
    participant_adult: null,
    participant_young: 0,
    description: null,
    hotel: 'Pilih Hotel',

    date_checkin: [], // HOTEL only

    loading: false,
  }),

  getters: {
    getSelectedTourPrice: state => {
      if (state.selected.length > 0) return state.selected[0]?.tourPrice
      return []
    },
    subTotalAnak: state => {
      if (state.selected.length <= 0) return 0
      return state.participant_young * finalPriceAnak(state.selected[0]?.tourPrice);
    },
    subTotalDewasa: state => {
      if (state.selected.length <= 0) return 0
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
    getHotelPrice: state => {
      const store = useInitStore()
      const { page_hotel_level_price } = (store)
      if (page_hotel_level_price && state.hotel !== 'Pilih Hotel') {
        let temp = {};
        for (let i = 0; i < page_hotel_level_price.length; i++) {
          try {
            if (state.hotel.toLowerCase() === page_hotel_level_price[i]["label"].toLowerCase()) {
              temp = page_hotel_level_price[i];
            }
          } catch (e) {}
        }
        return temp;
      }
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
    async onRemove(selected = []) {

      const ids = selected.map((item) => item);
      // const ids = selected.map((item) => item.id);

      // const formData = new FormData();
      // formData.append('price_id', price_id);

      const resp = await axios({
        url: '/trevolia-api/v1/entities/tour-carts/delete',
        method: 'delete',
        // data: formData,
        data: {
          slug: 'tour-carts',
          data: [
            {
              field: "id",
              value: ids.join(","),
            },
          ],
        }
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
          // return response
        })
        .catch((err) => {
          // console.log('AddToCartStore error', err?.response)
          if (err?.response?.status == 401) {
            Notify.create({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              caption: 'data gagal dihapus',
              icon: 'report_problem'
            })

          } else {
            Notify.create({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              caption: 'data gagal dihapus',
              // caption: err?.data?.meta?.message[0],
              icon: 'report_problem'
            })

          }
          return false //err?.response
        })

      return resp
    },
    async onAddToBook({ payload }) {

      const price_id = this.selected[0]?.id;

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

      // formData.append('price_id', price_id);
      // formData.append('date_start', this.date_start);
      // formData.append('participant_adult', this.participant_adult);
      // formData.append('participant_young', !this.participant_young ? 0 : this.participant_young);
      // formData.append('hotel', this.hotel);
      // formData.append('customer_id', user_id);


      this.selected[0]['date_start'] = this.date_start
      this.selected[0]['participant_adult'] = this.participant_adult
      this.selected[0]['participant_young'] = this.participant_young
      this.selected[0]['description'] = this.description
      this.selected[0]['hotel'] = this.hotel
      this.selected[0]['date_checkin'] = this.date_checkin

      formData.append('payload', JSON.stringify(this.selected));
      formData.append('description', this.description);
      formData.append('min_participant', this.min_participant);

      // const auth = useAuthStore()
      // const { getAuth } = auth
      // const user_id = getAuth?.data?.user?.id

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
          // return true
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


      console.log('AddToBook', resp?.data?.additional)
      if(!resp) return

      const { onRecordRemove } = useTourCartListStore()
      onRecordRemove(price_id)
      this.onSelectedRemove(price_id);
      this.router.push({
        name: "/tour/booking-detail",
        params: {
          id: resp?.data?.additional?.id,
        }
      })

      return resp
    },

    // async onAddToCart({ price_id, slug }) {

    //   console.log('onAddToCart', price_id, slug)

    //   if (this.loading) return false;

    //   this.loading = true;

    //   Loading.show()

    //   const formData = new FormData();

    //   formData.append('price_id', price_id);

    //   formData.append('date_start', this.date_start);
    //   formData.append('participant_adult', this.participant_adult);
    //   formData.append('participant_young', !this.participant_young ? 0 : this.participant_young);
    //   formData.append('hotel', this.hotel);

    //   const auth = useAuthStore()
    //   const { getAuth } = auth
    //   const user_id = getAuth?.data?.user?.id

    //   formData.append('customer_id', user_id);

    //   // console.log('formData', this.form_login)

    //   const resp = await axios({
    //     url: `/api/typehead/${slug}/add_to_cart`,
    //     method: 'post',
    //     data: formData,
    //   })
    //     .then((response) => {
    //       // console.log('fetchCSRF AXIOS', response.headers['Set-Cookie'], JSON.parse(JSON.stringify(response.headers)))
    //       Notify.create({
    //         color: 'positive',
    //         position: 'top',
    //         message: 'Loading success',
    //         caption: 'data berhasil diproses',
    //         icon: 'done'
    //       })
    //       return true
    //       return response
    //     })
    //     .catch((err) => {
    //       console.log('TourCartSelectedStore error', err?.response)
    //       if (err?.response?.status == 401) {
    //         Notify.create({
    //           color: 'negative',
    //           position: 'top',
    //           message: 'Loading failed',
    //           caption: 'harus login',
    //           icon: 'report_problem'
    //         })

    //       } else {
    //         Notify.create({
    //           color: 'negative',
    //           position: 'top',
    //           message: 'Loading failed',
    //           // caption: err?.data?.meta?.message[0],
    //           icon: 'report_problem'
    //         })

    //       }
    //       return err?.response
    //     })

    //   this.loading = false
    //   Loading.hide()


    //   if (resp) this.onReset()

    //   return resp
    // },
    setSelected(val) {
      this.selected = val
      console.log('setSelected', val)
    },
    onReset() {
      // this.prompt = false
      // this.quantity = 1
      this.date_start = null
      // this.participant_adult = 1
      this.participant_young = 0
      this.description = null
      this.hotel = 'Pilih Hotel'

      this.date_checkin = []

      this.loading = false
    },

    onSelectedRemove(id) {
      if (this.selected[0]?.id == id) {
        this.onResetStateA()
      }
    },

    onResetStateA() {
      this.selected = []
      this.vat = 0
      this.coupon = 0
      this.item = {
        total: 0,
        coupon: 0,
        vat: null,
        grand: 0, //Number(total - this.vat - this.coupon),
      },

      // filter: "",

      this.min_participant = null

      this.date_start = null
      this.participant_adult = null
      this.participant_young = 0
      this.description = null
      this.hotel = 'Pilih Hotel'
      this.date_checkin = []
    }

  }
});
