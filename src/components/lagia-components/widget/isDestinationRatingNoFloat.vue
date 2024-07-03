<template>
  <div class="q-mb-md">
    <q-rating
      v-if="item.rating"
      readonly
      v-model="item.rating"
      size="sm"
      :max="5"
      color="red"
    ></q-rating>
    <q-rating v-else readonly v-model="rating" size="sm" :max="5" color="red"></q-rating>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
const item = defineProps(["rating"]);
const rating = 4.5;
</script>
