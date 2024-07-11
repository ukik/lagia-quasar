<template>
  <q-card-section class="q-pt-none">
    <q-item dense class="q-pa-none">
      <q-item-section avatar>
        <q-avatar size="50px">
          <q-img :src="item?.avatar" :error-src="$defaultUser" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{ item?.name }}</q-item-label>
        <q-item-label caption class="text-primary" lines="1">{{
          item?.institusi
        }}</q-item-label>
      </q-item-section>
      <div v-if="item?.image" class="row items-end">
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
  <q-slide-transition v-if="item?.image">
    <div v-show="expanded">
      <q-img
        @click="showMultiple(item?.image, 0)"
        v-if="item?.image"
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 rounded-borders-2-bottom"
        :src="item?.image[0]"
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
  props: ["item"],
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;
    return {
      showMultiple,
      expanded: ref(true),
    };
  },
};
</script>
