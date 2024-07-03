<template>
  <q-item :class="[col]">
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white" :icon="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-caption text-capitalize">{{ label }}</q-item-label>
      <q-item-label>{{ value }}</q-item-label>
    </q-item-section>
  </q-item>
  <!-- <q-item class="col-12" v-else>
    <q-item-section>
      <q-item-label class="text-capitalize" caption>{{ label }}</q-item-label>
      <q-item-label class="text-body2">{{ value }}</q-item-label>
    </q-item-section>
  </q-item> -->
</template>

<script>
export default {
  // props: ['label','value']
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
  },
};
</script>
