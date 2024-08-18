<template>
  <q-stepper-navigation >
    <q-btn class="q-mr-sm" outline
      @click="$emit('onBubbleEventBack')"
      icon-right="arrow_back"
      unelevated
    />

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
