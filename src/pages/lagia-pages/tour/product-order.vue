<template>
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <!-- ***Inner Banner html end here*** -->
  <div id="product-detail" class="content-page-section row justify-center">
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
        <!-- "{{ date_start }}", "{{ participant_young }}", "{{ participant_adult }}", "{{
          description
        }}", "{{ hotel }}", -->
        {{ getFormCheck }}
        {{ dibayar }}
        {{ dibayar_percent }}
        {{ Number(dibayar_percent) >= 30 &&  Number(dibayar_percent) <= 100 }}

        <!-- {{ participant_adult }} -->

        <!-- <div class="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12"> -->
        <StepperOrder v-if="$q.screen.width > 768"
          @setCookies=""
          @onBubbleEvent="step = $event"
          @onBubbleEventRangkuman="onBubbleEventRangkuman"
        >
          <template v-slot:step1>
            <div v-if="record?.tourStore" class="col-12">
              <PriceReferenceStore :item="record?.tourStore"></PriceReferenceStore>
            </div>
            <StoreDetailProductContent
              class="q-mt-lg"
              :record="record"
            ></StoreDetailProductContent>
          </template>

          <template v-slot:step2>
            <template v-for="(item, i) in record?.tourPrices">
              <StoreDetailProductPriceSimulasi
                :prop_dibayar="false"
                class="q-mt-sm"
                :item="item"
                :ref="'side_price' + item.id"
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
              </StoreDetailProductPriceSimulasi>
            </template>
          </template>

          <template v-slot:step3>
            <!-- <FormLogin />
            <FormRegister /> -->
            <q-banner inline-actions rounded class="bg-orange-1 q-mb-lg">
              Saat login data pelanggan akan terisi otomatis dan tersimpan di database
              <template v-slot:action>
                <q-btn flat icon="login" label="Login" />
              </template>
            </q-banner>
            <FormBookingCustomerData class="q-mt-lg" />
          </template>

          <template v-slot:step4>
            <FormInformasi />
          </template>

          <template v-slot:step5>
            <q-banner inline-actions rounded class="bg-red-1 q-mb-lg">
              Pastikan data wajib sudah diisi dengan benar
            </q-banner>

            <q-banner inline-actions rounded class="bg-orange-1 q-mb-lg">
              Saat login data pelanggan akan terisi otomatis dan tersimpan di database
              <template v-slot:action>
                <q-btn flat icon="login" label="Login" />
              </template>
            </q-banner>
            <FormBookingCustomerData ref="FormBookingCustomerDataRef" class="q-mt-lg" />
            <FormInformasi ref="FormInformasiRef" class="q-mt-lg" />
            <template v-for="(item, i) in record?.tourPrices">
              <StoreDetailProductPriceSimulasi
                :prop_dibayar="true"
                class="q-mt-lg"
                :item="item"
                :ref="'StoreDetailProductPriceSimulasiRef' + item.id"
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
              </StoreDetailProductPriceSimulasi>
            </template>
          </template>

          <template v-slot:step6>
            <template v-for="(item, i) in record?.tourPrices">
              <StoreInvoice
                :item_product="{
                  category: record?.category,
                  durasi: record?.durasi,
                  level: record?.level,
                  province: record?.province,
                  city: record?.city,
                  country: record?.country,
                }"
                :item="item"
                :item_store="record?.tourStore"
              />
            </template>
          </template>
        </StepperOrder>

        <StepperOrderAccordion v-else @setCookies="">
          <template v-slot:step1>
            <div v-if="record?.tourStore" class="col-12">
              <PriceReferenceStore :item="record?.tourStore"></PriceReferenceStore>
            </div>
            <StoreDetailProductContent
              class="q-mt-lg"
              :record="record"
            ></StoreDetailProductContent>
          </template>

          <template v-slot:step2>
            <q-banner inline-actions rounded class="bg-red-1 q-mb-lg">
              Pastikan data wajib sudah diisi dengan benar
            </q-banner>

            <q-banner inline-actions rounded class="bg-orange-1 q-mb-lg">
              Saat login data pelanggan akan terisi otomatis dan tersimpan di database
              <template v-slot:action>
                <q-btn flat icon="login" label="Login" />
              </template>
            </q-banner>
            <FormBookingCustomerData ref="FormBookingCustomerDataRef" class="q-mt-lg" />
            <template v-for="(item, i) in record?.tourPrices">
              <StoreDetailProductPriceSimulasi :simulasi="true"
                :prop_dibayar="true"
                class="q-mt-lg"
                :item="item"
                :ref="'StoreDetailProductPriceSimulasiRef' + item.id"
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
              </StoreDetailProductPriceSimulasi>
            </template>
            <FormInformasi ref="FormInformasiRef" class="q-mt-lg" />
          </template>

          <template v-slot:step3>
            <template v-for="(item, i) in record?.tourPrices">
              <StoreInvoice :about_vendor="false"
                :item_product="{
                  category: record?.category,
                  durasi: record?.durasi,
                  level: record?.level,
                  province: record?.province,
                  city: record?.city,
                  country: record?.country,
                }"
                :item="item"
                :item_store="record?.tourStore"
              />
            </template>
          </template>
        </StepperOrderAccordion>
      </div>

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
import StepperOrderAccordion from "./components/order/StepperOrderAccordion.vue";
import StepperOrder from "./components/order/StepperOrder.vue";

