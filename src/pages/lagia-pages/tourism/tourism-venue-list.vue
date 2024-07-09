<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <q-no-ssr>
    <q-no-ssr>
      <q-dialog v-model="dialog_value">
        <q-card style="min-width: 400px">
          <q-toolbar>
            <!-- <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
            </q-avatar> -->

            <q-toolbar-title
              ><span class="text-capitalize">{{
                dialog_payload?.label
              }}</span></q-toolbar-title
            >

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>

          <q-separator></q-separator>

          <q-card-section>
            {{ dialog_payload?.value }}
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-no-ssr>

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
            <div class="text-h6 text-capitalize">Detail Venue</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <!-- <div class="row q-col-gutter-md q-mb-md">
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
          </div> -->

          <VenueDialogCard :item="record"></VenueDialogCard>

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
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div class="col-12" v-if="records.length <= 0 && !loading">
        <NoData></NoData>
      </div>
      <div v-else v-for="(item, index) in records" class="col-12">
        <q-card flat bordered class="rounded-borders-2">
          <q-card-section :horizontal="$q.screen.width > 768" class="row q-pa-none">
            <q-img
              v-if="item?.image && item?.image.length > 0"
              loading="lazy"
              :ratio="16 / 9"
              class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
              :src="item?.image[0]"
            >
              <div class="absolute-top-right bg-transparent">
                <q-btn
                  size="16px"
                  rounded
                  dense
                  color="white"
                  text-color="primary"
                  icon="fullscreen"
                  @click="showMultiple(item?.image, 0)"
                />
              </div>

              <template v-slot:error>
                <div class="absolute-full flex flex-center text-white">
                  Cannot load image
                </div>
              </template>
            </q-img>
            <q-img
              loading="lazy"
              :ratio="16 / 9"
              class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
              v-else
              :src="$defaultUser"
            />

            <q-card-section class="bg-grey-2 row col flex items-start">
              <div class="text-box full-width q-px-sm col-12 text-capitalize">
                <!-- <h3>{{ item?.name }}</h3> -->
                <q-item
                  dense
                  clickable
                  class="q-pa-none"
                  :to="{
                    name: '/tourism/facilities-list',
                    query: {
                      vendor: item?.id,
                    },
                  }"
                >
                  <q-item-section class="text-h6">
                    <q-item-label>{{ item?.name }}</q-item-label>
                  </q-item-section>
                </q-item>

                <isQItemLabelSimpleValue
                  label="Nama"
                  :value="item?.name"
                ></isQItemLabelSimpleValue>

                <isQItemLabelSimpleValue
                  @onBubbleEvent="
                    dialog_value = true;
                    dialog_payload = { value: item?.policy, label: 'policy' };
                  "
                  :clickable="true"
                  label="policy"
                  value="Detail"
                  textcolor="text-primary"
                ></isQItemLabelSimpleValue>

                <isQItemLabelSimpleValue
                  @onBubbleEvent="
                    dialog_value = true;
                    dialog_payload = { value: item?.description, label: 'description' };
                  "
                  :clickable="true"
                  label="description"
                  value="Detail"
                  textcolor="text-primary"
                ></isQItemLabelSimpleValue>

                <isQItemLabelSimpleValue
                  @onBubbleEvent="
                    dialog_value = true;
                    dialog_payload = { value: item?.location, label: 'location' };
                  "
                  :clickable="true"
                  label="location"
                  value="Detail"
                  textcolor="text-primary"
                ></isQItemLabelSimpleValue>

                <q-item dense>
                  <q-item-section>
                    <q-item-label>category</q-item-label>
                    <q-item-label class="">
                      <template v-for="(val, index) in item?.category">
                        <q-chip color="blue" class="q-ml-none" text-color="white">{{
                          val
                        }}</q-chip>
                      </template>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <isAvailable :item="item?.isAvailable"></isAvailable>
              </div>
            </q-card-section>

            <q-card-section
              class="bg-cyan-8 col-xl-4 col-lg-4 col-md-4 col-sm-5 col-12 row flex flex-center text-white q-pt-lg"
            >
              <!-- <q-badge
                color="pink"
                class="q-mr-lg rounded-borders-2"
                style="margin-top: -10px"
                floating
                ><span class="text-title q-ma-sm text-uppercase">{{ item?.category }}</span></q-badge
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

              <div v-if="false" class="full-width text-body text-center q-mx-sm">
                Review (34)
              </div>
              <div class="package-price col-12 text-center row q-mt-md">
                <h6 class="col-12">
                  {{ item?.tourismFacilitiesCount }}
                  <small class="text-weight-light"> wahana</small>
                </h6>
                <!-- <small class="col-12 text-center">( wahana ready )</small> -->
              </div>

              <div class="row col-12 justify-center">
                <q-btn-group outline rounded class="">
                  <q-btn
                    @click="onBubbleEvent({ label: 'venue', payload: item })"
                    outline
                    class="text-weight-normal"
                    color="form"
                    text-color="white"
                    label="Detail"
                  />
                  <q-separator vertical></q-separator>
                  <q-btn
                    @click="
                      tourism_services = true;
                      record = item;
                    "
                    outline
                    class="text-weight-normal"
                    color="form"
                    text-color="white"
                    label="Layanan"
                  />
                  <q-separator vertical></q-separator>
                  <q-btn
                    @click="onBubbleEvent({ label: 'fasilitas', payload: item })"
                    outline
                    class="text-weight-normal"
                    color="form"
                    text-color="white"
                    label="Wahana"
                  />
                </q-btn-group>

                <!-- <q-btn
                  @click="onBubbleEvent({ label: 'venue', payload: item })"
                  unelevated
                  outline
                  rounded
                  dense
                  class="q-px-lg q-py-sm q-mb-sm q-mt-md rounded-borders-3 text-weight-light q-mr-xs"
                  color="white"
                  label="Detail"
                />

                <q-btn
                  @click="
                    tourism_services = true;
                    record = item;
                  "
                  unelevated
                  outline
                  rounded
                  dense
                  class="q-px-lg q-py-sm q-mb-sm q-mt-md rounded-borders-3 text-weight-light q-mx-xs"
                  color="white"
                  label="Layanan"
                />
                <q-btn
                  @click="onBubbleEvent({ label: 'fasilitas', payload: item })"
                  unelevated
                  outline
                  rounded
                  dense
                  class="q-px-lg q-py-sm q-mb-sm q-mt-md rounded-borders-3 text-weight-light q-ml-xs"
                  color="white"
                  label="Wahana"
                /> -->
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
// preFetch: preFetch(async ({ store, currentRoute }) => {
//   const mystore = useYoutubeListStore(store);
//   await mystore.request({
//     page: currentRoute.params.page
//   });
// }),

import VenueDialogCard from "./components/VenueDialogCard";
import TourismFacilitiesDialog from "./components/TourismFacilitiesDialog";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useTourismVenueListStore } from "stores/lagia-stores/tourism/TourismVenueListStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
const store = useTourismVenueListStore();
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

      return useTourismVenueListStore(store).onFetch({
        currentPage: currentRoute?.query?.page,
      });
    }
  ),
});

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

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

const ratingZero = 0.0;

const layout = ref(false);
const record = ref(null);
const label = ref("");

const tourism_facilities = ref(false);
const tourism_services = ref(false);

const dialog_payload = ref(null);
const dialog_value = ref(false);

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
  dialog_payload.value = null;
  dialog_value.value = false;
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
