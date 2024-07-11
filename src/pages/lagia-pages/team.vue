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
      <div v-if="records.length <= 0 && loading" class="col-12 text-center">
        <q-spinner color="primary" size="3em" />
      </div>
      <div class="col-12" v-if="records.length <= 0 && !loading">
        <NoData></NoData>
      </div>

      <div
        v-for="(item, index) in records"
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
      >
        <q-card flat class="rounded-borders-2">
          <q-img loading="lazy" :ratio="16 / 9" class="card-box" :src="item?.image">
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-negative text-white">
                Cannot load image
              </div>
            </template>

            <div class="absolute-full bg-transparent flex justify-center items-end">
              <q-card
                flat
                class="text-box text-center text-dark q-mt-lg full-width rounded-borders-2"
              >
                <!-- <q-card-section>
                  <q-btn-group spread flat rounded unelevated class="q-px-xl">
                    <q-btn color="primary" size="16px" dense class="q-pl-lg q-pr-md"
                      ><font-awesome :icon="['fab', 'instagram']"
                    /></q-btn>
                    <q-btn color="primary" size="16px" dense class="q-px-md"
                      ><font-awesome :icon="['fab', 'whatsapp']"
                    /></q-btn>
                    <q-btn color="primary" size="16px" dense class="q-px-md"
                      ><font-awesome :icon="['fab', 'facebook-f']"
                    /></q-btn>
                    <q-btn color="primary" size="16px" dense class="q-px-md"
                      ><font-awesome :icon="['fab', 'x-twitter']"
                    /></q-btn>
                    <q-btn color="primary" size="16px" dense class="q-pr-lg q-pl-md"
                      ><font-awesome :icon="['fab', 'tiktok']"
                    /></q-btn>
                  </q-btn-group>
                </q-card-section> -->

                <q-card-section>
                  <q-btn-group outline rounded unelevated class="q-mx-xl bg-white">
                    <q-btn
                      outline
                      color="primary"
                      bg-color="white"
                      size="16px"
                      dense
                      class="q-px-md"
                      ><i class="text-h6 fa-brands fa-instagram"></i
                    ></q-btn>
                    <q-btn
                      outline
                      color="primary"
                      bg-color="white"
                      size="16px"
                      dense
                      class="q-px-md"
                      ><i class="text-h6 fa-brands fa-whatsapp"></i
                    ></q-btn>
                    <q-btn
                      outline
                      color="primary"
                      bg-color="white"
                      size="16px"
                      dense
                      class="q-px-md"
                      ><i class="text-h6 fa-brands fa-facebook-f"></i
                    ></q-btn>
                    <q-btn
                      outline
                      color="primary"
                      bg-color="white"
                      size="16px"
                      dense
                      class="q-px-md"
                      ><i class="text-h6 fa-brands fa-x-twitter"></i
                    ></q-btn>
                    <q-btn
                      outline
                      color="primary"
                      bg-color="white"
                      size="16px"
                      dense
                      class="q-px-md"
                      ><i class="text-h6 fa-brands fa-tiktok"></i
                    ></q-btn>
                  </q-btn-group>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <h3>{{ item?.name }}</h3>
                  <q-btn
                    size="md"
                    color="primary"
                    class="text-weight-light"
                    flat
                    :label="item?.position"
                  ></q-btn>
                  <q-item-label lines="3">{{ item?.description }}</q-item-label>
                </q-card-section>
              </q-card>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
  </div>
  <!-- Call To Action -->
  <!-- <CallActionOffer></CallActionOffer>
  <CallAction></CallAction>
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
  </div> -->

  <!-- </main> -->
</template>

<script async setup>
import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useTeamStore } from "stores/lagia-stores/page/TeamStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";

const store = useTeamStore();
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

      return useTeamStore(store).onFetch({
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
