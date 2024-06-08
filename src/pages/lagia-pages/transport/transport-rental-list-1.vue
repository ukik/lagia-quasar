<template>
  <!-- <main> -->
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
      <div v-for="(item, index) in records" class="col-12">
        <q-card flat bordered class="rounded-borders-2">
          <q-card-section :horizontal="$q.screen.width > 768" class="row q-pa-none">
            <q-img v-if="item?.image && item?.image.length > 0"
              loading="lazy"
              :ratio="16 / 9"
              class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
              :src="item?.image[0]"
            >
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-negative text-white">
                  Cannot load image {{ item?.image[0] }}
                </div>
              </template>
            </q-img>
            <q-img loading="lazy" :ratio="16 / 9"
              class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
              v-else :src="$defaultUser"
            />

















            <q-card-section class="bg-grey-2 row col flex items-start">
              <div class="text-box full-width q-px-sm col-12 text-capitalize">
                <h3>{{ item?.name }}</h3>
                <QItemLabelSimpleValue label="uuid" :value="item?.uuid"></QItemLabelSimpleValue>
                <QItemLabelSimpleValue label="email" :value="item?.email"></QItemLabelSimpleValue>
                <QItemLabelSimpleValue label="phone" :value="item?.phone"></QItemLabelSimpleValue>
                <QItemLabelSimpleValue label="location" :value="item?.location"></QItemLabelSimpleValue>
                <!-- <QItemLabelSimpleValue label="image" :value="item?.image"></QItemLabelSimpleValue> -->
                <QItemLabelSimpleValue label="address" :value="item?.address"></QItemLabelSimpleValue>
                <QItemLabelSimpleValue label="codepos" :value="item?.codepos"></QItemLabelSimpleValue>
                <QItemLabelSimpleValue label="city" :value="item?.city"></QItemLabelSimpleValue>
                <QItemLabelSimpleValue label="country" :value="item?.country"></QItemLabelSimpleValue>
                <QItemLabelSimpleValue label="policy" :value="item?.policy"></QItemLabelSimpleValue>
                <QItemLabelSimpleValue label="description" :value="item?.description"></QItemLabelSimpleValue>
              </div>
            </q-card-section>

            <q-card-section
              class="bg-light-blue-8 col-xl-4 col-lg-4 col-md-4 col-sm-5 col-12 row flex flex-center text-white q-pt-lg"
            >
              <!-- <q-badge
                color="pink"
                class="q-mr-lg rounded-borders-2"
                style="margin-top: -10px"
                floating
                ><span class="text-title q-ma-sm text-uppercase">Vendor</span></q-badge
              > -->

              <q-rating
                v-if="item?.ratingAvg?.avgRating"
                readonly
                v-model="item.ratingAvg.avgRating"
                size="sm"
                :max="5"
                color="white"
              ></q-rating>

              <q-rating
                v-else
                readonly
                v-model="ratingZero"
                size="sm"
                :max="5"
                color="white"
              ></q-rating>

              <div v-if="false" class="full-width text-body text-center q-mx-sm">Review (34)</div>
              <div class="package-price col-12 text-center row q-mt-md">
                <h6 class="col-12">
                  {{ item?.slotPassanger }}
                  <small class="text-weight-light">seat</small>
                </h6>
                <small class="col-12 text-center">( maximum slot )</small>
              </div>

              <div class="row col-12 justify-center">
                <!-- <q-btn
                  unelevated
                  outline
                  rounded
                  dense
                  class="q-px-lg q-py-sm q-mb-sm q-mt-md rounded-borders-3 text-weight-light"
                  color="white"
                  label="Price List"
                />
                <div class="col-1"></div> -->
                <q-btn
                  unelevated
                  outline
                  rounded
                  dense
                  class="q-px-lg q-py-sm q-mb-sm q-mt-md rounded-borders-3 text-weight-light"
                  color="white"
                  label="Visit Detail"
                />
              </div>
            </q-card-section>
          </q-card-section>

          <!-- <q-card-action>
              <q-item-label class="text-black text-center" lines="3">{{ item?.subtitle }}</q-item-label>
            </q-card-action> -->
        </q-card>
      </div>
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
// preFetch: preFetch(async ({ store, currentRoute }) => {
//   const mystore = useYoutubeListStore(store);
//   await mystore.request({
//     page: currentRoute.params.page
//   });
// }),
import QItemLabelSimpleValue from "./components/QItemLabelSimpleValue"

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from 'quasar/wrappers'

import { useTransportRentalListStore } from "stores/lagia-stores/transport/TransportRentalListStore";
import { useRouter } from "vue-router";
const store = useTransportRentalListStore();
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
} = storeToRefs(store); // have all reactive states here

defineOptions({
  preFetch: preFetch(({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) => {
    return useTransportRentalListStore(store).onFetch({ currentPage: currentRoute?.query?.page });
  })
})

const router = useRouter()

const onCurrentPage = async (val) => {
  console.log("onCurrentPage", val);
  router.push({ query: { page: val.value } })
  onPaginate({ currentPage: val.value });
};
watch(() => currentPage, onCurrentPage, {
  deep: true,
  // immediate: true,
});

const ratingZero = 0;

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
