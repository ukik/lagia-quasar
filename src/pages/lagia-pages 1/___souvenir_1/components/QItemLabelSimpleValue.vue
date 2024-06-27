<template>
  <q-item dense class="col-12">
    <q-item-section>
      <q-item-label class="text-capitalize">{{ label }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label>{{ value }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ["label", "value"],
};
</script>
