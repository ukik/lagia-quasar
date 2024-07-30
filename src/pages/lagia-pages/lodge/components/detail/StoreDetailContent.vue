<template>
  <div class="">
    <StoreDetailBody :record="record"></StoreDetailBody>

    <StoreDetailPriceList
      :items="record?.lodgePrices"
      :count="record?.lodgePricesCount"
    ></StoreDetailPriceList>

    <div class="page-content-2 q-mt-xl">
      <h3>Placerat quaerat curae reiciendis commodi. X</h3>

      <div class="row col-gutters q-col-gutter-sm q-mb-lg">
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <q-img
            :ratio="1"
            src="assets/images/img4.jpg"
            alt=""
            class="rounded-borders-2"
          />
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <q-img
            :ratio="1"
            src="assets/images/img5.jpg"
            alt=""
            class="rounded-borders-2"
          />
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <q-img
            :ratio="1"
            src="assets/images/img6.jpg"
            alt=""
            class="rounded-borders-2"
          />
        </div>
      </div>

      <q-banner
        dense
        :class="[$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2']"
        class="rounded-borders-2"
      >
        <template v-slot:avatar>
          <q-icon size="xl" name="format_quote" color="black" />
        </template>
        <h6 class="q-my-lg q-pr-md">
          Sagittis perferendis? Leo nobis irure egestas excepturi ipsam nascetur
          elementum, montes. Torquent, soluta, ac nihil.
        </h6>
      </q-banner>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref, defineProps } from "vue";
// import RelatedImageSlideCarousel from "./RelatedImageSlideCarousel";
import StoreDetailPriceList from "./StoreDetailPriceList";
import StoreDetailBody from "./StoreDetailBody.vue";

const ratingZero = 0;
</script>
<script>
export default {
  props: ["record"],
};
</script>

<style scoped>
h2 {
  font-size: 40px;
  font-weight: 800;
}

/* p {
  line-height: 1.6;
  margin: 0 0 15px;
  word-wrap: break-word;
} */

h3 {
  font-size: 22px;
  font-weight: 700;
}
</style>
