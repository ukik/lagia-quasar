<template>
  <!-- <div class="content-page-section row justify-center"> -->
  <div class="">
    <!-- <q-img
      class="rounded-borders-2 q-mb-lg"
      src="assets/images/img16.jpg"
      :ratio="$q.screen.width > 425 ? 16 / 9 : 1"
    /> -->
    <isImageSlideCarousel
      height="450px"
      class="rounded-borders-2 q-mb-lg"
      :_gallery="item?.featuredImage"
    ></isImageSlideCarousel>

    <h3 class="q-mb-lg">OVERVIEW :</h3>
    <div class="page-content-1" v-html="item?.description"></div>

    <div class="page-content-2 q-mt-xl">
      <h3>{{ item?.bottomLabel1 }}</h3>

      <div class="row col-gutters q-col-gutter-sm q-mb-lg">
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <q-img
            :ratio="1"
            :src="item?.gridImage1"
            :error-src="$defaultErrorImage"
            alt=""
            class="rounded-borders-2"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center text-white">
                Cannot load image
              </div>
            </template>
          </q-img>
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <q-img
            :ratio="1"
            :src="item?.gridImage2"
            :error-src="$defaultErrorImage"
            alt=""
            class="rounded-borders-2"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center text-white">
                Cannot load image
              </div>
            </template>
          </q-img>
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <q-img
            :ratio="1"
            :src="item?.gridImage3"
            :error-src="$defaultErrorImage"
            alt=""
            class="rounded-borders-2"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center text-white">
                Cannot load image
              </div>
            </template>
          </q-img>
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
        <h6 class="q-my-lg q-pr-md">{{ item?.bottomLabel2 }}</h6>
      </q-banner>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref, defineProps } from "vue";
const { item } = defineProps(["item"]);
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
