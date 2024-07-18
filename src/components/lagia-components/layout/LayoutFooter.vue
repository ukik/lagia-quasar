<template>
  <!-- <q-no-ssr>
    <EasyLightbox :_gallery="gallery" ref="EasyLightboxRef"></EasyLightbox>
  </q-no-ssr> -->

  <div id="footer" class="site-footer row justify-center">
    <div
      class="row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
        <div class="footer-logo q-mb-lg">
          <a href="index.html"><img src="assets/images/site-logo.png" alt="" /></a>
        </div>
        <q-item-label
          class="text-white q-mb-sm"
          lines="6"
          v-html="footer_about?.description"
        />

        <!-- <q-item-label>
          <q-btn dense flat color="white" icon-right="keyboard_arrow_right"
            >Selengkapnya</q-btn
          >
        </q-item-label> -->
        <router-link class="text-white" to="/lagia/about"
          >selengkapnya <q-icon name="keyboard_arrow_right"></q-icon
        ></router-link>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
        <q-list class="text-white footer-primary">
          <q-item-label class="text-white q-px-none widget-title" header
            >RECENT RENTAL</q-item-label
          >

          <template v-for="(item, index) in footer_transport">
            <q-item
              class="text-white"
              clickable
              v-ripple
              :to="{
                name: '/transport/price-list',
                query: {
                  product: item?.id,
                },
              }"
            >
              <q-item-section top thumbnail>
                <img
                  class="rounded-borders-1"
                  style="height: 75px; width: 75px"
                  :src="item?.image[0]"
                  :error-src="$defaultErrorImage"
                />
              </q-item-section>

              <q-item-section top>
                <q-item-label class="text-uppercase" lines="2"
                  >{{ item?.brand }} - {{ item?.model }} -
                  {{ item?.category }}</q-item-label
                >
                <q-item-label class="text-white q-mt-md" caption>
                  <!-- ({{ item?.transportPricesCount }} Price) -->
                  <q-rating
                    v-if="item?.ratingAvg?.avgRating"
                    readonly
                    v-model="item.ratingAvg.avgRating"
                    size="xs"
                    :max="5"
                    color="white"
                  ></q-rating>
                  <q-rating
                    v-else
                    readonly
                    v-model="rating"
                    size="xs"
                    :max="5"
                    color="white"
                  ></q-rating>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
        <q-list class="text-white footer-primary">
          <q-item-label class="text-white q-px-none widget-title" header
            >CONTACT US</q-item-label
          >
          <q-item-label class="q-mb-md"
            >Feel free to contact and reach us !!</q-item-label
          >

          <q-item
            :href="`tel:${footer_contact?.grid1Value}`"
            class="q-px-xs"
            clickable
            v-ripple
          >
            <q-item-section side>
              <q-icon color="white" name="phone" />
            </q-item-section>
            <q-item-section>{{ footer_contact?.grid1Value }}</q-item-section>
          </q-item>

          <q-item
            :href="`mailto:${footer_contact?.grid2Value}`"
            class="q-px-xs"
            clickable
            v-ripple
          >
            <q-item-section side>
              <q-icon color="white" name="email" />
            </q-item-section>
            <q-item-section>{{ footer_contact?.grid2Value }}</q-item-section>
          </q-item>

          <q-item @click="onMap" class="q-px-xs" clickable v-ripple>
            <q-item-section side>
              <q-icon color="white" name="location_on" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="2">{{ footer_contact?.grid3Value }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
        <q-list class="text-white footer-primary">
          <q-item-label
            class="text-white q-px-none widget-title"
            style="margin-bottom: 4px"
            header
            >GALLERY</q-item-label
          >
        </q-list>

        <div class="row q-col-gutter-sm">
          <template v-for="(item, index) in shuffleArray">
            <div class="col-4" v-if="index < 6">
              <q-img
                @click="showMultiple(footer_gallery?.image, index)"
                ratio="1"
                class="rounded-borders-1"
                :src="item"
              />
            </div>
          </template>
        </div>
      </div>

      <div class="col-12 q-my-md">
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.2)" />
      </div>

      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <q-list class="text-white footer-primary">
          <q-input
            class="q-mb-lg"
            bg-color="white"
            :loading="loading"
            outlined
            bottom-slots
            v-model="text"
            placeholder="Enter your email"
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>

            <template v-slot:after>
              <q-btn
                rounded
                outline
                :loading="loading"
                @click=""
                class="full-height"
                color="white"
                icon="send"
                :label="$q.screen.width > 425 ? 'Subscribe' : ''"
              ></q-btn>
            </template>

            <template v-slot:hint
              ><div class="text-white">Email wajib diisi</div></template
            >
          </q-input>
        </q-list>
      </div>

      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <q-card-actions
          class="q-pa-none"
          :align="$q.screen.width > 768 ? 'right' : 'center'"
        >
          <q-btn
            type="_blank"
            :href="footer_contact?.instagram"
            icon="fa-brands fa-instagram"
            round
            outline
            color="white"
            size="14px"
            :dense="false"
            class="q-mr-sm"
          >
            <!-- <font-awesome :icon="['fab', 'fa-instagram']" /> -->
          </q-btn>
          <q-btn
            type="_blank"
            :href="footer_contact?.whatsapp"
            icon="fa-brands fa-whatsapp"
            round
            outline
            color="white"
            size="14px"
            :dense="false"
            class="q-mr-sm"
          >
            <!-- <font-awesome :icon="['fab', 'fa-whatsapp']" /> -->
          </q-btn>
          <q-btn
            type="_blank"
            :href="footer_contact?.facebook"
            icon="fa-brands fa-facebook-f"
            round
            outline
            color="white"
            size="14px"
            :dense="false"
            class="q-mr-sm"
          >
            <!-- <font-awesome :icon="['fab', 'fa-facebook-f']" /> -->
          </q-btn>
          <q-btn
            type="_blank"
            :href="footer_contact?.twitter"
            icon="fa-brands fa-x-twitter"
            round
            outline
            color="white"
            size="14px"
            :dense="false"
            class="q-mr-sm"
          >
            <!-- <font-awesome :icon="['fab', 'fa-x-twitter']" /> -->
          </q-btn>
          <q-btn
            type="_blank"
            :href="footer_contact?.tiktok"
            icon="fa-brands fa-tiktok"
            round
            outline
            color="white"
            size="14px"
            :dense="false"
          >
            <!-- <font-awesome :icon="['fab', 'fa-tiktok']" /> -->
          </q-btn>
        </q-card-actions>

        <q-card-actions
          class="q-pa-none q-mt-sm text-white"
          :align="$q.screen.width > 768 ? 'right' : 'center'"
        >
          <router-link
            v-if="getInfoPrivasi?.slug"
            :to="{
              name: '/info/privacy-policy',
              params: {
                slug: getInfoPrivasi?.slug,
                id: getInfoPrivasi?.id,
              },
            }"
            >{{ getInfoPrivasi?.title }}</router-link
          >
          <q-separator class="q-mx-sm q-my-xs" vertical color="white"></q-separator>
          <router-link
            v-if="getInfoSyarat?.slug"
            :to="{
              name: '/info/terms-condition',
              params: {
                slug: getInfoSyarat?.slug,
                id: getInfoSyarat?.id,
              },
            }"
            >{{ getInfoSyarat?.title }}</router-link
          >
          <q-separator class="q-mx-sm q-my-xs" vertical color="white"></q-separator>
          <router-link to="/lagia/faq">FAQ</router-link>
        </q-card-actions>
      </div>
    </div>

    <div
      v-if="$q.screen.width <= 768"
      class="col-12 bottom-footer text-center text-white text-uppercase q-mt-lg"
    >
      Copyright © {{ $year }} Lagia. All rights reserved.
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";

