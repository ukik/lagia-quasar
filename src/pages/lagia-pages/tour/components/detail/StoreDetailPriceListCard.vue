<template>
  <isModalDescription ref="isModal"></isModalDescription>

  <div class="row items-start q-gutter-md">
    <q-card class="my-card q-mt-lg" flat bordered>
      <q-card-section>
        <isDestinationRatingNoFloat
          :rating="item?.transportVehicle?.ratingAvg?.avgRating"
        ></isDestinationRatingNoFloat>

        <div class="row text-white">
          <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md">
            <q-item-label class="text-white text-capitalize"
              >Harga {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h4">{{
              $currency($finalPrice(item))
            }}</q-item-label>
          </q-item-section>
        </div>
      </q-card-section>

      <q-separator></q-separator>
      <q-card-section>
        <q-item
          dense
          clickable
          class="q-pa-none"
          :to="{
            name: '/tour/price-detail',
            params: {
              slug: item?.id,
              slug_text: item?.name,
            },
          }"
        >
          <q-item-section class="text-h6 q-mb-xs">
            <q-item-label>{{ item?.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label caption>{{ item?.createdAt }}</q-item-label>
      </q-card-section>

      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
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
          <!-- <isQItemLabelValue
            label="description"
            :value="item?.description"
          ></isQItemLabelValue> -->

          <!-- <isQItemLabelValue label="customerId" :value="item?.customerId"></isQItemLabelValue> -->
          <!-- <isQItemLabelValue
            label="condition"
            :value="item?.condition"
          ></isQItemLabelValue> -->
          <!-- <isQItemLabelValue label="customer" :value="item?.customer"></isQItemLabelValue> -->

          <!-- <isQItemLabelValue label="createdAt" :value="item?.createdAt"></isQItemLabelValue>
          <isQItemLabelValue label="updatedAt" :value="item?.updatedAt"></isQItemLabelValue>
          <isQItemLabelValue label="deletedAt" :value="item?.deletedAt"></isQItemLabelValue> -->
          <!-- <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: { value: item?.description, label: 'Description' },
              })
            "
            :clickable="true"
            label="Description"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense> -->
        </q-list>
      </q-card-section>

      <!-- <q-card-section class="q-pa-none">
        <q-expansion-item class="q-px-md">
          <template v-slot:header>
            <q-item-section> Description </q-item-section>
          </template>
          <q-separator></q-separator>

          <q-card>
            <q-card-section class="q-px-none">
              {{ item?.description }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section> -->

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
            label="Add To Cart"
            icon="shopping_cart_checkout"
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
  emits: ["onBubbleEvent"], // <--- add this line
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
