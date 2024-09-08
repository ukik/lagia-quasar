<template>
  <!-- <main> -->
  <div class="call-action-box bg-color-callback row justify-center">
    <div class="col-xl-6 col-lg-8 col-md-11 col-sm-12 col-12 text-center q-px-md">
      <h6 class="text-blue">BEST PRICE OFFER</h6>
      <h2>LAGIA TOUR</h2>
      <!-- <p>
        Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
        Vestibulum cumque laudantium. Sit ornare mollitia tenetur, aptent.
      </p> -->
    </div>
  </div>

  <q-no-ssr>
    <isModalDescription ref="isModal"></isModalDescription>
  </q-no-ssr>

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
        <q-card square flat bordered class="rounded-borders-2">
          <q-card-section class="row q-pa-none">
            <isImageSlideCarousel
              v-if="item?.image && item?.image.length > 0"
              height="300px"
              class="rounded-borders-0 col-12"
              :_gallery="item?.image"
            ></isImageSlideCarousel>

            <!-- <q-img
              v-if="item?.image && item?.image.length > 0"
              loading="lazy"
              :ratio="1"
              class="col-12 q-border-bottom pointer"
              :src="item?.image[0]"
            >
              <div v-if="$q.screen.width > 425" class="absolute-bottom">
                {{ item?.name }}
              </div>

              <div class="absolute-full bg-transparent q-pa-none">
                <q-btn
                  class="absolute-full"
                  :to="{
                    name: '/tour/product-detail',
                    params: {
                      slug: item?.id,
                      slug_text: item?.slug,
                    },
                  }"
                >
                </q-btn>
              </div>

              <div class="absolute-top-right bg-transparent">
                <q-btn
                  size="16px"
                  rounded
                  dense
                  color="white"
                  text-color="primary"
                  icon="fullscreen"
                  @click="showMultiple(item?.image, 0)"
                />
              </div>

              <template v-slot:error>
                <div class="absolute-full flex flex-center text-white">
                  Cannot load image
                </div>
              </template>
            </q-img> -->
            <q-img
              loading="lazy"
              :ratio="1"
              class="col-12 q-border-bottom"
              v-else
              :src="$defaultErrorImage"
            >
              <div v-if="$q.screen.width > 425" class="absolute-bottom">
                {{ item?.name }}
              </div>

              <div class="absolute-full bg-transparent q-pa-none">
                <q-btn
                  class="absolute-full"
                  :to="{
                    name: '/tour/product-detail',
                    params: {
                      slug: item?.id,
                      slug_text: item?.slug,
                    },
                  }"
                >
                </q-btn>
              </div>
            </q-img>

            <q-card-section class="row col-12 flex items-start q-pa-none">
              <q-list class="col-12">
                <q-item
                  clickable
                  :to="{
                    name: '/tour/product-detail',
                    params: {
                      slug: item?.id,
                      slug_text: item?.slug,
                    },
                  }"
                >
                  <q-item-section class="text-title">
                    <q-item-label lines="1"
                      >{{ item?.name }}
                    </q-item-label>
                    <q-item-label caption
                      >dibuat: {{ item?.createdAt }}</q-item-label
                    >
                  </q-item-section>
                </q-item>
                <q-separator></q-separator>
                <q-item v-if="$q.screen.width > 425">
                  <q-item-section>
                    <q-item-label caption>Kategori</q-item-label>
                    <q-item-label lines="1" class="text-capitalize">
                      {{ item?.category }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  v-else
                  clickable
                  v-ripple
                  :to="{
                    name: '/tour/product-detail',
                    params: {
                      slug: item?.id,
                      slug_text: item?.slug,
                    },
                  }"
                >
                  <q-item-section>
                    <q-item-label>
                      {{ item?.name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Durasi</q-item-label>
                    <q-item-label class="text-capitalize">
                      {{ item?.durasi }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>Destinasi</q-item-label>
                    <q-item-label>
                      {{ item?.province }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-separator></q-separator>

            <!-- <q-card-section class="q-pa-none"> -->
              <!-- <q-btn-group spread unelevated class="full-width">
                <q-btn
                  :to="{
                    name: '/tour/product-detail',
                    params: {
                      slug: item?.id,
                      slug_text: item?.slug,
                    },
                  }"
                  label="detail produk"
                  icon="visibility"
                />
                <q-separator vertical></q-separator>
                <q-btn
                  @click="
                    $emit('onBubbleEvent', {
                      label: 'store',
                      payload: item,
                    })
                  "
                  label="detail vendor"
                  icon="storefront"
                />
              </q-btn-group> -->
            <!-- </q-card-section> -->

            <!-- <q-separator></q-separator> -->

            <q-btn
              unelevated
              square
              :to="{
                    name: '/tour/product-order',
                    params: {
                      slug: item?.id,
                      slug_text: item?.slug,
                    },
                  }"
              class="full-width"
              style="border-radius: 0px"
              color="form"
              text-color="white"
              label="Buat Pesanan"
              icon="shopping_cart_checkout"
            />

            <!-- <q-btn
              unelevated
              square
              class="full-width"
              style="border-radius: 0px"
              @click="
                $global.$emit('LagiaLayout', {
                  label: 'konsultasi',
                  slug: 'konsultasi',
                  vendor: 'tourProduct',
                  value: item,
                  product: 'tourProduct',
                })
              "
              color="positive"
              text-color="white"
              label="Tanya Admin"
              icon="fa-brands fa-whatsapp"
            /> -->

          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="text-center full-width top-margin-1">
      <q-btn
        to="/tour/product-list"
        icon-right="arrow_forward"
        size="18px"
        style="height: 50px"
        unelevated
        rounded
        class="rounded-borders-4"
        color="primary"
        label="selengkapnya"
      />
    </div>
  </div>

  <!-- </main> -->
</template>

<script>
export default {
  props: ["records"],
};
</script>

<script async setup>
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

const ratingZero = 0.0;

function getSplit(item) {
  if (!item) return [];
  try {
    return item.split(",");
  } catch (error) {
    return item;
  }
}
</script>

<style scoped>
.content-page-section {
  /* padding-bottom: 80px; */
}

.content-page-section p {
  margin-bottom: 25px;
}

.package-price {
  h6 {
    color: white;
    font-size: 40px;
    font-weight: 800;
    display: block;
  }
  small {
    margin-top: -15px;
  }
}

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
  /* margin-bottom: 25px; */
  /* color: white; */
  line-height: 1.6 !important;
}

.bg-color-callback {
  padding-top: 85px;
  padding-bottom: 50px;
}
.bg-light-grey {
  background-color: #f8f8f8;
}
</style>
