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
      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 q-mb-lg">
        <q-card flat class="rounded-borders-2">
          <q-img
            style="min-height: 600px"
            loading="lazy"
            :ratio="16 / 9"
            class="card-box"
            :src="record?.image[0]"
            :error-src="$defaultErrorImage"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center text-white">
                Cannot load image
              </div>
            </template>

            <!-- <div class="absolute-bottom bg-transparent flex justify-center items-end">
              <q-banner class="rounded-borders-2 text-dark q-pa-lg">
                <template v-slot:avatar>
                  <h2>
                    <font-awesome class="text-grey-5" :icon="['fas', 'quote-left']" />
                  </h2>
                </template>
                <q-item-label lines="3">
                  Natoque consequat sodales autem nihil nec. Fusce molestias? Reiciendis
                  voluptas, harum officia ante aliquet blanditiis scelerisque donec illo
                  aperiam commodi hymenaeos.
                </q-item-label>
              </q-banner>
            </div> -->
          </q-img>
        </q-card>
      </div>

      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
        <div class="full-width">
          <q-btn
            unelevated
            rounded
            outline
            class="q-mr-sm q-mb-md rounded-borders-4"
            color="primary"
            label="JOB DESCRIPTION"
          />
          <q-btn
            unelevated
            rounded
            outline
            class="q-mr-sm q-mb-md rounded-borders-4"
            color="primary"
            label="EXPERIENCE"
          />
          <q-btn
            unelevated
            rounded
            outline
            class="q-mb-md rounded-borders-4"
            color="primary"
            label="REQUIREMENT"
          />
        </div>

        <q-banner
          class="text-white rounded-borders-2"
          :class="[record?.status === 'buka' ? 'bg-primary' : 'bg-red']"
        >
          <div class="text-h6">
            {{ record?.status === "tutup" ? "JOB CLOSED" : "JOB OPENED" }}
          </div>
        </q-banner>

        <q-card id="tab_1" flat bordered class="rounded-borders-2 q-pa-md q-mt-md">
          <q-card-section>
            <h4>#JOB DESCRIPTION</h4>
            <div v-html="record?.description"></div>
          </q-card-section>
        </q-card>

        <q-card id="tab_2" flat bordered class="rounded-borders-2 q-pa-md q-mt-lg">
          <q-card-section>
            <h4>#EXPERIENCE</h4>
            <div v-html="record?.experience"></div>

            <!-- <p>
              Reprehenderit hic bibendum repellendus, repellat auctor! Integer temporibus,
              facilisis iaculis alias senectus, non quam molestiae incidunt cubilia, fuga?
              Quasi natoque dicta a fuga dapibus dolore molestie sociis erat, convallis
              quibusdam possimus semper nonummy mattis, quasi.
            </p>
            <ul>
              <li>Dictumst sapiente doloremque proident feugiat.</li>
              <li>Minim laudantium dictumst totam porta.</li>
              <li>Purus deserunt earum inceptos.</li>
              <li>Vulputate sequi natoque, delectus hendrerit.</li>
            </ul> -->
          </q-card-section>
        </q-card>

        <q-card id="tab_3" flat bordered class="rounded-borders-2 q-pa-md q-mt-lg">
          <q-card-section>
            <h4>#REQUIREMENT</h4>
            <div v-html="record?.requirement"></div>

            <!-- <p>
              Reprehenderit hic bibendum repellendus, repellat auctor! Integer temporibus,
              facilisis iaculis alias senectus, non quam molestiae incidunt cubilia, fuga?
              Quasi natoque dicta a fuga dapibus dolore molestie sociis erat, convallis
              quibusdam possimus semper nonummy mattis, quasi.
            </p> -->
          </q-card-section>
        </q-card>
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
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
        <CareerDetailHow></CareerDetailHow>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
        <CareerDetailSummary :item="record"></CareerDetailSummary>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
        <CareerDetailSend :item="additional"></CareerDetailSend>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCareerDetailStore } from "stores/lagia-stores/page/CareerDetailStore";
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
  //   return useCareerDetailStore(store).onFetch(currentRoute?.params?.slug);
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
      return useCareerDetailStore(store).onFetch(currentRoute?.params?.id);
    }
  ),
});

const $auth = useAuthStore();
const { auth } = storeToRefs($auth);

const $store = useCareerDetailStore();
const { dataType, record, isMaintenance, additional, loading } = storeToRefs($store); // have all reactive states here

// const onCurrentPage = async (val) => {
//   console.log("onCurrentPage", val);
//   onFetch();
// };
// watch(() => currentPage, onCurrentPage, {
//   deep: true,
//   immediate: true,
// });

// import { ref } from "vue";

// const tab = ref(1);

// const content = {
//   title: "FAQ",
//   faq2: [
//     {
//       id: "1",
//       title: "WHAT OUR TERMS AND CONDITION?",
//       subtitle:
//         "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
//     },
//     {
//       id: "1",
//       title: "How do we manage to fund charity ?",
//       subtitle:
//         "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
//     },
//     {
//       id: "1",
//       title: "DO I HAVE TO MAKE RESERVATION?",
//       subtitle:
//         "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
//     },
//     {
//       id: "1",
//       title: "How did we manage your fund raised ?",
//       subtitle:
//         "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
//     },
//     {
//       id: "1",
//       title: "WHAT BENEFITS YOU GET FRIM BOOKING?",
//       subtitle:
//         "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
//     },
//     {
//       id: "1",
//       title: "How to donate your money for charity ?",
//       subtitle:
//         "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
//     },
//   ],
// };
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
h4 {
  font-size: 18px;
  font-weight: 600;
}
h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0px;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

.q-item__label {
  line-height: 1.6 !important;
}

.bg-light-grey {
  /* background-color: #f8f8f8; */
}
</style>
