<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <q-no-ssr>
    <!-- TOURISM FACILITY -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="tourism_facilities"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">List Wahana</div>
            <q-space></q-space>
            <!-- <q-btn dense flat icon="list" @click="rental_vehicle_modal = true"></q-btn> -->
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <TourismFacilitiesDialog :item="record"></TourismFacilitiesDialog>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- TOURISM-SERVICES -->
    <q-dialog
      full-width
      v-model="tourism_services"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">Layanan Wisata</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <q-list bordered class="row">
            <q-item class="col-6" v-if="record?.tourismService?.isMedic">
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  icon="fa-solid fa-house-medical"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Medic</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="col-6" v-if="record?.tourismService?.isSecurity">
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  icon="fa-solid fa-tower-observation"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Security</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="col-6" v-if="record?.tourismService?.isWifi">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" icon="fa-solid fa-wifi" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Wifi</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="col-6" v-if="record?.tourismService?.isPark">
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  icon="fa-solid fa-square-parking"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Park</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="col-6" v-if="record?.tourismService?.isSouvenir">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" icon="fa-solid fa-gift" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Souvenir</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="col-6" v-if="record?.tourismService?.isCulinary">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" icon="fa-solid fa-burger" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Culinary</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="col-6" v-if="record?.tourismService?.isBar">
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  icon="fa-solid fa-wine-glass"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Bar</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="col-6" v-if="record?.tourismService?.isRestArea">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" icon="fa-solid fa-couch" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Rest Area</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="col-6" v-if="record?.tourismService?.isMushola">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" icon="fa-solid fa-mosque" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Mushola</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="col-6" v-if="record?.tourismService?.isToilet">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" icon="fa-solid fa-toilet" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Toilet</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="col-6" v-if="record?.tourismService?.isBathroom">
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  icon="fa-solid fa-restroom"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Bathroom</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
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
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">{{ label }}</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-6">
              <q-btn
                @click="tourism_services = true"
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
          </div>

          <VenueDialogCard v-if="label === 'venue'" :item="record"></VenueDialogCard>

          <!-- <PriceVehicleDialog
            v-if="label === 'vehicle'"
            :item="record"
          ></PriceVehicleDialog> -->
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
      <div
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
  <!-- <CallActionOffer></CallActionOffer> -->
  <!-- <CallAction></CallAction> -->
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
import PriceListCard from "./components/PriceListCard-2";
import VenueDialogCard from "./components/VenueDialogCard";
// import RentalListCard from "./components/RentalListCard";
import TourismFacilitiesDialog from "./components/TourismFacilitiesDialog";
// import PriceVehicleDialog from "./components/PriceVehicleDialog";
// import RentalDetailCard from "./components/RentalDetailCard";

// import QItemLabelValueMobile from "./components/QItemLabelValueMobile";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useTourismPriceListStore } from "stores/lagia-stores/tourism/TourismPriceListStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
const store = useTourismPriceListStore();
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

      return useTourismPriceListStore(store).onFetch({
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

const tourism_facilities = ref(false);
const tourism_services = ref(false);

function onBubbleEvent(value) {
  record.value = value?.payload;
  if (value?.label == "venue") {
    label.value = value?.label;
    layout.value = true;
  } else if (value?.label == "fasilitas") {
    tourism_facilities.value = true;
  }
}

function closeDialog() {
  layout.value = false;
  record.value = null;
  label.value = "";
  tourism_facilities.value = false;
  tourism_services.value = false;
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
