<template>
  <!-- DETAIL -->
  <q-dialog
    full-width
    full-height
    :maximized="$q.screen.width <= 768"
    v-model="dialog_selengkapnya"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
      <q-card-section class="q-py-none">
        <q-toolbar style="height: 50px" class="q-pa-none">
          <div class="text-h6 text-capitalize">Detail Harga</div>
          <q-space></q-space>
          <q-btn dense flat icon="close" v-close-popup></q-btn>
        </q-toolbar>
      </q-card-section>
      <q-separator />

      <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
        <PriceDialogDetailCard :item="record"></PriceDialogDetailCard>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-list id="StoreDetailPriceList" bordered separator class="rounded-borders q-mt-lg">
    <q-item avatar>
      <!-- <q-item-section avatar v-if="$q.screen.width > 425">
        <q-avatar color="form" text-color="white">
          {{ count }}
        </q-avatar>
      </q-item-section> -->
      <q-item-section>
        <q-item-label class="text-h6 text-weight-normal">
        LIST HARGA <q-chip color="blue" text-color="white">{{ count }}</q-chip>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator></q-separator>
    <template v-for="(item, i) in items">
      <q-item v-ripple="false">
        <q-item-section class="q-mt-xs" avatar top v-if="$q.screen.width > 425">
          <q-avatar color="form" text-color="white">
            <span class="text-body2">{{ item?.id }}</span>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-expansion-item default-opened>
            <template v-slot:header>
              <q-item-section>
                <q-item-label class="text-dark" lines="1">{{ item?.name }}</q-item-label>
                <q-item-label caption>{{ item?.createdAt }}</q-item-label>
              </q-item-section>
            </template>

            <StoreDetailPriceListCard
              @onBubbleEvent="onBubbleEvent"
              :item="item"
            ></StoreDetailPriceListCard>
            <!-- PriceListCard @onBubbleEvent="onBubbleEvent" :item="item"></PriceListCard> -->
          </q-expansion-item>
        </q-item-section>
        <!-- <q-item-section side>
        <q-icon name="info" color="green" />
      </q-item-section> -->
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

      <!-- <q-item-section side>
      <q-icon name="info" color="green" />
    </q-item-section> -->
    </q-item>
  </q-list>
</template>

<script setup>
import { ref, nextTick, watch, onMounted } from "vue";
import { useQuasar } from "quasar";

import { useTourDetailStore } from "stores/lagia-stores/tour/TourDetailStore";

import StoreDetailPriceListCard from "./StoreDetailPriceListCard";
import PriceDialogDetailCard from "../PriceDialogDetailCard";

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
  // record.value = value?.payload;
  record.value = payload;
}
</script>

<script>
export default {
  props: ["items", "count"],

  // data() {
  //   return {
  //     record: null,
  //     dialog_selengkapnya: false,
  //   };
  // },
  // methods: {
  //   onBubbleEvent(value) {
  //     record.value = value?.payload;
  //     if (value?.label == "detail") dialog_selengkapnya.value = true;
  //   },
  // },
};
</script>

<style>
#StoreDetailPriceList
  .q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable {
  padding: 0px;
}
</style>
