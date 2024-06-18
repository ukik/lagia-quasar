<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <!-- {{ item?.transportVehicle?.image }} -->
      <!-- <q-img
        v-if="!item?.transportVehicle?.image"
        style="height: 300px"
        :src="item?.transportVehicle?.image"
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
        v-if="!item?.tourismVenue?.image"
        :src="$defaultErrorImage"
      />
      <RentalImageSlideCarousel
        v-else
        :_gallery="item?.tourismVenue?.image"
      ></RentalImageSlideCarousel>

      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-pink">{{ item?.category }}</div> -->

        <q-chip
          color="pink"
          text-color="white"
          icon="label"
          class="text-overline text-uppercase"
          >{{ item?.typePrice }}</q-chip
        >

        <div class="text-h6 q-mt-sm q-mb-xs">{{ item?.name }}</div>
        <q-item-label caption>{{ item?.createdAt }}</q-item-label>

        <div class="row text-white">
          <q-item-section class="bg-primary q-mt-lg col-auto rounded-borders-1 q-pa-md">
            <q-item-label class="text-white text-capitalize"
              >Harga {{ item?.typePrice }}</q-item-label
            >
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
          <!-- <QItemLabelValue
            label="description"
            :value="item?.description"
          ></QItemLabelValue> -->

          <!-- <QItemLabelValue label="customerId" :value="item?.customerId"></QItemLabelValue> -->
          <QItemLabelValue label="condition" :value="item?.condition"></QItemLabelValue>
          <!-- <QItemLabelValue label="customer" :value="item?.customer"></QItemLabelValue> -->

          <!-- <QItemLabelValue label="createdAt" :value="item?.createdAt"></QItemLabelValue>
          <QItemLabelValue label="updatedAt" :value="item?.updatedAt"></QItemLabelValue>
          <QItemLabelValue label="deletedAt" :value="item?.deletedAt"></QItemLabelValue> -->
        </q-list>
      </q-card-section>

      <q-card-section class="q-pa-none">
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section> Description </q-item-section>
          </template>
          <q-separator></q-separator>

          <q-card>
            <q-card-section>
              {{ item?.description }} Follow the instructions to embed the icon font in
              your site and learn how to style your icons using CSS. Follow the
              instructions to embed the icon font in your site and learn how to style your
              icons using CSS.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-btn-group spread outline>
          <q-btn
            @click="
              $emit('onBubbleEvent', { label: 'venue', payload: item?.tourismVenue })
            "
            label="venue"
            icon="storefront"
          />
          <!-- <q-btn
            outline
            flat
            icon="shopping_cart_checkout"
            color="primary"
            size="md"
            label="Add To Cart"
          /> -->
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'fasilitas',
                payload: item?.tourismVenue,
              })
            "
            label="wahana"
            icon="weekend"
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
