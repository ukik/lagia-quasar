<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img style="height: 300px;" :src="item?.image" :error-src="$defaultErrorImage">
        <q-badge
          :color="item?.ticketStatus == 'bisnis' ? 'pink' : 'positive'"
          class="q-mr-lg rounded-borders-2"
          style="margin-top: -17px"
          floating
          ><span class="text-title text-uppercase q-mt-md">{{
            item?.ticketStatus
          }}</span></q-badge
        >
        <template v-slot:error>
          <div class="absolute-full flex flex-center">Error encountered</div>
          <q-badge
            :color="item?.ticketStatus == 'bisnis' ? 'pink' : 'positive'"
            class="q-mr-lg rounded-borders-2"
            style="margin-top: -17px"
            floating
            ><span class="text-title text-uppercase q-mt-md">{{
              item?.ticketStatus
            }}</span></q-badge
          >
        </template>
      </q-img>
      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-orange-9">{{ item?.category }}</div> -->

        <q-chip color="orange-9" text-color="white" icon="label" class="text-overline text-uppercase">{{ item?.category ? item?.category : item?.travelReservation?.category }}</q-chip>

        <div class="text-h6 q-mt-sm q-mb-xs">{{ item?.name }}</div>
        <q-item-label caption>{{ item?.createdAt }}</q-item-label>

        <div class="row text-white">
          <q-item-section class="bg-primary q-mt-lg col-auto rounded-borders-1 q-pa-md">
            <q-item-label  class="text-white">Start From</q-item-label>
            <q-item-label class="text-h4">Rp. {{ item?.generalPrice }}</q-item-label>
          </q-item-section>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">

          <QItemLabelValue label="uuid" :value="item?.uuid"></QItemLabelValue>
          <QItemLabelValue label="uuid (reservasi)" :value="item?.travelReservation?.uuid"></QItemLabelValue>


          <QItemLabelValue label="general price" :value="item?.generalPrice"></QItemLabelValue>
          <QItemLabelValue label="discount price" :value="item?.discountPrice+'%'"></QItemLabelValue>
          <QItemLabelValue label="cashback price" :value="item?.cashbackPrice"></QItemLabelValue>
          <QItemLabelValue label="Nomor Kursi" :value="item?.seatNo"></QItemLabelValue>

          <!-- id
          uuid
          reservation_id
          customer_id

          "generalPrice": "12000.00",
          "discountPrice": "11.00",
          "cashbackPrice": "4888.00",
          "description": "dddd",
          "codeTicket": "42352",
          "seatNo": "525",
          "image": "http://localhost:8000/storage/photos/1/25533.jpg",
          "ticketStatus": "ekonomi",

          "": "2024-01-22",
          "": "2024-03-30T18:04:41.000+07:00",
          "": "553523",
          "": "553523",
          "": "y4647",
          "": "45774574", -->

          <QItemLabelValue label="starting Date" :value="item?.startingDate"></QItemLabelValue>
          <QItemLabelValue label="starting Time" :value="$formatTime(item?.startingTime)"></QItemLabelValue>
          <QItemLabelValue label="starting Location" :value="item?.startingLocation"></QItemLabelValue>
          <QItemLabelValue label="arrival Location" :value="item?.arrivalLocation"></QItemLabelValue>
          <QItemLabelValue label="starting Terminal" :value="item?.startingTerminal"></QItemLabelValue>
          <QItemLabelValue label="arrival Terminal" :value="item?.arrivalTerminal"></QItemLabelValue>
        </q-list>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-btn-group spread outline>

          <q-btn @click="$emit('onBubbleEvent', { label: 'vendor', payload: item?.travelStore })" label="Vendor" icon="storefront" />
          <q-btn @click="$emit('onBubbleEvent', { label: 'reservasi', payload: item?.travelReservation })" label="Reservasi" icon="confirmation_number" />
          <!-- <q-btn label="Second" icon="visibility" /> -->
          <!-- <q-btn label="Second" icon="visibility" /> -->
        </q-btn-group>
      </q-card-section>


      <q-separator></q-separator>

      <q-card-actions class="q-pa-md">
        <q-btn
          outline
          icon="shopping_cart_checkout"
          color="primary"
          size="md"
          label="book now"
        />
        <!-- <q-btn flat color="secondary" label="Book" /> -->

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-body">
            {{ item?.description }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import QItemLabelValue from "./QItemLabelValue"

export default {
  props: ["item"],
  components: {
    QItemLabelValue
  },
  setup() {
    return {
      expanded: ref(false),
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 100%
</style>

<style lang="css">
.custom .q-item__label {
  /* margin-bottom: 25px; */
  /* color: white; */
  line-height: 1.6 !important;
  font-size: 14px;
}
</style>
