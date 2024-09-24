<template>
  <!-- {{ getCulinary }} -->
  <HomeTron :records="page_widget_tron"></HomeTron>

  <q-intersection once>
    <HomeCounter
      v-if="page_widget_counter"
      :records="page_widget_counter[0]"
    ></HomeCounter>
  </q-intersection>

  <div class="col-12 text-center q-px-md bg-blue-1 q-py-lg">
    <!-- <h6 class="text-blue">PILIH LOKASI</h6> -->
    <h2 class="text-primary q-ma-none">TOUR SECTION</h2>
  </div>

  <widgetTourPriceList
    v-if="record_tour_price"
    :records="record_tour_price"
    :total="record_tour_price_total"
  ></widgetTourPriceList>

  <widgetTourCategory
    v-if="tour_products_category"
    :records="tour_products_category"
  ></widgetTourCategory>

  <!-- <widgetTourCity
    v-if="tour_products_city"
    :records="tour_products_city"
  ></widgetTourCity> -->

  <widgetTourProvince
    v-if="tour_products_province"
    :records="tour_products_province"
  ></widgetTourProvince>

  <widgetTourDurasi
    v-if="tour_products_durasi"
    :records="tour_products_durasi"
  ></widgetTourDurasi>

  <widgetTourLevel
    v-if="tour_products_level"
    :records="tour_products_level"
  ></widgetTourLevel>

  <!-- <widgetTourProductList
    v-if="record_tour"
    :records="record_tour"
  ></widgetTourProductList>
 -->
  <!-- <widgetLodgeProfileList
    v-if="record_lodge"
    :records="record_lodge"
  ></widgetLodgeProfileList> -->
  <!-- </div> -->
  <!-- <q-intersection key="1" @visibility="onVisibility"> -->
  <!-- tidak semua q-intersection bisa, di component jadi ya paham aja -->
  <HomePromo v-if="false"></HomePromo>

  <div class="big-top-margin col-12 text-center q-px-md bg-pink-1 q-py-lg">
    <!-- <h6 class="text-blue">PILIH LOKASI</h6> -->
    <h2 class="text-pink q-ma-none">RENTAL SECTION</h2>
  </div>

  <WidgetTransportVehicleList
    v-if="record_transport"
    :records="record_transport"
  ></WidgetTransportVehicleList>


  <div class="big-top-margin col-12 text-center q-px-md bg-green-1 q-py-lg">
    <!-- <h6 class="text-blue">PILIH LOKASI</h6> -->
    <h2 class="text-green q-ma-none">WISATA SECTION</h2>
  </div>


  <WidgetTourismVenueList
    v-if="record_tourism"
    :records="record_tourism"
  ></WidgetTourismVenueList>



  <div class="big-top-margin col-12 text-center q-px-md bg-orange-1 q-py-lg">
    <!-- <h6 class="text-blue">PILIH LOKASI</h6> -->
    <h2 class="text-orange q-ma-none">JASA SECTION</h2>
  </div>

  <WidgetTalentProfileList
    v-if="record_talent"
    :records="record_talent"
  ></WidgetTalentProfileList>


  <!-- <HomeDestination></HomeDestination> -->
  <HomePackage v-if="false"></HomePackage>

  <WidgetDestination
    v-if="record_destination && false"
    :records="record_destination"
  ></WidgetDestination>

  <!-- <div v-intersection.once="onIntersection"> -->
  <HomeCallActionPromo
    v-if="page_widget_promo"
    :records="page_widget_promo"
  ></HomeCallActionPromo>

  <!-- </q-intersection> -->
  <!-- <div v-if="wait" class="full-width text-center q-mb-xl q-py-xl">
    <q-spinner color="primary" size="4em" />
  </div> -->
  <!-- <q-intersection @visibility="onVisibility" once> -->

  <!-- <q-intersection once> -->
  <WidgetGallery v-if="record_gallery" :records="record_gallery?.image"></WidgetGallery>

  <HomeCallActionOffer
    v-if="page_widget_offer"
    :records="page_widget_offer[0]"
  ></HomeCallActionOffer>

  <!-- </q-intersection>
  <q-intersection once> -->

  <HomeBlog v-if="false"></HomeBlog>

  <HomeTestimonial
    v-if="record_testimonial"
    :records="record_testimonial"
  ></HomeTestimonial>

  <widgetCulinaryProductList
    v-if="record_culinary && false"
    :records="record_culinary"
  ></widgetCulinaryProductList>

  <widgetSouvenirProductList
    v-if="record_souvenir && false"
    :records="record_souvenir"
  ></widgetSouvenirProductList>


  <HomeCallAction class="big-top-margin" v-if="page_widget_call" :records="page_widget_call[0]"></HomeCallAction>
  <!-- </q-intersection> -->
</template>

<script async setup>
import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useIndexStore } from "stores/lagia-stores/page/IndexStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";

import widgetTourPriceList from "./tour/widget-price-list.vue";

import widgetTourCategory from "./tour/widget-category.vue";
import widgetTourCity from "./tour/widget-city.vue";
import widgetTourProvince from "./tour/widget-province.vue";
import widgetTourDurasi from "./tour/widget-durasi.vue";
import widgetTourLevel from "./tour/widget-level.vue";

import widgetTourProductList from "./tour/widget-product-list.vue";
import widgetCulinaryProductList from "./culinary/widget-culinary-product-list.vue";
import widgetSouvenirProductList from "./souvenir/widget-souvenir-product-list.vue";
import widgetLodgeProfileList from "./lodge/widget-lodge-profile-list.vue";
import WidgetDestination from "./components/widget-destination.vue";
import WidgetGallery from "./components/widget-gallery.vue";
import WidgetTalentProfileList from "./talent/widget-talent-profile-list.vue";
import WidgetTransportVehicleList from "./transport/widget-transport-vehicle-list.vue";
import WidgetTourismVenueList from "./tourism/widget-tourism-venue-list.vue";

defineOptions({
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
      return useIndexStore(store).onFetch();
    }
  ),
});

const $store = useIndexStore();
const {
  dataType,
  record,
  isMaintenance,

  record_destination,
  record_gallery,
  record_testimonial,

  record_tour,
  record_tour_price,
  record_tour_price_total,
  record_culinary,
  record_souvenir,
  record_lodge,
  record_talent,
  record_transport,
  record_tourism,

  page_widget_call,
  page_widget_counter,
  page_widget_offer,
  page_widget_promo,
  page_widget_tron,

  tour_products_category,
  tour_products_city,
  tour_products_province,
  tour_products_durasi,
  tour_products_level,

  loading,
} = storeToRefs($store); // have all reactive states here

const rating = 0.0;

function closeDialog() {}

onBeforeRouteLeave((to, from, next) => {
  closeDialog();
  return next();
});

const wait = ref(true);
function onIntersection(val) {
  console.log("onIntersection", val);
}

function onVisibility(val) {
  console.log("onVisibility", val);
  wait.value = false;
}
</script>

<style lang="css" scoped>
.bg-padding {
  padding-top: 85px;
  padding-bottom: 85px;
}
.big-top-margin {
  margin-top: 85px;
}
</style>
