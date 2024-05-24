<template>
  <q-page class="flex flex-center">
    <!-- {{ route_param?.token }} -->
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import { mapState, mapWritableState, mapActions } from 'pinia'

import { preFetch } from 'quasar/wrappers';

import { useAuthStore } from 'src/stores/auth/auth';

export default {
  // preFetch: preFetch(async ({ store, currentRoute }) => {
  //   const mystore = useAuthStore(store);
  //   await mystore.verifyAccount({
  //     token: currentRoute.params.token
  //   });
  // }),
}
</script>
