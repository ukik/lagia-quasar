<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-item class="rounded-borders-1 bg-grey-1" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img v-if="item?.badasoUser?.avatar" :src="item?.badasoUser?.avatar" />
            <img
              v-else
              src="http://localhost:8000/storage/photos/shares/default-user.png"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{
            item?.badasoUser?.name
          }}</q-item-label>
          <q-item-label caption lines="2">
            {{ item?.badasoUser?.username }}
            <span v-if="$q.screen.width < 768">({{ item?.badasoUser?.createdAt }})</span>
          </q-item-label>
        </q-item-section>

        <!-- <q-badge floating class="q-pa-xs q-mr-md text-uppercase">
          {{ item?.ticketStatus }}
        </q-badge> -->
        <!-- <q-item-section v-if="$q.screen.width > 425" class="text-caption" side top>{{
          item?.badasoUser?.createdAt
        }}</q-item-section> -->
      </q-item>

      <q-separator></q-separator>

      <q-card-actions align="center" class="">
        <q-chip color="orange-9" text-color="white" class="text-overline text-uppercase">{{ item?.category }}</q-chip>
      <q-chip color="form" text-color="white" class="text-overline text-uppercase">{{ item?.ticketStatus }}</q-chip>
      </q-card-actions>

      <q-separator></q-separator>

      <q-banner flat
        v-if="!$stringToBoolean(item?.isReserved) && !item?.travelPrice"
        inline-actions
        class="text-white bg-red"
      >
        <template v-slot:avatar>
          <q-icon name="warning" color="white" />
        </template>
        Penawaran belum diterbitkan
      </q-banner>
      <q-banner flat
        v-if="!$stringToBoolean(item?.isReserved) && item?.travelPrice"
        inline-actions
        class="text-white bg-blue"
      >
        <template v-slot:avatar>
          <q-icon name="description" color="white" />
        </template>
        Penawaran sudah diterbitkan
        <!-- <template v-slot:action>
          <q-btn outline color="white" size="md" label="book now" />
        </template> -->
      </q-banner>
      <q-banner flat
        v-if="$stringToBoolean(item?.isReserved)"
        inline-actions
        class="text-white bg-green"
      >
        <template v-slot:avatar>
          <q-icon name="check_circle" color="white" />
        </template>
        Penawaran di booking
      </q-banner>

      <q-separator></q-separator>

      <q-card-section class="custom q-pa-none">

        <q-list class="row flex items-start text-caption text-dark">
          <QItemLabelValueMobile label="id" :value="item?.id"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="uuid" :value="item?.uuid"></QItemLabelValueMobile>
          <!-- <QItemLabelValueMobile label="customer Id" :value="item?.customerId"></QItemLabelValueMobile> -->
          <QItemLabelValueMobile label="name Passanger" :value="item?.namePassanger"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="ktp Passanger" :value="item?.birthDate"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="category" :value="item?.category"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="min Budget" :value="item?.minBudget"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="max Budget" :value="item?.maxBudget"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="ticket Status" :value="item?.ticketStatus"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="description" :value="item?.description"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="starting Date" :value="item?.startingDate"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="starting Time" :value="$formatTime(item?.startingTime)"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="starting Location" :value="item?.startingLocation"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="arrival Location" :value="item?.arrivalLocation"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="starting Terminal" :value="item?.startingTerminal"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="arrival Terminal" :value="item?.arrivalTerminal"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="created At" :value="item?.createdAt"></QItemLabelValueMobile>
          <QItemLabelValueMobile label="updated At" :value="item?.updatedAt"></QItemLabelValueMobile>

          <!-- <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">isReserved</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.isReserved }}</q-item-label>
            </q-item-section>
          </q-item> -->
        </q-list>
      </q-card-section>

      <!-- <q-separator></q-separator> -->

      <!-- <q-card-actions class="q-pa-md">
        <q-btn
          outline
          icon="shopping_cart_checkout"
          color="primary"
          size="md"
          label="book now"
        />

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
      </q-slide-transition> -->
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import QItemLabelValueMobile from "./QItemLabelValueMobile"

export default {
  props: ["item"],
  components: {
    QItemLabelValueMobile
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
