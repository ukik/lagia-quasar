<template>
  <div class="row justify-center">
    <!-- <q-img :src="getImage('band')"> </q-img>
    <q-img :src="getImage('mc')"> </q-img>
    <q-img :src="getImage('comedian')"> </q-img>
    <q-img :src="getImage('dancer')"> </q-img>
    <q-img :src="getImage('guide')"> </q-img>
    <q-img :src="getImage('media')"> </q-img>
    <q-img :src="getImage('others')"> </q-img>
    <q-img :src="getImage('singer')"> </q-img> -->

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

    <SkeletonTwitch class="col-12" v-if="!init && loading"></SkeletonTwitch>

    <NoData v-if="isMounted && records.length <= 0 && !loading"></NoData>

    <div
      v-if="init && !loading"
      class="row justify-start col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div
        v-for="(item, index) in records"
        class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
      >
        <q-card
          flat
          bordered
          :square="$q.screen.width <= 1024"
          :class="[$q.screen.width > 768 ? 'rounded-borders-2' : '']"
        >
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
                <q-item dense>
                  <q-item-section>
                    <q-item-label lines="1">Rating</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">
                      <q-rating
                        v-if="item?.ratingAvg?.avgRating"
                        readonly
                        v-model="item.ratingAvg.avgRating"
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

                <isQItemLabelSimpleValue
                  @onBubbleEvent="
                    dialog_value = true;
                    dialog_payload = { value: item?.description, label: 'description' };
                  "
                  :clickable="true"
                  label="description"
                  :value="item?.description"
                  textcolor="text-primary"
                ></isQItemLabelSimpleValue>

                <q-item dense>
                  <q-item-section>
                    <q-item-label>category</q-item-label>
                  </q-item-section>
                  <q-item-section side v-if="item?.category !== 'others'">
                    <q-item-label lines="1"
                      ><q-chip class="q-mx-none" color="pink" text-color="white">{{
                        item?.category
                      }}</q-chip></q-item-label
                    >
                  </q-item-section>
                  <q-item-section side v-else>
                    <q-item-label lines="1">{{ item?.category }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item dense>
                  <q-item-section>
                    <q-item-label>Lainnya</q-item-label>
                  </q-item-section>
                  <q-item-section side v-if="item?.category === 'others'">
                    <q-item-label lines="1"
                      ><q-chip class="q-mx-none" color="teal" text-color="white">{{
                        item?.category
                      }}</q-chip></q-item-label
                    >
                  </q-item-section>
                  <q-item-section side v-else>
                    <q-item-label lines="1">{{ item?.category }}</q-item-label>
                  </q-item-section>
                </q-item>

                <isAvailable :item="item?.isAvailable"></isAvailable>

                <!-- <q-item dense v-if="item?.category === 'others'">
                  <q-item-section top>
                    <q-item-label>category</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">{{ item?.category }}</q-item-label>
                    <q-item-label class="text-right">
                      <template v-for="(val, index) in getSplit(item)">
                        <q-chip class="q-mx-none" color="pink" text-color="white">{{
                          val
                        }}</q-chip>
                      </template>
                    </q-item-label>
                  </q-item-section>
                </q-item> -->
              </div>
            </q-card-section>

            <q-card-section
              v-if="false"
              class="bg-cyan-8 col-xl-3 col-lg-3 col-md-3 col-sm-5 col-12 row flex flex-center text-white q-pt-lg"
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
                  @click="showMultiple(item?.image, 0)"
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
        </q-card>
      </div>
      <!-- <q-pagination
        v-if="records.length > 0"
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

  <q-page-sticky position="bottom" :offset="$q.screen.width > 768 ? [0, 35] : [0, 10]">
    <q-pagination
      v-if="records.length > 0"
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
  </q-page-sticky>

  <!-- </main> -->
</template>

<script async setup>
// preFetch: preFetch(async ({ store, currentRoute }) => {
//   const mystore = useYoutubeListStore(store);
//   await mystore.request({
//     page: currentRoute.params.page
//   });
// }),

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useSouvenirProductListStore } from "stores/lagia-stores/souvenir/SouvenirProductListStore";
import { useRouter } from "vue-router";
const store = useSouvenirProductListStore();
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
      return useSouvenirProductListStore(store).onFetch({
        currentPage: currentRoute?.query?.page,
      });
    }
  ),
});

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

const props = defineProps(["item"]);

const router = useRouter();

const onCurrentPage = async (val) => {
  console.log("onCurrentPage", val, currentPage.value, props.item?.id);
  // router.push({ query: { page: val.value } })
  onPaginate({ currentPage: currentPage.value, profileId: props.item?.profileId });
};
watch(() => currentPage, onCurrentPage, {
  deep: true,
  // immediate: true,
});

const isMounted = ref(false);

onMounted(async () => {
  console.log("Props", props.item);
  init.value = false;
  await onPaginate({ currentPage: 1, profileId: props.item?.profileId });
  isMounted.value = true;
});

const ratingZero = 0.00;

function getSplit(item) {
  if (!item?.category) return [];
  return item?.category.split(",");
}

const dialog_payload = ref(null);
const dialog_value = ref(false);

// ,,,,,,,,
</script>
<style scoped>
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
