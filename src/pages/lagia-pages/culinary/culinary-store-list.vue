<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <q-no-ssr>
    <!-- DESCRIPTION -->
    <isModalDescription ref="isModal"></isModalDescription>

    <!-- PRODUCT -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="culinary_products"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">Product List</div>
            <q-space></q-space>
            <!-- <q-btn dense flat icon="list" @click="rental_vehicle_modal = true"></q-btn> -->
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px - 60px)" class="scroll">
          <CulinaryProductDialog :item="record"></CulinaryProductDialog>
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
      v-model="culinary_prices"
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
          <CulinaryPriceDialog :item="record"></CulinaryPriceDialog>
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
            <div class="text-h6 text-capitalize">Detail Vendor</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <!-- <div class="row flex flex-center">
            <q-btn-group
              spread
              outline
              unelevated
              rounded
              class="bg-white q-mb-md col-xl-8 col-lg-8 col-md-8 col-sm-8 col-auto"
            >
              <q-btn
                @click="culinary_products = true"
                unelevated
                color="cyan"
                :label="$q.screen.width > 425 ? 'product list' : ''"
                icon="inventory"
              >
              </q-btn>

              <q-btn
                @click="culinary_prices = true"
                unelevated
                color="teal"
                :label="$q.screen.width > 425 ? 'price list' : ''"
                icon="add_shopping_cart"
              >
              </q-btn>
            </q-btn-group>
          </div> -->

          <CulinaryStoreDialogCard :item="record"></CulinaryStoreDialogCard>
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
                <q-item
                  dense
                  clickable
                  class="q-pa-none"
                  :to="{
                    name: '/culinary/product-list',
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
                  label="codepos"
                  :value="item?.codepos"
                ></isQItemLabelSimpleValue>
                <isQItemLabelSimpleValue
                  label="city"
                  :value="item?.city"
                ></isQItemLabelSimpleValue>
                <isQItemLabelSimpleValue
                  label="country"
                  :value="item?.country"
                ></isQItemLabelSimpleValue>

                <isQItemLabelSimpleValue
                  @onBubbleEvent="
                    $refs.isModal.onOpen({
                      dialog_value: true,
                      dialog_payload: { value: item?.policy, label: 'policy' },
                    })
                  "
                  :clickable="true"
                  label="policy"
                  value="Detail"
                  textcolor="text-primary"
                ></isQItemLabelSimpleValue>

                <isQItemLabelSimpleValue
                  @onBubbleEvent="
                    $refs.isModal.onOpen({
                      dialog_value: true,
                      dialog_payload: { value: item?.description, label: 'description' },
                    })
                  "
                  :clickable="true"
                  label="description"
                  value="Detail"
                  textcolor="text-primary"
                ></isQItemLabelSimpleValue>

                <isQItemLabelSimpleValue
                  @onBubbleEvent="
                    $refs.isModal.onOpen({
                      dialog_value: true,
                      dialog_payload: { value: item?.location, label: 'location' },
                    })
                  "
                  :clickable="true"
                  label="location"
                  value="Detail"
                  textcolor="text-primary"
                ></isQItemLabelSimpleValue>
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
                  {{ item?.culinaryProductsCount }}
                  <small class="text-weight-light"> produk</small>
                </h6>
                <!-- <small class="col-12 text-center">( wahana ready )</small> -->
              </div>

              <div class="row col-12 justify-center">
                <q-btn-group outline rounded class="">
                  <q-btn
                    @click="
                      dialog_selengkapnya = true;
                      record = item;
                    "
                    outline
                    class="text-weight-normal"
                    color="form"
                    text-color="white"
                    label="Detail"
                  />
                  <q-separator vertical></q-separator>
                  <q-btn
                    @click="
                      culinary_products = true;
                      record = item;
                    "
                    outline
                    class="text-weight-normal"
                    color="form"
                    text-color="white"
                    label="Produk"
                  />
                  <q-separator vertical></q-separator>
                  <q-btn
                    @click="
                      culinary_prices = true;
                      record = item;
                    "
                    outline
                    class="text-weight-normal"
                    color="form"
                    text-color="white"
                    label="Harga"
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
  <CallAction></CallAction>

  <!-- </main> -->
</template>

<script async setup>
// preFetch: preFetch(async ({ store, currentRoute }) => {
//   const mystore = useYoutubeListStore(store);
//   await mystore.request({
//     page: currentRoute.params.page
//   });
// }),
// import PriceListCard from "./components/PriceListCard";
import CulinaryStoreDialogCard from "./components/CulinaryStoreDialogCard";
import CulinaryPriceDialog from "./components/CulinaryPriceDialog";
// import QItemLabelSimpleValue from "./components/QItemLabelSimpleValue";
import CulinaryProductDialog from "./components/CulinaryProductDialog";
// import PriceVehicleDialog from "./components/PriceVehicleDialog";
// import RentalDetailCard from "./components/RentalDetailCard";

// import QItemLabelValueMobile from "./components/QItemLabelValueMobile";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useCulinaryStoreListStore } from "stores/lagia-stores/culinary/CulinaryStoreListStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
const store = useCulinaryStoreListStore();
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

      return useCulinaryStoreListStore(store).onFetch({
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

const dialog_selengkapnya = ref(false);
const record = ref(null);

const culinary_prices = ref(false);
const culinary_products = ref(false);

// const dialog_payload = ref(null);
// const dialog_value = ref(false);

function closeDialog() {
  dialog_selengkapnya.value = false;
  record.value = null;
  culinary_prices.value = false;
  culinary_products.value = false;
  // dialog_payload.value = null;
  // dialog_value.value = false;
}

onBeforeRouteLeave((to, from, next) => {
  closeDialog();
  return next();
});
</script>

<script>
export default {
  // beforeRouteEnter(to, from, next) {
  //   // called before the route that renders this component is confirmed.
  //   // does NOT have access to `this` component instance,
  //   // because it has not been created yet when this guard is called!
  // },
};
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
