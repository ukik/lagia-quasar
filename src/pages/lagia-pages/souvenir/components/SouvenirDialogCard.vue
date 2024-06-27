<template>
  <q-no-ssr>
    <q-dialog v-model="dialog_value">
      <q-card style="min-width: 400px">
        <q-toolbar>
          <q-toolbar-title
            ><span class="text-capitalize">{{
              dialog_payload?.label
            }}</span></q-toolbar-title
          >

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-separator></q-separator>

        <q-card-section>
          {{ dialog_payload?.value }}
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-no-ssr>

  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img
        v-if="item?.souvenirStore?.image && item?.souvenirStore?.image.length > 0"
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        :src="item?.souvenirStore?.image[0]"
        :error-src="$defaultErrorImage"
      >
        <div class="absolute-top-right bg-transparent">
          <q-btn
            size="16px"
            rounded
            dense
            color="white"
            text-color="primary"
            icon="fullscreen"
            @click="showMultiple(item?.souvenirStore?.image, 0)"
          />
        </div>

        <template v-slot:error>
          <div class="absolute-full flex flex-center text-white">Cannot load image</div>
        </template>
      </q-img>
      <q-img
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        v-else
        :src="$defaultErrorImage"
      />
      <!-- <q-img
        loading="lazy"
        style="height: 300px"
        v-if="!item?.souvenirStore?.image"
        :src="$defaultUser"
      />
      <ImageSlideCarousel
        v-else
        :_gallery="item?.souvenirStore?.image"
      ></ImageSlideCarousel> -->

      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-pink">{{ item?.souvenirStore?.category }}</div> -->
        <template v-for="(val, index) in item?.souvenirStore?.category">
          <q-chip
            color="blue"
            text-color="white"
            class="text-overline text-uppercase q-ml-none"
            >{{ val }}</q-chip
          >
        </template>

        <div class="text-h6 q-mt-sm q-mb-xs">{{ item?.souvenirStore?.name }}</div>
        <q-item-label caption class="q-mb-lg">{{
          item?.souvenirStore?.createdAt
        }}</q-item-label>

        <q-rating
          v-if="item?.souvenirStore?.ratingAvg?.avgRating"
          readonly
          v-model="item.souvenirStore.ratingAvg.avgRating"
          size="sm"
          :max="5"
          color="red"
        ></q-rating>

        <q-rating
          v-else
          readonly
          v-model="ratingZero"
          size="sm"
          :max="5"
          color="red"
        ></q-rating>

        <!-- <div class="row text-white">
          <q-item-section class="bg-primary q-mt-lg col-auto rounded-borders-1 q-pa-md">
            <q-item-label class="text-white">Start From</q-item-label>
            <q-item-label class="text-h4">Rp. {{ item?.souvenirStore?.souvenirStore?.generalPrice }}</q-item-label>
          </q-item-section>
        </div> -->
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <isQItemLabelSimpleValueNoDense
            label="uuid"
            :value="item?.souvenirStore?.uuid"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="name"
            :value="item?.souvenirStore?.name"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="email"
            :value="item?.souvenirStore?.email"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="phone"
            :value="item?.souvenirStore?.phone"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="codepos"
            :value="item?.souvenirStore?.codepos"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="city"
            :value="item?.souvenirStore?.city"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="country"
            :value="item?.souvenirStore?.country"
          ></isQItemLabelSimpleValueNoDense>

          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              dialog_value = true;
              dialog_payload = {
                value: item?.souvenirStore?.address,
                label: 'address',
              };
            "
            :clickable="true"
            label="address"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>

          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              dialog_value = true;
              dialog_payload = {
                value: item?.souvenirStore?.location,
                label: 'location',
              };
            "
            :clickable="true"
            label="location"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>

          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              dialog_value = true;
              dialog_payload = {
                value: item?.souvenirStore?.policy,
                label: 'policy',
              };
            "
            :clickable="true"
            label="policy"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>

          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              dialog_value = true;
              dialog_payload = {
                value: item?.souvenirStore?.description,
                label: 'description',
              };
            "
            :clickable="true"
            label="description"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>

          <isAvailable :item="item?.souvenirStore?.isAvailable"></isAvailable>
        </q-list>
      </q-card-section>
      <!-- <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Address </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ item?.souvenirStore?.address }}
            </q-card-section>
          </q-card>
          <q-separator></q-separator>
        </q-expansion-item>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Policy </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ item?.souvenirStore?.policy }}
            </q-card-section>
          </q-card>
          <q-separator></q-separator>
        </q-expansion-item>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Description </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ item?.souvenirStore?.description }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section> -->
      <!-- <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-btn-group spread outline>
          <q-btn
            @click="
              $emit('onBubbleEvent', { label: 'vendor', payload: item?.souvenirStore?.transportRental })
            "
            label="Vendor"
            icon="storefront"
          />
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'vehicle',
                payload: item?.souvenirStore?.transportVehicle,
              })
            "
            label="Kendaraan"
            icon="directions_car"
          />
        </q-btn-group>
      </q-card-section> -->

      <!-- <q-separator></q-separator>

      <q-card-actions align="center">
        <q-btn
          outline
          flat
          icon="shopping_cart_checkout"
          color="primary"
          size="md"
          label="Add To Cart"
        />
      </q-card-actions> -->

      <!-- <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-body">
            {{ item?.souvenirStore?.description }}
          </q-card-section>
        </div>
      </q-slide-transition> -->
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
// import isQItemLabelValue from "./isQItemLabelValue";
// import ImageSlideCarousel from "./ImageSlideCarousel";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  props: ["item"],
  components: {
    // isQItemLabelValue,
    // ImageSlideCarousel,
  },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    const dialog_payload = ref(null);
    const dialog_value = ref(false);

    return {
      showMultiple,
      expanded: ref(false),
      ratingZero: 0.0,

      dialog_payload,
      dialog_value,
    };
  },
  methods: {
    badgeCondition(condition) {
      switch (condition) {
        case "public":
          return "pink";
        case "partner":
          return "positive";
        case "private":
          return "primary";
      }
    },
    getCategory(item) {
      if (!item?.souvenirStore?.category) return [];
      return item?.souvenirStore?.category.split(",");
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 100%
</style>

<style lang="css">
.custom .q-item__label {
  /* margin-bottom: 25px; */
  /* color: white; */
  line-height: 1.6 !important;
  font-size: 14px;
}
</style>
