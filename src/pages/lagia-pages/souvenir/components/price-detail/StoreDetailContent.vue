<template>
  <div class="">
    <!-- STORE -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="popup"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Vendor</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <StoreDetailBody :record="record?.souvenirStore"></StoreDetailBody>
        </q-card-section>
      </q-card>
    </q-dialog>

    <SouvenirPriceDialogDetailCard :item="record">
      <template v-slot:buttongroup="scoped">
        <q-btn-group spread unelevated>
          <!-- {{ scoped }} -->
          <q-btn
            @click="popup = true"
            label="Add To Cart"
            icon="shopping_cart_checkout"
          />
          <q-separator vertical></q-separator>
          <q-btn @click="popup = true" label="store" icon="storefront" />
        </q-btn-group>
      </template>
    </SouvenirPriceDialogDetailCard>

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

import StoreDetailBody from "./StoreDetailBody";
import SouvenirPriceDialogDetailCard from "../SouvenirPriceDialogDetailCard";

const ratingZero = 0;

const popup = ref(false);
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
