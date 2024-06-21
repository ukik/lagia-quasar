<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      xxxx
      <q-img
        v-if="item?.talentProfile?.image && item?.talentProfile?.image.length > 0"
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        :src="item?.talentProfile?.image[0]"
      >
        <div class="absolute-top-right bg-transparent">
          <q-btn
            size="16px"
            rounded
            dense
            color="white"
            text-color="primary"
            icon="fullscreen"
            @click="showMultiple(item?.talentProfile?.image, 0)"
          />
        </div>

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

      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-pink">{{ item?.category }}</div> -->
        <!-- <template v-for="(val, index) in item?.category">
          <q-chip
            color="blue"
            text-color="white"
            class="text-overline text-uppercase q-ml-none"
            >{{ val }}</q-chip
          >
        </template> -->

        <div class="text-center">
          <q-btn-group outline rounded unelevated class="bg-white">
            <q-btn
              outline
              color="primary"
              bg-color="white"
              size="16px"
              dense
              class="q-px-md"
              ><i class="text-h6 fa-brands fa-instagram"></i
            ></q-btn>
            <q-btn
              outline
              color="primary"
              bg-color="white"
              size="16px"
              dense
              class="q-px-md"
              ><i class="text-h6 fa-brands fa-whatsapp"></i
            ></q-btn>
            <q-btn
              outline
              color="primary"
              bg-color="white"
              size="16px"
              dense
              class="q-px-md"
              ><i class="text-h6 fa-brands fa-facebook-f"></i
            ></q-btn>
            <q-btn
              outline
              color="primary"
              bg-color="white"
              size="16px"
              dense
              class="q-px-md"
              ><i class="text-h6 fa-brands fa-x-twitter"></i
            ></q-btn>
            <q-btn
              outline
              color="primary"
              bg-color="white"
              size="16px"
              dense
              class="q-px-md"
              ><i class="text-h6 fa-brands fa-tiktok"></i
            ></q-btn>
          </q-btn-group>
        </div>

        <div class="text-h6 q-mt-sm q-mb-xs">{{ item?.name }}</div>
        <q-item-label caption class="q-mb-lg">{{ item?.createdAt }}</q-item-label>

        <q-rating
          v-if="item?.ratingAvg?.avgRating"
          readonly
          v-model="item.ratingAvg.avgRating"
          size="sm"
          :max="5"
          color="red"
        ></q-rating>

        <q-rating
          v-else-if="item?.talentProfile?.ratingAvg?.avgRating"
          readonly
          v-model="item.talentProfile.ratingAvg.avgRating"
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
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <q-item dense>
          <q-item-section thumbnail>
            <q-avatar>
              <img v-if="item?.badasoUser?.avatar" :src="item?.badasoUser?.avatar" />
              <img v-else :src="$defaultUser" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item?.badasoUser?.name }}</q-item-label>
            <q-item-label caption>{{ item?.badasoUser?.username }}</q-item-label>
          </q-item-section>
        </q-item>

        <!-- <div class="row text-white">
          <q-item-section class="bg-primary q-mt-lg col-auto rounded-borders-1 q-pa-md">
            <q-item-label class="text-white">Start From</q-item-label>
            <q-item-label class="text-h4">Rp. {{ item?.generalPrice }}</q-item-label>
          </q-item-section>
        </div> -->
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> portofolio </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ item?.portofolio }}
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
      ratingZero: 0.00,
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
