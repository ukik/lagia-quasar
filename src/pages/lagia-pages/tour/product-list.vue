<template>
  <!-- <main> -->
  <!-- <InnerBanner :_title="$route?.meta?.title"></InnerBanner> -->

  <q-no-ssr>
    <isModalDescription ref="isModal"></isModalDescription>
  </q-no-ssr>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
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

      <q-card-actions class="col-12 q-mb-lg" align="center">
        <q-pagination
          :disable="loading"
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
        <div class="full-width text-center q-mt-md">Ditemukan: {{ totalItem }} Item</div>
      </q-card-actions>

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
                style="height: 72px"
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
                    {{ item?.province ? item?.province : "_" }} /
                    {{ item?.city ? item?.city : "_" }}
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
                      {{
                        item?.tourPrice?.description ? item?.tourPrice?.description : "_"
                      }}
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

              <q-separator></q-separator>
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

            <q-card-section class="q-pa-none col-12">
              <q-btn-group spread unelevated>
                <q-btn
                  :to="{
                    name: '/tour/product-detail',
                    params: {
                      slug: item?.id,
                      slug_text: item?.slug,
                    },
                  }"
                  label="detail"
                  icon="local_mall"
                />
                <q-separator vertical></q-separator>
                <q-btn
                  :to="{
                    name: '/tour/store-detail',
                    params: {
                      slug: item?.storeId,
                      slug_text: item?.tourStore?.slug,
                    },
                  }"
                  label="vendor"
                  icon="store"
                />
              </q-btn-group>
            </q-card-section>

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
    <div class="col-12 flex flex-center q-mt-lg q-pt-lg">
      <!-- <q-btn :disable="loading" :loading="loading" @click="onLoadMore" color="primary" unelevated label="Load More" ></q-btn> -->
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
const { onFetch, onPaginate, setQuery } = store; // have all reactive states here
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
    async ({
      store,
      currentRoute,
      previousRoute,
      redirect,
      ssrContext,
      urlPath,
      publicPath,
    }) => {
      const useStore = useTourProductListStore(store);

      if (!currentRoute?.query?.page)
        redirect({ name: currentRoute.name, query: { ...currentRoute.query, page: 1 } });

      if (currentRoute?.query?.category)
        await useStore.setQuery("category", currentRoute?.query?.category);
      if (currentRoute?.query?.durasi)
        await useStore.setQuery("durasi", currentRoute?.query?.durasi);
      if (currentRoute?.query?.level)
        await useStore.setQuery("level", currentRoute?.query?.level);
      if (currentRoute?.query?.province)
        await useStore.setQuery("province", currentRoute?.query?.province);
      if (currentRoute?.query?.city)
        await useStore.setQuery("city", currentRoute?.query?.city);
      if (currentRoute?.query?.country)
        await useStore.setQuery("country", currentRoute?.query?.country);
      if (currentRoute?.query?.price_min)
        await useStore.setQuery("price_min", currentRoute?.query?.price_min);
      if (currentRoute?.query?.price_max)
        await useStore.setQuery("price_max", currentRoute?.query?.price_max);


      if (!currentRoute?.query?.category) await useStore.setQuery("category", "");
      if (!currentRoute?.query?.durasi) await useStore.setQuery("durasi", "");
      if (!currentRoute?.query?.level) await useStore.setQuery("level", "");
      if (!currentRoute?.query?.province) await useStore.setQuery("province", "");
      if (!currentRoute?.query?.city) await useStore.setQuery("city", "");
      if (!currentRoute?.query?.country) await useStore.setQuery("country", "");
      if (!currentRoute?.query?.price_min) await useStore.setQuery("price_min", "");
      if (!currentRoute?.query?.price_max) await useStore.setQuery("price_max", "");

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
  await router.push({ query: { ...currentRoute.query, page: val.value } });
  // onPaginate({ currentPage: val.value, query: currentRoute?.query });
};
watch(() => currentPage, onCurrentPage, {
  deep: true,
  // immediate: true,
});

const routerPageQuery = async (val) => {
  const currentRoute = router.currentRoute.value;
  console.log("routerPageQuery", val.value, currentRoute.query.page);
  // await router.push({ query: { ...currentRoute.query, page: val.value } });
  await onPaginate({ currentPage: val.value, query: currentRoute?.query });
};
watch(() => router.currentRoute, routerPageQuery, {
  deep: true,
  // immediate: true,
});

function onLoadMore() {
  if (Number(currentPage.value) >= Number(lastPage.value)) return;
  console.log(currentPage.value, lastPage.value);
  // if(Number(currentPage.value) <= 1) return
  // console.log(currentPage.value <= 1)
  currentPage.value += 1;
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
import { useQuasar, scroll } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;


export default {
  mounted() {
    this.$scrollTop()
    // const ANCHOR = document.querySelector('#InnerBanner');
    // if (!ANCHOR) return;
    // // setTimeout(() => {
    //   const target = getScrollTarget(ANCHOR);
    //   const offset = ANCHOR.offsetTop;
    //   const duration = 0;
    //   setVerticalScrollPosition(target, offset, duration);
    // // }, 500);
  },
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
