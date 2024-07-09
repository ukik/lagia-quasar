<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <q-no-ssr>
    <!-- FASILITAS -->
    <q-dialog
      full-width
      v-model="lodge_facility"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">Fasilitas Umum</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <q-list bordered class="row">
            <isQItemLabelValueIcon
              label="Sport"
              icon="fa-solid fa-baseball"
              :value="record?.lodgeFacility?.facilitySport"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="Service"
              icon="fa-solid fa-hand-holding-hand"
              :value="record?.lodgeFacility?.facilityService"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="Public"
              icon="fa-solid fa-user-group"
              :value="record?.lodgeFacility?.facilityPublic"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="Kid & Pet"
              icon="fa-solid fa-paw"
              :value="record?.lodgeFacility?.facilityKidPet"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="In Room"
              icon="fa-solid fa-door-closed"
              :value="record?.lodgeFacility?.facilityInRoom"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="General"
              icon="fa-solid fa-house-user"
              :value="record?.lodgeFacility?.facilityGeneral"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="Connectivity"
              icon="fa-solid fa-hand-point-up"
              :value="record?.lodgeFacility?.facilityConnectivity"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="Business"
              icon="fa-solid fa-briefcase"
              :value="record?.lodgeFacility?.facilityBusiness"
            ></isQItemLabelValueIcon>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

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
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Price</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>
        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <LodgePriceDialogDetailCard :item="record"></LodgePriceDialogDetailCard>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- ROOM -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="lodge_room"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Kamar</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>
        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <PriceRoomDialogCard :item="record"></PriceRoomDialogCard>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- PROFILE -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="lodge_profile"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Hotel</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <!-- <div class="row q-col-gutter-md q-mb-md">
            <div class="col-6">
              <q-btn
                @click="lodge_facility = true"
                unelevated
                color="cyan"
                class="full-width"
              >
                <q-icon left size="3em" name="hot_tub" />
                <div>Layanan Wisata</div>
              </q-btn>
            </div>
            <div class="col-6">
              <q-btn
                @click="tourism_facilities = true"
                unelevated
                color="teal"
                class="full-width"
              >
                <q-icon left size="3em" name="weekend" />
                <div>Wahana Wisata</div>
              </q-btn>
            </div>
          </div> -->

          <PriceProfileDialogCard :item="record"></PriceProfileDialogCard>
        </q-card-section>
      </q-card>
    </q-dialog>
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
  <CallAction></CallAction>
  <!-- <div class="call-action-box bg-color-callback bg-light-grey row justify-center">
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
  </div> -->

  <!-- </main> -->
</template>

<script async setup>
import PriceListCard from "./components/PriceListCard";
import PriceProfileDialogCard from "./components/PriceProfileDialogCard";
import LodgePriceDialogDetailCard from "./components/LodgePriceDialogDetailCard";
import PriceRoomDialogCard from "./components/PriceRoomDialogCard";
import PriceReference from "./components/PriceReference";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useLodgePriceListStore } from "stores/lagia-stores/lodge/LodgePriceListStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";

const store = useLodgePriceListStore();
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

      return useLodgePriceListStore(store).onFetch({
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

const lodge_profile = ref(false);
const lodge_facility = ref(false);
const lodge_room = ref(false);

// const dialog_payload = ref(null);
// const dialog_value = ref(false);

function onBubbleEvent(value) {
  record.value = value?.payload;
  if (value?.label == "detail") dialog_selengkapnya.value = true;
  if (value?.label == "profile") lodge_profile.value = true;
  if (value?.label == "fasilitas") lodge_facility.value = true;
  if (value?.label == "room") lodge_room.value = true;
}

function closeDialog() {
  dialog_selengkapnya.value = false;
  lodge_profile.value = false;
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
