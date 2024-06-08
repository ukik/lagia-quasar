<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img
        style="height: 300px"
        :src="item?.image"
        error-src="https://cdn.quasar.dev/logo-v2/header.png"
      >
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
        <div class="absolute-top-left bg-transparent" style="padding:5px;">
          <q-btn
            push
            dense label="zoom"
            color="white"
            text-color="primary"
            icon="fullscreen"
            @click="showMultiple(item?.image,0)"
          />
        </div>
      </q-img>
      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-orange-9">{{ item?.category }}</div> -->

        <q-chip
          color="orange-9"
          text-color="white"
          icon="label"
          class="text-overline text-uppercase"
          >{{
            item?.category ? item?.category : item?.travelReservation?.category
          }}</q-chip
        >

        <div class="text-h6 q-mt-sm q-mb-xs">{{ item?.name }}</div>
        <q-item-label caption>{{ item?.createdAt }}</q-item-label>

        <div class="row text-white">
          <q-item-section class="bg-primary q-mt-lg col-auto rounded-borders-1 q-pa-md">
            <q-item-label class="text-white">Start From</q-item-label>
            <q-item-label class="text-h4">Rp. {{ item?.generalPrice }}</q-item-label>
          </q-item-section>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <!-- deleted_at -->

          <QItemLabelValueMobile label="id" :value="item?.id"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="uuid" :value="item?.uuid"></QItemLabelValueMobile>
          <QItemLabelValueMobile
            label="store Id"
            :value="item?.storeId"
          ></QItemLabelValueMobile>
          <QItemLabelValueMobile label="name" :value="item?.name"></QItemLabelValueMobile>
          <QItemLabelValueMobile
            label="general Price"
            :value="item?.generalPrice"
          ></QItemLabelValueMobile>
          <QItemLabelValueMobile
            label="discount Price"
            :value="item?.discountPrice"
          ></QItemLabelValueMobile>
          <QItemLabelValueMobile
            label="cashback Price"
            :value="item?.cashbackPrice"
          ></QItemLabelValueMobile>
          <QItemLabelValueMobile
            label="description"
            :value="item?.description"
          ></QItemLabelValueMobile>
          <QItemLabelValueMobile
            label="code Ticket"
            :value="item?.codeTicket"
          ></QItemLabelValueMobile>
          <QItemLabelValueMobile
            label="seat Count"
            :value="item?.seatCount"
          ></QItemLabelValueMobile>
          <!-- <QItemLabelValueMobile label="image" :value="item?.image"></QItemLabelValueMobile> -->
          <QItemLabelValueMobile
            label="ticket Status"
            :value="item?.ticketStatus"
          ></QItemLabelValueMobile>
          <QItemLabelValueMobile
            label="quantity"
            :value="item?.quantity"
          ></QItemLabelValueMobile>
          <QItemLabelValueMobile
            label="category"
            :value="item?.category"
          ></QItemLabelValueMobile>
          <QItemLabelValueMobile
            label="created At"
            :value="item?.createdAt"
          ></QItemLabelValueMobile>
          <QItemLabelValueMobile
            label="updated At"
            :value="item?.updatedAt"
          ></QItemLabelValueMobile>
          <!-- <QItemLabelValueMobile label="route" :value="item?.route"></QItemLabelValueMobile> -->

          <!-- code_table created_at updated_at deleted_at category -->
        </q-list>
      </q-card-section>
      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-item-label header>Rute Perjalanan</q-item-label>
        <q-item class="col-12 q-pt-none">
          <q-item-section>
            <q-item-label
              >{{ item?.route }} Follow the instructions to embed the icon font in your
              site and learn how to style your icons using CSS. Follow the instructions to
              embed the icon font in your site and learn how to style your icons using
              CSS.</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import QItemLabelValueMobile from "./QItemLabelValueMobile";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  props: ["item"],
  components: {
    QItemLabelValueMobile,
  },
  setup() {
    const store = useGlobalEasyLightbox();
    const { showMultiple } = store;

    return {
      showMultiple,
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
