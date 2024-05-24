<template>
  <div class="
    col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white flex flex-center
    scroll">

    <div class="row col-11 q-col-gutter-y-lg text-center justify-center">

      <q-list class="col-12 text-center q-py-md">
        <img src="images/logo.png" />

        <div class="q-px-md q-mb-lg text-grey-8">
          <q-spinner
            color="primary"
            size="3em"
          />
        </div>
      </q-list>


    </div>

  </div>

</template>

<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAuthStore } from 'src/stores/auth/auth.js'

import { preFetch } from 'quasar/wrappers';
import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

const is_cookie_secure = {
    secure: process.env.PROD ? true : false,
    path: '/' // wajib
  }

export default {
  preFetch: preFetch(async ({ store, router, currentRoute, ssrContext }) => {
    const mystore = useAuthStore(store);
    await mystore.redirect({
      token: currentRoute.query.token
    });

    const cookies = process.env.SERVER
      ? Cookies.parseSSR(ssrContext)
      : Cookies // otherwise we're on client

    cookies.set('imajora_cookie', mystore.payload.token, is_cookie_secure)
  }),
  computed: {
    ...mapState(useAuthStore, {
      payload: 'payload',
    }),
    ...mapWritableState(useAuthStore, {
      payload: 'payload',
    }),
  },
  created(){
    if(this.payload?.logged) {
      this.$router.replace(this.goto({
        name: 'profile_musisi',
      }))
    }
  },
}
</script>
