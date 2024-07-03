<template>
  <!-- <div class="q-mt-lg q-py-none col-12"> -->
  <q-list bordered v-if="item">
    <q-expansion-item group="somegroup1" header-class="bg-grey-1" default-opened>
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <q-icon name="restaurant"></q-icon>
          </q-avatar>
        </q-item-section>

        <q-item-section class="text-h6 text-dark"> PROFILE TOKO </q-item-section>
      </template>
      <q-separator />

      <q-card>
        <q-card-section>
          <PriceReferenceStore :item="item?.culinaryStore"></PriceReferenceStore>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-separator />

    <q-expansion-item group="somegroup" header-class="bg-grey-1" default-opened>
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <q-icon name="fastfood"></q-icon>
          </q-avatar>
        </q-item-section>

        <q-item-section class="text-h6 text-dark"> DETAIL MENU </q-item-section>
      </template>
      <q-separator />
      <q-card>
        <q-card-section>
          <PriceReferenceProduct :item="item"></PriceReferenceProduct>
          <!-- <isImageSlideCarousel
            class="q-mt-md"
            :_gallery="item?.image"
            height="600px"
            :thumbnails="false"
          ></isImageSlideCarousel> -->
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
  <!-- </div> -->
</template>

<script>
import PriceReferenceStore from "./PriceReferenceStore";
import PriceReferenceProduct from "./PriceReferenceProduct";

export default {
  props: ["item"],
  components: {
    PriceReferenceStore,
    PriceReferenceProduct,
  },
};
</script>

<style scoped>
.text-h6 {
  font-weight: 400;
}
</style>
