<template>
  <div class="bg-color-callback row justify-center">
    <div class="col-xl-6 col-lg-8 col-md-11 col-sm-12 col-12 text-center q-px-md">
      <h6 class="text-blue">PILIHAN LEVEL</h6>
      <h2>TINGKAT PETUALANGAN TOUR</h2>
    </div>
  </div>

  <!-- tour_products_category
  tour_products_city
  tour_products_country
  tour_products_durasi
  tour_products_level
  tour_products_province -->

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
        <q-item
          :to="{
            name: '/tour/product-list',
            query: {
              level: item?.level,
            },
          }"
          class="bg-form rounded-borders-1 text-white q-py-md"
          :class="[`bg-red-${index+4}`]"
        >
          <q-item-section class="text-h6">
            <q-rating v-if="item?.level"
              color="white"
              size="26px"
              readonly
              v-model="item.level"
              :max="5"
            ></q-rating>

            <q-rating
              v-else
              readonly
              color="white"
              size="26px"
              v-model="ratingZero"
              :max="5"
            ></q-rating>
          </q-item-section>
          <q-item-section avatar class="text-h5">
            {{ item?.count }}
          </q-item-section>
        </q-item>
        <q-card> </q-card>
        <!-- <PriceListCard @onBubbleEvent="onBubbleEvent" :item="item"></PriceListCard> -->
      </div>
    </div>

    <!-- <div class="text-center full-width top-margin-1">
      <q-btn
        to="/tour/price-list"
        icon-right="arrow_forward"
        size="18px"
        style="height: 50px"
        unelevated
        rounded
        class="rounded-borders-4"
        color="primary"
        label="selengkapnya"
      />
    </div> -->
  </div>
</template>
<script>
export default {
  props: ["records"],
};
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
