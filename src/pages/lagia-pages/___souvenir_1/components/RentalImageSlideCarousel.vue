<template>
  <q-carousel
    id="RentalImageSlideCarousel"
    :autoplay="autoplay"
    swipeable
    animated
    navigation
    arrows
    v-model="slide"
    v-model:fullscreen="fullscreen"
    infinite
    transition-prev="slide-right"
    transition-next="slide-left"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = 4500"
    height="300px"
  >
    <template v-for="(item, i) in _gallery">
      <q-carousel-slide :name="i" :img-src="item"></q-carousel-slide>
    </template>

    <template v-slot:control>
      <q-carousel-control position="top-right" :offset="[10, 10]">
        <q-btn
          size="md"
          rounded
          dense
          color="white"
          text-color="primary"
          :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="fullscreen = !fullscreen"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<script>
import { ref, defineProps } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
      fullscreen: ref(false),
      autoplay: ref(4500),
    };
  },
  props: ["_gallery"],
  // mounted() {
  //   console.log('RentalImageSlideCarousel', this._gallery)
  // },
};
</script>

<style>
#RentalImageSlideCarousel .q-carousel__slide {
  background-color: rgb(37, 37, 37);
}
</style>
