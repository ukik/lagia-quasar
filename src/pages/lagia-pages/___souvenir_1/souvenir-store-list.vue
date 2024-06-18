<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <q-no-ssr>
    <!-- DESCRIPTION -->
    <q-dialog v-model="dialog_value">
      <q-card style="min-width: 400px">
        <q-toolbar>
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

    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="talent_skills"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">Skill List</div>
            <q-space></q-space>
            <!-- <q-btn dense flat icon="list" @click="rental_vehicle_modal = true"></q-btn> -->
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px - 60px)" class="scroll">
          <TalentSkillDialog :item="record"></TalentSkillDialog>
        </q-card-section>

        <q-separator />
        <q-card-section style="height: 60px"> </q-card-section>
      </q-card>
    </q-dialog>

    <!-- PRICE -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="talent_prices"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">Price List</div>
            <q-space></q-space>
            <!-- <q-btn dense flat icon="list" @click="rental_vehicle_modal = true"></q-btn> -->
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px - 60px)" class="scroll">
          <TalentPriceDialog :item="record"></TalentPriceDialog>
        </q-card-section>

        <q-separator />
        <q-card-section style="height: 60px"> </q-card-section>
      </q-card>
    </q-dialog>

    <!-- SELENGKAPNYA -->
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
            <div class="text-h6 text-capitalize">{{ label }}</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <q-btn-group spread outline unelevated rounded class="bg-white q-mb-md">
            <q-btn
              @click="talent_skills = true"
              unelevated
              color="cyan"
              class="full-width"
            >
              <q-icon size="3em" name="emoji_events" />
              <div class="q-ml-md" v-if="$q.screen.width > 425">skill list</div>
            </q-btn>

            <q-btn
              @click="talent_prices = true"
              unelevated
              color="teal"
              class="full-width"
            >
              <q-icon size="3em" name="add_shopping_cart" />
              <div class="q-ml-md" v-if="$q.screen.width > 425">price list</div>
            </q-btn>
          </q-btn-group>

          <ProfileDialogCard :item="record"></ProfileDialogCard>
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
      <div v-for="(item, index) in records" class="col-12">
        <q-card flat bordered class="rounded-borders-2">
          <q-card-section :horizontal="$q.screen.width > 768" class="row q-pa-none">
            <q-img
              v-if="item?.image && item?.image.length > 0"
              loading="lazy"
              :ratio="16 / 9"
              class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
              :src="item?.image[0]"
              :error-src="$defaultErrorImage"
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
              :src="$defaultErrorImage"
            />

            <q-card-section class="bg-grey-2 row col flex items-start">
              <div class="text-box full-width q-px-sm col-12 text-capitalize">
                <h3>{{ item?.name }}</h3>
                <!-- <QItemLabelSimpleValue
                  label="name"
                  :value="item?.name"
                ></QItemLabelSimpleValue> -->
                <!-- <QItemLabelSimpleValue
                  label="email"
                  :value="item?.email"
                ></QItemLabelSimpleValue> -->
                <!-- <QItemLabelSimpleValue
                  label="phone"
                  :value="item?.phone"
                ></QItemLabelSimpleValue> -->
                <!-- <QItemLabelSimpleValue
                  label="location"
                  :value="item?.location"
                ></QItemLabelSimpleValue> -->
                <!-- <QItemLabelSimpleValue
                  label="address"
                  :value="item?.address"
                ></QItemLabelSimpleValue> -->
                <QItemLabelSimpleValue
                  label="codepos"
                  :value="item?.codepos"
                ></QItemLabelSimpleValue>
                <QItemLabelSimpleValue
                  label="city"
                  :value="item?.city"
                ></QItemLabelSimpleValue>
                <QItemLabelSimpleValue
                  label="country"
                  :value="item?.country"
                ></QItemLabelSimpleValue>
                <!-- <QItemLabelSimpleValue
                  label="policy"
                  :value="item?.policy"
                ></QItemLabelSimpleValue> -->
                <!-- <QItemLabelSimpleValue
                  label="description"
                  :value="item?.description"
                ></QItemLabelSimpleValue> -->

                <!-- <q-item dense>
                  <q-item-section>
                    <q-item-label lines="1">uuid</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">{{ item?.uuid }}</q-item-label>
                  </q-item-section>
                </q-item> -->
                <!-- <q-item dense>
                  <q-item-section>
                    <q-item-label lines="1">Nama</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">{{ item?.name }}</q-item-label>
                  </q-item-section>
                </q-item> -->
                <q-item
                  dense
                  v-ripple
                  clickable
                  @click="
                    dialog_value = true;
                    dialog_payload = { value: item?.policy, label: 'policy' };
                  "
                >
                  <q-item-section>
                    <q-item-label lines="1">policy</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">{{ item?.policy }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  dense
                  v-ripple
                  clickable
                  @click="
                    dialog_value = true;
                    dialog_payload = { value: item?.description, label: 'description' };
                  "
                >
                  <q-item-section>
                    <q-item-label lines="1">description</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">{{ item?.description }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  dense
                  v-ripple
                  clickable
                  @click="
                    dialog_value = true;
                    dialog_payload = { value: item?.location, label: 'location' };
                  "
                >
                  <q-item-section>
                    <q-item-label lines="1">location</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">{{ item?.location }}</q-item-label>
                  </q-item-section>
                </q-item>
                <!-- <q-item dense>
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
                </q-item>  -->
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
                  {{ item?.souvenirProductsCount }}
                  <small class="text-weight-light"> produk</small>
                </h6>
                <!-- <small class="col-12 text-center">( wahana ready )</small> -->
              </div>

              <div class="row col-12 justify-center">
                <q-btn-group outline rounded class="">
                  <q-btn
                    @click="onBubbleEvent({ label: 'venue', payload: item })"
                    outline
                    no-caps
                    class="text-weight-thin"
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
                    no-caps
                    class="text-weight-thin"
                    color="form"
                    text-color="white"
                    label="Layanan"
                  />
                  <q-separator vertical></q-separator>
                  <q-btn
                    @click="onBubbleEvent({ label: 'fasilitas', payload: item })"
                    outline
                    no-caps
                    class="text-weight-thin"
                    color="form"
                    text-color="white"
                    label="Wahana"
                  />
                </q-btn-group>
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
import QItemLabelSimpleValue from "./components/QItemLabelSimpleValue";
import ProfileDialogCard from "./components/ProfileDialogCard";
// import RentalListCard from "./components/RentalListCard";
import TourismFacilitiesDialog from "./components/TourismFacilitiesDialog";
// import PriceVehicleDialog from "./components/PriceVehicleDialog";
// import RentalDetailCard from "./components/RentalDetailCard";

// import QItemLabelValueMobile from "./components/QItemLabelValueMobile";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useSouvenirStoreListStore } from "stores/lagia-stores/souvenir/SouvenirStoreListStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
const store = useSouvenirStoreListStore();
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

      return useSouvenirStoreListStore(store).onFetch({
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

const ratingZero = 0;

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
