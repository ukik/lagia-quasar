<template>
  <q-item dense class="col-12">
    <q-item-section avatar>
      <q-item-label class="text-capitalize">{{ label }}</q-item-label>
    </q-item-section>
    <q-item-section class="q-px-none text-right">
      <q-item-label lines="1">{{ value }} </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ["label", "value"],
};
</script>
