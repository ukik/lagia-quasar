<template>
  <q-page class="flex flex-center bg-white row col-12">
    <!-- {{ route_param?.token }} -->
    <!-- <div class="full-width flex flex-center">
      <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    </div> -->
    <!-- col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-4 -->
    <!-- <div class=""> -->
      <Share
        :url="11111"
        :title="111111"
        source="modifySource"
        :description="111111"
        :image="111111"
        :weibo="false"
        :QQ="false"
        :weChat="false"
        :QZone="false"
        :twitter="true"
        :google="false"
        :linkedin="true"
        :facebook="true"
      ></Share>

      <Vue3Lottie style="height:350px;" animationLink="https://assets6.lottiefiles.com/packages/lf20_riAqnQrYxZ.json" :loop="true" :autoPlay="true"></Vue3Lottie>
    <!-- </div> -->
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
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
  components: {
    Vue3Lottie
  }
}
</script>
