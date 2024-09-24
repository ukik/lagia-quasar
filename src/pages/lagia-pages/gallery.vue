<template>
  <!-- <InnerBanner :_title="$route?.meta?.title"></InnerBanner> -->

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12 q-px-md"
      :class="[$q.screen.width > 425 ? '' : '', $q.screen.width > 768 ? '' : '']"
    >
      <isBackButtonPage></isBackButtonPage>
      <div v-if="records.length <= 0 && loading" class="col-12 text-center">
        <q-spinner color="primary" size="3em" />
      </div>
      <div class="col-12" v-if="records.length <= 0 && !loading">
        <NoData></NoData>
      </div>

      <q-card flat class="col-12 q-pa-none" v-for="item in records">
        <div>
          <q-banner class="bg-grey-2 rounded-borders-2 q-mb-lg">
            <!-- <template v-slot:avatar>
            <q-icon name="signal_wifi_off" color="primary" />
          </template> -->
            <div class="head q-pa-lg">
              <h5 class="title">{{ item?.name }}</h5>
              <div class="subtitle q-mb-sm">{{ item?.description }}</div>
              <template v-for="tag in $getSplit(item?.tags)">
                <q-chip
                  clickable
                  color="form"
                  text-color="white"
                  class="q-ml-none"
                  :label="tag"
                ></q-chip>
              </template>
            </div>

            <!-- <template v-slot:action>
            <q-btn flat color="primary" label="Turn on Wifi" />
          </template> -->
          </q-banner>
        </div>
        <div class="container">
          <template v-for="(image, i) in item?.image">
            <div class="card">
              <q-img
                @click="showMultiple(item?.image, i)"
                :alt="item?.alt"
                class="rounded-borders-2"
                :src="image"
                :error-src="$defaultUser"
              />
            </div>
          </template>
        </div>
      </q-card>

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
</template>

<script async setup>
import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useGalleryStore } from "stores/lagia-stores/page/GalleryStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";

const store = useGalleryStore();
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

      return useGalleryStore(store).onFetch({
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

const rating = 0.0;

function closeDialog() {}

onBeforeRouteLeave((to, from, next) => {
  closeDialog();
  return next();
});
</script>

<style scoped>
.container {
  list-style: none;
  column-gap: 10px;
  padding: 0;
  column-count: 1;
}
.card {
  width: 100%;
  height: auto;
  padding: 0;
  padding-bottom: 10px;
  margin: 0;
  box-sizing: border-box;
  /* border: 10px solid #ffffff00; */
  break-inside: avoid;
}

@media (min-width: 320px) and (max-width: 759.5px) {
  .container {
    column-count: 1;
  }
  /* .card {
    border-left: 2px solid #ffffff00;
    border-right: 2px solid #ffffff00;
    border-top: 5px solid #ffffff00;
    border-bottom: 5px solid #ffffff00;
  } */
}
@media (min-width: 760px) and (max-width: 979.5px) {
  .container {
    column-count: 2;
  }
}
@media (min-width: 980px) and (max-width: 1023.5px) {
  .container {
    column-count: 3;
  }
}
@media (min-width: 1024px) {
  .container {
    column-count: 3;
  }
}

.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}
</style>
