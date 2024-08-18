// import { sync } from 'vuex-router-sync';
import { storeToRefs } from 'pinia';
import { boot } from 'quasar/wrappers';

import { useTravelStoreDetailStore } from "stores/lagia-stores/travel/TravelStoreDetailStore";

export default boot(async ({ app, ssrContext, router, store, urlPath }) => {

  const $store = useTravelStoreDetailStore(store) // inject disini ya
  const { onFetch } = $store
  const { record } = storeToRefs($store)

  // const payload = await onFetch(1)

  router.beforeEach(async (to, from, next) => {

    if(to.name === '/travel/detail') {
      // SSR SOLUSI 1
      // const payload = await onFetch(to.params.slug) // harus berbentuk await variable jika tidak SSR akan terlambat
      // console.log('beforeEach boot/lagia/travel/detail.js', payload)
      next()
    } else {
      next()
    }
  })

});
