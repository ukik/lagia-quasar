<template>
  <q-item
    :clickable="clickable"
    @click="$emit('onBubbleEvent')"
    :dense="dense"
    class="isQItemLabelSimpleValue"
    :class="[col]"
  >
    <q-item-section avatar>
      <q-item-label :caption="caption" class="text-capitalize text-grey-7">{{ label }}</q-item-label>
    </q-item-section>
    <slot name="right">
      <q-item-section class="q-px-none text-right" :class="[textcolor]">
        <q-item-label lines="1">{{ value }} </q-item-label>
      </q-item-section>
    </slot>
  </q-item>
</template>

<script>
export default {
  // props: ["label", "value", "clickable", "textcolor"],
  props: {
    caption: {
      default: false
    },
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
