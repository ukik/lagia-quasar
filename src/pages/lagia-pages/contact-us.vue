<template>
  <!-- <main> -->
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

      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <div class="section-heading">
          <h5 class="text-primary">{{ record?.title1 }}</h5>
          <h2 class="section-title">{{ record?.headline1 }}</h2>
          <p>
            {{ record?.description1 }}
          </p>
        </div>

        <!-- <q-btn round color="primary" size="16px" dense class="q-mr-sm"
          ><font-awesome :icon="['fab', 'instagram']"
        /></q-btn>
        <q-btn round color="primary" size="16px" dense class="q-mr-sm"
          ><font-awesome :icon="['fab', 'whatsapp']"
        /></q-btn>
        <q-btn round color="primary" size="16px" dense class="q-mr-sm"
          ><font-awesome :icon="['fab', 'facebook-f']"
        /></q-btn>
        <q-btn round color="primary" size="16px" dense class="q-mr-sm"
          ><font-awesome :icon="['fab', 'x-twitter']"
        /></q-btn>
        <q-btn round color="primary" size="16px" dense class="q-mr-sm"
          ><font-awesome :icon="['fab', 'tiktok']"
        /></q-btn> -->

        <q-card-section class="q-pa-none">
          <!-- <q-btn-group outline rounded unelevated class="q-mx-xl bg-white"> -->
          <q-btn
            :href="record?.instagram"
            target="_blank"
            outline
            color="primary"
            bg-color="white"
            size="16px"
            dense
            round
            class="q-mr-sm"
            ><i class="text-h6 fa-brands fa-instagram"></i
          ></q-btn>
          <q-btn
            :href="record?.whatsapp"
            target="_blank"
            outline
            color="primary"
            bg-color="white"
            size="16px"
            dense
            round
            class="q-mr-sm"
            ><i class="text-h6 fa-brands fa-whatsapp"></i
          ></q-btn>
          <q-btn
            :href="record?.facebook"
            target="_blank"
            outline
            color="primary"
            bg-color="white"
            size="16px"
            dense
            round
            class="q-mr-sm"
            ><i class="text-h6 fa-brands fa-facebook-f"></i
          ></q-btn>
          <q-btn
            :href="record?.twitter"
            target="_blank"
            outline
            color="primary"
            bg-color="white"
            size="16px"
            dense
            round
            class="q-mr-sm"
            ><i class="text-h6 fa-brands fa-x-twitter"></i
          ></q-btn>
          <q-btn
            :href="record?.tiktok"
            target="_blank"
            outline
            color="primary"
            bg-color="white"
            size="16px"
            dense
            round
            class="q-mr-sm"
            ><i class="text-h6 fa-brands fa-tiktok"></i
          ></q-btn>
          <!-- </q-btn-group> -->
        </q-card-section>

        <ContactUsGoogleMap :item="record?.map" />
      </div>

      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <ContactUsForm />
      </div>
    </div>
  </div>

  <!-- Call To Action -->
  <div class="content-page-section row justify-center bg-light-grey">
    <div
      class="row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div class="section-heading col-12 text-center q-mt-xl">
        <h5 class="sub-title q-mt-lg">{{ record?.title2 }}</h5>
        <h2 class="section-title">{{ record?.headline2 }}</h2>
        <p>{{ record?.description2 }}</p>
      </div>

      <!-- <template v-for="i in 3"> -->

      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
        <q-card flat bordered class="rounded-borders-2 q-py-lg">
          <q-card-section class="text-center q-mt-sm">
            <q-avatar
              size="80px"
              font-size="45px"
              color="blue"
              text-color="white"
              :icon="record?.grid1Icon"
            />
          </q-card-section>
          <q-card-section class="text-center q-mt-sm">
            <h6>{{ record?.grid1Title }}</h6>
            <div style="height: 48px">
              <q-btn
                dense
                capitalize
                flat
                :href="`mailto:${record?.grid1Value}`"
                :label="record?.grid1Value"
                push
                color="dark"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
        <q-card flat bordered class="rounded-borders-2 q-py-lg">
          <q-card-section class="text-center q-mt-sm">
            <q-avatar
              size="80px"
              font-size="45px"
              color="blue"
              text-color="white"
              :icon="record?.grid2Icon"
            />
          </q-card-section>
          <q-card-section class="text-center q-mt-sm">
            <h6>{{ record?.grid2Title }}</h6>
            <div style="height: 48px">
              <q-btn
                dense
                capitalize
                flat
                :href="`tel:${record?.grid2Value}`"
                :label="record?.grid2Value"
                push
                color="dark"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
        <q-card flat bordered class="rounded-borders-2 q-py-lg">
          <q-card-section class="text-center q-mt-sm">
            <q-avatar
              size="80px"
              font-size="45px"
              color="blue"
              text-color="white"
              :icon="record?.grid3Icon"
            />
          </q-card-section>
          <q-card-section class="text-center q-mt-sm">
            <h6>{{ record?.grid3Title }}</h6>
            <q-item-label style="height: 48px" class="q-px-md">{{
              record?.grid3Value
            }}</q-item-label>
          </q-card-section>
        </q-card>
      </div>
      <!-- </div> -->
      <!-- </template> -->
    </div>
  </div>

  <!-- </main> -->
</template>

<script setup>
import { useContactStore } from "stores/lagia-stores/page/ContactStore";
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
  //   return useContactStore(store).onFetch(currentRoute?.params?.slug);
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
      return useContactStore(store).onFetch();
    }
  ),
});

const $auth = useAuthStore();
const { auth } = storeToRefs($auth);

const $store = useContactStore();
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
</style>
