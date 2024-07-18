<template>
  <!-- {{ getCulinary }} -->
  <HomeTron :records="page_widget_tron"></HomeTron>

  <WidgetDestination :records="record_destination"></WidgetDestination>

  <widgetLodgeProfileList :records="record_lodge"></widgetLodgeProfileList>

  <HomeCounter v-if="page_widget_counter" :records="page_widget_counter[0]"></HomeCounter>

  <WidgetTransportVehicleList :records="record_transport"></WidgetTransportVehicleList>

  <WidgetTourismVenueList :records="record_tourism"></WidgetTourismVenueList>

  <!-- <HomeDestination></HomeDestination> -->
  <HomePackage v-if="false"></HomePackage>

  <!-- <div v-intersection.once="onIntersection"> -->
  <HomeCallActionPromo :records="page_widget_promo"></HomeCallActionPromo>

  <!-- </div> -->
  <!-- <q-intersection key="1" @visibility="onVisibility"> -->
  <!-- tidak semua q-intersection bisa, di component jadi ya paham aja -->
  <HomePromo v-if="false"></HomePromo>

  <!-- </q-intersection> -->
  <!-- <div v-if="wait" class="full-width text-center q-mb-xl q-py-xl">
    <q-spinner color="primary" size="4em" />
  </div> -->
  <!-- <q-intersection @visibility="onVisibility" once> -->

  <q-intersection once>
    <WidgetGallery :records="record_gallery?.image"></WidgetGallery>
    <HomeCallActionOffer :records="page_widget_offer[0]"></HomeCallActionOffer>

    <!-- </q-intersection>
  <q-intersection once> -->

    <HomeBlog v-if="false"></HomeBlog>
    <HomeTestimonial :records="record_testimonial"></HomeTestimonial>

    <widgetCulinaryProductList :records="record_culinary"></widgetCulinaryProductList>
    <widgetSouvenirProductList :records="record_souvenir"></widgetSouvenirProductList>
    <WidgetTalentProfileList :records="record_talent"></WidgetTalentProfileList>

    <HomeCallAction :records="page_widget_call[0]"></HomeCallAction>
  </q-intersection>
</template>

<script async setup>
import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useIndexStore } from "stores/lagia-stores/page/IndexStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";

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
