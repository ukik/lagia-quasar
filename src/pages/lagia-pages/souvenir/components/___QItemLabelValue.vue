<template>
  <q-item class="col-12" v-if="$q.screen.width > 768">
    <q-item-section>
      <q-item-label class="text-capitalize">{{ label }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label>{{ value }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-item class="col-12" v-else>
    <q-item-section>
      <q-item-label class="text-capitalize" caption>{{ label }}</q-item-label>
      <q-item-label class="text-body2">{{ value }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['label','value']
}
</script>
