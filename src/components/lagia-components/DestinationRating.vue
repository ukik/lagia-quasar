<template>
  <q-badge floating class="rounded-borders-2" style="right: 20px; top: -20px">
    <q-rating
      v-if="item.rating"
      class="q-pa-sm"
      readonly
      v-model="item.rating"
      size="xs"
      :max="5"
      color="white"
    ></q-rating>
    <q-rating
      v-else
      class="q-pa-sm"
      readonly
      v-model="rating"
      size="xs"
      :max="5"
      color="white"
    ></q-rating>
  </q-badge>
</template>

<script setup>
import { ref, defineProps } from "vue";
const item = defineProps(["rating"]);
const rating = 4.5;
</script>
