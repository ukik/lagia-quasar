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
            <q-img
              @click="
                $router.push({
                  name: '/tour/store-detail',
                  params: {
                    slug: item?.id,
                    slug_text: item?.slug,
                  },
                })
              "
              v-if="item?.image && item?.image.length > 0"
              loading="lazy"
              :ratio="16 / 9"
              class="col-12 q-border-bottom pointer"
              :src="item?.image[0]"
            >
              <!-- <div class="absolute-full bg-transparent q-pa-none">
                <q-btn
                  class="absolute-full"
                  :to="{
                    name: '/tour/store-detail',
                    params: {
                      slug: item?.id,
                      slug_text: item?.slug,
                    },
                  }"
                >
                </q-btn>
              </div> -->
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
            </q-img>
            <q-img
              loading="lazy"
              :ratio="1"
              class="col-12 q-border-bottom"
              v-else
              :src="$defaultUser"
            />

            <q-card-section class="row col-12 flex items-start q-pa-none">
              <div class="text-box full-width col-12 text-capitalize">
                <q-expansion-item class="bg-white" default-opened>
                  <template v-slot:header>
                    <q-item-section class="text-h6 q-px-none">
                      <q-item-label lines="1">
                        {{ item?.name }}
                      </q-item-label>
                    </q-item-section>
                  </template>
                  <q-card>
                    <isQItemLabelSimpleValue
                      label="uuid"
                      :value="item?.uuid"
                    ></isQItemLabelSimpleValue>
                    <isQItemLabelSimpleValue
                      label="category"
                      :value="item?.category"
                    ></isQItemLabelSimpleValue>
                    <isQItemLabelSimpleValue
                      label="lainnya"
                      :value="item?.others"
                    ></isQItemLabelSimpleValue>

                    <isQItemLabelSimpleValue
                      class="q-mb-sm"
                      @onBubbleEvent="
                        $refs.isModal.onOpen({
                          dialog_value: true,
                          dialog_payload: {
                            value: item?.description,
                            label: 'description',
                          },
                        })
                      "
                      :clickable="true"
                      label="description"
                      value="Detail"
                      textcolor="text-primary"
                    ></isQItemLabelSimpleValue>
                  </q-card>
                </q-expansion-item>
              </div>
            </q-card-section>

            <q-card-section
              class="bg-form col-12 row flex flex-center text-white q-pt-lg"
            >
              <q-rating
                v-if="item?.ratingAvg?.avgRating"
                readonly
                v-model="item.ratingAvg.avgRating"
                size="sm"
                :max="5"
                color="white"
              ></q-rating>

              <q-rating
                v-else
                readonly
                v-model="ratingZero"
                size="sm"
                :max="5"
                color="white"
              ></q-rating>

              <div v-if="false" class="full-width text-body text-center q-mx-sm">
                Review (34)
              </div>
              <div class="package-price col-12 text-center row q-mt-md">
                <h6 class="col-12">
                  {{ item?.tourPricesCount }}
                  <small class="text-weight-light"> Harga</small>
                </h6>
                <small class="col-12 text-center text-caption">( available )</small>
              </div>

              <div class="row col-12 justify-center q-mt-lg">
                <q-btn
                  outline
                  class="text-weight-normal rounded-borders-2"
                  color="form"
                  text-color="white"
                  label="selengkapnya"
                  :to="{
                    name: '/tour/price-list',
                    query: {
                      product: item?.id,
                    },
                  }"
                />
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="text-center full-width top-margin-1">
      <q-btn
        to="/tour/store-list"
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
