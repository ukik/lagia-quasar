<template>
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div class="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12">
        <!-- {{ record }} -->
        <StoreDetailContent :record="record"></StoreDetailContent>
      </div>
      <div class="col" :class="[$q.screen.width > 768 ? '' : 'row']">
        <q-no-ssr>
          <FormBookingPackageSide
            class="col-12"
            :class="[$q.screen.width > 768 ? '' : 'q-mt-xl order-last']"
          ></FormBookingPackageSide>
        </q-no-ssr>
        <MorePackageSide class="col-12"></MorePackageSide>
        <RelatedImageSlide class="col-12"></RelatedImageSlide>
        <GoogleMapPackageSide class="col-12"></GoogleMapPackageSide>
      </div>
    </div>
  </div>
</template>

<script setup>
import StoreDetailContent from "./components/price-detail/StoreDetailContent.vue";

// SOLUSI SSR via SETUP

import { useTransportPriceDetailStore } from "stores/lagia-stores/transport/TransportPriceDetailStore";
import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

// import { useRoute } from "vue-router";
// const route = useRoute();

defineOptions({
  // preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
  //   console.log('running preFetch XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  //   return useTransportPriceDetailStore(store).onFetch(currentRoute?.params?.slug);
  // }
  preFetch: preFetch(
    ({
      store,
      currentRoute,
      previousRoute,
      redirect,
      ssrContext,
      urlPath,
      publicPath,
    }) => {
      console.log("running preFetch XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      return useTransportPriceDetailStore(store).onFetch(currentRoute?.params?.slug);
    }
  ),
});

const $auth = useAuthStore();
const { auth } = storeToRefs($auth);

const $store = useTransportPriceDetailStore();
const {
  dataType,
  record,
  isMaintenance,

  loading,
} = storeToRefs($store); // have all reactive states here

// const onCurrentPage = async (val) => {
//   console.log("onCurrentPage", val);
//   onFetch();
// };
// watch(() => currentPage, onCurrentPage, {
//   deep: true,
//   immediate: true,
// });
</script>

<script>
// import { storeToRefs } from "pinia";
// import { useQuasar, Cookies } from "quasar";
// import { ref, nextTick, watch, onMounted } from "vue";

// import { useTransportPriceDetailStore } from "stores/lagia-stores/travel/TransportPriceDetailStore";
// import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

// export default {
//   // our hook here
//   preFetch({
//     store,
//     currentRoute,
//     previousRoute,
//     redirect,
//     ssrContext,
//     urlPath,
//     publicPath,
//   }) {
//     // fetch data, validate route and optionally redirect to some other route...
//     const $store = useTransportPriceDetailStore(store);
//     // return $store.onFetch(currentRoute.params?.slug)
//   },
//   data() {
//     return {
//       _record: null,
//       _auth: null,
//     };
//   },
//   // SOLUSI SSR via OPTION
//   // SOLUSI transfer data dari Pinia ke Component
//   // WAJIB pakai created()
//   created() {
//     const store = useTransportPriceDetailStore();
//     const { record, isMaintenance, loading } = storeToRefs(store); // have all reactive states here
//     console.log("xxxxxxxxxxxxxxxx", record);

//     this._record = record;

//     const $auth = useAuthStore();
//     const { auth } = storeToRefs($auth); // have all reactive states here
//     this._auth = auth;
//   },
// };
</script>

<style scoped>
.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

/* p {
  line-height: 1.6;
  margin: 0 0 15px;
  word-wrap: break-word;
} */

h3 {
  font-size: 22px;
  font-weight: 700;
}
</style>
