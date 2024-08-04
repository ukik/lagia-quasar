<template>
  <q-list id="StoreDetailPriceList" bordered separator class="rounded-borders q-mt-lg">
    <q-item avatar>
      <q-item-section>
        <q-item-label class="text-h6 text-weight-normal">PRICE LIST</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator></q-separator>

    <template v-for="(item, i) in items">
      <q-item v-ripple="false">
        <q-item-section class="q-mt-xs" avatar top v-if="$q.screen.width > 425">
          <q-avatar icon="check" color="blue-4" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-dark" lines="1">{{ item?.name }}</q-item-label>
          <q-item-label caption>{{ item?.createdAt }}</q-item-label>
          <StoreDetailProductPriceListCard
            @onBubbleEvent="onBubbleEvent"
            :item="item"
          ></StoreDetailProductPriceListCard>
        </q-item-section>
      </q-item>
    </template>

    <q-item v-if="items?.length <= 0">
      <q-item-section avatar top>
        <q-avatar icon="warning" color="red-4" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label caption>Perhatian</q-item-label>
        <q-item-label lines="1">Harga tidak tersedia saat ini</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { ref, nextTick, watch, onMounted } from "vue";
import { useQuasar } from "quasar";

import { useTourDetailStore } from "stores/lagia-stores/tour/TourDetailStore";

import StoreDetailProductPriceListCard from "./StoreDetailProductPriceListCard";

const $q = useQuasar();

const store = useTourDetailStore();
const { onFetchDetailStore } = store;

const record = ref(null);
const dialog_selengkapnya = ref(false);

async function onBubbleEvent(value) {
  console.log("onBubbleEvent", value);

  if (value?.label == "detail") dialog_selengkapnya.value = true;

  $q.loading.show();

  const payload = await onFetchDetailStore(value?.payload?.id);
  $q.loading.hide();

  record.value = payload;
}
</script>

<script>
export default {
  props: ["items", "count"],
};
</script>

<style>
#StoreDetailPriceList
  .q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable {
  padding: 0px;
}
</style>
