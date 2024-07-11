<template>
  <q-card-actions class="col-12" align="left">
    <router-link
      v-if="getInfoPrivasi"
      activeClass="text-primary "
      class="text-dark"
      :to="{
        name: '/info/single-page',
        params: {
          slug: getInfoPrivasi?.slug,
          id: getInfoPrivasi?.id,
        },
      }"
      >{{ getInfoPrivasi?.title }}</router-link
    >
    <q-separator class="q-mx-sm q-my-xs" vertical></q-separator>
    <router-link
      v-if="getInfoSyarat"
      activeClass="text-primary "
      class="text-dark"
      :to="{
        name: '/info/single-page',
        params: {
          slug: getInfoSyarat?.slug,
          id: getInfoSyarat?.id,
        },
      }"
      >{{ getInfoSyarat?.title }}</router-link
    >
    <q-separator class="q-mx-sm q-my-xs" vertical></q-separator>
    <router-link activeClass="text-primary " class="text-dark" to="/lagia/faq"
      >FAQ</router-link
    >
  </q-card-actions>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useInitStore } from "stores/lagia-stores/page/InitStore";
const initStore = useInitStore();
const { getInfoPrivasi, getInfoSyarat } = storeToRefs(initStore); // have all reactive states here
</script>
