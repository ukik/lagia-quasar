<template>
  <isModalDescription ref="isModal"></isModalDescription>
  <q-card
    flat
    bordered
    :square="$q.screen.width <= 1024"
    :class="[$q.screen.width > 768 ? 'rounded-borders-2' : '']"
  >
    <!-- <q-card-actions align="center" class="full-width q-pa-none">
      <q-item-label header>VENDOR</q-item-label>
    </q-card-actions>
    <q-separator></q-separator> -->
    <q-card-section :horizontal="$q.screen.width > 768" class="row q-pa-none">
      <q-img
        v-if="item?.image && item?.image.length > 0"
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        :src="item?.image[0]"
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
            @click="showMultiple(item?.image, 0)"
          />
        </div>

        <q-item-label class="absolute-bottom text-center" header>VENDOR</q-item-label>

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
      >
        <q-item-label class="absolute-bottom text-center" header>VENDOR</q-item-label>
      </q-img>
      <q-card flat class="full-width">
        <q-card-section class="q-pa-none row">
          <q-item
            v-ripple
            clickable
            class="col-auto"
            :to="{
              name: '/tour/store-detail',
              params: {
                slug: item?.id,
                slug_text: item?.name,
              },
            }"
          >
            <q-item-section class="text-h6">
              <q-item-label>{{ item?.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-px-none">
          <!-- <div class="text-box full-width q-px-sm col-12 text-capitalize"> -->

          <!-- <q-item dense>
            <q-item-section>
              <q-item-label lines="1">Rating</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">
                <q-rating
                  v-if="item?.ratingAvg?.avgRating"
                  readonly
                  v-model="item.ratingAvg.avgRating"
                  size="xs"
                  :max="5"
                  color="red"
                ></q-rating>

                <q-rating
                  v-else
                  readonly
                  v-model="ratingZero"
                  size="xs"
                  :max="5"
                  color="red"
                ></q-rating>
              </q-item-label>
            </q-item-section>
          </q-item> -->

          <!-- <isQItemLabelSimpleValue
            label="codepos"
            :value="item?.codepos"
          ></isQItemLabelSimpleValue> -->
          <isQItemLabelSimpleValue
            label="Kota"
            :value="item?.city"
          ></isQItemLabelSimpleValue>
          <isQItemLabelSimpleValue
            label="Provinsi"
            :value="item?.province"
          ></isQItemLabelSimpleValue>
          <isQItemLabelSimpleValue
            label="Negara"
            :value="item?.country"
          ></isQItemLabelSimpleValue>

          <isQItemLabelSimpleValue v-if="item?.policy"
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: { value: item?.policy, label: 'policy' },
              })
            "
            :clickable="true"
            label="Kebijakan"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValue>

          <isQItemLabelSimpleValue v-if="item?.description"
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: { value: item?.description, label: 'description' },
              })
            "
            :clickable="true"
            label="Deskripsi"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValue>

          <isQItemLabelSimpleValue v-if="item?.location"
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: { value: item?.location, label: 'location' },
              })
            "
            :clickable="true"
            label="Lokasi"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValue>
          <!-- </div> -->
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
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
  // computed: {
  //   record() {
  //     return this.item;
  //   },
  // },
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
    getSplit(item) {
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
