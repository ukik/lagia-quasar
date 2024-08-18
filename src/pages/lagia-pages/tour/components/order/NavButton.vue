<template>
  <q-stepper-navigation >
    <slot name="back"></slot>
    <q-btn
      @click="$emit('onBubbleEvent')"
      color="primary"
      label="Lanjut"
      icon-right="arrow_forward"
      unelevated
    />
  </q-stepper-navigation>
</template>

<script>
export default {
  emit: ["onBubbleEvent"],
};
</script>
