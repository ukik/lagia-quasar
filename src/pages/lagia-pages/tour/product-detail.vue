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
      <div v-if="!record && loading" class="col-12 text-center">
        <q-spinner color="primary" size="3em" />
      </div>

      <div class="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12">
        <!-- {{ record }} -->
        <div v-if="record?.tourStore" class="col-12 q-mb-lg">
          <q-list bordered>
            <q-expansion-item group="somegroup" header-class="bg-grey-1" default-opened>
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white">
                    <q-icon name="storefront"></q-icon>
                  </q-avatar>
                </q-item-section>

                <q-item-section class="text-h6 text-dark">
                  PROFILE VENDOR
                </q-item-section>
              </template>
              <q-separator />

              <q-card>
                <q-card-section>
                  <PriceReferenceStore :item="record?.tourStore"></PriceReferenceStore>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>

        <StoreDetailProductContent :record="record"></StoreDetailProductContent>
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
import StoreDetailProductContent from "./components/detail/StoreDetailProductContent.vue";
import PriceReferenceStore from "./components/PriceReferenceStore";

// SOLUSI SSR via SETUP

import { useTourProductDetailStore } from "stores/lagia-stores/tour/TourProductDetailStore";
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
  //   return useTourProductDetailStore(store).onFetch(currentRoute?.params?.slug);
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
      return useTourProductDetailStore(store).onFetch(currentRoute?.params?.slug);
    }
  ),
});

const $auth = useAuthStore();
const { auth } = storeToRefs($auth);

const $store = useTourProductDetailStore();
const {
  dataType,
  record,
  isMaintenance,

  loading,
} = storeToRefs($store); // have all reactive states here
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
