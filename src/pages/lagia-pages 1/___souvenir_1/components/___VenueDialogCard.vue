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
        <!-- <div class="text-overline text-uppercase text-pink">{{ item?.category }}</div> -->
        <template v-for="(val, index) in item?.category">
          <q-chip
            color="blue"
            text-color="white"
            class="text-overline text-uppercase q-ml-none"
            >{{ val }}</q-chip
          >
        </template>

        <div class="text-h6 q-mt-sm q-mb-xs">{{ item?.name }}</div>
        <q-item-label caption class="q-my-lg">{{ item?.createdAt }}</q-item-label>

        <q-rating
          v-if="item?.ratingAvg?.avgRating"
          readonly
          v-model="item.ratingAvg.avgRating"
          size="sm"
          :max="5"
          color="red"
        ></q-rating>

        <q-rating
          v-else
          readonly
          v-model="ratingZero"
          size="sm"
          :max="5"
          color="grey"
        ></q-rating>

        <!-- <div class="row text-white">
          <q-item-section class="bg-primary q-mt-lg col-auto rounded-borders-1 q-pa-md">
            <q-item-label class="text-white">Start From</q-item-label>
            <q-item-label class="text-h4">Rp. {{ item?.generalPrice }}</q-item-label>
          </q-item-section>
        </div> -->
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <QItemLabelValue label="id" :value="item?.id"></QItemLabelValue>
          <QItemLabelValue label="userId" :value="item?.userId"></QItemLabelValue>
          <QItemLabelValue label="uuid" :value="item?.uuid"></QItemLabelValue>
          <QItemLabelValue label="dayOpen" :value="item?.dayOpen"></QItemLabelValue>
          <QItemLabelValue label="dayClose" :value="item?.dayClose"></QItemLabelValue>
          <QItemLabelValue
            label="timeOpen"
            :value="$formatTime(item?.timeOpen)"
          ></QItemLabelValue>
          <QItemLabelValue
            label="timeClose"
            :value="$formatTime(item?.timeClose)"
          ></QItemLabelValue>
          <QItemLabelValue label="name" :value="item?.name"></QItemLabelValue>
          <QItemLabelValue label="email" :value="item?.email"></QItemLabelValue>
          <QItemLabelValue label="phone" :value="item?.phone"></QItemLabelValue>
          <QItemLabelValue label="location" :value="item?.location"></QItemLabelValue>
          <!-- <QItemLabelValue label="image" :value="item?.image"></QItemLabelValue> -->
          <!-- <QItemLabelValue label="address" :value="item?.address"></QItemLabelValue> -->
          <QItemLabelValue label="codepos" :value="item?.codepos"></QItemLabelValue>
          <QItemLabelValue label="city" :value="item?.city"></QItemLabelValue>
          <QItemLabelValue label="country" :value="item?.country"></QItemLabelValue>
          <!-- <QItemLabelValue label="policy" :value="item?.policy"></QItemLabelValue> -->
          <!-- <QItemLabelValue label="category" :value="item?.category"></QItemLabelValue> -->
          <!-- <QItemLabelValue
            label="description"
            :value="item?.description"
          ></QItemLabelValue> -->
          <QItemLabelValue
            label="isAvailable"
            :value="item?.isAvailable"
          ></QItemLabelValue>
          <QItemLabelValue label="createdAt" :value="item?.createdAt"></QItemLabelValue>
          <!-- <QItemLabelValue label="updatedAt" :value="item?.updatedAt"></QItemLabelValue>
          <QItemLabelValue label="deletedAt" :value="item?.deletedAt"></QItemLabelValue> -->
        </q-list>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Address </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ item?.address }}
            </q-card-section>
          </q-card>
          <q-separator></q-separator>
        </q-expansion-item>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Policy </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ item?.policy }}
            </q-card-section>
          </q-card>
          <q-separator></q-separator>
        </q-expansion-item>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Description </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ item?.description }}
            </q-card-section>
          </q-card>
          <!-- <q-separator></q-separator> -->
        </q-expansion-item>
      </q-card-section>
      <!-- <q-separator></q-separator>

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
        </q-btn-group>
      </q-card-section> -->

      <!-- <q-separator></q-separator>

      <q-card-actions align="center">
        <q-btn
          outline
          flat
          icon="shopping_cart_checkout"
          color="primary"
          size="md"
          label="Add To Cart"
        />
      </q-card-actions> -->

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
      ratingZero: 0,
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
    getCategory(item) {
      if (!item?.category) return [];
      return item?.category.split(",");
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
