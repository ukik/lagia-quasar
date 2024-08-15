<template>
  <q-no-ssr>
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="dialog_product"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">Preview Produk</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <StoreDetailProductBody
            :_height="$q.screen.width > 425 ? '400px' : '400px'"
            :record="record?.tourStore?.tourProduct"
          ></StoreDetailProductBody>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-no-ssr>

  <InnerBanner _title="PACKAGE DETAIL"></InnerBanner>

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
      <div class="col-12" v-if="!record && !loading">
        <NoData></NoData>
      </div>
      <div class="col-12">
        <ConfirmationPaymentBanner
          v-if="record?.condition == 'PAYMENT WAITING' || !record?.condition"
          icon="refresh"
          color="bg-blue"
          title="PAYMENT WAITING"
        >
          Silahkan melanjutkan proses pembayaran, pesanan anda akan diproses setelah
          membayar DP
        </ConfirmationPaymentBanner>
        <ConfirmationPaymentBanner
          v-else-if="record?.condition == 'DOWN PAYMENT CONFIRMED'"
          icon="check_circle_outline"
          color="bg-cyan"
          title="DOWN PAYMENT CONFIRMED"
        >
          Terimakasih sudah melakukan proses pembayaran DP, pesanan anda kami proses
        </ConfirmationPaymentBanner>

        <ConfirmationPaymentBanner
          v-else-if="record?.condition == 'FULL PAYMENT CONFIRMED'"
          icon="done_all"
          color="bg-positive"
          title="FULL PAYMENT CONFIRMED"
        >
          Terimakasih sudah melakukan proses pelunasan, pesanan anda kami proses
        </ConfirmationPaymentBanner>
        <ConfirmationPaymentBanner
          v-else-if="record?.condition == 'PAYMENT TIMEOUT'"
          icon="highlight_off"
          color="bg-orange"
          title="PAYMENT TIMEOUT"
        >
          Maaf pesanan expired dalam waktu 1x24 jam jika tidak ada pembayaran, silahkan
          membuat pesanan baru
        </ConfirmationPaymentBanner>
        <ConfirmationPaymentBanner
          v-else-if="record?.condition == 'PAYMENT CANCELLED'"
          icon="block"
          color="bg-negative"
          title="PAYMENT CANCELLED"
        >
          Pesanan ini telah anda batalkan secara langsung, silahkan membuat pesanan baru
        </ConfirmationPaymentBanner>

        <!-- <ConfirmationPaymentBanner icon="refresh" color="bg-blue" title="PAYMENT WAITING"></ConfirmationPaymentBanner>
        <ConfirmationPaymentBanner icon="check_circle_outline" color="bg-positive" title="PAYMENT CONFIRMED"></ConfirmationPaymentBanner>
        <ConfirmationPaymentBanner icon="highlight_off" color="bg-orange" title="PAYMENT TIMEOUT"></ConfirmationPaymentBanner>
        <ConfirmationPaymentBanner icon="block" color="bg-negative" title="PAYMENT CANCELLED"></ConfirmationPaymentBanner> -->
      </div>
      <div class="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12">
        <ConfirmationProduct title="CUPLIKAN" class="q-mb-lg">
          <PriceListCard
            @onBubbleEvent="dialog_product = true"
            :item="record?.tourBookingItem"
            :images="record?.tourStore.tourProduct?.image"
          >
          </PriceListCard>
        </ConfirmationProduct>

        <ConfirmationDetail></ConfirmationDetail>

        <ConfirmationProduct title="RINGKASAN" class="q-mt-lg">
          <ProductCalculate></ProductCalculate>
        </ConfirmationProduct>

        <ConfirmationProduct title="PEMBAYARAN" class="q-mt-lg">
          <div class="col-12">
            <ConfirmationPaymentBanner
              v-if="record?.condition == 'PAYMENT WAITING' || !record?.condition"
              icon="refresh"
              color="bg-blue"
              title="PAYMENT WAITING"
            >
              Silahkan melanjutkan proses pembayaran, pesanan anda akan diproses setelah
              membayar DP
            </ConfirmationPaymentBanner>
            <ConfirmationPaymentBanner
              v-else-if="record?.condition == 'DOWN PAYMENT CONFIRMED'"
              icon="check_circle_outline"
              color="bg-cyan"
              title="DOWN PAYMENT CONFIRMED"
            >
              Terimakasih sudah melakukan proses pembayaran DP, pesanan anda kami proses
            </ConfirmationPaymentBanner>

            <ConfirmationPaymentBanner
              v-else-if="record?.condition == 'FULL PAYMENT CONFIRMED'"
              icon="done_all"
              color="bg-positive"
              title="FULL PAYMENT CONFIRMED"
            >
              Terimakasih sudah melakukan proses pelunasan, pesanan anda kami proses
            </ConfirmationPaymentBanner>
            <ConfirmationPaymentBanner
              v-else-if="record?.condition == 'PAYMENT TIMEOUT'"
              icon="highlight_off"
              color="bg-orange"
              title="PAYMENT TIMEOUT"
            >
              Maaf pesanan expired dalam waktu 1x24 jam jika tidak ada pembayaran,
              silahkan membuat pesanan baru
            </ConfirmationPaymentBanner>
            <ConfirmationPaymentBanner
              v-else-if="record?.condition == 'PAYMENT CANCELLED'"
              icon="block"
              color="bg-negative"
              title="PAYMENT CANCELLED"
            >
              Pesanan ini telah anda batalkan secara langsung, silahkan membuat pesanan
              baru
            </ConfirmationPaymentBanner>
          </div>
        </ConfirmationProduct>

        <!-- <ConfirmationPayment></ConfirmationPayment> -->
        <ConfirmationBooking class="q-mt-lg">
          <q-item
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
            clickable
            v-ripple
            :to="{
              name: '/tour/product-detail',
              params: {
                slug: record?.tourStore?.tourProduct?.id,
                slug_text: record?.tourStore?.tourProduct?.slug,
              },
            }"
          >
            <q-item-section>
              <q-item-label>{{
                $getHost() +
                "/tour/product-detail/" +
                record?.tourStore?.tourProduct?.id +
                "/" +
                record?.tourStore?.tourProduct?.slug
              }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="list" />
            </q-item-section>
          </q-item>
        </ConfirmationBooking>
        <!-- <SinglePageContent></SinglePageContent> -->
      </div>
      <div class="col" :class="[$q.screen.width > 768 ? '' : 'row']">
        <BookingSummary></BookingSummary>
        <q-card
          flat
          bordered
          class="booking-section q-py-xl rounded-borders-2 bg-grey-1 q-mt-xl"
        >
          <q-card-actions align="center">
            <q-icon size="80px" name="phone_forwarded"></q-icon>
          </q-card-actions>
          <q-card-actions align="center">
            <div class="support-content text-center">
              <h5>HELP AND SUPPORT</h5>
              <a href="telto:12345678" class="phone">+55 123 987 00</a>
              <small>Monday to Friday 9.00am - 7.30pm</small>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import ConfirmationBooking from "./components/booking/ConfirmationBooking";

import BookingSummary from "./components/booking/BookingSummary";

import ConfirmationPaymentBanner from "./components/booking/ConfirmationPaymentBanner";
import ProductCalculate from "./components/booking/ProductCalculate";
// import StoreDetailProductContent from "./components/detail/StoreDetailProductContent.vue";
// import PriceReferenceStore from "./components/PriceReferenceStore";
import StoreDetailProductBody from "./components/detail/StoreDetailProductBody";
import PriceListCard from "./components/booking/PriceListCard";

import ConfirmationProduct from "./components/booking/ConfirmationProduct";
import ConfirmationDetail from "./components/booking/ConfirmationDetail";

// SOLUSI SSR via SETUP

import { useTourBookingDetailStore } from "stores/lagia-stores/tour/TourBookingDetailStore";
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
  //   return useTourBookingDetailStore(store).onFetch(currentRoute?.params?.slug);
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
      return useTourBookingDetailStore(store).onFetch(currentRoute?.params?.id);
    }
  ),
});

const $auth = useAuthStore();
const { auth } = storeToRefs($auth);

const $store = useTourBookingDetailStore();
const {
  dataType,
  record,
  isMaintenance,

  loading,
} = storeToRefs($store); // have all reactive states here

// const dialog_price = ref(false);
const dialog_product = ref(false);
// const dialog_price_selected = ref(null);
const dialog_product_selected = ref(null);
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

.booking-section .support-content .phone {
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  display: block;
  margin-bottom: 10px;
  color: #223645;
  line-height: 1;
  font-weight: 700;
}
.booking-section .support-content h5 {
  color: #383838;
  font-weight: 400;
}
h5 {
  font-size: 16px;
}
small {
  font-size: 80%;
}
</style>
