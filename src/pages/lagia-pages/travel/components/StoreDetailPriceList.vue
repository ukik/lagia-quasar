<template>
  <q-list bordered separator class="rounded-borders q-mt-lg">
    <q-item-label header class="text-h6 text-weight-normal">PRICE LIST</q-item-label>
    <q-separator></q-separator>
    <template v-for="(item, i) in items">
      <q-item v-ripple="false">
        <q-item-section avatar top>
          <q-avatar icon="check" color="blue-4" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">DAY 1 Departure at the airport and arrival at the hotel</q-item-label>
          <q-item-label caption>February 22nd, 2019</q-item-label>
        </q-item-section>

        <!-- <q-item-section side>
        <q-icon name="info" color="green" />
      </q-item-section> -->
      </q-item>
    </template>
    <q-item v-if="items.length <= 0">
      <q-item-section avatar top>
        <q-avatar icon="warning" color="red-4" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label caption>Perhatian</q-item-label>
        <q-item-label lines="1">Harga tidak tersedia saat ini</q-item-label>
      </q-item-section>

      <!-- <q-item-section side>
      <q-icon name="info" color="green" />
    </q-item-section> -->
    </q-item>
  </q-list>
</template>

<<script>
export default {
  props:['items'],
}
</script>
