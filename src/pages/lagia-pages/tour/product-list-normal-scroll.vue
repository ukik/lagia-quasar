<template>
  <!-- <main> -->
  <!-- <InnerBanner :_title="$route?.meta?.title"></InnerBanner> -->

  <q-no-ssr>
    <isModalDescription ref="isModal"></isModalDescription>
  </q-no-ssr>

  <!-- ***Inner Banner html end here*** -->
  <div id="product-list-virtual" class="content-page-section row justify-center">
    <div class="col-12 flex flex-center">
      <!-- <div class="full-width text-center q-mb-xl">
        <q-btn-group unelevated outline>
          <q-btn
            color="form"
            text-color="white"
            to="/tour/product-list"
            label="Paket Tour"
            icon="explore"
          />
          <q-btn
            color="white"
            outline
            text-color="black"
            to="/tour/price-list"
            label="Harga Tour"
            icon-right="fa-solid fa-tags"
          />
        </q-btn-group>
      </div> -->

      <!-- <q-pagination
        :disable="loading"
        class="q-mb-xl"
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
      /> -->

      <!-- <q-pagination
        :disable="loading"
        class="q-mb-xl"
        size="lg"
        v-model="currentPage"
        :max="lastPage"
        :max-pages="6"
        :input="$q.screen.width < 768"
        direction-links

        color="blue"
        active-design="unelevated"
        active-color="primary"
        active-text-color="white"
      /> -->
    </div>
    <div
      class="row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <!-- <div v-if="additional" class="col-12 q-mb-lg">
        <q-list bordered>
          <q-expansion-item group="somegroup" header-class="bg-grey-1" default-opened>
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <q-icon name="storefront"></q-icon>
                </q-avatar>
              </q-item-section>

              <q-item-section class="text-h6 text-dark"> PROFILE VENDOR </q-item-section>
            </template>
            <q-separator />

            <q-card>
              <q-card-section>
                <PriceReferenceStore :item="additional"></PriceReferenceStore>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div> -->
      <div class="col-12 q-mb-lg">
        <IsFilterProductList></IsFilterProductList>
      </div>

      <div v-if="records.length <= 0 && loading" class="col-12 text-center">
        <q-spinner color="primary" size="3em" />
      </div>

      <div class="col-12" v-if="records.length <= 0 && !loading">
        <NoData></NoData>
      </div>

      <div
        v-else
        v-for="(item, index) in records"
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
      >
        <q-card square flat bordered class="rounded-borders-2">
          <q-card-section class="row q-pa-none">
            <isImageSlideCarousel
              v-if="item?.image && item?.image.length > 0"
              height="300px"
              class="rounded-borders-0 col-12"
              :_gallery="item?.image"
            ></isImageSlideCarousel>

            <q-img
              height="300px"
              loading="lazy"
              :ratio="1"
              class="col-12"
              v-else
              :src="$defaultErrorImage"
            />

            <!-- <q-img
              height="300px"
              loading="lazy"
              :ratio="1"
              class="col-12 q-border-bottom"
              v-else
              :src="$defaultErrorImage"
            >
              <div v-if="$q.screen.width > 425" class="absolute-bottom">
                {{ item?.name }}
              </div>

              <div class="absolute-full bg-transparent q-pa-none">
                <q-btn
                  class="absolute-full"
                  :to="{
                    name: '/tour/product-detail',
                    params: {
                      slug: item?.id,
                      slug_text: item?.slug,
                    },
                  }"
                >
                </q-btn>
              </div>
            </q-img> -->

            <q-card-section class="col-12 q-pa-none">
              <!-- <q-list class="col-12"> -->
              <q-item
                style="height: 67px"
                clickable
                :to="{
                  name: '/tour/product-detail',
                  params: {
                    slug: item?.id,
                    slug_text: item?.slug,
                  },
                }"
              >
                <q-item-section class="text-title">
                  <q-item-label lines="2">{{ item?.name }} </q-item-label>
                  <!-- <q-item-label caption>dibuat: {{ item?.createdAt }}</q-item-label> -->
                </q-item-section>
              </q-item>

              <q-separator></q-separator>
            </q-card-section>
            <q-card-section class="col-12 q-pa-none q-py-sm">
              <!-- <q-item dense v-if="$q.screen.width > 425">
                <q-item-section>
                  <q-item-label caption>Kategori</q-item-label>
                  <q-item-label lines="1" class="text-capitalize">
                    {{ item?.category }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-else
                clickable
                v-ripple
                :to="{
                  name: '/tour/product-detail',
                  params: {
                    slug: item?.id,
                    slug_text: item?.slug,
                  },
                }"
              >
                <q-item-section>
                  <q-item-label>
                    {{ item?.name }}
                  </q-item-label>
                </q-item-section>
              </q-item> -->
              <q-item dense>
                <q-item-section>
                  <q-item-label caption>Level Petualangan</q-item-label>
                  <q-item-label class="text-capitalize">

                    <q-rating
                      v-if="item?.level"
                      readonly
                      v-model="item.level"
                      size="xs"
                      :max="5"
                      color="red"
                    ></q-rating>

                    <q-rating
                      v-else
                      readonly
                      v-model="ratingZero"
                      size="xs"
                      :max="5"
                      color="red"
                    ></q-rating>

                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense>
                <q-item-section>
                  <q-item-label caption>Kategori</q-item-label>
                  <q-item-label class="text-capitalize">
                    {{ item?.category }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense>
                <q-item-section>
                  <q-item-label caption>Durasi</q-item-label>
                  <q-item-label class="text-capitalize">
                    {{ item?.durasi }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense>
                <q-item-section>
                  <q-item-label caption>Destinasi</q-item-label>
                  <q-item-label class="text-capitalize">
                    {{ item?.province ? item?.province : "_" }} / {{ item?.city ? item?.city : "_" }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <!-- </q-list> -->
            </q-card-section>

            <q-card-section class="col-12 q-pa-none">
              <q-separator></q-separator>

              <IsExpanstionWidget>
                <template v-slot:content>
                  <q-card>
                    <q-item>
                      <q-item-section>
                        <q-item-label caption class="text-capitalize"
                          >Harga Dewasa</q-item-label
                        >
                        <q-item-label class="text-h5">{{
                          $currency($finalPrice(item?.tourPrice))
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator></q-separator>

                    <q-item>
                      <q-item-section>
                        <q-item-label caption class="text-capitalize"
                          >Harga Anak (2-6 tahun)</q-item-label
                        >
                        <q-item-label class="text-h5">{{
                          $currency($finalPriceAnak(item?.tourPrice))
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-separator></q-separator>

                    <q-card-section>
                      {{ item?.tourPrice?.description ? item?.tourPrice?.description : '_' }}
                    </q-card-section>

                    <q-separator></q-separator>

                    <q-card-section class="custom q-pa-none">
                      <q-list class="row flex items-start text-caption text-dark">
                        <isQItemLabelValue
                          label="HPP Dewasa"
                          :value="$currency(item?.tourPrice?.generalPrice)"
                        ></isQItemLabelValue>
                        <isQItemLabelValue
                          label="HPP Anak (2-6 tahun)"
                          :value="$currency(item?.tourPrice?.generalPriceChild)"
                        ></isQItemLabelValue>
                        <isQItemLabelValue
                          label="Diskon"
                          :value="$percent(item?.tourPrice?.discountPrice)"
                        ></isQItemLabelValue>
                        <isQItemLabelValue
                          label="Cashback"
                          :value="$currency(item?.tourPrice?.cashbackPrice)"
                        ></isQItemLabelValue>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </template>
              </IsExpanstionWidget>
            </q-card-section>

            <!-- <q-card-section class="q-pa-none"> -->
            <!-- <q-btn-group spread unelevated class="full-width">
                <q-btn
                  :to="{
                    name: '/tour/product-detail',
                    params: {
                      slug: item?.id,
                      slug_text: item?.slug,
                    },
                  }"
                  label="detail produk"
                  icon="visibility"
                />
                <q-separator vertical></q-separator>
                <q-btn
                  @click="
                    $emit('onBubbleEvent', {
                      label: 'store',
                      payload: item,
                    })
                  "
                  label="detail vendor"
                  icon="storefront"
                />
              </q-btn-group> -->
            <!-- </q-card-section> -->

            <!-- <q-separator></q-separator> -->

            <q-btn
              unelevated
              square
              :to="{
                name: '/tour/product-order',
                params: {
                  slug: item?.id,
                  slug_text: item?.slug,
                },
              }"
              class="full-width"
              style="border-radius: 0px"
              color="form"
              text-color="white"
              label="Buat Pesanan"
              icon="shopping_cart_checkout"
            />

            <!-- <q-btn
              unelevated
              square
              class="full-width"
              style="border-radius: 0px"
              @click="
                $global.$emit('LagiaLayout', {
                  label: 'konsultasi',
                  slug: 'konsultasi',
                  vendor: 'tourProduct',
                  value: item,
                  product: 'tourProduct',
                })
              "
              color="positive"
              text-color="white"
              label="Tanya Admin"
              icon="fa-brands fa-whatsapp"
            /> -->
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-if="currentPage < lastPage" class="col-12 flex flex-center q-mt-lg q-pt-lg">
      <q-btn
        :disable="loading"
        :loading="loading"
        @click="onLoadMore"
        :color="currentPage < lastPage ? 'primary' : 'negative'"
        unelevated
        :label="currentPage < lastPage ? 'Load More' : 'Maksimal'"
      ></q-btn>
      <!-- <q-pagination
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
      /> -->
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
import PriceReferenceStore from "./components/PriceReferenceStore";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useTourProductListStore } from "stores/lagia-stores/tour/TourProductListStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import IsExpanstionWidget from "./components/IsExpanstionWidget.vue";
import IsFilterProductList from "./components/widget/isFilterProductList.vue";
const store = useTourProductListStore();
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
  to,

  loading,
  init,

  is_loadmore,
  additional,
} = storeToRefs(store); // have all reactive states here

defineOptions({
  preFetch: preFetch(
    async ({
      store,
      currentRoute,
      previousRoute,
      redirect,
      ssrContext,
      urlPath,
      publicPath,
    }) => {
      // untuk infinity scroll
      if (!currentRoute?.query?.page || currentRoute?.query?.page != 1)
        redirect({ name: currentRoute.name, query: { ...currentRoute.query, page: 1 } });

      return useTourProductListStore(store).onFetch({
        currentPage: 1,
        query: { ...currentRoute.query, page: 1 },
      });

      // untuk PAGINATION
      if (!currentRoute?.query?.page)
        redirect({ name: currentRoute.name, query: { ...currentRoute.query, page: 1 } });

      return useTourProductListStore(store).onFetch({
        currentPage: currentRoute?.query?.page,
        query: currentRoute?.query,
      });
    }
  ),
});

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

const router = useRouter();

const onCurrentPage = async (val) => {
  const currentRoute = router.currentRoute.value;

  console.log("onCurrentPage", val.value, currentRoute.query.page);

  // below for PAGINATION fitur
  // await router.push({ query: { ...currentRoute.query, page: val.value } });
};
// watch(() => currentPage, onCurrentPage, {
//   deep: true,
//   // immediate: true,
// });

const routerPageQuery = async (val) => {
  const currentRoute = router.currentRoute.value;

  console.log("routerPageQuery", val.value, currentRoute.query.page);

  await onPaginate({ currentPage: val.value, query: currentRoute?.query });
};
watch(() => router.currentRoute, routerPageQuery, {
  deep: true,
  // immediate: true,
});

const $q = useQuasar();

async function LoadMoreSetup() {
  console.log(currentPage.value, lastPage.value);

  if (loading.value) return;

  if (Number(currentPage.value) >= Number(lastPage.value)) {
    // $q.notify("Sudah maksimal");
    return;
  }

  currentPage.value = Number(currentPage.value) + 1;

  const currentRoute = router.currentRoute.value;

  router.push({ query: { ...currentRoute.query, page: currentPage.value } });
}

function onLoadMore() {
  is_loadmore.value = true
  LoadMoreSetup();
}

function onVirtualScroll({ index }) {
  console.log(index)
  if(loading.value) return
  ///if( index >= (Number(to?.value) - 1) ) LoadMoreSetup()
  // virtualListIndex.value = index;
}

const ratingZero = 0.0;

const record = ref(null);

const modal_detail = ref(false);
const lodge_profiles = ref(false);
const lodge_facility = ref(false);

function onBubbleEvent(value) {
  record.value = value?.payload;
}

function closeDialog() {
  record.value = null;

  modal_detail.value = false;
  lodge_profiles.value = false;
  lodge_facility.value = false;
}

onBeforeRouteLeave((to, from, next) => {
  closeDialog();
  return next();
});

function getCategory(item) {
  if (!item) return [];
  try {
    return item.split(",");
  } catch (error) {
    return item;
  }
}

function getSplit(item) {
  if (!item) return [];
  try {
    return item.split(",");
  } catch (error) {
    return item;
  }
}
</script>

<script>
export default {
  mounted() {
    var elements = document.getElementsByClassName('q-virtual-scroll__content');
    for (var i in elements) {
      if (elements.hasOwnProperty(i)) {
        elements[i].className = 'q-virtual-scroll__content q-col-gutter-md';
      }
    }
  }
}
</script>


<style>
#product-list-virtual .q-virtual-scroll__content {
  outline: none;
  contain: content;
  display: flex;
  flex-wrap: wrap;
}
/* #product-list-virtual .q-col-gutter-y-md,
#product-list-virtual .q-col-gutter-md {
  margin-top: -16px;
} */
</style>

<style scoped>
/* .grid_virtual {
  width: calc(100%);
} */
@media only screen and (min-device-width: 425px) {
  .grid_virtual {
    width: calc(100%) !important;
  }
  .grid_virtual:nth-child(1) {
    padding-top: 0px !important;
  }
}

@media only screen and (min-device-width: 768px) {
  .grid_virtual {
    width: calc(100% / 2) !important;
  }
  .grid_virtual:nth-child(1) {
    padding-top: 0px !important;
  }
  .grid_virtual:nth-child(2) {
    padding-top: 0px !important;
  }
}

@media only screen and (min-device-width: 1024px) {
  .grid_virtual {
    width: calc(100% / 3) !important;
  }
  .grid_virtual:nth-child(1) {
    padding-top: 0px !important;
  }
  .grid_virtual:nth-child(2) {
    padding-top: 0px !important;
  }
  .grid_virtual:nth-child(3) {
    padding-top: 0px !important;
  }
}

@media only screen and (min-device-width: 1440px) {
  .grid_virtual {
    width: calc(100% / 3) !important;
  }
  .grid_virtual:nth-child(1) {
    padding-top: 0px !important;
  }
  .grid_virtual:nth-child(2) {
    padding-top: 0px !important;
  }
  .grid_virtual:nth-child(3) {
    padding-top: 0px !important;
  }
}

@media only screen and (min-device-width: 2560px) {
  .grid_virtual {
    width: calc(100% / 3) !important;
  }
  .grid_virtual:nth-child(1) {
    padding-top: 0px !important;
  }
  .grid_virtual:nth-child(2) {
    padding-top: 0px !important;
  }
  .grid_virtual:nth-child(3) {
    padding-top: 0px !important;
  }
}

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
