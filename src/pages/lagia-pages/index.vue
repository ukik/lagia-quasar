<template>
  <!-- {{ getCulinary }} -->
  <HomeTron :records="page_widget_tron"></HomeTron>

  <widgetTourProductList
    v-if="record_tour"
    :records="record_tour"
  ></widgetTourProductList>

  <widgetLodgeProfileList
    v-if="record_lodge"
    :records="record_lodge"
  ></widgetLodgeProfileList>

  <q-intersection once>
    <HomeCounter
      v-if="page_widget_counter"
      :records="page_widget_counter[0]"
    ></HomeCounter>
  </q-intersection>

  <WidgetTransportVehicleList
    v-if="record_transport"
    :records="record_transport"
  ></WidgetTransportVehicleList>

  <WidgetTourismVenueList
    v-if="record_tourism"
    :records="record_tourism"
  ></WidgetTourismVenueList>

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

  <!-- </div> -->
  <!-- <q-intersection key="1" @visibility="onVisibility"> -->
  <!-- tidak semua q-intersection bisa, di component jadi ya paham aja -->
  <HomePromo v-if="false"></HomePromo>

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
    v-if="record_culinary"
    :records="record_culinary"
  ></widgetCulinaryProductList>
  <widgetSouvenirProductList
    v-if="record_souvenir"
    :records="record_souvenir"
  ></widgetSouvenirProductList>
  <WidgetTalentProfileList
    v-if="record_talent"
    :records="record_talent"
  ></WidgetTalentProfileList>

  <HomeCallAction v-if="page_widget_call" :records="page_widget_call[0]"></HomeCallAction>
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
