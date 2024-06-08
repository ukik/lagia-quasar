<template>
  <vue-easy-lightbox
    :visible="visible"
    :imgs="imgs"
    :index="index"
    @hide="onHide"
  />
</template>

<script>
import { ref, defineProps } from "vue";
import { defineComponent } from "vue";
// import VueEasyLightbox, { useEasyLightbox } from "vue-easy-lightbox";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { storeToRefs } from "pinia";

export default defineComponent({
  // components: {
  //   VueEasyLightbox,
  // },
  // props: {
  //   _gallery: {
  //     default: () => [
  //       "https://picsum.photos/500/300",
  //       "https://picsum.photos/500/300",
  //       "https://picsum.photos/500/300",
  //       "https://picsum.photos/500/300",
  //       "https://picsum.photos/500/300",
  //       "https://picsum.photos/500/300",
  //     ],
  //   },
  // },
  setup() {
    const store = useGlobalEasyLightbox();
    const { visible, index, imgs } = storeToRefs(store);
    const { onShow, showMultiple, showImage, onHide } = store;

    return {
      showImage,
      showMultiple,
      onHide,
      onShow,
      visible,
      index,
      imgs,
    };
  },
  // mounted() {
  //   this.imgs = this._gallery;
  // },
});
</script>
