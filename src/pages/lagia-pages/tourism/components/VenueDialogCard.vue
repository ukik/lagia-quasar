<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <!-- {{ item?.tourismVenue?.image }} -->
      <q-img
        v-if="item?.tourismVenue?.image && item?.tourismVenue?.image.length > 0"
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        :src="item?.tourismVenue?.image[0]"
        :error-src="$defaultErrorImage"
      >
        <div class="absolute-top-right bg-transparent">
          <q-btn
            size="16px"
            rounded
            dense
            color="white"
            text-color="primary"
            icon="fullscreen"
            @click="showMultiple(item?.tourismVenue?.image, 0)"
          />
        </div>

        <template v-slot:error>
          <div class="absolute-full flex flex-center text-white">Cannot load image</div>
        </template>
      </q-img>
      <q-img
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        v-else
        :src="$defaultErrorImage"
      />
      <!-- <q-img
        loading="lazy"
        style="height: 300px"
        v-if="!item?.tourismVenue?.image"
        :src="$defaultUser"
      />
      <ImageSlideCarousel
        v-else
        :_gallery="item?.tourismVenue?.image"
      ></ImageSlideCarousel> -->

      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-pink">{{ item?.tourismVenue?.category }}</div> -->
        <template v-for="(val, index) in item?.tourismVenue?.category">
          <q-chip
            color="blue"
            text-color="white"
            class="text-overline text-uppercase q-ml-none"
            >{{ val }}</q-chip
          >
        </template>

        <div class="text-h6 q-mt-sm q-mb-xs">{{ item?.tourismVenue?.name }}</div>
        <q-item-label caption class="q-my-lg">{{
          item?.tourismVenue?.createdAt
        }}</q-item-label>

        <q-rating
          v-if="item?.tourismVenue?.ratingAvg?.avgRating"
          readonly
          v-model="item.tourismVenue.ratingAvg.avgRating"
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
          color="red"
        ></q-rating>

        <!-- <div class="row text-white">
          <q-item-section class="bg-primary q-mt-lg col-auto rounded-borders-1 q-pa-md">
            <q-item-label class="text-white">Start From</q-item-label>
            <q-item-label class="text-h4">Rp. {{ item?.tourismVenue?.tourismVenue?.generalPrice }}</q-item-label>
          </q-item-section>
        </div> -->
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <QItemLabelValue label="id" :value="item?.tourismVenue?.id"></QItemLabelValue>
          <QItemLabelValue
            label="userId"
            :value="item?.tourismVenue?.userId"
          ></QItemLabelValue>
          <QItemLabelValue
            label="uuid"
            :value="item?.tourismVenue?.uuid"
          ></QItemLabelValue>
          <QItemLabelValue
            label="dayOpen"
            :value="item?.tourismVenue?.dayOpen"
          ></QItemLabelValue>
          <QItemLabelValue
            label="dayClose"
            :value="item?.tourismVenue?.dayClose"
          ></QItemLabelValue>
          <QItemLabelValue
            label="timeOpen"
            :value="$formatTime(item?.tourismVenue?.timeOpen)"
          ></QItemLabelValue>
          <QItemLabelValue
            label="timeClose"
            :value="$formatTime(item?.tourismVenue?.timeClose)"
          ></QItemLabelValue>
          <QItemLabelValue
            label="name"
            :value="item?.tourismVenue?.name"
          ></QItemLabelValue>
          <QItemLabelValue
            label="email"
            :value="item?.tourismVenue?.email"
          ></QItemLabelValue>
          <QItemLabelValue
            label="phone"
            :value="item?.tourismVenue?.phone"
          ></QItemLabelValue>
          <QItemLabelValue
            label="location"
            :value="item?.tourismVenue?.location"
          ></QItemLabelValue>
          <!-- <QItemLabelValue label="image" :value="item?.tourismVenue?.image"></QItemLabelValue> -->
          <!-- <QItemLabelValue label="address" :value="item?.tourismVenue?.address"></QItemLabelValue> -->
          <QItemLabelValue
            label="codepos"
            :value="item?.tourismVenue?.codepos"
          ></QItemLabelValue>
          <QItemLabelValue
            label="city"
            :value="item?.tourismVenue?.city"
          ></QItemLabelValue>
          <QItemLabelValue
            label="country"
            :value="item?.tourismVenue?.country"
          ></QItemLabelValue>
          <!-- <QItemLabelValue label="policy" :value="item?.tourismVenue?.policy"></QItemLabelValue> -->
          <!-- <QItemLabelValue label="category" :value="item?.tourismVenue?.category"></QItemLabelValue> -->
          <!-- <QItemLabelValue
            label="description"
            :value="item?.tourismVenue?.description"
          ></QItemLabelValue> -->
          <QItemLabelValue
            label="isAvailable"
            :value="item?.tourismVenue?.isAvailable"
          ></QItemLabelValue>
          <!-- <QItemLabelValue
            label="createdAt"
            :value="item?.tourismVenue?.createdAt"
          ></QItemLabelValue> -->
          <!-- <QItemLabelValue label="updatedAt" :value="item?.tourismVenue?.updatedAt"></QItemLabelValue>
          <QItemLabelValue label="deletedAt" :value="item?.tourismVenue?.deletedAt"></QItemLabelValue> -->
        </q-list>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Address </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ item?.tourismVenue?.address }}
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
              {{ item?.tourismVenue?.policy }}
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
              {{ item?.tourismVenue?.description }}
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
              $emit('onBubbleEvent', { label: 'vendor', payload: item?.tourismVenue?.transportRental })
            "
            label="Vendor"
            icon="storefront"
          />
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'vehicle',
                payload: item?.tourismVenue?.transportVehicle,
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
            {{ item?.tourismVenue?.description }}
          </q-card-section>
        </div>
      </q-slide-transition> -->
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import QItemLabelValue from "./QItemLabelValue";
import ImageSlideCarousel from "./ImageSlideCarousel";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  props: ["item"],
  components: {
    QItemLabelValue,
    ImageSlideCarousel,
  },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    return {
      showMultiple,
      expanded: ref(false),
      ratingZero: 4.5,
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
      if (!item?.tourismVenue?.category) return [];
      return item?.tourismVenue?.category.split(",");
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
