<template>
  <q-item
    :clickable="clickable"
    @click="$emit('onBubbleEvent')"
    class="col-12 isQItemLabelSimpleValueNoDense"
  >
    <q-item-section avatar>
      <q-item-label caption class="text-capitalize">{{ label }}</q-item-label>
    </q-item-section>
    <q-item-section class="q-px-none text-right" :class="[textcolor]">
      <q-item-label lines="1">{{ value }} </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ["label", "value", "clickable", "textcolor"],
};
</script>

<style>
.isQItemLabelSimpleValueNoDense
  .q-item__section.column.q-item__section--side.justify-center.q-item__section--avatar {
  min-width: 150px;
}
</style>
