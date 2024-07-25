import { defineStore } from 'pinia';

import axios from 'axios'

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

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
export const useAddToCartStore = defineStore('AddToCartStore', {
  id: 'AddToCartStore',

  state: () => ({
    prompt: false,
    quantity: 0,
    loading: false,
  }),

  getters: {
    // getRecord: state => state.record,
  },
  actions: {
    onOpen() {
      this.prompt = true
    },
    onAdd() {
      if(this.quantity >= 999) {
        this.quantity = 999
        return
      }
      this.quantity = Number(this.quantity) + 1
    },
    onRemove() {
      if(this.quantity <= 0) {
        this.quantity = 0
        return
      }
      this.quantity = Number(this.quantity) - 1
    },

    async onAddToCart({ price_id, key }) {

      if (this.loading) return false;

      this.loading = true;

      Loading.show()

      // const accessToken = Cookies.get("accessTokent");
      // const csrf = Cookies.get("XSRF-TOKEN");

      const formData = new FormData();
      // for (const key in this.form_login) {
      //   const value = JSON.parse(JSON.stringify(this.form_login[key]))
      //   console.log(key, value)
      //   formData.append(key, value);
      // }

      formData.append('price_id', price_id);
      formData.append('quantity', this.quantity);

      // console.log('formData', this.form_login)

      const resp = await axios({
        url: `/api/typehead/${key}/add_to_cart`,
        method: 'post',
        data: formData,
        // headers: {
        //   "Content-Type": "application/json",
        //   // authorization: `Bearer ${accessToken}`,
        //   // "X-XSRF-TOKEN": csrf, // tapi undefined, katanya hanya bisa sama domain/sub domain (tambahan tidak penting untuk saat ini)
        // }
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
          console.log('AddToCartStore error', err?.response)
          Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            // caption: err?.data?.meta?.message[0],
            icon: 'report_problem'
          })
          return err?.response
        })

      this.loading = false
      console.log('onLogin', resp)
      Loading.hide()

      return resp


      // if (!resp?.data) return this.loading = false

      // resp.data.data['roles'] = JSON.parse(resp?.data?.data['roles'])

      // this.auth = resp?.data
      // console.log('stores/lagia-stores/auth/AuthStore/onInit', this.auth)

    },

  }
});
