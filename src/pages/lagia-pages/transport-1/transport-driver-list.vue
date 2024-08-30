<template>
  <!-- <main> -->
  <!-- <InnerBanner :_title="$route?.meta?.title"></InnerBanner> -->

  <q-no-ssr>
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="detail"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">Detail Vendor</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <RentalDetailCard :item="record"></RentalDetailCard>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="layout"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="myWidth">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">List Vehicle</div>
            <q-space></q-space>
            <!-- <q-btn dense flat icon="list" @click="detail = true"></q-btn> -->
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <!-- <StoreDetailBody v-if="label === 'vendor'" :record="record"></StoreDetailBody> -->
          <DriverDetailCard v-if="label === 'detail'" :item="record"></DriverDetailCard>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-no-ssr>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-lg q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <!-- <div
        v-for="(item, index) in records"
        class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
      >
        <DriverDetailCard
          @onBubbleEvent="onBubbleEvent"
          :item="item"
        ></DriverDetailCard>
      </div> -->
      <div
        v-for="(item, index) in records"
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
      >
        <q-card bordered flat class="rounded-borders-2">
          <q-img
            loading="lazy"
            :ratio="16 / 9"
            style="min-height: 500px"
            class="card-box"
            :src="item?.image"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-negative text-white">
                Cannot load image
              </div>
            </template>

            <div class="absolute-full bg-transparent flex justify-center items-end">
              <q-card
                flat
                class="text-box text-left text-dark q-mt-lg full-width rounded-borders-2"
              >
                <q-card-section>
                  <DestinationRating
                    :rating="item?.ratingAvg?.avgRating"
                  ></DestinationRating>

                  <!-- <q-btn dense
                    size="md"
                    color="primary"
                    class="text-weight-light"
                    flat
                    label="Travel Agent"
                  ></q-btn> -->

                  <h6 class="q-pt-xs">{{ item?.name }}</h6>

                  <!-- <QItemLabelSimpleValue label="id" :value="item?.id"></QItemLabelSimpleValue> -->
                  <!-- <QItemLabelSimpleValue label="userId" :value="item?.userId"></QItemLabelSimpleValue> -->
                  <!-- <QItemLabelSimpleValue label="name" :value="item?.name"></QItemLabelSimpleValue> -->
                  <QItemLabelSimpleValue
                    dense
                    label="daily Price"
                    :value="item?.dailyPrice"
                  ></QItemLabelSimpleValue>
                  <QItemLabelSimpleValue
                    dense
                    label="year Exp"
                    :value="item?.yearExp"
                  ></QItemLabelSimpleValue>
                  <!-- <QItemLabelSimpleValue label="isAvailable" :value="item?.isAvailable"></QItemLabelSimpleValue> -->
                  <!-- <QItemLabelSimpleValue
                    dense
                    label="isReserved"
                    :value="item?.isReserved"
                  ></QItemLabelSimpleValue> -->
                  <q-item class="col-12">
                    <q-item-section>
                      <q-item-label class="text-capitalize">Status</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label>
                        <q-chip
                          :color="!item?.isReserved ? 'pink' : 'positive'"
                          text-color="white"
                          :label="!item?.isReserved ? 'Sibuk' : 'Santai'"
                        ></q-chip>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <!-- <QItemLabelSimpleValue label="description" :value="item?.description"></QItemLabelSimpleValue> -->
                  <!-- <QItemLabelSimpleValue label="createdAt" :value="item?.createdAt"></QItemLabelSimpleValue>
                  <QItemLabelSimpleValue label="updatedAt" :value="item?.updatedAt"></QItemLabelSimpleValue>
                  <QItemLabelSimpleValue label="deletedAt" :value="item?.deletedAt"></QItemLabelSimpleValue> -->
                </q-card-section>
              </q-card>
            </div>

            <div class="absolute-top-right bg-transparent">
              <q-btn
                dense
                color="white"
                text-color="primary"
                icon="fullscreen"
                @click="showMultiple(item?.image, 0)"
              />
            </div>
            <div class="absolute-top-left bg-transparent">
              <q-btn
                @click="
                  onBubbleEvent({
                    payload: item,
                    label: 'detail',
                  })
                "
                dense
                color="white"
                text-color="red"
                icon="search"
              />
            </div>
          </q-img>

          <!-- <q-badge
            color="transparent"
            class="q-mr-lg q-pa-none"
            style="margin-top: -15px"
            floating
          >
            <q-chip color="pink" text-color="white" :label="item?.isReserved"></q-chip>
          </q-badge> -->
        </q-card>
      </div>

      <!-- MASONRY -->
      <!--
      <q-card flat class="col-12 q-pa-none">
        <div class="container q-ml-lg">
          <template v-for="item in records">
            <div class="card">
              <DriverDetailCard
                @onBubbleEvent="onBubbleEvent"
                :item="item"
              ></DriverDetailCard>
            </div>
          </template>
        </div>
      </q-card> -->

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
import DriverDetailCard from "./components/DriverDetailCard";
import RentalVehicleDialog from "./components/RentalVehicleDialog";
import StoreDetailBody from "./components/StoreDetailBody";
import RentalDetailCard from "./components/RentalDetailCard";
import QItemLabelSimpleValue from "./components/QItemLabelSimpleValue";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted, computed } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

import { useTransportDriverListStore } from "stores/lagia-stores/transport/TransportDriverListStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
const store = useTransportDriverListStore();
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
      if (!currentRoute?.query?.page)
        redirect({ name: currentRoute.name, query: { page: 1 } });

      return useTransportDriverListStore(store).onFetch({
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
  record.value = value?.payload;
  label.value = value?.label;
  layout.value = true;
}

const $q = useQuasar();
const myWidth = computed(() => {
  if ($q.screen.width > 768) {
    if (label.value == "vehicle") return "width: 80vw !important";
    return "width: 750px !important";
  } else {
    return "";
  }
});

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

const detail = ref(false);
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

.container {
  list-style: none;
  column-gap: 10px;
  padding: 0;
  column-count: 1;
}
.card {
  width: 100%;
  /* height: auto;*/
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
