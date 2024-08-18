import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'
import { useInitStore } from '../page/InitStore';

import currency from "src/utils/currency";


import caseConvert from 'src/utils/case-convert';
// get_price
// get_price_child
// get_discount
// get_cashback
// get_total_amount
// get_total_amount_child
// quantity
// get_final_amount
// stock
// min_participant
// date_start
// participant_adult
// participant_young
// hotel

function finalPrice(item) {
  // console.log('getTotalAmount', { general, discount, cashback })
  const general = item?.getPrice
  const discount = item?.getDiscount
  const cashback = item?.getCashback

  const total = (Number(general) - ((Number(general) * Number(discount) / 100)) - Number(cashback))
  // console.log('getTotalAmount', total)
  return total <= 0 ? 0 : total;

}

function finalPriceAnak(item) {
  // console.log('getTotalAmount', { general, discount, cashback })
  const general = item?.getPriceChild
  const discount = item?.getDiscount
  const cashback = item?.getCashback

  const total = (Number(general) - ((Number(general) * Number(discount) / 100)) - Number(cashback))
  // console.log('getTotalAmount', total)
  return total <= 0 ? 0 : total;

}


// no need to import defineStore and acceptHMRUpdate
export const useTourBookingDetailStore = defineStore('TourBookingDetailStore', {
  id: 'TourBookingDetailStore',

  state: () => ({
    dataType: {},
    record: {},
    isMaintenance: false,

    loading: false,
    loading_store: false,
  }),

  getters: {
    getRecord: state => state.record,
    getBookingItem: state => state.record?.tourBookingItem,
    // getSelectedTourPrice: state => {
    //   if (state.selected.length > 0) return state.record.tourBookingItem
    //   return []
    // },
    getInvoice: state => {
      if(!state.record?.tourBookingItem) return []
      const tourBookingItem = state.record?.tourBookingItem
      return [
        {
          key:'get_price',
          label: "HPP Dewasa",
          value: currency(tourBookingItem?.getPrice),
        },
        {
          key:'get_price_child',
          label: "HPP Anak (2-6 tahun)",
          value: currency(tourBookingItem?.getPriceChild),
        },
        {
          key:'get_discount',
          label: "Diskon",
          value: tourBookingItem?.getDiscount+'%',
        },
        {
          key:'get_cashback',
          label: "Cashback",
          value: currency(tourBookingItem?.getCashback),
        },
        {
          key:'quantity',
          label: "Kuantitas",
          value: tourBookingItem?.quantity + ' Paket Tour',
        },
        {
          key:'get_total_amount',
          label: "Sub Total HPP Dewasa",
          value: currency(tourBookingItem?.getTotalAmount),
        },
        {
          key:'get_total_amount_child',
          label: "Sub Total HPP Anak (2-6 tahun)",
          value: currency(tourBookingItem?.getTotalAmountChild),
        },
        // {
        //   key:'get_final_amount',
        //   label: "Sub Total Biaya (diluar hotel)",
        //   value: currency(tourBookingItem?.getFinalAmount),
        // },
        // {
        //   key:'stock',
        //   label: "",
        //   value: tourBookingItem?.stock,
        // },
        // {
        //   key:'min_participant',
        //   label: "Min Peserta Dewas",
        //   value: tourBookingItem?.minParticipant,
        // },
        // {
        //   key:'',
        //   label: "",
        //   value: tourBookingItem?.dateStart,
        // },
        // {
        //   key:'',
        //   label: "",
        //   value: tourBookingItem?.participantAdult,
        // },
        // {
        //   key:'',
        //   label: "",
        //   value: tourBookingItem?.participantYoung,
        // },
        // {
        //   key:'',
        //   label: "",
        //   value: tourBookingItem?.hotel,
        // },
      ];
    },
    subTotalAnak: state => {
      if (!state.record?.tourBookingItem) return 0
      return finalPriceAnak(state.record.tourBookingItem);
      return Number(state.record.tourBookingItem?.participanYoung) * finalPriceAnak(state.record.tourBookingItem);
    },
    subTotalDewasa: state => {
      if (!state.record?.tourBookingItem) return 0
      return Number(state.record.tourBookingItem?.participantAdult) * finalPrice(state.record.tourBookingItem);
    },
    // calculate: state => {
    //   if (!state.selected) return;
    //   let total = 0;
    //   for (let i = 0; i < state.selected.length; i++) {
    //     total += Number(state.selected[i]["price"] * state.selected[i]["quantity"]);
    //   }
    //   return {
    //     total: total,
    //     coupon: state.coupon,
    //     vat: state.vat,
    //     grand: Number(total - state.vat - state.coupon),
    //   };
    // },
    getHotelPrice: state => {
      const store = useInitStore()
      const { page_hotel_level_price } = (store)
      if (page_hotel_level_price && state.record?.tourBookingItem?.hotel) {
        let temp = {};
        for (let i = 0; i < page_hotel_level_price.length; i++) {
          try {
            if (state.record?.tourBookingItem?.hotel.toLowerCase() === page_hotel_level_price[i]["label"].toLowerCase()) {
              temp = page_hotel_level_price[i];
            }
          } catch (e) {}
        }
        return temp;
      }
    },


  },
  actions: {
    async onFetch(id) {

      if (this.loading_store) return false;

      this.loading_store = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/tour-bookings/read',
        method: 'get',
        params: {
          slug: 'tour-bookings',
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
        if (response?.data?.data?.tourStore?.tourProduct?.image) response.data.data.tourStore.tourProduct['image'] = JSON.parse(response?.data?.data.tourStore.tourProduct['image'])
      } catch (error) {

        if (response?.data?.data?.tourStore?.tourProduct?.image) response.data.data.tourStore.tourProduct['image'] = [response?.data?.data.tourStore.tourProduct['image']]

      }


      try {
        if (response?.data?.data?.tourStore?.image) response.data.data.tourStore['image'] = JSON.parse(response?.data?.data?.tourStore['image'])
      } catch (error) {

        if (response?.data?.data?.tourStore?.image) response.data.data.tourStore['image'] = [response?.data?.data?.tourStore['image']]

      }


      this.record = response?.data?.data;

      console.log('stores/lagia-stores/TourBookingDetailStore', this.record)
      return this.record

    },
  }
});
