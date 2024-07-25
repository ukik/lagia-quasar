<template>
  <div class="row justify-center">
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
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
      >
        <PriceDialogCard :item="item"></PriceDialogCard>
      </div>
      <!-- <div class="col-12 flex justify-center">
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
      </div> -->
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
import PriceDialogCard from "./PriceDialogCard";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useTourPriceListStore } from "stores/lagia-stores/tour/TourPriceListStore";
import { useRouter } from "vue-router";
const store = useTourPriceListStore();
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

// defineOptions({
//   preFetch: preFetch(
//     ({
//       store,
//       currentRoute,
//       previousRoute,
//       redirect,
//       ssrContext,
//       urlPath,
//       publicPath,
//     }) => {
//       return useTourPriceListStore(store).onFetch({
//         currentPage: currentRoute?.query?.page,
//       });
//     }
//   ),
// });

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

const props = defineProps(["item"]);

const router = useRouter();

const onCurrentPage = async (val) => {
  console.log("onCurrentPage", val, currentPage.value, props.item?.id);
  // router.push({ query: { page: val.value } })
  onPaginate({ currentPage: currentPage.value, query: { parentId: props.item?.id } });
};
watch(() => currentPage, onCurrentPage, {
  deep: true,
  // immediate: true,
});

const isMounted = ref(false);

onMounted(async () => {
  console.log("Props", props.item?.id);
  init.value = false;
  await onPaginate({ currentPage: 1, query: { parentId: props.item?.id } });
  isMounted.value = true;
});

const ratingZero = 0.0;

function getSplit(item) {
  if (!item?.category) return [];
  return item?.category.split(",");
}

const dialog_payload = ref(null);
const dialog_value = ref(false);
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
