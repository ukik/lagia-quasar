<template>
  <!-- <div class="row items-start q-gutter-md"> -->
  <div class="row items-start">
    <q-card class="my-card" flat bordered>
      <!-- <q-img style="height: 300px;" :src="getSingleImage" :error-src="$defaultErrorImage">
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
      </q-img> -->

      <ImageSlideCarousel :_gallery="item?.image"></ImageSlideCarousel>

      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-orange-9">{{ item?.category }}</div> -->

        <div class="text-h6 q-mb-xs">{{ item?.name }}</div>
        <q-item-label caption>{{ item?.createdAt }}</q-item-label>

        <div class="row text-white">
          <q-item-section class="bg-primary q-mt-lg col-auto rounded-borders-1 q-pa-md">
            <q-item-label class="text-white">Unit Ready</q-item-label>
            <q-item-label class="text-h4">
              <h4 class="q-mb-none text-white q-mt-sm">
                {{ item?.transportVehiclesCount }}
                <small class="text-weight-light">Vehicle</small>
              </h4>
            </q-item-label>
          </q-item-section>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <QItemLabelValue label="uuid" :value="item?.uuid"></QItemLabelValue>
          <QItemLabelValue label="name" :value="item?.name"></QItemLabelValue>
          <QItemLabelValue label="email" :value="item?.email"></QItemLabelValue>
          <QItemLabelValue label="phone" :value="item?.phone"></QItemLabelValue>
          <QItemLabelValue label="location" :value="item?.location"></QItemLabelValue>
          <!-- <QItemLabelValue label="image" :value="item?.image"></QItemLabelValue> -->
          <QItemLabelValue label="address" :value="item?.address"></QItemLabelValue>
          <QItemLabelValue label="codepos" :value="item?.codepos"></QItemLabelValue>
          <QItemLabelValue label="city" :value="item?.city"></QItemLabelValue>
          <QItemLabelValue label="country" :value="item?.country"></QItemLabelValue>
          <!-- <QItemLabelValue label="policy" :value="item?.policy"></QItemLabelValue>
          <QItemLabelValue
            label="description"
            :value="item?.description"
          ></QItemLabelValue> -->
        </q-list>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> policy </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              {{ item?.policy }}
            </q-card-section>
          </q-card>

          <q-separator></q-separator>
        </q-expansion-item>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> description </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              {{ item?.description }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>

      <!-- <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-btn-group spread outline>
          <q-btn
            @click="
              $emit('onBubbleEvent', { label: 'vendor', payload: item?.travelStore })
            "
            label="Vendor"
            icon="storefront"
          />
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'reservasi',
                payload: item?.travelReservation,
              })
            "
            label="Reservasi"
            icon="confirmation_number"
          />
        </q-btn-group>
      </q-card-section> -->
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import QItemLabelValue from "./QItemLabelValue";
import ImageSlideCarousel from "./ImageSlideCarousel";

export default {
  props: ["item"],
  components: {
    QItemLabelValue,
    ImageSlideCarousel,
  },
  setup() {
    return {
      expanded: ref(false),
      policy: ref(false),
      description: ref(false),
    };
  },
  computed: {
    getSingleImage() {
      if (this.item?.image.length > 0 && this.item?.image) return this.item?.image[0];
    },
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
