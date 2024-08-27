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

      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
        <div v-if="record?.tourStore" class="col-12 q-mb-lg">
          <PriceReferenceStore :item="record?.tourStore"></PriceReferenceStore>
        </div>

        <StoreDetailProductContent
          id="StoreDetailProductContent"
          :record="record"
        ></StoreDetailProductContent>
      </div>

      <div
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        v-if="$q.screen.width > 768"
        :class="[$q.screen.width > 768 ? '' : 'row']"
      >
        <template v-for="(item, i) in record?.tourPrices">
          <StoreDetailProductPriceSimulasi
            :simulasi="false"
            :ref="'side_price' + i"
            price_css="col-12 row text-white"
            :item="item"
            :date_sticky="true"
          >
            <template v-slot:header="">
              <q-card-section class="bg-grey-1">
                <q-item-section>
                  <q-item-label class="text-h6 text-weight-normal"
                    >SIMULASI BIAYA</q-item-label
                  >
                </q-item-section>
              </q-card-section>
              <q-separator></q-separator>
            </template>
            <template v-slot:buttons>
              <div class="col-xl-auto col-lg-auto col-md-12 col-sm-12 col-xs-12">
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
              <div class="col-xl col-lg col-md-12 col-sm-12 col-xs-12">
                {{ loading }} xxx
                <q-btn
                  :loading="loading"
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
      </div>
    </div>
  </div>

  <q-no-ssr>
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
import StoreDetailProductContent from "./components/detail/StoreDetailProductContent.vue";
import PriceReferenceStore from "./components/PriceReferenceStore";
import StoreDetailProductPriceSimulasi from "./components/detail/StoreDetailProductPriceSimulasi";

// SOLUSI SSR via SETUP

import { useTourProductDetailStore } from "stores/lagia-stores/tour/TourProductDetailStore";

import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

import { mapWritableState, storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

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

// const $auth = useAuthStore();
// const { auth } = storeToRefs($auth);

// const $store = useTourProductDetailStore();
// const {
//   dataType,
//   record,
//   isMaintenance,
// } = storeToRefs($store); // have all reactive states here
</script>

<script>
import { date } from "quasar";
import { mapWritableState } from "pinia";

import { useTourProductDetailStore } from "stores/lagia-stores/tour/TourProductDetailStore";

export default {
  // props: ["scrollY"],
  data() {
    return {
      product_price: true,
    };
  },
  computed: {
    ...mapWritableState(useTourProductDetailStore, [
      "date_start",
      "participant_adult",
      "participant_young",
      "description",
      "hotel",
      "dibayar",
      "dibayar_percent",

      "room_qty",
      "room_budget",

      "name",
      "email",
      "phone",
      "instance",
      "city",
      "address",

      "record",

      "loading",
    ]),
    to_watch() {
      return {
        date_start: this.date_start,
        participant_adult: this.participant_adult,
        participant_young: this.participant_young,
        description: this.description,
        hotel: this.hotel,
        dibayar: this.dibayar,
        dibayar_percent: this.dibayar_percent,

        room_qty: this.room_qty,
        room_budget: this.room_budget,

        name: this.name,
        email: this.email,
        phone: this.phone,
        instance: this.instance,
        city: this.city,
        address: this.address,
      };
    },
  },
  watch: {
    to_watch() {
      this.setCookies();
    },
  },
  mounted() {
    const vm = this;
    const cookies_name =
      "TOUR-" + this.$route.params?.slug + "-" + this.$route.params?.slug_text; //window.location.href

    if (!this.$q.cookies.has(cookies_name)) return;
    vm.getCookies(cookies_name);
    return;
  },
  methods: {
    onSubmit(i) {
      this.loading = true;
      this.$refs["side_price" + i][i]?.onSubmit();
    },
    getCookies(cookies_name) {
      const cookies = this.$q.cookies.get(cookies_name);
      console.log("getDateDiff", this.getDateDiff(cookies.state.date_start));

      if (this.getDateDiff(cookies.state.date_start) >= 0) {
        this.date_start = cookies.state.date_start;
      }

      this.participant_adult = cookies.state.participant_adult;
      this.participant_young = cookies.state.participant_young;
      this.description = cookies.state.description;
      this.hotel = cookies.state.hotel;
      this.dibayar = cookies.state.dibayar;
      this.dibayar_percent = cookies.state.dibayar_percent;

      this.room_qty = cookies.state.room_qty;
      this.room_budget = cookies.state.room_budget;

      this.name = cookies.state.name;
      this.email = cookies.state.email;
      this.phone = cookies.state.phone;
      this.instance = cookies.state.instance;
      this.city = cookies.state.city;
      this.address = cookies.state.address;

      console.log("GET COOKIES", cookies);
    },
    setCookies() {
      console.log("SET COOKIES");
      const payload = {
        route: {
          url: window.location.href,
          host: this.$getHost(),
          path: this.$route.path,
          name: this.$route.name,
          params: this.$route.params,
          query: this.$route.query,
        },
        state: {
          date_start: this.date_start,
          participant_adult: this.participant_adult,
          participant_young: this.participant_young,
          description: this.description,
          hotel: this.hotel,
          dibayar: this.dibayar,
          dibayar_percent: this.dibayar_percent,

          room_qty: this.room_qty,
          room_budget: this.room_budget,

          name: this.name,
          email: this.email,
          phone: this.phone,
          instance: this.instance,
          city: this.city,
          address: this.address,
        },
      };

      const cookies_name =
        "TOUR-" + this.$route.params?.slug + "-" + this.$route.params?.slug_text; // this.$route.params?.slug_text; //window.location.href
      this.$q.cookies.set(cookies_name, JSON.stringify(payload), {
        secure: true,
        path: "/", // wajib
      });

      // this.$q.notify({
      //   message: "Simpan data formulir",
      //   color: "positive",
      //   position: "bottom"
      // });
    },
    getDateDiff(date_start) {
      // const payload = date_start?.split('/')

      let max = new Date();
      max = date.addToDate(max, { days: 3 });
      //const min = this.$stringToDate("17/9/2014","dd/MM/yyyy","/"); //new Date(date_start); //date.buildDate({ year: payload[0], month: payload[1], date: payload[2] })
      const min = new Date(date_start);
      const unit = "days";

      console.log(date_start, max, min);
      // const diff =
      return date.getDateDiff(min, max, unit);
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
