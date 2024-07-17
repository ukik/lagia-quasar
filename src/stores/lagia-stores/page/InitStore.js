import { defineStore } from 'pinia';

import axios from 'axios'

import { Notify, debounce } from 'quasar'

import caseConvert from 'src/utils/case-convert';

// no need to import defineStore and acceptHMRUpdate
export const useInitStore = defineStore('InitStore', {
  id: 'InitStore',

  state: () => ({
    dataType: {},
    record: {},
    isMaintenance: false,

    footer_transport: null,
    footer_about: null,
    footer_contact: null,
    footer_gallery: null,
    footer_info: null,

    page_widget_call: null,
    page_widget_counter: null,
    page_widget_offer: null,
    page_widget_promo: null,
    page_widget_tron: null,

    loading: false,

    init: false,
  }),

  getters: {
    getFooterContact: state => state.footer_contact,
    getRecord: state => state.record,
    getInfoPrivasi: state => {
      let temp = null
      state.footer_info?.forEach(element => {
        if(element['type'] === 'kebijakan-privasi') {
          temp = element
        }
      });
      return temp
    },
    getInfoSyarat: state => {
      let temp = null
      state.footer_info?.forEach(element => {
        if(element['type'] === 'syarat-ketentuan') {
          temp = element
        }
      });
      return temp
    }
  },

  actions: {
    async onFetch() {

      if(this.init) return false
      if (this.loading) return false;

      this.loading = true;

      const response = await axios({
        url: '/trevolia-api/v1/entities/init',
        method: 'get',
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

      let transport = response?.data?.data?.footerTransport?.data
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
        this.footer_transport = transport
      }

      let gallery = response?.data?.data?.footerGallery
      if (gallery) {
        try {
          if (gallery?.image) gallery['image'] = JSON.parse(gallery['image'])
        } catch (error) {
          if (gallery?.image) gallery['image'] = [gallery['image']]
        }
        this.footer_gallery = gallery
      }

      this.footer_about = response?.data?.data?.footerAbout
      this.footer_contact = response?.data?.data?.footerContact
      this.footer_info = response?.data?.data?.footerInfo


      this.page_widget_call = response?.data?.data?.pageWidgetCall
      this.page_widget_counter = response?.data?.data?.pageWidgetCounter
      this.page_widget_offer = response?.data?.data?.pageWidgetOffer
      this.page_widget_promo = response?.data?.data?.pageWidgetPromo?.data
      this.page_widget_tron = response?.data?.data?.pageWidgetTron?.data

      this.record = response?.data?.data;

      console.log('stores/lagia-stores/InitStore', this.page_widget_call, this.page_widget_counter, this.page_widget_offer, this.page_widget_promo, this.page_widget_tron)
      return this.record

    },
  }
});
