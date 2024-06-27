<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <!-- {{ item?.transportVehicle?.image }} -->
      <!-- <q-img
        class="bg-dark"
        v-if="!item?.transportVehicle?.image"
        style="height: 300px"
        :src="item?.image"
        :error-src="$defaultErrorImage"
      >
        <q-badge
          :color="badgeCondition(item?.condition)"
          class="q-mr-lg rounded-borders-2"
          style="margin-top: -17px"
          floating
          ><span class="text-title text-uppercase q-mt-md">{{
            item?.condition
          }}</span></q-badge
        >
        <template v-slot:error>
          <div class="absolute-full flex flex-center">Error encountered</div>
          <q-badge
            :color="badgeCondition(item?.condition)"
            class="q-mr-lg rounded-borders-2"
            style="margin-top: -17px"
            floating
            ><span class="text-title text-uppercase q-mt-md">{{
              item?.condition
            }}</span></q-badge
          >
        </template>
      </q-img> -->

      <q-img
        loading="lazy"
        style="height: 300px"
        v-if="!item?.transportVehicle?.image"
        :src="$defaultUser"
      />
      <RentalImageSlideCarousel
        v-else
        :_gallery="item?.transportVehicle?.image"
      ></RentalImageSlideCarousel>

      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-orange-9">{{ item?.category }}</div> -->

        <q-chip
          color="orange-9"
          text-color="white"
          icon="label"
          class="text-overline text-uppercase"
          >{{
            item?.category ? item?.category : item?.transportVehicle?.category
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
          <QItemLabelValue label="id" :value="item?.id"></QItemLabelValue>
          <QItemLabelValue label="uuid" :value="item?.uuid"></QItemLabelValue>
          <!-- <QItemLabelValue label="rentalId" :value="item?.rentalId"></QItemLabelValue>
          <QItemLabelValue label="vehicleId" :value="item?.vehicleId"></QItemLabelValue> -->
          <QItemLabelValue label="name" :value="item?.name"></QItemLabelValue>
          <QItemLabelValue
            label="generalPrice"
            :value="item?.generalPrice"
          ></QItemLabelValue>
          <QItemLabelValue
            label="discountPrice"
            :value="item?.discountPrice"
          ></QItemLabelValue>
          <QItemLabelValue
            label="cashbackPrice"
            :value="item?.cashbackPrice"
          ></QItemLabelValue>
          <QItemLabelValue
            label="description"
            :value="item?.description"
          ></QItemLabelValue>

          <!-- <QItemLabelValue label="customerId" :value="item?.customerId"></QItemLabelValue> -->
          <!-- <QItemLabelValue label="condition" :value="item?.condition"></QItemLabelValue> -->
          <!-- <QItemLabelValue label="customer" :value="item?.customer"></QItemLabelValue> -->

          <!-- <QItemLabelValue label="createdAt" :value="item?.createdAt"></QItemLabelValue>
          <QItemLabelValue label="updatedAt" :value="item?.updatedAt"></QItemLabelValue>
          <QItemLabelValue label="deletedAt" :value="item?.deletedAt"></QItemLabelValue> -->
        </q-list>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-btn-group spread outline>
          <q-btn
            @click="
              $emit('onBubbleEvent', { label: 'vendor', payload: item?.transportRental })
            "
            label="Vendor"
            icon="storefront"
          />
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'vehicle',
                payload: item?.transportVehicle,
              })
            "
            label="Kendaraan"
            icon="directions_car"
          />
          <!-- <q-btn label="Second" icon="visibility" /> -->
          <!-- <q-btn label="Second" icon="visibility" /> -->
        </q-btn-group>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-actions align="center">
        <q-btn
          outline
          flat
          icon="shopping_cart_checkout"
          color="primary"
          size="md"
          label="Add To Cart"
        />
        <!-- <q-btn flat color="secondary" label="Book" /> -->

        <!-- <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        /> -->
      </q-card-actions>

      <!-- <q-slide-transition>
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
import QItemLabelValue from "./QItemLabelValue";
import RentalImageSlideCarousel from "./RentalImageSlideCarousel";

export default {
  props: ["item"],
  components: {
    QItemLabelValue,
    RentalImageSlideCarousel,
  },
  setup() {
    return {
      expanded: ref(false),
    };
  },
  methods: {
    badgeCondition(condition) {
      switch (condition) {
        case "public":
          return "pink";
        case "partner":
          return "positive";
        case "private":
          return "primary";
      }
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
