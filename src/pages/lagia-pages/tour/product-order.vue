<template>
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <!-- <isHtml2PDF ref="isHtml2PDF"> xxxxxxxxxxxxxxxxxxxx </isHtml2PDF> -->
  <!-- <div class="sticky">xxxxxxxxxxxxxxxxxxxxx</div> -->

  <!-- :style="`left:${stickyPrice?.x}px;`" -->
  <!-- <q-dialog
      seamless
      full-width
      position="bottom"
      v-model="product_price"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
      >

          <template v-for="(item, i) in record?.tourPrices">
            <div :class="price_css">
          <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md col-12">
            <q-item-label class="text-white text-capitalize"
              >Harga Dewasa {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h4">{{
              $currency($finalPrice(item))
            }}</q-item-label>
          </q-item-section>
        </div>

        <div :class="price_css">
          <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md col-12">
            <q-item-label class="text-white text-capitalize"
              >Harga Anak (2-6 tahun) {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h4">{{
              $currency($finalPriceAnak(item))
            }}</q-item-label>
          </q-item-section>
        </div>
        </template>
      </q-card>
    </q-dialog> -->

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

      <div class="col-12">
        "{{date_start}}",
      "{{participant_young}}",
      "{{participant_adult}}",
      "{{description}}",
      "{{hotel}}",

        <!-- <div class="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12"> -->
        <StepperOrder @onBubbleEvent="step = $event">
          <template v-slot:step1>
            <div v-if="record?.tourStore" class="col-12">
              <PriceReferenceStore :item="record?.tourStore"></PriceReferenceStore>
            </div>
          </template>

          <template v-slot:step2>
            <StoreDetailProductContent
              id="StoreDetailProductContent"
              :record="record"
            ></StoreDetailProductContent>
          </template>

          <template v-slot:step3>
            <template v-for="(item, i) in record?.tourPrices">
              <StoreDetailProductPriceSimulasi
                class="q-mt-sm"
                :item="item"
                :ref="'side_price' + i"
              >
                <template v-slot:header="">
                  <q-card-section>
                    <q-item-section>
                      <q-item-label class="text-h6 text-weight-normal"
                        >SIMULASI BIAYA</q-item-label
                      >
                    </q-item-section>
                  </q-card-section>
                  <q-separator></q-separator>
                </template>
                <template v-slot:buttons>
                  <div class="col-xl-auto col-lg-auto col-md-auto col-sm-auto col-xs-12">
                    <q-btn
                      class="full-width"
                      unelevated
                      size="16px"
                      no-caps
                      square
                      color="positive"
                      text-color="white"
                      icon="search"
                      label="Preview"
                    />
                  </div>
                  <div class="col">
                    <q-btn
                      class="full-width"
                      unelevated
                      size="16px"
                      no-caps
                      @click="onSubmit(i)"
                      square
                      color="primary"
                      text-color="white"
                      label="Buat Pesanan"
                      icon="shopping_cart_checkout"
                    />
                  </div>
                </template>
              </StoreDetailProductPriceSimulasi>
            </template>
          </template>

          <template v-slot:step4>
            <!-- <FormLogin />
            <FormRegister /> -->
            <FormBookingCustomerData />
          </template>

          <template v-slot:step5>
            <FormInformasi />
          </template>

          <template v-slot:step6>
            <!-- <div v-if="record?.tourStore" class="col-12">
              <PriceReferenceStore :item="record?.tourStore"></PriceReferenceStore>
            </div>
            <StoreDetailProductContent
              id="StoreDetailProductContent"
              :record="record"
            ></StoreDetailProductContent> -->
            {{ step }}
            <template v-for="(item, i) in record?.tourPrices">
              <StoreDetailProductPriceSimulasi
                class="q-mt-sm"
                :item="item"
                :ref="'side_price' + i"
              >
                <template v-slot:header="">
                  <q-card-section>
                    <q-item-section>
                      <q-item-label class="text-h6 text-weight-normal"
                        >SIMULASI BIAYA</q-item-label
                      >
                    </q-item-section>
                  </q-card-section>
                  <q-separator></q-separator>
                </template>
                <template v-slot:buttons>
                  <div class="col-xl-auto col-lg-auto col-md-auto col-sm-auto col-xs-12">
                    <q-btn
                      class="full-width"
                      unelevated
                      size="16px"
                      no-caps
                      square
                      color="positive"
                      text-color="white"
                      icon="search"
                      label="Preview"
                    />
                  </div>
                  <div class="col">
                    <q-btn
                      class="full-width"
                      unelevated
                      size="16px"
                      no-caps
                      @click="onSubmit(i)"
                      square
                      color="primary"
                      text-color="white"
                      label="Buat Pesanan"
                      icon="shopping_cart_checkout"
                    />
                  </div>
                </template>
              </StoreDetailProductPriceSimulasi>
            </template>
            <FormBookingCustomerData />
            <FormInformasi />
          </template>
        </StepperOrder>
      </div>

      <!-- <div
        class="col"
        v-if="$q.screen.width > 768"
        :class="[$q.screen.width > 768 ? '' : 'row']"
      >
        <div id="stickyPrice"></div>

        <template v-for="(item, i) in record?.tourPrices">
          <StoreDetailProductPriceSimulasi
            :simulasi="false"
            :ref="'side_price' + i"
            price_css="col-12 row text-white"
            :item="item"
            :date_sticky="true"
          >
            <template v-slot:header="">
              <q-card-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-weight-normal"
                    >SIMULASI BIAYA</q-item-label
                  >
                </q-item-section>
              </q-card-section>
              <q-separator></q-separator>
            </template>
            <template v-slot:buttons>
              <div class="col-xl-auto col-lg-auto col-md-auto col-sm-auto col-xs-12">
                <q-btn
                  class="full-width"
                  unelevated
                  size="md"
                  no-caps
                  square
                  color="positive"
                  text-color="white"
                  icon="search"
                  label="Preview"
                />
              </div>
              <div class="col">
                <q-btn
                  class="full-width"
                  unelevated
                  size="md"
                  no-caps
                  @click="onSubmit(i)"
                  square
                  color="primary"
                  text-color="white"
                  label="Buat Pesanan"
                  icon="shopping_cart_checkout"
                />
              </div>
            </template>
          </StoreDetailProductPriceSimulasi>
        </template>

        <q-no-ssr v-if="false">

          <FormBookingPackageSide
            class="col-12"
            :class="[$q.screen.width > 768 ? '' : 'q-mt-xl order-last']"
          ></FormBookingPackageSide>
          <MorePackageSide class="col-12"></MorePackageSide>
          <RelatedImageSlide class="col-12"></RelatedImageSlide>
          <GoogleMapPackageSide class="col-12"></GoogleMapPackageSide>
        </q-no-ssr>
      </div> -->
    </div>
  </div>

  <q-no-ssr>
    <!-- <q-page-sticky v-if="scrollY >= 480" style="z-index: 999;" position="top" :offset="[10, 10]"> -->

    <q-dialog
      v-if="false"
      seamless
      position="top"
      v-model="product_price"
      transition-show="slide-down"
      transition-hide="slide-up"
    >
      <q-card flat class="bg-transparent" style="margin-top: 50px; min-width: 400px">
        <q-card-section>
          <q-btn-group spread unelevated>
            <q-btn
              no-caps
              square
              @click="
                $global.$emit('LagiaLayout', {
                  label: 'konsultasi',
                  slug: 'konsultasi',
                  vendor: 'tourStore',
                  value: item,
                  product: 'tourProduct',
                })
              "
              color="positive"
              text-color="white"
              label="Pesan via WA"
              icon="fa-brands fa-whatsapp"
            />
            <!-- <q-separator vertical></q-separator> -->
            <q-btn
              no-caps
              square
              color="primary"
              text-color="white"
              label="Pesan via APP"
              icon="shopping_cart_checkout"
            />
          </q-btn-group>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-no-ssr>
