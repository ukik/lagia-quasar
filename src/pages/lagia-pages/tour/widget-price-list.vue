<template>
  <div class="call-action-box bg-color-callback row justify-center">
    <div class="col-xl-6 col-lg-8 col-md-11 col-sm-12 col-12 text-center q-px-md">
      <h6 class="text-blue">BEST TOUR OFFER</h6>
      <h2>LAGIA HARGA TOUR</h2>
      <!-- <p>
        Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
        Vestibulum cumque laudantium. Sit ornare mollitia tenetur, aptent.
      </p> -->
    </div>
  </div>


  <q-no-ssr>
    <!-- DETAIL -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="dialog_selengkapnya"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Price</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>
        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <PriceDialogDetailCard :item="record"></PriceDialogDetailCard>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- STORE -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="tour_store"
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
          <DialogCard :item="record"></DialogCard>
        </q-card-section>
      </q-card>
    </q-dialog>
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
        <PriceListCard @onBubbleEvent="onBubbleEvent" :item="item"></PriceListCard>
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
        :label="`selengkapnya (${total})`"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["records","total"],
};
</script>

<script async setup>
import PriceListCard from "./components/PriceListCard";
import DialogCard from "./components/DialogCard";
import PriceDialogDetailCard from "./components/PriceDialogDetailCard";

import { ref, nextTick, watch, onMounted } from "vue";

const record = ref(null);
const dialog_selengkapnya = ref(false);
const tour_store = ref(false);

function onBubbleEvent(value) {
  record.value = value?.payload;
  if (value?.label == "store") tour_store.value = true;
  if (value?.label == "detail") dialog_selengkapnya.value = true;
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
  padding-bottom: 45px;
}
.bg-light-grey {
  background-color: #f8f8f8;
}
</style>
