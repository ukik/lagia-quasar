<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-9 col-sm-12 col-11"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg q-px-md' : 'q-gutter-y-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <!--  -->
      <div class="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12 q-gutter-y-lg">
        <q-banner class="bg-grey-2 rounded-borders-2">
          <!-- <template v-slot:avatar>
            <q-icon name="signal_wifi_off" color="primary" />
          </template> -->
          <div class="head q-pa-lg">
            <h4 class="title">PENDAPAT MEREKA TENTANG LAGIA</h4>
            <div class="subtitle">
              LAGIA telah melayani keinginan banyak orang, dan inilah pendapat mereka
            </div>
          </div>

          <!-- <template v-slot:action>
            <q-btn flat color="primary" label="Turn on Wifi" />
          </template> -->
        </q-banner>

        <div class="col-12" v-if="records.length <= 0 && !loading">
          <NoData></NoData>
        </div>

        <template v-for="(item, index) in records">
          <q-card flat bordered class="rounded-borders-2">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="$getRatingTestimonial(item?.rating)" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="item?.emoticon"></q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-actions class="q-pa-md q-mb-none">
              <q-item-label class="q-mb-md">{{ item?.description }}</q-item-label>
              <q-rating
                flat
                readonly
                v-model="item.rating"
                size="sm"
                :max="5"
                color="primary"
              ></q-rating>
            </q-card-actions>

            <ImageCard :item="item"></ImageCard>
          </q-card>
        </template>

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
      <div class="col" :class="[$q.screen.width > 768 ? '' : 'row']">
        <q-no-ssr>
          <FormBookingPackageSide
            class="col-12"
            :class="[$q.screen.width > 768 ? '' : 'q-mt-xl order-last']"
          ></FormBookingPackageSide>
        </q-no-ssr>
        <!-- <MorePackageSide class="col-12"></MorePackageSide>
        <RelatedImageSlide class="col-12"></RelatedImageSlide>
        <GoogleMapPackageSide class="col-12"></GoogleMapPackageSide> -->
      </div>
    </div>
  </div>
  <!-- Call To Action -->
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
import ImageCard from "./components/testimonial-image-card";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useTestimonialStore } from "stores/lagia-stores/page/TestimonialStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";

const store = useTestimonialStore();
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

      return useTestimonialStore(store).onFetch({
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

// const dialog_selengkapnya = ref(false);
// const record = ref(null);

// const culinary_prices = ref(false);
// const culinary_products = ref(false);

// // const dialog_payload = ref(null);
// // const dialog_value = ref(false);

function closeDialog() {
  // dialog_selengkapnya.value = false;
  // record.value = null;
  // culinary_prices.value = false;
  // culinary_products.value = false;
  // // dialog_payload.value = null;
  // // dialog_value.value = false;
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

.card-box {
  min-height: 450px;
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

.head .title {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  margin: 0;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.head .subtitle {
  text-align: center;
  font-size: 16px;
  /* color: #949494; */
  font-weight: 400;
  margin-top: 10px;
}

.head {
  /* margin-bottom: 50px; */
}
</style>