</template>

<script setup>
import StepperOrder from "./components/order/StepperOrder.vue";

import FormInformasi from "./components/order/FormInformasi.vue";

import FormLogin from "./components/order/FormLogin.vue";
import FormRegister from "./components/order/FormRegister.vue";

import StoreDetailProductContent from "./components/order/StoreDetailProductContent.vue";
import PriceReferenceStore from "./components/order/PriceReferenceStore";
import StoreDetailProductPriceSimulasi from "./components/order/StoreDetailProductPriceSimulasi";
// import StoreDetailProductPriceSimulasiRangkuman from "./components/order/StoreDetailProductPriceSimulasiRangkuman";
import FormBookingCustomerData from "./components/order/FormBookingCustomerData";


// SOLUSI SSR via SETUP

import { useTourOrderDetailStore } from "stores/lagia-stores/tour/TourOrderDetailStore";
import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

import { mapWritableState, storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

// import { useRoute } from "vue-router";
// const route = useRoute();

defineOptions({
  // preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
  //   console.log('running preFetch XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  //   return useTourOrderDetailStore(store).onFetch(currentRoute?.params?.slug);
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
      return useTourOrderDetailStore(store).onFetch(currentRoute?.params?.slug);
    }
  ),
});

const $auth = useAuthStore();
const { auth } = storeToRefs($auth);

const $store = useTourOrderDetailStore();
const {
  dataType,
  record,
  isMaintenance,

  loading,
} = storeToRefs($store); // have all reactive states here
</script>

<script>
import { mapWritableState } from "pinia";

import { useTourOrderDetailStore } from "stores/lagia-stores/tour/TourOrderDetailStore";

export default {
  // props: ["scrollY"],
  data() {
    return {
      product_price: true,
      stickyPrice: null,

      step:1,
    };
  },
  computed: {
    ...mapWritableState(useTourOrderDetailStore, [
      "date_start",
      "participant_young",
      "participant_adult",
      "description",
      "hotel",
    ]),
  },
  mounted() {
    const cookies_name =
      "TOUR-" + this.$route.params?.slug + "-" + this.$route.params?.slug_text; //window.location.href

    if (!this.$q.cookies.has(cookies_name)) return;
    this.$q.notify({
      message: "Load data formulir",
      color: "positive",
      position: "bottom",
    });

    const cookies = this.$q.cookies.get(cookies_name);

    this.date_start = cookies.state.date_start;
    this.participant_young = cookies.state.participant_young;
    this.participant_adult = cookies.state.participant_adult;
    this.description = cookies.state.description;
    this.hotel = cookies.state.hotel;

    console.log("GET COOKIES", cookies);
  },
  methods: {
    onSubmit(i) {
      this.$refs["side_price" + i][i]?.onSubmit();
    },
  },
};
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
