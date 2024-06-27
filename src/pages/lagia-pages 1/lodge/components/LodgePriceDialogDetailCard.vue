<template>
  <isModalDescription ref="isModal"></isModalDescription>

  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img
        v-if="item?.lodgeRoom?.image && item?.lodgeRoom?.image.length > 0"
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        :src="item?.lodgeRoom?.image[0]"
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
            @click="showMultiple(item?.lodgeRoom?.image, 0)"
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
        :src="$defaultErrorImage"
      />
      <ImageSlideCarousel
        v-else
        :_gallery="item?.tourismVenue?.image"
      ></ImageSlideCarousel> -->

      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-pink">{{ item?.category }}</div> -->
        <DestinationRating
          :rating="item?.lodgeRoom?.ratingAvg?.avgRating"
        ></DestinationRating>

        <!-- <q-chip
          color="pink"
          text-color="white"
          icon="label"
          class="text-overline text-uppercase"
          >{{ item?.typePrice }}</q-chip
        > -->

        <div class="text-h6 q-mb-xs">{{ item?.name }}</div>
        <q-item-label caption>{{ item?.createdAt }}</q-item-label>

        <div class="row text-white">
          <q-item-section class="bg-primary q-mt-lg col-auto rounded-borders-1 q-pa-md">
            <q-item-label class="text-white text-capitalize"
              >Harga {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h4">{{
              $currency($finalPrice(item))
            }}</q-item-label>
          </q-item-section>
        </div>

        <!-- <q-rating
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
        ></q-rating> -->
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Detail Produk </q-item-section>
          </template>
          <!-- <q-separator></q-separator> -->

          <q-card>
            <q-card-section class="custom q-pa-none q-mb-sm">
              <q-list class="row flex items-start text-caption text-dark q-pl-md">
                <!-- <isQItemLabelValue label="id" :value="record?.id"></isQItemLabelValue> -->
                <isQItemLabelValue label="uuid" :value="record?.uuid"></isQItemLabelValue>
                <isQItemLabelValue label="name" :value="record?.name"></isQItemLabelValue>
                <!-- <isQItemLabelValue label="number" :value="record?.number"></isQItemLabelValue> -->
                <!-- <isQItemLabelValue label="description" :value="record?.description"></isQItemLabelValue> -->
                <isQItemLabelValue
                  label="capacity"
                  :value="record?.capacity"
                ></isQItemLabelValue>
                <isQItemLabelValue
                  label="category"
                  :value="record?.category"
                ></isQItemLabelValue>
                <!-- <isQItemLabelValue label="facility" :value="record?.facility"></isQItemLabelValue> -->
                <isQItemLabelValue
                  label="quota"
                  :value="record?.quota"
                ></isQItemLabelValue>

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
                  :value="record?.description"
                  textcolor="text-primary"
                ></isQItemLabelSimpleValueNoDense>

                <q-item dense>
                  <q-item-section>
                    <q-item-label class="text-capitalize">facility</q-item-label>
                    <q-item-label class="">
                      <template v-for="(val, index) in getCategory(record?.facility)">
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
          </q-card>
          <q-separator></q-separator>
        </q-expansion-item>
      </q-card-section>

      <!-- <q-separator></q-separator> -->

      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <!-- <isQItemLabelSimpleValueNoDense label="id" :value="item?.id"></isQItemLabelSimpleValueNoDense> -->
          <!-- <isQItemLabelSimpleValueNoDense label="uuid" :value="item?.uuid"></isQItemLabelSimpleValueNoDense> -->
          <!-- <isQItemLabelSimpleValueNoDense label="rentalId" :value="item?.rentalId"></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense label="vehicleId" :value="item?.vehicleId"></isQItemLabelSimpleValueNoDense> -->
          <!-- <isQItemLabelSimpleValueNoDense label="name" :value="item?.name"></isQItemLabelSimpleValueNoDense> -->
          <isQItemLabelSimpleValueNoDense
            label="generalPrice"
            :value="$currency(item?.generalPrice)"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="discountPrice"
            :value="$percent(item?.discountPrice)"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="cashbackPrice"
            :value="$currency(item?.cashbackPrice)"
          ></isQItemLabelSimpleValueNoDense>
          <!-- <isQItemLabelSimpleValueNoDense
            label="description"
            :value="item?.description"
          ></isQItemLabelSimpleValueNoDense> -->

          <!-- <isQItemLabelSimpleValueNoDense label="customerId" :value="item?.customerId"></isQItemLabelSimpleValueNoDense> -->
          <!-- <isQItemLabelSimpleValueNoDense
            label="condition"
            :value="item?.condition"
          ></isQItemLabelSimpleValueNoDense> -->
          <!-- <isQItemLabelValue label="customer" :value="item?.customer"></isQItemLabelValue> -->

          <!-- <isQItemLabelValue label="createdAt" :value="item?.createdAt"></isQItemLabelValue>
          <isQItemLabelValue label="updatedAt" :value="item?.updatedAt"></isQItemLabelValue>
          <isQItemLabelValue label="deletedAt" :value="item?.deletedAt"></isQItemLabelValue> -->
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
              $emit('onBubbleEvent', {
                label: 'detail',
                payload: item,
              })
            "
            label="detail"
            icon="visibility"
          />
          <q-btn
            @click="$emit('onBubbleEvent', { label: 'profile', payload: item })"
            label="Profile"
            icon="person"
          />
        </q-btn-group>
      </q-card-section> -->

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
// import isQItemLabelValue from "./isQItemLabelValue";
// import ImageSlideCarousel from "./ImageSlideCarousel";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  props: ["item"],
  components: {
    // isQItemLabelValue,
    // ImageSlideCarousel,
  },
  computed: {
    record() {
      return this.item?.lodgeRoom;
    },
  },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    return {
      showMultiple,
      expanded: ref(false),
      ratingZero: 0.0,
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
