<template>
  <q-parallax
    v-if="records"
    id="call-action-offer"
    class="margin"
    :height="$q.screen.width > 768 ? 500 : 850"
    :src="records?.image"
    :error-src="$defaultErrorImage"
  >
    <div class="absolute-full dimmed"></div>
    <div class="absolute-full dimmed"></div>

    <div class="full-width row flex flex-center" :class="[]">
      <q-card
        flat
        class="bg-transparent col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
        :class="[
          $q.screen.width > 425 ? '' : 'q-px-none',
          $q.screen.width > 768 ? 'q-px-md' : '',
        ]"
      >
        <q-card-section :horizontal="$q.screen.width > 768">
          <div class="q-mt-lg q-pr-lg">
            <h5 class="text-white text-h6">{{ records?.title }}</h5>
            <h2 class="text-white">{{ records?.headline }}</h2>
            <q-item-label lines="2" class="text-white">
              {{ records?.subtitle }}
            </q-item-label>
            <q-btn :href="$onCall()"
              icon="phone"
              dense
              unelevated
              rounded
              class="q-py-md q-px-lg q-mt-lg rounded-borders-4"
              color="primary"
              label="Contact Us!"
            />
          </div>
          <div class="row col-6 q-py-xl client-section">
            <div class="client-logo">
              <ul class="row">
                <li>
                  <img
                    :src="records?.image1"
                    :error-src="$defaultErrorImage"
                    :alt="records?.title"
                  />
                </li>
                <li>
                  <img
                    :src="records?.image2"
                    :error-src="$defaultErrorImage"
                    :alt="records?.title"
                  />
                </li>
                <li>
                  <img
                    :src="records?.image3"
                    :error-src="$defaultErrorImage"
                    :alt="records?.title"
                  />
                </li>
                <li>
                  <img
                    :src="records?.image4"
                    :error-src="$defaultErrorImage"
                    :alt="records?.title"
                  />
                </li>
                <li>
                  <img
                    :src="records?.image5"
                    :error-src="$defaultErrorImage"
                    :alt="records?.title"
                  />
                </li>
                <li>
                  <img
                    :src="records?.image6"
                    :error-src="$defaultErrorImage"
                    :alt="records?.title"
                  />
                </li>
              </ul>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-parallax>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";

import { useInitStore } from "stores/lagia-stores/page/InitStore";

const store = useInitStore();
const {
  footer_transport,
  footer_about,
  footer_contact,
  footer_gallery,

  page_widget_call,
  page_widget_counter,
  page_widget_offer,
  page_widget_promo,
  page_widget_tron,

  loading,

  init,
} = storeToRefs(store); // have all reactive states here

const records = page_widget_offer;
</script>

<style scoped>
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
  line-height: 1.6 !important;
}

.bg-color-callback {
  padding-top: 85px;
  padding-bottom: 85px;
}
.bg-light-grey {
  background-color: #f8f8f8;
}

/* IMAGE */
.client-section .client-logo ul {
  margin: 0;
  padding: 0;
  font-size: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-left: 1px solid rgba(255, 255, 255, 0.4);
}
/* ul {
    list-style: disc;
} */
.client-section .client-logo ul li {
  display: inline-block;
  list-style: none;
  /* padding: 15px; */
  width: 33.33%;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
}

.client-section .client-logo ul li img {
  width: 100%;
  height: 100%;
}

.client-section {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
}
.client-section {
  /* padding: 115px 0; */
  position: relative;
  z-index: 1;
}
</style>

<style>
#call-action-offer .q-parallax__media > img,
.q-parallax__media > video {
  left: 50% !important;
}
</style>
