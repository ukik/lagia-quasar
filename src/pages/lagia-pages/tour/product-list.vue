<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <q-no-ssr>
    <isModalDescription ref="isModal"></isModalDescription>
  </q-no-ssr>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div class="col-12 flex flex-center q-mt-lg">
      <q-pagination
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
      />
    </div>
    <div
      class="row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div v-if="additional" class="col-12 q-mb-lg">
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
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6"
      >
        <q-card square flat bordered class="rounded-borders-2">
          <q-card-section class="row q-pa-none">
            <q-img
              v-if="item?.image && item?.image.length > 0"
              loading="lazy"
              :ratio="1"
              class="col-12 q-border-bottom pointer"
              :src="item?.image[0]"
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
              :ratio="1"
              class="col-12 q-border-bottom"
              v-else
              :src="$defaultUser"
            />

            <q-card-section class="row col-12 flex items-start q-pa-none">
              <q-list padding>
                <q-item v-if="$q.screen.width > 425">
                  <q-item-section>
                    <q-item-label caption>Kategori</q-item-label>
                    <q-item-label lines="1">
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
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Durasi</q-item-label>
                    <q-item-label>
                      {{ item?.durasi }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>Destinasi</q-item-label>
                    <q-item-label>
                      {{ item?.province }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-section
              v-if="false"
              class="bg-grey-2 row col-12 flex items-start q-pa-none"
            >
              <div class="text-box full-width col-12 text-capitalize">
                <q-expansion-item class="bg-white" default-opened>
                  <template v-slot:header>
                    <q-item-section class="text-h6 q-px-none">
                      <q-item-label lines="1">
                        {{ item?.name }}
                      </q-item-label>
                    </q-item-section>
                  </template>
                  <q-card>
                    <isQItemLabelSimpleValue
                      label="category"
                      :value="item?.category"
                    ></isQItemLabelSimpleValue>

                    <isQItemLabelSimpleValue
                      label="durasi"
                      :value="item?.durasi"
                    ></isQItemLabelSimpleValue>
                    <isQItemLabelSimpleValue
                      label="Destinasi"
                      :value="item?.province"
                    ></isQItemLabelSimpleValue>
                    <!-- <isQItemLabelSimpleValue
                      label="city"
                      :value="item?.city"
                    ></isQItemLabelSimpleValue> -->
                    <!-- <isQItemLabelSimpleValue
                      label="country"
                      :value="item?.country"
                    ></isQItemLabelSimpleValue>

                    <isQItemLabelSimpleValue
                      @onBubbleEvent="
                        $refs.isModal.onOpen({
                          dialog_value: true,
                          dialog_payload: {
                            value: item?.description,
                            label: 'description',
                          },
                        })
                      "
                      :clickable="true"
                      label="description"
                      value="Detail"
                      textcolor="text-primary"
                    ></isQItemLabelSimpleValue> -->
                  </q-card>
                </q-expansion-item>
              </div>
            </q-card-section>

            <q-card-section
              v-if="false"
              class="bg-form col-12 row flex flex-center text-white q-pt-lg"
            >
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
                  {{ item?.tourPricesCount }}
                  <small class="text-weight-light"> Harga</small>
                </h6>
                <small class="col-12 text-center text-caption">( available )</small>
              </div>

              <div class="row col-12 justify-center q-mt-lg">
                <q-btn
                  outline
                  class="text-weight-normal col-12"
                  color="form"
                  text-color="white"
                  label="selengkapnya"
                  :to="{
                    name: '/tour/store-detail',
                    params: {
                      slug: item?.id,
                      slug_text: item?.slug,
                    },
                  }"
                />
              </div>
            </q-card-section>
          </q-card-section>

          <!-- <q-card-action>
              <q-item-label class="text-black text-center" lines="3">{{ item?.subtitle }}</q-item-label>
            </q-card-action> -->
        </q-card>
      </div>
    </div>
    <div class="col-12 flex flex-center q-mt-lg">
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
