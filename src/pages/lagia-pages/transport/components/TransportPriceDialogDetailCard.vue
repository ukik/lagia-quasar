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
  <isModalDescription ref="isModal"></isModalDescription>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img
        v-if="item?.transportVehicle?.image && item?.transportVehicle?.image.length > 0"
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        :src="item?.transportVehicle?.image[0]"
      >
        <div class="absolute-top-right bg-transparent">
          <q-btn
            size="16px"
            rounded
            dense
            color="white"
            text-color="primary"
            icon="fullscreen"
            @click="showMultiple(item?.transportVehicle?.image, 0)"
          />
        </div>

        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Cannot load image
          </div>
        </template>
      </q-img>
      <q-img
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        v-else
        :src="$defaultUser"
      />

      <!-- <q-img
        loading="lazy"
        style="height: 300px"
        v-if="!item?.image"
        :src="$defaultErrorImage"
      />
      <ImageSlideCarousel
        v-else
        :_gallery="item?.image"
      ></ImageSlideCarousel> -->

      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-pink">{{ item?.category }}</div> -->
        <DestinationRating :rating="item?.ratingAvg?.avgRating"></DestinationRating>

        <!-- <q-chip
          color="pink"
          text-color="white"
          icon="label"
          class="text-overline text-uppercase"
          >{{ item?.typePrice }}</q-chip
        > -->

        <div class="text-h6 q-mb-xs">{{ item?.name }}</div>
        <q-item-label caption>{{ item?.createdAt }}</q-item-label>

        <div class="row text-white">
          <q-item-section class="bg-primary q-mt-lg col-auto rounded-borders-1 q-pa-md">
            <q-item-label class="text-white text-capitalize"
              >Harga {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h4">{{
              $currency($finalPrice(item))
            }}</q-item-label>
          </q-item-section>
        </div>

        <!-- <q-rating
          v-if="item?.ratingAvg?.avgRating"
          readonly
          v-model="item.ratingAvg.avgRating"
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
          color="grey"
        ></q-rating> -->
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Detail Produk </q-item-section>
          </template>
          <!-- <q-separator></q-separator> -->

          <q-card>
            <q-card-section class="custom q-pa-none q-mb-md">
              <q-list class="row flex items-start text-caption text-dark q-pl-md">
                <isQItemLabelSimpleValue
                  label="model"
                  :value="item?.transportVehicle?.model"
                ></isQItemLabelSimpleValue>
                <isQItemLabelSimpleValue
                  label="brand"
                  :value="item?.transportVehicle?.brand"
                ></isQItemLabelSimpleValue>
                <!-- <isQItemLabelSimpleValue
                  label="category"
                  :value="item?.category"
                ></isQItemLabelSimpleValue> -->
                <isQItemLabelSimpleValue
                  label="fuelType"
                  :value="item?.transportVehicle?.fuelType"
                ></isQItemLabelSimpleValue>
                <!-- <isQItemLabelSimpleValue
                  label="dateProduction"
                  :value="item?.dateProduction"
                ></isQItemLabelSimpleValue> -->
                <isQItemLabelSimpleValue
                  label="color"
                  :value="item?.transportVehicle?.color"
                ></isQItemLabelSimpleValue>
                <!-- <isQItemLabelSimpleValue
                  label="codeStnk"
                  :value="item?.codeStnk"
                ></isQItemLabelSimpleValue> -->
                <isQItemLabelSimpleValue
                  label="slotPassanger"
                  :value="item?.transportVehicle?.slotPassanger"
                ></isQItemLabelSimpleValue>

                <q-item class="col-12" dense>
                  <q-item-section avatar>
                    <q-item-label>category</q-item-label>
                  </q-item-section>
                  <q-item-section class="text-right">
                    <q-item-label lines="1"
                      ><q-chip class="q-mx-none" color="pink" text-color="white">{{
                        item?.transportVehicle?.category
                      }}</q-chip></q-item-label
                    >
                  </q-item-section>
                </q-item>
                <isAvailable :item="item?.isAvailable"></isAvailable>
              </q-list>
            </q-card-section>
          </q-card>
          <q-separator></q-separator>
        </q-expansion-item>
      </q-card-section>

      <!-- <q-separator></q-separator> -->

      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <!-- <isQItemLabelSimpleValueNoDense label="id" :value="item?.id"></isQItemLabelSimpleValueNoDense> -->
          <!-- <isQItemLabelSimpleValueNoDense label="uuid" :value="item?.uuid"></isQItemLabelSimpleValueNoDense> -->
          <!-- <isQItemLabelSimpleValueNoDense label="rentalId" :value="item?.rentalId"></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense label="vehicleId" :value="item?.vehicleId"></isQItemLabelSimpleValueNoDense> -->
          <!-- <isQItemLabelSimpleValueNoDense label="name" :value="item?.name"></isQItemLabelSimpleValueNoDense> -->
          <isQItemLabelSimpleValueNoDense
            label="generalPrice"
            :value="$currency(item?.generalPrice)"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="discountPrice"
            :value="$percent(item?.discountPrice)"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="cashbackPrice"
            :value="$currency(item?.cashbackPrice)"
          ></isQItemLabelSimpleValueNoDense>
          <!-- <isQItemLabelSimpleValueNoDense
            label="description"
            :value="item?.description"
          ></isQItemLabelSimpleValueNoDense> -->

          <!-- <isQItemLabelSimpleValueNoDense label="customerId" :value="item?.customerId"></isQItemLabelSimpleValueNoDense> -->
          <!-- <isQItemLabelSimpleValueNoDense
            label="condition"
            :value="item?.condition"
          ></isQItemLabelSimpleValueNoDense> -->
          <!-- <isQItemLabelValue label="customer" :value="item?.customer"></isQItemLabelValue> -->

          <!-- <isQItemLabelValue label="createdAt" :value="item?.createdAt"></isQItemLabelValue>
          <isQItemLabelValue label="updatedAt" :value="item?.updatedAt"></isQItemLabelValue>
          <isQItemLabelValue label="deletedAt" :value="item?.deletedAt"></isQItemLabelValue> -->

          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: { value: item?.description, label: 'description' },
              })
            "
            :clickable="true"
            label="description"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>
        </q-list>
      </q-card-section>

      <!-- <q-card-section class="q-pa-none">
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section> Description </q-item-section>
          </template>
          <q-separator></q-separator>

          <q-card>
            <q-card-section>
              {{ item?.description }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section> -->

      <!-- <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-btn-group spread outline>
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'detail',
                payload: item,
              })
            "
            label="detail"
            icon="visibility"
          />
          <q-btn
            @click="$emit('onBubbleEvent', { label: 'profile', payload: item })"
            label="Profile"
            icon="person"
          />
        </q-btn-group>
      </q-card-section> -->

      <q-separator></q-separator>

      <!-- <q-card-actions align="center">
        <q-btn
          outline
          flat
          icon="shopping_cart_checkout"
          color="primary"
          size="md"
          label="Add To Cart"
        />
      </q-card-actions> -->

      <q-card-section class="q-pa-none">
        <slot :scoped="item" name="buttongroup">
          <q-btn-group spread unelevated>
            <q-btn
              @click="
                $emit('onBubbleEvent', {
                  label: 'detail',
                  payload: item,
                })
              "
              label="Add To Cart"
              icon="shopping_cart_checkout"
            />
            <!-- <q-separator vertical></q-separator>
            <q-btn
              @click="
                $emit('onBubbleEvent', {
                  label: 'store',
                  payload: item,
                })
              "
              label="store"
              icon="storefront"
            /> -->
          </q-btn-group>
        </slot>
      </q-card-section>

      <!-- <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-body">
            {{ item?.description }}
          </q-card-section>
        </div>
      </q-slide-transition> -->
    </q-card>
  </div>
</template>

<script setup>
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;
const dialog_payload = ref(null);
const dialog_value = ref(false);
</script>

<script>
import { ref } from "vue";
// import isQItemLabelValue from "./isQItemLabelValue";
// import ImageSlideCarousel from "./ImageSlideCarousel";
// import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  props: ["item"],
  components: {
    // isQItemLabelValue,
    // ImageSlideCarousel,
  },
  setup() {
    return {
      expanded: ref(false),
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
