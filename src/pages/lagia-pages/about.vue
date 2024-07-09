<template>
  <InnerBanner _title="ABOUT US"></InnerBanner>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div class="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12">
        <AboutContent :item="record"></AboutContent>

        <!-- Tidak Usah -->
        <!-- <AboutBrands :item="record"></AboutBrands> -->
      </div>

      <div class="col items-start">
        <div
          class="row"
          :class="[$q.screen.width > 768 ? 'q-col-gutter-lg' : 'q-col-gutter-lg']"
        >
          <div
            class="col-xl-12 col-lg-12 q-md-12 col-12 row"
            :class="[isSM() ? 'col-sm-6' : '', isMD() ? 'col-sm-12' : '']"
          >
            <q-card flat bordered class="rounded-borders-2">
              <q-card-actions align="center">
                <div class="full-width text-center q-mt-md">
                  <q-avatar
                    size="100px"
                    font-size="45px"
                    color="blue"
                    text-color="white"
                    :icon="record?.grid1Icon"
                  />
                </div>
                <div class="text-box text-center q-my-lg full-width q-px-sm">
                  <h3>{{ record?.grid1Title }}</h3>
                  <q-item-label lines="4">{{ record?.grid1Description }}</q-item-label>
                </div>
              </q-card-actions>
            </q-card>
          </div>
          <div
            class="col-xl-12 col-lg-12 q-md-12 col-12 row"
            :class="[isSM() ? 'col-sm-6' : '', isMD() ? 'col-sm-12' : '']"
          >
            <q-card flat bordered class="rounded-borders-2">
              <q-card-actions align="center">
                <div class="full-width text-center q-mt-md">
                  <q-avatar
                    size="100px"
                    font-size="45px"
                    color="blue"
                    text-color="white"
                    :icon="record?.grid2Icon"
                  />
                </div>
                <div class="text-box text-center q-my-lg full-width q-px-sm">
                  <h3>{{ record?.grid2Title }}</h3>
                  <q-item-label lines="4">{{ record?.grid2Description }}</q-item-label>
                </div>
              </q-card-actions>
            </q-card>
          </div>
          <div
            class="col-xl-12 col-lg-12 q-md-12 col-12 row"
            :class="[isSM() ? 'col-sm-6' : '', isMD() ? 'col-sm-12' : '']"
          >
            <q-card flat bordered class="rounded-borders-2">
              <q-card-actions align="center">
                <div class="full-width text-center q-mt-md">
                  <q-avatar
                    size="100px"
                    font-size="45px"
                    color="blue"
                    text-color="white"
                    :icon="record?.grid3Icon"
                  />
                </div>
                <div class="text-box text-center q-my-lg full-width q-px-sm">
                  <h3>{{ record?.grid3Title }}</h3>
                  <q-item-label lines="4">{{ record?.grid3Description }}</q-item-label>
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Call To Action -->
  <CallActionPromo></CallActionPromo>
</template>

<script>
import globalMixin from "src/plugins/mixins/globalMixin";
export default {
  mixins: [globalMixin],
};
</script>

<script setup>
import { useAboutStore } from "stores/lagia-stores/page/AboutStore";
import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

// import { useRoute } from "vue-router";
// const route = useRoute();

defineOptions({
  // preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
  //   console.log('running preFetch XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  //   return useAboutStore(store).onFetch(currentRoute?.params?.slug);
  // }
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
      console.log("running preFetch XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      return useAboutStore(store).onFetch();
    }
  ),
});

const $auth = useAuthStore();
const { auth } = storeToRefs($auth);

const $store = useAboutStore();
const {
  dataType,
  record,
  isMaintenance,

  loading,
} = storeToRefs($store); // have all reactive states here

// const onCurrentPage = async (val) => {
//   console.log("onCurrentPage", val);
//   onFetch();
// };
// watch(() => currentPage, onCurrentPage, {
//   deep: true,
//   immediate: true,
// });
</script>

<style scoped>
.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

/* p {
  line-height: 1.6;
  margin: 0 0 15px;
  word-wrap: break-word;
} */

h3 {
  font-size: 22px;
  font-weight: 700;
}

.q-item__label {
  line-height: 1.6 !important;
}
</style>
