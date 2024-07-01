<template>
  <q-item
    :clickable="clickable"
    @click="$emit('onBubbleEvent')"
    :dense="dense"
    class="isQItemLabelSimpleValue"
    :class="[col]"
  >
    <q-item-section avatar>
      <q-item-label class="text-capitalize">{{ label }}</q-item-label>
    </q-item-section>
    <q-item-section class="q-px-none text-right" :class="[textcolor]">
      <q-item-label lines="1">{{ value }} </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  // props: ["label", "value", "clickable", "textcolor"],
  props: {
    label: {
      default: "",
    },
    value: {
      default: "none",
    },
    col: {
      default: "col-12",
    },
    icon: {
      default: "fa-solid fa-house-medical",
    },
    clickable: {
      default: false,
    },
    textcolor: {
      default: "",
    },
    dense: {
      default: true,
    },
  },
};
</script>

<style>
.isQItemLabelSimpleValue
  .q-item__section.column.q-item__section--side.justify-center.q-item__section--avatar {
  min-width: 150px;
}
</style>
