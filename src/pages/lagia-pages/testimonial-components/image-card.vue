<template>
  <q-card-section class="q-pt-none">
    <q-item dense class="q-pa-none">
      <q-item-section avatar>
        <q-avatar size="50px">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">WILLIAM WRIGHT</q-item-label>
        <q-item-label caption class="text-primary" lines="1">TRAVELLERS</q-item-label>
      </q-item-section>
      <div v-if="image" class="row items-end">
        <div>
          <q-btn
            class=""
            outline
            color="primary"
            round
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </div>
      </div>
    </q-item>
    <!-- <q-btn flat color="primary" label="Share" />
    <q-btn flat color="secondary" label="Book" /> -->

    <!-- <q-space /> -->
  </q-card-section>
  <q-slide-transition>
    <div v-show="expanded">
      <q-img
        @click="showMultiple(image, 0)"
        v-if="image"
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 rounded-borders-2-bottom"
        :src="image"
        :error-src="$defaultErrorImage"
      >
        <!-- <div class="absolute-top-right bg-transparent">
          <q-btn
            size="16px"
            rounded
            dense
            color="white"
            text-color="primary"
            icon="fullscreen"
            @click="showMultiple(image, 0)"
          />
        </div> -->

        <template v-slot:error>
          <div class="absolute-full flex flex-center text-white">Cannot load image</div>
        </template>
      </q-img>
      <q-img
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        v-else
        :src="$defaultErrorImage"
      />
    </div>
  </q-slide-transition>
</template>

<script>
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

import { ref } from "vue";

export default {
  props: ["image"],
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;
    return {
      showMultiple,
      expanded: ref(true),
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
};
</script>
