// import { sync } from 'vuex-router-sync';
import { boot } from 'quasar/wrappers';

import { useRouterStore } from 'src/stores/router-store'
import { useAuthStore } from 'src/stores/auth/auth';

export default boot( async ({ router, store }) => {
  const auth = useAuthStore(store) // inject disini ya
  await auth.init()

  const routerStore = useRouterStore()

  router.beforeEach(async (to, from, next) => {
    // ✅ This will work because the router starts its navigation after
    // the router is installed and pinia will be installed too

    console.log('beforeEach', store)

    await routerStore.setRouter(to);

    // console.log('form_accounts_password', store.state.value?.router)
    if(to.meta.logged && auth.is_logged) {
      next()
    } else if(to.meta.logged && !auth.is_logged) {
      next({ name:'auth_login' })
    } else {
      next()
    }

    // next()
  })

});
