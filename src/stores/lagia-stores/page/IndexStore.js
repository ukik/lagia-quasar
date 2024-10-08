import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useIndexStore = defineStore('IndexStore', {
  id: 'IndexStore',

  state: () => ({
    dataType: {},
    record: {},
    isMaintenance: false,

    record_destination: null,
    record_gallery: null,
    record_testimonial: null,

    record_tour: null,
    record_tour_price: null,
    record_tour_price_total: null,

    record_culinary: null,
    record_souvenir: null,
    record_lodge: null,
    record_talent: null,
    record_transport: null,
    record_tourism: null,

    page_widget_call: null,
    page_widget_counter: null,
    page_widget_offer: null,
    page_widget_promo: null,
    page_widget_tron: null,

    tour_products_category: null,
    tour_products_city: null,
    tour_products_province: null,
    tour_products_durasi: null,
    tour_products_level: null,

    loading: false,
    init: false,
  }),

  getters: {
    getRecord: state => state.record,
  },

  actions: {
    async onFetch() {

      if (this.init) return false;
      if (this.loading) return false;

      this.loading = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/index',
        method: 'get',
        // params: {
        //   slug: 'index',
        //   id: id,
        // }
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err
        })

      this.loading = false

      if (!response?.data) return this.loading = false

      this.init = true

      // try {
      //   if (response?.data?.data['featuredImage']) response.data.data['featuredImage'] = JSON.parse(response?.data?.data['featuredImage'])
      // } catch (error) {
      //   if (response?.data?.data['featuredImage']) response.data.data['featuredImage'] = [response?.data?.data['featuredImage']]
      // }

      // try {
      //   if (response?.data?.data['image']) response.data.data['image'] = JSON.parse(response?.data?.data['image'])
      // } catch (error) {
      //   if (response?.data?.data['image']) response.data.data['image'] = [response?.data?.data['image']]
      // }

      let tour = response?.data?.data?.tour?.data
      if (tour) {
        try {
          tour.forEach(element => {
            if (element?.image) element['image'] = JSON.parse(element['image'])
          });
        } catch (error) {
          tour.forEach(element => {
            if (element?.image) element['image'] = [element['image']]
          });
        }
        this.record_tour = tour
      }


      let tour_price = response?.data?.data?.tourPrice?.data
      if (tour_price) {
        try {
          tour_price.forEach(element => {
            if (element?.tourProduct?.image) element['tourProduct']['image'] = JSON.parse(element['tourProduct']['image'])
          });
        } catch (error) {
          tour_price.forEach(element => {
            if (element?.tourProduct?.image) element['tourProduct']['image'] = [element['tourProduct']['image']]
          });
        }

        try {
          tour_price.forEach(element => {
            if (element?.tourStore?.image) element['tourStore']['image'] = JSON.parse(element['tourStore']['image'])
          });
        } catch (error) {
          tour_price.forEach(element => {
            if (element?.tourStore?.image) element['tourStore']['image'] = [element['tourStore']['image']]
          });
        }
        this.record_tour_price = tour_price
        this.record_tour_price_total = response?.data?.data?.tourPrice?.total
      }



      let culinary = response?.data?.data?.culinary?.data
      if (culinary) {
        try {
          culinary.forEach(element => {
            if (element?.image) element['image'] = JSON.parse(element['image'])
          });
        } catch (error) {
          culinary.forEach(element => {
            if (element?.image) element['image'] = [element['image']]
          });
        }
        this.record_culinary = culinary
      }

      let souvenir = response?.data?.data?.souvenir?.data
      if (souvenir) {
        try {
          souvenir.forEach(element => {
            if (element?.image) element['image'] = JSON.parse(element['image'])
          });
        } catch (error) {
          souvenir.forEach(element => {
            if (element?.image) element['image'] = [element['image']]
          });
        }
        this.record_souvenir = souvenir
      }

      let lodge = response?.data?.data?.lodge?.data
      if (lodge) {
        try {
          lodge.forEach(element => {
            if (element?.image) element['image'] = JSON.parse(element['image'])
          });
        } catch (error) {
          lodge.forEach(element => {
            if (element?.image) element['image'] = [element['image']]
          });
        }

        try {
          lodge.forEach(element => {
            if (element?.category) element['category'] = JSON.parse(element['category'])
          });
        } catch (error) {
          lodge.forEach(element => {
            if (element?.category) element['category'] = [element['category']]
          });
        }
        this.record_lodge = lodge
      }

      let talent = response?.data?.data?.talent?.data
      if (talent) {
        try {
          talent.forEach(element => {
            if (element?.image) element['image'] = JSON.parse(element['image'])
          });
        } catch (error) {
          talent.forEach(element => {
            if (element?.image) element['image'] = [element['image']]
          });
        }
        this.record_talent = talent
      }


      let transport = response?.data?.data?.transport?.data
      if (transport) {
        try {
          transport.forEach(element => {
            if (element?.image) element['image'] = JSON.parse(element['image'])
          });
        } catch (error) {
          transport.forEach(element => {
            if (element?.image) element['image'] = [element['image']]
          });
        }
        this.record_transport = transport
      }


      let tourism = response?.data?.data?.tourism?.data
      if (tourism) {
        try {
          tourism.forEach(element => {
            if (element?.image) element['image'] = JSON.parse(element['image'])
          });
        } catch (error) {
          tourism.forEach(element => {
            if (element?.image) element['image'] = [element['image']]
          });
        }
        try {
          tourism.forEach(element => {
            if (element?.category) element['category'] = JSON.parse(element['category'])
          });
        } catch (error) {
          tourism.forEach(element => {
            if (element?.category) element['category'] = [element['category']]
          });
        }
        this.record_tourism = tourism
      }





      let destination = response?.data?.data?.destination
      if (destination) {
        try {
          destination.forEach(element => {
            if (element?.image) element['image'] = JSON.parse(element['image'])
          });
        } catch (error) {
          destination.forEach(element => {
            if (element?.image) element['image'] = [element['image']]
          });
        }
        this.record_destination = destination
      }


      let gallery = response?.data?.data?.gallery
      if (gallery) {
        try {
          if (gallery?.image) gallery['image'] = JSON.parse(gallery['image'])
        } catch (error) {
          if (gallery?.image) gallery['image'] = [gallery['image']]
        }
        this.record_gallery = gallery
      }


      this.record_testimonial = response?.data?.data?.testimonial?.data


      this.page_widget_call = response?.data?.data?.pageWidgetCall?.data
      this.page_widget_counter = response?.data?.data?.pageWidgetCounter?.data
      this.page_widget_offer = response?.data?.data?.pageWidgetOffer?.data
      this.page_widget_promo = response?.data?.data?.pageWidgetPromo?.data
      this.page_widget_tron = response?.data?.data?.pageWidgetTron?.data

      this.tour_products_category = response?.data?.data?.tourProductsCategory?.data
      this.tour_products_city = response?.data?.data?.tourProductsCity?.data
      this.tour_products_province = response?.data?.data?.tourProductsProvince?.data
      this.tour_products_durasi = response?.data?.data?.tourProductsDurasi?.data

      let _tour_products_level = response?.data?.data?.tourProductsLevel?.data
      _tour_products_level.forEach(element => {
        element['level'] = Number(element?.level)
      });
      this.tour_products_level = _tour_products_level

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/IndexStore', this.page_widget_call, this.page_widget_counter, this.page_widget_offer, this.page_widget_promo, this.page_widget_tron)
      return this.record

    },
  }
});
