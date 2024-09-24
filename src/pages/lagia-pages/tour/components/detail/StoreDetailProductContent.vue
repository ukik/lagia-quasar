<template>
  <div class="">
    <StoreDetailProductBody :record="record"></StoreDetailProductBody>

    <template v-for="(item, i) in record?.tourPrices">
      <StoreDetailProductPriceSimulasi
        class="q-mt-sm"
        :item="item"
        :ref="'side_price' + i"
      >
        <template v-slot:header="">
          <q-card-section  class="bg-grey-1 ">
            <q-item-section>
              <q-item-label class="text-h6 text-weight-normal"
                >SIMULASI BIAYA</q-item-label
              >
            </q-item-section>
          </q-card-section>
          <q-separator></q-separator>
        </template>
        <template v-slot:buttons>
          <div class="col-xl-auto col-lg-auto col-md-auto col-sm-auto col-xs-12">
            <q-btn class="full-width"
              unelevated
              size="16px"
              no-caps
              square
              color="positive"
              text-color="white"
              @click="$onWhatsappTanyaAdmin"
              icon="fa-brands fa-whatsapp"
              label="Tanya Admin"
            />
          </div>
          <div class="col">
            <q-btn class="full-width"
              unelevated
              size="16px"
              no-caps
              @click="onSubmit(i)"
              square
              color="primary"
              text-color="white"
              label="Buat Pesanan"
              icon="shopping_cart_checkout"
            />
          </div>
        </template>
      </StoreDetailProductPriceSimulasi>
    </template>
    <!-- <StoreDetailProductPriceList v-if="$q.screen.width > 425"
      :items="record?.tourPrices"
      :count="record?.tourPricesCount"
    ></StoreDetailProductPriceList> -->

    <!-- <div class="page-content-2 q-mt-xl" v-if="false">
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
    </div> -->
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import StoreDetailProductPriceSimulasi from "./StoreDetailProductPriceSimulasi";

// import StoreDetailProductPriceList from "./StoreDetailProductPriceList";
import StoreDetailProductBody from "./StoreDetailProductBody";

const ratingZero = 0;
</script>
<script>
export default {
  props: ["record"],
  methods: {
    onSubmit(i) {
      this.$refs["side_price" + i][i]?.onSubmit();
    },
  },
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
