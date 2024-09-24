<template>
  <!-- <InnerBanner :_title="$route?.meta?.title"></InnerBanner> -->

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
    <isBackButtonPage></isBackButtonPage>

      <!-- <div class="col-12">
        <q-img
          class="rounded-borders-2 q-mb-lg"
          src="assets/images/img16.jpg"
          :ratio="16 / 9"
        />
      </div> -->
      <!-- <h2 class="q-mb-lg">Let's build the better world together</h2> -->
      <isInfo></isInfo>
      <div class="page-content-1 col-12" v-html="record?.description"></div>

      <!-- <div class="col-12 q-mb-xl">
        <h3>Placerat quaerat curae reiciendis commodi. X</h3>

        <div class="row col-gutters q-col-gutter-sm q-mb-lg">
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <q-img
              :ratio="1"
              src="assets/images/img4.jpg"
              alt=""
              class="rounded-borders-2"
            />
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <q-img
              :ratio="1"
              src="assets/images/img5.jpg"
              alt=""
              class="rounded-borders-2"
            />
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <q-img
              :ratio="1"
              src="assets/images/img6.jpg"
              alt=""
              class="rounded-borders-2"
            />
          </div>
        </div>

        <q-banner
          dense
          :class="[$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2']"
          class="rounded-borders-2"
        >
          <template v-slot:avatar>
            <q-icon size="xl" name="format_quote" color="black" />
          </template>
          <h6 class="q-my-lg q-pr-md">
            Sagittis perferendis? Leo nobis irure egestas excepturi ipsam nascetur
            elementum, montes. Torquent, soluta, ac nihil.
          </h6>
        </q-banner>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { useInfoStore } from "stores/lagia-stores/page/InfoStore";
// import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

defineOptions({
  // preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
  //   console.log('running preFetch XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  //   return useInfoStore(store).onFetch(currentRoute?.params?.slug);
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
      return useInfoStore(store).onFetch(currentRoute?.params?.id);
    }
  ),
});

// const $auth = useAuthStore();
// const { auth } = storeToRefs($auth);

const $store = useInfoStore();
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
</style>
