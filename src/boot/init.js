
import { boot } from 'quasar/wrappers';
import axios from 'axios'
import { host } from 'src/boot/common'
import { Cookies } from 'quasar'

import { useAuthStore } from 'src/stores/auth/auth.js'

export default boot(async ({ router, store, ssrContext }) => {

  const auth = useAuthStore(store)
  console.log('onRequestPrefetch 1', auth?.payload?.logged)
  // if(!auth?.payload?.logged)
  await auth.init()
  console.log('onRequestPrefetch 2', auth?.payload?.logged)


  // return this.payload

});
