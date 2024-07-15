<template>
  <q-img
    :ratio="1"
    height="350px"
    class="rounded-borders-2"
    src="https://cdn.quasar.dev/img/parallax2.jpg"
  >
    <div class="absolute-full"></div>

    <div class="bg-transparent absolute-full flex flex-center text-center q-pa-md">
      <div>
        <h3>SEND US C.V</h3>
        <q-item-label lines="2" class="q-my-md">Join opportunity with us</q-item-label>
        <q-btn
          flat
          dense
          icon="mail"
          :href="`mailto:` + item?.grid1Value"
          :label="item?.grid1Value"
        ></q-btn>
        <br />
        <q-btn
          icon="phone"
          dense
          unelevated
          rounded
          :href="`tel:` + item?.grid2Value"
          class="q-py-md q-px-lg q-mt-lg rounded-borders-4"
          color="form"
          label="Contact Us!"
        />
      </div>
    </div>
  </q-img>
</template>

<script setup>
import { ref, defineProps } from "vue";
const { item } = defineProps(["item"]);
</script>

<style scoped>
h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0px;
  color: white;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

.q-item__label {
  line-height: 1.6 !important;
}

.bg-light-grey {
  background-color: #f8f8f8;
}
</style>
