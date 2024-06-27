<template>
  <isModalDescription ref="isModal"></isModalDescription>

  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <!-- {{ record?.image }} -->
      <q-img
        v-if="record?.image && record?.image.length > 0"
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        :src="record?.image[0]"
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
            @click="showMultiple(record?.image, 0)"
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
        v-if="!record?.image"
        :src="$defaultUser"
      />
      <ImageSlideCarousel
        v-else
        :_gallery="record?.image"
      ></ImageSlideCarousel> -->

      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-pink">{{ record?.category }}</div> -->
        <template v-for="(val, index) in record?.category">
          <q-chip
            color="blue"
            text-color="white"
            class="text-overline text-uppercase q-ml-none"
            >{{ val }}</q-chip
          >
        </template>

        <div class="text-h6 q-mt-sm q-mb-xs">{{ record?.name }}</div>
        <q-item-label caption class="q-mb-lg">{{ record?.createdAt }}</q-item-label>

        <q-rating
          v-if="record?.ratingAvg?.avgRating"
          readonly
          v-model="record.ratingAvg.avgRating"
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
            <q-item-label class="text-h4">Rp. {{ record?.generalPrice }}</q-item-label>
          </q-item-section>
        </div> -->
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <isQItemLabelValue label="uuid" :value="record?.uuid"></isQItemLabelValue>
          <isQItemLabelValue label="name" :value="record?.name"></isQItemLabelValue>
          <isQItemLabelValue label="email" :value="record?.email"></isQItemLabelValue>
          <isQItemLabelValue label="phone" :value="record?.phone"></isQItemLabelValue>
          <!-- <isQItemLabelValue label="location" :value="record?.location"></isQItemLabelValue> -->
          <!-- <isQItemLabelValue label="address" :value="record?.address"></isQItemLabelValue> -->
          <isQItemLabelValue label="codepos" :value="record?.codepos"></isQItemLabelValue>
          <isQItemLabelValue label="city" :value="record?.city"></isQItemLabelValue>
          <isQItemLabelValue label="country" :value="record?.country"></isQItemLabelValue>
          <isQItemLabelValue label="kelas" :value="record?.rating"></isQItemLabelValue>
          <!-- <isQItemLabelValue label="types" :value="record?.types"></isQItemLabelValue> -->

          <isQItemLabelValue
            label="services"
            :value="record?.services"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="checkinTime"
            :value="$formatTime(record?.checkinTime)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="checkoutTime"
            :value="$formatTime(record?.checkoutTime)"
          ></isQItemLabelValue>
          <!-- <isQItemLabelValue label="additionalPolicy" :value="record?.additionalPolicy"></isQItemLabelValue> -->
          <isQItemLabelValue
            label="shuttleToAirportPrice"
            :value="record?.shuttleToAirportPrice"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="additionalBreakfastPrice"
            :value="record?.additionalBreakfastPrice"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="lateCheckoutPrice"
            :value="record?.lateCheckoutPrice"
          ></isQItemLabelValue>
          <isQItemLabelValue label="rooms" :value="record?.rooms"></isQItemLabelValue>
          <!-- <isQItemLabelValue
            label="Unit Ready"
            :value="record?.lodgeRoomsCount"
          ></isQItemLabelValue> -->
          <!-- <isQItemLabelValue
            label="timeOpen"
            :value="$formatTime(record?.timeOpen)"
          ></isQItemLabelValue> -->
          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: {
                  value: record?.location,
                  label: 'location',
                },
              })
            "
            :clickable="true"
            label="location"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>

          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: {
                  value: record?.address,
                  label: 'address',
                },
              })
            "
            :clickable="true"
            label="address"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>

          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: {
                  value: record?.policy,
                  label: 'policy',
                },
              })
            "
            :clickable="true"
            label="policy"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>

          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: {
                  value: record?.additionalPolicy,
                  label: 'policy tambahan',
                },
              })
            "
            :clickable="true"
            label="policy tambahan"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>

          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: {
                  value: record?.description,
                  label: 'description',
                },
              })
            "
            :clickable="true"
            label="description"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>

          <q-item class="col-12" dense>
            <q-item-section top>
              <q-item-label class="text-capitalize">types</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-right">
                <template v-for="(val, index) in getCategory(record?.types)">
                  <q-chip color="blue" class="q-ml-none" text-color="white">{{
                    val
                  }}</q-chip>
                </template>
              </q-item-label>
            </q-item-section>
          </q-item>

          <isAvailable :item="record?.isAvailable"></isAvailable>
        </q-list>
      </q-card-section>
      <!-- <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Address </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ record?.address }}
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
              {{ record?.policy }}
            </q-card-section>
          </q-card>
          <q-separator></q-separator>
        </q-expansion-item>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> additionalPolicy </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ record?.additionalPolicy }}
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
              {{ record?.description }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section> -->

      <!-- <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-btn-group spread outline>
          <q-btn
            @click="
              $emit('onBubbleEvent', { label: 'vendor', payload: record?.transportRental })
            "
            label="Vendor"
            icon="storefront"
          />
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'vehicle',
                payload: record?.transportVehicle,
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
            {{ record?.description }}
          </q-card-section>
        </div>
      </q-slide-transition> -->
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
// import QItemLabelValue from "./QItemLabelValue";
// import ImageSlideCarousel from "./ImageSlideCarousel";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  props: ["item"],
  components: {
    // QItemLabelValue,
    // ImageSlideCarousel,
  },
  computed: {
    record() {
      return this.item?.lodgeProfile;
    },
  },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    const dialog_payload = ref(null);
    const dialog_value = ref(false);

    return {
      showMultiple,
      expanded: ref(false),
      ratingZero: 0.0,

      dialog_payload,
      dialog_value,
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
      if (!item) return [];
      try {
        return item.split(",");
      } catch (error) {
        return item;
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
