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
        v-if="item?.culinaryProduct?.image && item?.culinaryProduct?.image.length > 0"
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        :src="item?.culinaryProduct?.image[0]"
      >
        <div class="absolute-top-left bg-transparent">
          <q-btn
            size="16px"
            rounded
            dense
            color="white"
            text-color="primary"
            icon="fullscreen"
            @click="showMultiple(item?.culinaryProduct?.image, 0)"
          />
        </div>
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
          <div class="absolute-full flex flex-center bg-negative text-white">
            Cannot load image
          </div>
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
        v-if="!item?.culinaryProduct?.image"
        :src="$defaultErrorImage"
      />
      <ImageSlideCarousel
        v-else
        :_gallery="item?.culinaryProduct?.image"
      ></ImageSlideCarousel> -->

      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-pink">{{ item?.category }}</div> -->
        <DestinationRating
          :rating="item?.culinaryProduct?.ratingAvg?.avgRating"
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
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <!-- <isQItemLabelValue label="id" :value="item?.id"></isQItemLabelValue> -->
          <!-- <isQItemLabelValue label="uuid" :value="item?.uuid"></isQItemLabelValue> -->
          <!-- <isQItemLabelValue label="rentalId" :value="item?.rentalId"></isQItemLabelValue>
          <isQItemLabelValue label="vehicleId" :value="item?.vehicleId"></isQItemLabelValue> -->
          <!-- <isQItemLabelValue label="name" :value="item?.name"></isQItemLabelValue> -->
          <isQItemLabelValue
            label="generalPrice"
            :value="$currency(item?.generalPrice)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="discountPrice"
            :value="$percent(item?.discountPrice)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="cashbackPrice"
            :value="$currency(item?.cashbackPrice)"
          ></isQItemLabelValue>
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

      <q-separator></q-separator>

      <!-- <q-card-section class="q-pa-none">
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
            @click="$emit('onBubbleEvent', { label: 'store', payload: item })"
            label="Store"
            icon="local_mall"
          />
        </q-btn-group>
      </q-card-section> -->

      <q-card-section class="q-pa-none">
        <q-btn-group spread unelevated>
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
          <q-separator vertical></q-separator>
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'store',
                payload: item,
              })
            "
            label="store"
            icon="storefront"
          />
          <!-- <q-separator vertical></q-separator>
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'produk',
                payload: item,
              })
            "
            label="produk"
            icon="inventory"
          /> -->
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
// import isQItemLabelValue from "./isQItemLabelValue";
// import ImageSlideCarousel from "./ImageSlideCarousel";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  props: ["item"],
  components: {
    // isQItemLabelValue,
    // ImageSlideCarousel,
  },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    return {
      showMultiple,
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
