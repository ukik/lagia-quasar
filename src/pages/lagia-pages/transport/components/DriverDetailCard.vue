<template>
  <!-- <div class="row items-start q-gutter-md"> -->
  <div class="row items-start">
    <q-card class="my-card" flat bordered>
      <q-img
        style="height: 400px"
        :src="item?.image"
        error-src="https://cdn.quasar.dev/logo-v2/header.png"
      >
        <!-- <q-badge
          :color="item?.ticketStatus == 'bisnis' ? 'pink' : 'positive'"
          class="q-mr-lg rounded-borders-2"
          style="margin-top: -17px"
          floating
          ><span class="text-title text-uppercase q-mt-md">{{
            item?.ticketStatus
          }}</span></q-badge
        > -->

        <div class="absolute-top-right bg-transparent">
          <q-btn
            dense
            color="white"
            text-color="primary"
            icon="fullscreen"
            @click="showMultiple(item?.image, 0)"
          />
        </div>

        <template v-slot:error>
          <div class="absolute-full flex flex-center">Error encountered</div>

          <div class="absolute-top-right bg-transparent">
            <q-btn
              dense
              color="white"
              text-color="primary"
              icon="fullscreen"
              @click="showMultiple(item?.image, 0)"
            />
          </div>

          <!-- <q-badge
            :color="item?.ticketStatus == 'bisnis' ? 'pink' : 'positive'"
            class="q-mr-lg rounded-borders-2"
            style="margin-top: -17px"
            floating
            ><span class="text-title text-uppercase q-mt-md">{{
              item?.ticketStatus
            }}</span></q-badge
          > -->
        </template>
      </q-img>

      <!-- <RentalImageSlideCarousel :_gallery="item?.image"></RentalImageSlideCarousel> -->

      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <QItemLabelValue label="id" :value="item?.id"></QItemLabelValue>
          <QItemLabelValue label="uuid" :value="item?.uuid"></QItemLabelValue>
          <QItemLabelValue label="user Id" :value="item?.userId"></QItemLabelValue>
          <QItemLabelValue label="name" :value="item?.name"></QItemLabelValue>
          <!-- <QItemLabelValue label="image" :value="item?.image"></QItemLabelValue> -->
          <QItemLabelValue
            label="daily Price"
            :value="item?.dailyPrice"
          ></QItemLabelValue>
          <QItemLabelValue label="year Exp" :value="item?.yearExp"></QItemLabelValue>
          <QItemLabelValue
            label="is Available"
            :value="item?.isAvailable"
          ></QItemLabelValue>
          <QItemLabelValue
            label="is Reserved"
            :value="item?.isReserved"
          ></QItemLabelValue>
          <QItemLabelValue label="created At" :value="item?.createdAt"></QItemLabelValue>
          <!-- <QItemLabelValue label="updatedAt" :value="item?.updatedAt"></QItemLabelValue> -->
          <!-- <QItemLabelValue label="deletedAt" :value="item?.deletedAt"></QItemLabelValue> -->
          <!-- <QItemLabelValue label="Deskripsi" :value="item?.description"></QItemLabelValue> -->
        </q-list>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section> Description </q-item-section>
          </template>

          <q-card>
            <q-card-section class="q-pt-none">
              {{ item?.description }} Follow the instructions to embed the icon font in
              your site and learn how to style your icons using CSS. Follow the
              instructions to embed the icon font in your site and learn how to style your
              icons using CSS.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import QItemLabelValue from "./QItemLabelValue";
import RentalImageSlideCarousel from "./RentalImageSlideCarousel";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  props: ["item"],
  components: {
    QItemLabelValue,
    RentalImageSlideCarousel,
  },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    return {
      showMultiple,
      expanded: ref(false),
      policy: ref(false),
      description: ref(false),
    };
  },
  computed: {
    getSingleImage() {
      if (this.item?.image.length > 0 && this.item?.image) return this.item?.image[0];
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
