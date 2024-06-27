<template>
  <InnerBanner _title="Gallery"></InnerBanner>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12 q-px-md"
      :class="[$q.screen.width > 425 ? '' : '', $q.screen.width > 768 ? '' : '']"
    >
      <q-card flat class="col-12 q-pa-none">
        <div class="container">
          <template v-for="item in records">
            <div class="card">
              <RentalListCard
                @onBubbleEvent="onBubbleEvent"
                :item="item"
              ></RentalListCard>

              <!-- <q-img v-if="item?.image && item?.image.length > 0"
                loading="lazy"
                :ratio="16 / 9"
                class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                :src="item?.image[0]"
              >
                <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-negative text-white">
                    Cannot load image 
                  </div>
                </template>
              </q-img>
              <q-img loading="lazy" :ratio="16 / 9"
                class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                v-else :src="$defaultUser"
              /> -->
            </div>
          </template>
        </div>
      </q-card>
    </div>
  </div>

  <q-no-ssr>
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="layout"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">{{ label }}</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <StoreDetailBody v-if="label === 'vendor'" :record="record"></StoreDetailBody>
          <PricePublicListCard
            v-else-if="label === 'penawaran'"
            :item="record"
          ></PricePublicListCard>
          <ReservationDialog
            v-else-if="label === 'detail'"
            :item="record"
          ></ReservationDialog>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-no-ssr>

  <!-- ***Inner Banner html end here*** -->
  <!-- <div class="content-page-section row justify-center">
    <div
      class="row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div
        v-for="(item, index) in records"
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
      >
        <RentalListCard
          @onBubbleEvent="onBubbleEvent"
          :item="item"
        ></RentalListCard>

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
  </div> -->
</template>

<script setup>
import ReservationDialog from "./components/ReservationDialog";
import RentalListCard from "./components/RentalListCard";
import StoreDetailBody from "./components/StoreDetailBody";
import PricePublicListCard from "./components/PricePublicListCard";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useTransportVehicleListStore } from "stores/lagia-stores/transport/TransportVehicleListStore";
import { useRouter } from "vue-router";
const store = useTransportVehicleListStore();
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
      return useTransportVehicleListStore(store).onFetch({
        currentPage: currentRoute?.query?.page,
      });
    }
  ),
});

const router = useRouter();

const onCurrentPage = async (val) => {
  console.log("onCurrentPage", val);
  router.push({ query: { page: val.value } });
  onPaginate({ currentPage: val.value });
};
watch(() => currentPage, onCurrentPage, {
  deep: true,
  // immediate: true,
});

const layout = ref(false);
const record = ref(null);
const label = ref("");

function onBubbleEvent(value) {
  console.log(value?.payload);
  record.value = value?.payload;
  label.value = value?.label;
  layout.value = true;
}

const cards = [
  {
    id: "1",
    title: "Mr. Bean",
    image: "assets/images/img30.jpg",
    subtitle:
      "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
  },
  {
    id: "1",
    title: "Mr. Bean",
    image: "assets/images/img31.jpg",
    subtitle:
      "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
  },
  {
    id: "1",
    title: "Mr. Bean",
    image: "assets/images/img32.jpg",
    subtitle:
      "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
  },
  {
    id: "1",
    title: "Mr. Bean",
    image: "assets/images/img13.jpg",
    subtitle:
      "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
  },
  {
    id: "1",
    title: "Mr. Bean",
    image: "assets/images/img17.jpg",
    subtitle:
      "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
  },
  {
    id: "1",
    title: "Mr. Bean",
    image: "assets/images/img10.jpg",
    subtitle:
      "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
  },
];
</script>

<style scoped>
.container {
  list-style: none;
  column-gap: 10px;
  padding: 0;
  column-count: 1;
}
.card {
  width: 100%;
  height: auto;
  padding: 0;
  padding-bottom: 10px;
  margin: 0;
  box-sizing: border-box;
  /* border: 10px solid #ffffff00; */
  break-inside: avoid;
}

@media (min-width: 375px) and (max-width: 425px) {
  .container {
    column-count: 1;
  }
  /* .card {
    border-left: 2px solid #ffffff00;
    border-right: 2px solid #ffffff00;
    border-top: 5px solid #ffffff00;
    border-bottom: 5px solid #ffffff00;
  } */
}
@media (min-width: 425px) and (max-width: 768px) {
  .container {
    column-count: 1;
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    column-count: 2;
  }
}
@media (min-width: 1024px) and (max-width: 1440px) {
  .container {
    column-count: 2;
  }
}
@media (min-width: 1440px) {
  .container {
    column-count: 3;
  }
}

.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}
</style>
