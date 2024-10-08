// import { sync } from 'vuex-router-sync';
import { storeToRefs } from 'pinia';
import { boot } from 'quasar/wrappers';

import { useRouterStore } from 'src/stores/lagia-stores/RouterStore'
import { useAuthStore } from 'src/stores/lagia-stores/auth/AuthStore';

export default boot(async ({ router, store }) => {
  const _store = useAuthStore(store) // inject disini ya
  const { onRelogin } = _store
  const { auth, getIsLogin, getLoading } = storeToRefs(_store)

  if(!getIsLogin.value) await onRelogin() // WAJIB kalo enggak kena redirect page yang wajib login

  const routerStore = useRouterStore()

  router.beforeEach(async (to, from, next) => {
    // ✅ This will work because the router starts its navigation after
    // the router is installed and pinia will be installed too

    // sepertinya dari Client saja, karena error 401 nanti lambat di server
    // if(!getIsLogin.value && to.meta.logged) await onRelogin()

    // if(!getLoadingInit.value && !getIsLogin.value) await onInit()

    console.log('beforeEach boot/lagia-router-server', auth, getIsLogin.value)

    await routerStore.setRouter(to);

    if (to.meta.logged && getIsLogin.value) {
      console.log('beforeEach boot/lagia-router-server.js 1')
      return next()
    } else if (getIsLogin.value && to.name == '/login') {
      console.log('beforeEach boot/lagia-router-server.js 3', getIsLogin.value, to.name)
      return next({ name: "/lagia/dashboard" })
    } else if (to.meta.logged && !getIsLogin.value && to.name !== '/login') {
      console.log('beforeEach boot/lagia-router-server.js 2')
      return next({ name: '/login' })
    } else {
      console.log('beforeEach boot/lagia-router-server.js 4')
      return next()
    }
  })

});
