<template>
  <q-card flat class="q-pa-none bg-transparent q-mt-xl" style="height: 500px">
    <iframe
      class="rounded-borders-2"
      :src="item"
      width="100%"
      height="100%"
      style="border: 0"
      allowfullscreen="true"
      loading="lazy"
    ></iframe>
  </q-card>
</template>

<script setup>
import { ref, defineProps } from "vue";
const { item } = defineProps(["item"]);
</script>
