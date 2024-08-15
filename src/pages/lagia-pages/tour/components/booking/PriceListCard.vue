<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <isImageSlideCarousel
        :height="$q.screen.width > 425 ? '400px' : '400px'"
        class="rounded-borders-2"
        :_gallery="images"
      ></isImageSlideCarousel>

      <q-card-section>
        <!-- <DestinationRating :rating="item?.ratingAvg?.avgRating"></DestinationRating> -->

        <q-item
          dense
          clickable
          class="q-pa-none"
          :to="{
            name: '/tour/price-detail',
            params: {
              slug: item?.id,
              slug_text: item?.name,
            },
          }"
        >
          <q-item-section class="text-h6 q-mb-xs">
            <q-item-label>{{ item?.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label caption>{{ item?.createdAt }}</q-item-label>
      </q-card-section>
      <q-separator></q-separator>

      <q-card-section class="row q-col-gutter-md">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 row text-white">
          <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md col-12">
            <q-item-label class="text-white text-capitalize"
              >Harga Dewasa {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h4">{{
              $currency($finalPriceBooking(item))
            }}</q-item-label>
          </q-item-section>
        </div>

        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 row text-white">
          <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md col-12">
            <q-item-label class="text-white text-capitalize"
              >Harga Anak (2-6 tahun) {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h4">{{
              $currency($finalPriceAnakBooking(item))
            }}</q-item-label>
          </q-item-section>
        </div>
      </q-card-section>

      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <isQItemLabelValue
            label="HPP Dewasa"
            :value="$currency(item?.getPrice)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="HPP Anak (2-6 tahun)"
            :value="$currency(item?.getPriceChild)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="Diskon"
            :value="$percent(item?.getDiscount)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="Cashback"
            :value="$currency(item?.getCashback)"
          ></isQItemLabelValue>
          <q-item>
            <q-item-section>
              <q-item-label caption>Deskripsi Harga</q-item-label>
              <q-item-label>{{ item?.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <q-btn @click="$emit('onBubbleEvent')" class="full-width" outline color="primary" icon="description" label="Detail Produk"></q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
// import isQItemLabelValue from "./isQItemLabelValue";
// import ImageSlideCarousel from "./ImageSlideCarousel";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  props: ["item", "images"],
  components: {
    // isQItemLabelValue,
    // ImageSlideCarousel,
  },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    return {
      showMultiple,
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
