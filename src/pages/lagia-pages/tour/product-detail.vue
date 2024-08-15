<template>
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <!-- <isHtml2PDF ref="isHtml2PDF"> xxxxxxxxxxxxxxxxxxxx </isHtml2PDF> -->
  <!-- <div class="sticky">xxxxxxxxxxxxxxxxxxxxx</div> -->

  {{scrollY}}
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

      <!-- <div class="col-12"> -->
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
        <div v-if="record?.tourStore" class="col-12 q-mb-lg">
          <!-- <q-list bordered>
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
                <q-card-section> -->
          <PriceReferenceStore :item="record?.tourStore"></PriceReferenceStore>
          <!-- </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list> -->
        </div>

        <!-- <q-btn @click="$refs.isHtml2PDF.onGenerate()" label="print PDF"></q-btn>
        <q-btn @click="exportToPDF" label="On PDF"></q-btn> -->

        <StoreDetailProductContent
          id="StoreDetailProductContent"
          :record="record"
        ></StoreDetailProductContent>
      </div>

      <div class="col" :class="[$q.screen.width > 768 ? '' : 'row']">
        <div id="stickyPrice"></div>

        <template v-for="(item, i) in record?.tourPrices">
          <StoreDetailProductPriceSimulasi :simulasi="false"
            :ref="'side_price' + i"
            price_css="col-12 row text-white"
            :item="item"
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
              <!-- <q-btn
                class="full-width"
                unelevated
                size="lg"
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
              <q-btn
                class="full-width q-mt-md"
                unelevated
                size="lg"
                no-caps
                @click="onSubmit(i)"
                square
                color="primary"
                text-color="white"
                label="Pesan via APP"
                icon="shopping_cart_checkout"
              /> -->
              <q-btn class="q-mr-sm"
                unelevated
                size="md"
                no-caps
                square
                color="positive"
                text-color="white"
                icon="search"
              />

              <q-btn
                class="col"
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
            </template>
          </StoreDetailProductPriceSimulasi>
        </template>

        <q-no-ssr v-if="false">
          <!-- <StoreDetailProductPriceList
      :items="record?.tourPrices"
      :count="record?.tourPricesCount"
    ></StoreDetailProductPriceList> -->

          <FormBookingPackageSide
            class="col-12"
            :class="[$q.screen.width > 768 ? '' : 'q-mt-xl order-last']"
          ></FormBookingPackageSide>
          <MorePackageSide class="col-12"></MorePackageSide>
          <RelatedImageSlide class="col-12"></RelatedImageSlide>
          <GoogleMapPackageSide class="col-12"></GoogleMapPackageSide>
        </q-no-ssr>
      </div>
    </div>
  </div>

  <q-no-ssr>
    <!-- <q-page-sticky v-if="scrollY >= 480" style="z-index: 999;" position="top" :offset="[10, 10]"> -->

    <q-dialog v-if="false"
      seamless
      position="top"
      v-model="product_price"
      transition-show="slide-down"
      transition-hide="slide-up"
    >
      <q-card flat class="bg-transparent" style="margin-top: 50px; min-width:400px;">
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
import StoreDetailProductContent from "./components/detail/StoreDetailProductContent.vue";
import PriceReferenceStore from "./components/PriceReferenceStore";
import StoreDetailProductPriceSimulasi from "./components/detail/StoreDetailProductPriceSimulasi";

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

<script>
// import html2pdf from "html2pdf.js";

// export default {
//   methods: {
//     exportToPDF() {
//       html2pdf(document.getElementById("StoreDetailProductContent"), {
//         margin: 1,
//         filename: "i-was-html.pdf",
//       });
//     },
//   },
// };

export default {
  props: ["scrollY"],
  data() {
    return {
      product_price: true,
      stickyPrice: null,
    };
  },
  watch: {
    scrollY(val) {
      if (val >= 480) {
        this.product_price = true;
      } else {
        this.product_price = false;
      }
    },
    "$q.screen.width": function () {
      const stickyPrice = document.querySelector("#stickyPrice");
      console.log("stickyPrice", stickyPrice.getBoundingClientRect());
      this.stickyPrice = stickyPrice;
    },
  },
  mounted() {
    const stickyPrice = document.querySelector("#stickyPrice");
    console.log("stickyPrice", stickyPrice.getBoundingClientRect());
    this.stickyPrice = stickyPrice;
  },
  methods: {
    onSubmit(i) {
      console.log(this.$refs["side_price" + i][i]?.onSubmit());
    },
  },
};
</script>

<style scoped>
div.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: yellow;
  padding: 50px;
  font-size: 20px;
}

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
