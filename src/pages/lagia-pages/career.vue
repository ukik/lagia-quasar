<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div
        v-for="(item, index) in records"
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
      >
        <q-card flat class="rounded-borders-2">
          <q-img
            loading="lazy"
            :ratio="16 / 9"
            class="card-box"
            :src="item?.image[0]"
            :error-src="$defaultErrorImage"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center text-white">
                Cannot load image
              </div>
            </template>

            <div class="absolute-full bg-transparent flex justify-center items-end">
              <q-card
                flat
                class="text-box text-center text-dark q-mt-lg full-width rounded-borders-2 q-py-sm"
              >
                <q-card-section>
                  <h3>{{ item?.position }}</h3>
                  <q-btn
                    size="md"
                    color="primary"
                    class="text-weight-light"
                    flat
                    :label="item?.condition"
                  ></q-btn>
                  <q-item-label lines="2">{{ item?.description }}</q-item-label>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-btn
                    unelevated
                    :disabled="item?.status == 'tutup' ? false : true"
                    :color="item?.status == 'tutup' ? 'primary' : 'red'"
                    size="18px"
                    class="rounded-borders-4"
                    :label="item?.status == 'tutup' ? 'Apply Now' : 'No Job'"
                  ></q-btn>
                </q-card-section>
              </q-card>
            </div>
          </q-img>
        </q-card>
      </div>

      <div class="col-12 flex justify-center">
        <q-pagination
          :disable="loading"
          class="q-my-lg"
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

      <div class="col-12 form-box">
        <q-card flat class="rounded-borders-2 bg-blue-7 q-pa-lg">
          <q-card-section>
            <h5 class="subtitle">APPLY FOR VACANCY</h5>
            <h2>APPLY AND JOIN OUR TEAM</h2>
            <p>
              Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo,
              rutrum. Vestibulum cumque laudantm sit.
            </p>
          </q-card-section>
          <q-card-section>
            <FormCareer />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>

  <!-- Call To Action -->
  <CallActionBenifitCareer :item="additional" />
  <!-- <div class="call-action-box bg-color-callback bg-light-grey row justify-center">
    <div class="col-lg-8 text-center q-px-md row justify-center">
      <h5 class="col-12">BENEFITS FROM US</h5>
      <h2 class="q-py-lg col-12">WHY JOIN US !</h2>
      <p class="col-xl-9 col-lg-9 col-md-9 col-sm-11 col-12">
        Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
        Vestibulum cumque laudantium. Sit ornare mollitia tenetur, aptent.
      </p>

      <div class="q-mt-xl col-12 row justify-center q-col-gutter-md">
        <template v-for="(item, index) in content?.career_reasons">
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <q-card flat bordered class="rounded-borders-3">
              <q-card-section>
                <div class="full-width text-center q-mt-sm">
                  <q-avatar
                    size="100px"
                    font-size="45px"
                    color="primary"
                    text-color="white"
                    :icon="item?.icon"
                  />
                </div>
                <div class="text-box text-center q-mt-lg full-width q-px-sm">
                  <h3>{{ item?.title }}</h3>
                  <q-item-label lines="4">{{ item?.subtitle }}</q-item-label>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </div>
    </div>
  </div> -->

  <!-- </main> -->
</template>

<script async setup>
import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useCareerStore } from "stores/lagia-stores/page/CareerStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";

const store = useCareerStore();
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
        redirect({ name: currentRoute.name, query: { page: 1 } });

      return useCareerStore(store).onFetch({
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
  min-height: 450px;
}

.text-box h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0px;
}

.form-box {
  color: white;
  h5 {
    color: white;
    font-size: 16px;
  }
  h2 {
    color: white;
  }
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