import FormInformasi from "./components/order/FormInformasi.vue";

import FormLogin from "./components/order/FormLogin.vue";
import FormRegister from "./components/order/FormRegister.vue";

import StoreDetailProductContent from "./components/order/StoreDetailProductContent.vue";
import PriceReferenceStore from "./components/order/PriceReferenceStore";
import StoreDetailProductPriceSimulasi from "./components/order/StoreDetailProductPriceSimulasi";
// import StoreDetailProductPriceSimulasiRangkuman from "./components/order/StoreDetailProductPriceSimulasiRangkuman";
import FormBookingCustomerData from "./components/order/FormBookingCustomerData";
import StoreInvoice from "./components/order/StoreInvoice";

// SOLUSI SSR via SETUP

import { useTourOrderDetailStore } from "stores/lagia-stores/tour/TourOrderDetailStore";
import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

import { mapWritableState, storeToRefs, mapState } from "pinia";
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
import { date } from "quasar";
import { mapWritableState } from "pinia";

import { useTourOrderDetailStore } from "stores/lagia-stores/tour/TourOrderDetailStore";

export default {
  // props: ["scrollY"],
  data() {
    return {
      product_price: true,
      stickyPrice: null,

      step: 1,
    };
  },
  computed: {
    ...mapState(useTourOrderDetailStore, ['getFormCheck']),
    ...mapWritableState(useTourOrderDetailStore, [
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
    step() {
      this.onScrollUp("#product-detail");
    }
  },
  mounted() {
    const vm = this;
    const cookies_name =
      "TOUR-" + this.$route.params?.slug + "-" + this.$route.params?.slug_text; //window.location.href

    if (!this.$q.cookies.has(cookies_name)) return;
    vm.getCookies(cookies_name);
    return

    this.$q.notify({
      message: "Load Data Formulir?",
      color: "primary",
      position: "bottom",
      actions: [
        {
          label: "Ya",
          color: "white",
          handler: () => {
            vm.getCookies(cookies_name);
          },
        },
        {
          label: "Tidak",
          color: "white",
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  },
  // watch: {
  //   step(val) {
  //   }
  // },
  methods: {
    onScrollUp(el) {
      setTimeout(() => {

        // VERSION 1
        // document.querySelector(el).scrollIntoView({
        //   behavior: 'smooth'
        // });


        const ANCHOR = document.querySelector(el);
        if(!ANCHOR) return
        console.log('ANCHOR')
        this.$scrollToElement(ANCHOR);
      }, 500);
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
      console.log("SET COOKIES product-order");
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
    onSubmit(i) {
      this.$refs["side_price" + i][i]?.onSubmit();
    },
    onBubbleEventRangkuman() {
      for (let i = 0; i < this.record?.tourPrices.length; i++) {
        const id = this.record?.tourPrices[i].id;
        this.$refs["StoreDetailProductPriceSimulasiRef" + id][i]?.onSubmit();
      }
      this.$refs?.FormBookingCustomerDataRef.onSubmit();
      this.$refs?.FormInformasiRef.onSubmit();
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
