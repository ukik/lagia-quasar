<template>
  <!-- <InnerBanner :_title="$route?.meta?.title"></InnerBanner> -->

  <!-- ***Inner Banner html end here*** -->
  <div
    class="row justify-center q-mb-xl"
    :class="[$q.screen.width > 768 ? 'q-pb-lg' : 'q-pb-lg']"
  >
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <isBackButtonPage></isBackButtonPage>

      <isInfo></isInfo>

      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 q-mb-lg q-mt-md">
        <q-card flat class="rounded-borders-2">
          <q-img
            style="min-height: 600px"
            loading="lazy"
            :ratio="16 / 9"
            class="card-box"
            :src="additional?.image"
            :error-src="$defaultErrorImage"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center text-white">
                Cannot load image
              </div>
            </template>

            <div class="absolute-bottom bg-transparent flex justify-center items-end">
              <q-banner class="rounded-borders-2 text-dark q-pa-lg">
                <template v-slot:avatar>
                  <h2>
                    <!-- <font-awesome class="text-grey-5" :icon="['fas', 'quote-left']" /> -->
                    <q-icon name="fa-solid fa-quote-left"></q-icon>
                  </h2>
                </template>
                <q-item-label lines="3">
                  {{ additional?.label }}
                </q-item-label>
              </q-banner>
            </div>
          </q-img>
        </q-card>
      </div>

      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <div class="section-head q-mb-xl">
          <div class="sub-title">{{ additional?.title1 }}</div>
          <h2 class="section-title">{{ additional?.headline1 }}</h2>
          <p>
            {{ additional?.description1 }}
          </p>
        </div>

        <template v-for="(first, index) in getFirstFaq">
          <q-expansion-item
            default-opened
            class="shadow-0 overflow-hidden q-mb-lg"
            style="border-radius: 20px"
            :label="first?.title"
            header-class="bg-primary text-white "
            expand-icon-class="text-white"
          >
            <q-card
              bordered
              flat
              class="bg-grey-0"
              style="border-radius: 0px 0px 20px 20px"
            >
              <q-card-section>
                <q-item-label lines="3">
                  {{ first?.description }}
                </q-item-label>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </template>

        <!-- <q-expansion-item
          class="shadow-0 overflow-hidden q-mb-lg"
          style="border-radius: 30px"
          label="WHAT ARE ACCEPTABLE PAYMENT METHOD?"
          header-class="bg-primary text-white "
          expand-icon-class="text-white"
        >
          <q-card flat class="bg-grey-1">
            <q-card-section>
              <q-item-label lines="3">
                Natoque consequat sodales autem nihil nec. Fusce molestias? Reiciendis
                voluptas, harum officia ante aliquet blanditiis scelerisque donec illo
                aperiam commodi hymenaeos.
              </q-item-label>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          class="shadow-0 overflow-hidden"
          style="border-radius: 30px"
          label="How we provide services for you ?"
          header-class="bg-primary text-white "
          expand-icon-class="text-white"
        >
          <q-card flat class="bg-grey-1">
            <q-card-section>
              <q-item-label lines="3">
                Natoque consequat sodales autem nihil nec. Fusce molestias? Reiciendis
                voluptas, harum officia ante aliquet blanditiis scelerisque donec illo
                aperiam commodi hymenaeos.
              </q-item-label>
            </q-card-section>
          </q-card>
        </q-expansion-item> -->
      </div>
    </div>
  </div>

  <div class="content-page-section row justify-center bg-light-grey">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div class="section-heading col-12 text-center q-mt-xl q-mb-lg">
        <h5 class="sub-title q-mt-lg">{{ additional?.title2 }}</h5>
        <h2 class="section-title">{{ additional?.headline2 }}</h2>
        <p>
          {{ additional?.description2 }}
        </p>
      </div>
      <div class="col-12" v-if="records.length <= 0 && !loading">
        <NoData></NoData>
      </div>

      <template v-for="(second, index) in getSecondFaq">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <q-expansion-item
            default-opened
            class="shadow-0 overflow-hidden"
            style="border-radius: 20px"
            :label="second?.title"
            header-class="bg-primary text-white "
            expand-icon-class="text-white"
          >
            <q-card flat bordered style="border-radius: 0px 0px 20px 20px">
              <q-card-section>
                <q-item-label lines="3">
                  {{ second?.description }}
                </q-item-label>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </template>
    </div>
  </div>
</template>

<script async setup>
import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useFaqStore } from "stores/lagia-stores/page/FaqStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";

const store = useFaqStore();
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

  getFirstFaq,
  getSecondFaq,
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

      return useFaqStore(store).onFetch({
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
.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}

.card-box {
  min-height: 500px;
}

.text-box h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0px;
}

.call-action-box p {
  font-size: medium;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

.q-item__label {
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