import { useInitStore } from "stores/lagia-stores/page/InitStore";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

const store = useInitStore();
const {
  footer_transport,
  footer_about,
  footer_contact,
  footer_gallery,
  footer_info,

  page_widget_call,
  page_widget_counter,
  page_widget_offer,
  page_widget_promo,
  page_widget_tron,

  loading,

  getInfoPrivasi,
  getInfoSyarat,
  shuffleArray,

  init,
} = storeToRefs(store); // have all reactive states here

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

const text = ref(null);
const rating = 0;

function onMap() {
  window.open(footer_contact.value?.map, "_blank");
}

// // import EasyLightbox from "./EasyLightbox";
// import { ref, defineProps } from "vue";

// const loading = false;
// const text = ref(null);

// const EasyLightboxRef = ref(null);
// const gallery = [
//   "https://picsum.photos/500/300",
//   "https://picsum.photos/500/400",
//   "https://picsum.photos/500/300",
//   "https://picsum.photos/500/400",
//   "https://picsum.photos/500/300",
//   "https://picsum.photos/500/400",
// ];

// const openLightBox = (index = 0) => {
//   EasyLightboxRef.value?.showImage(index);
//   // EasyLightboxRef.value?.showMultiple(gallery, 0)
//   // console.log(EasyLightboxRef)
// };
</script>

<style>
#footer .q-item__label.text-white p {
  color: white !important;
}
</style>

<style scoped>
.site-footer {
  background-color: rgba(34, 54, 69, 0.98);
  padding-top: 80px;
}
.footer-logo img {
  height: auto;
  max-width: 100%;
  vertical-align: top;
}
.footer-primary .widget-title {
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.1;
  /* margin-bottom: 30px; */
  text-transform: uppercase;
}
a {
  color: rgba(255, 255, 255, 0.75);
}
a:hover {
  color: white;
}
.q-item__label {
  line-height: 1.6 !important;
}
</style>
