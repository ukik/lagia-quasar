<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <q-no-ssr>
    <!-- DETAIL -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="dialog_selengkapnya"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <!-- <q-card-section class="q-py-none bg-primary text-white">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Price</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section> -->
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Price</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>
        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <CulinaryPriceDialogDetailCard :item="record"></CulinaryPriceDialogDetailCard>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- STORE -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="culinary_store"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Store</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <CulinaryDialogCard :item="record"></CulinaryDialogCard>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- PRODUCT -->
    <!-- <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="culinary_product"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Culinary</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <CulinaryDialogCard :item="record"></CulinaryDialogCard>
        </q-card-section>
      </q-card>
    </q-dialog> -->
  </q-no-ssr>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div v-if="additional" class="col-12 q-mb-lg">
        <PriceReference :item="additional"></PriceReference>
      </div>
      <div class="col-12" v-if="records.length <= 0 && !loading">
        <NoData></NoData>
      </div>
      <div
        v-else
        v-for="(item, index) in records"
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
      >
        <PriceListCard @onBubbleEvent="onBubbleEvent" :item="item"></PriceListCard>
      </div>
      <div class="col-12 flex justify-center">
        <q-pagination
          :disable="loading"
          class="q-mt-lg"
          size="lg"
          v-model="currentPage"
          :max="lastPage"
          :max-pages="6"
          :input="$q.screen.width < 768"
          direction-links
          outline
          color="blue"
          active-design="unelevated"
          active-color="primary"
          active-text-color="white"
        />
      </div>
    </div>
  </div>
  <!-- Call To Action -->
  <CallActionOffer></CallActionOffer>
  <div class="call-action-box bg-color-callback bg-light-grey row justify-center">
    <div class="col-xl-6 col-lg-8 col-md-11 col-sm-12 col-12 text-center q-px-md">
      <h5>CALL TO ACTION</h5>
      <h2 class="q-py-lg">READY FOR UNFORGATABLE TRAVEL. REMEMBER US!</h2>
      <p>
        Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
        Vestibulum cumque laudantium. Sit ornare mollitia tenetur, aptent.
      </p>
      <div class="q-mt-xl">
        <q-btn
          icon="phone"
          dense
          unelevated
          rounded
          class="q-py-md q-px-lg q-ma-sm rounded-borders-4"
          color="primary"
          label="Contact Us!"
        />
        <q-btn
          icon-right="chevron_right"
          dense
          unelevated
          rounded
          outline
          class="q-py-md q-px-lg q-ma-sm rounded-borders-4"
          color="primary"
          label="Learn More"
        />
      </div>
    </div>
  </div>

  <!-- </main> -->
</template>

<script async setup>
import PriceListCard from "./components/PriceListCard";
import CulinaryDialogCard from "./components/CulinaryDialogCard";
import CulinaryPriceDialogDetailCard from "./components/CulinaryPriceDialogDetailCard";
import PriceReference from "./components/PriceReference";

// import CulinaryProductDialog from "./components/CulinaryProductDialog";
// import PriceVehicleDialog from "./components/PriceVehicleDialog";
// import RentalDetailCard from "./components/RentalDetailCard";

// import QItemLabelValueMobile from "./components/QItemLabelValueMobile";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useCulinaryPriceListStore } from "stores/lagia-stores/culinary/CulinaryPriceListStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";

const store = useCulinaryPriceListStore();
const { onFetch, onPaginate } = store; // have all reactive states here
const {
  errors,
  data,
  paginate,
  records,
  totalItem,
  page,
  orderField,
  orderDirection,
  isShowDataRecycle,
  search,
  lastPage,
  currentPage,
  perPage,

  loading,
  init,

  additional,
} = storeToRefs(store); // have all reactive states here

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
      if (!currentRoute?.query?.page)
        redirect({ name: currentRoute.name, query: { ...currentRoute.query, page: 1 } });

      return useCulinaryPriceListStore(store).onFetch({
        currentPage: currentRoute?.query?.page,
        query: currentRoute?.query,
      });
    }
  ),
});

const router = useRouter();

const onCurrentPage = async (val) => {
  console.log("onCurrentPage", router.currentRoute.value);
  const currentRoute = router.currentRoute.value;
  router.push({ query: { ...currentRoute.query, page: val.value } });
  onPaginate({ currentPage: val.value, query: currentRoute?.query });
};
watch(() => currentPage, onCurrentPage, {
  deep: true,
  // immediate: true,
});

const record = ref(null);

const dialog_selengkapnya = ref(false);

const culinary_store = ref(false);
// const culinary_product = ref(false);

// const dialog_payload = ref(null);
// const dialog_value = ref(false);

function onBubbleEvent(value) {
  record.value = value?.payload;
  if (value?.label == "store") culinary_store.value = true;
  if (value?.label == "detail") dialog_selengkapnya.value = true;
  // if (value?.label == "produk") culinary_product.value = true;
}

function closeDialog() {
  dialog_selengkapnya.value = false;
  culinary_store.value = false;
}

onBeforeRouteLeave((to, from, next) => {
  closeDialog();
  return next();
});
</script>

<style scoped>
.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}

.package-price {
  h6 {
    color: white;
    font-size: 40px;
    font-weight: 800;
    display: block;
  }
  small {
    margin-top: -15px;
  }
}

.text-box h3 {
  font-size: 22px;
  font-weight: 700;
}

.call-action-box p {
  font-size: medium;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

.q-item__label {
  /* margin-bottom: 25px; */
  /* color: white; */
  line-height: 1.6 !important;
}

.bg-color-callback {
  padding-top: 85px;
  padding-bottom: 85px;
}
.bg-light-grey {
  background-color: #f8f8f8;
}
</style>
