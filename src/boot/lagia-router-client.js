// import { sync } from 'vuex-router-sync';
import { storeToRefs } from 'pinia';
import { boot } from 'quasar/wrappers';

import { useRouterStore } from 'src/stores/lagia-stores/RouterStore'
import { useAuthStore } from 'src/stores/lagia-stores/auth/AuthStore';

export default boot(async ({ router, store }) => {
  const _store = useAuthStore(store) // inject disini ya
  const { onInit } = _store
  const { auth, getIsLogin, getLoadingInit, getLoading } = storeToRefs(_store)

  // jika disini akan dihitung SERVER
  // if(!getLoading.value?.init) await onInit()

  const routerStore = useRouterStore()

  router.beforeEach(async (to, from, next) => {
    // ✅ This will work because the router starts its navigation after
    // the router is installed and pinia will be installed too

    // jika disini akan dihitung CLIENT
    if(!getLoadingInit.value && !getIsLogin.value) await onInit() // matikan saja

    // console.log('beforeEach boot/lagia-.js', auth, getLoading.value, getIsLogin.value, getIsLogin.value && to.name == '/login')

    await routerStore.setRouter(to);

    if (to.meta.logged && getIsLogin.value) {
      console.log('beforeEach boot/lagia-router-client.js 1')
      return next()
    } else if (getIsLogin.value && to.name == '/login') {
      console.log('beforeEach boot/lagia-router-client.js 3',getIsLogin.value,to.name)
      // return next()
      return next({ name: "/tour/cart" })
    } else if (to.meta.logged && !getIsLogin.value && to.name !== '/login') {
      console.log('beforeEach boot/lagia-router-client.js 2')
      return next({ name: '/login' })
    } else {
      console.log('beforeEach boot/lagia-router-client.js 4')
      return next()
    }
  })

});
