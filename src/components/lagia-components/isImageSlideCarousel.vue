<template>
  <q-carousel
    id="ImageSlideCarousel"
    class="bg-dark"
    :autoplay="autoplay"
    swipeable
    animated
    :navigation="!thumbnails"
    arrows
    v-model="slide"
    v-model:fullscreen="fullscreen"
    infinite
    transition-prev="slide-right"
    transition-next="slide-left"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = 4500"
    :height="height"
    :thumbnails="thumbnails"
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
          @click="showMultiple(_gallery, slide)"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<script>
import { ref, defineProps } from "vue";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    return {
      showMultiple,
      slide: ref(1),
      fullscreen: ref(false),
      autoplay: ref(4500),
    };
  },
  // props: ["_gallery"],
  props: {
    _gallery: {
      default: () => [],
    },
    height: {
      default: "300px",
    },
    thumbnails: {
      default: false,
    },
  },
  // mounted() {
  //   console.log('ImageSlideCarousel', this._gallery)
  // },
};
</script>

<style>
#ImageSlideCarousel .q-carousel__slide {
  background-color: rgb(37, 37, 37);
}
</style>
