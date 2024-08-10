<template>
  <!-- <div class=""> -->
  <q-card class="q-mt-lg" flat bordered>
    <slot name="carousel"></slot>

    <q-card-section class="row q-col-gutter-md">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 row text-white">
        <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md col-12">
          <q-item-label class="text-white text-capitalize"
            >Harga Dewasa {{ getSelectedTourPrice?.typePrice }}</q-item-label
          >
          <q-item-label class="text-h4">{{
            $currency($finalPrice(getSelectedTourPrice))
          }}</q-item-label>
        </q-item-section>
      </div>

      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 row text-white">
        <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md col-12">
          <q-item-label class="text-white text-capitalize"
            >Harga Anak (2-6 tahun) {{ getSelectedTourPrice?.typePrice }}</q-item-label
          >
          <q-item-label class="text-h4">{{
            $currency($finalPriceAnak(getSelectedTourPrice))
          }}</q-item-label>
        </q-item-section>
      </div>
    </q-card-section>

    <q-separator></q-separator>

    <slot name="title">
      <q-card-section>
        <q-item dense class="q-pa-none">
          <q-item-section class="text-h6 q-mb-xs">
            <q-item-label>{{ getSelectedTourPrice?.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label caption>{{ getSelectedTourPrice?.createdAt }}</q-item-label>
      </q-card-section>
    </slot>

    <q-separator></q-separator>
    <q-card-section class="custom q-pa-none">
      <q-list class="row flex items-start text-caption text-dark">
        <isQItemLabelValue
          label="HPP Dewasa"
          :value="$currency(getSelectedTourPrice?.generalPrice)"
        ></isQItemLabelValue>
        <isQItemLabelValue
          label="HPP Anak (2-6 tahun)"
          :value="$currency(getSelectedTourPrice?.generalPrice)"
        ></isQItemLabelValue>
        <isQItemLabelValue
          label="Diskon"
          :value="$percent(getSelectedTourPrice?.discountPrice)"
        ></isQItemLabelValue>
        <isQItemLabelValue
          label="Cashback"
          :value="$currency(getSelectedTourPrice?.cashbackPrice)"
        ></isQItemLabelValue>
        <q-item>
          <q-item-section>
            <q-item-label caption>Deskripsi Harga</q-item-label>
            <q-item-label>{{ getSelectedTourPrice?.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-section>
      <FormTour ref="form" :item="getSelectedTourPrice"></FormTour>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-section class="q-pa-none">
      <q-item-label header class="text-title text-bold text-dark"
        >DAFTAR HARGA</q-item-label
      >
      <q-list bordered class="q-mx-md q-mb-md">
        <q-item>
          <q-item-section>
            <q-item-label caption>Subtotal Dewasa</q-item-label>
            <q-item-label class="text-h6">{{ $currency(subTotalDewasa) }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Subtotal Anak (2-6 tahun)</q-item-label>
            <q-item-label class="text-h6">{{ $currency(subTotalAnak) }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Subtotal Dijumlah (diluar hotel)</q-item-label>
            <q-item-label class="text-h6">{{
              $currency(subTotalAnak + subTotalDewasa)
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <!-- <q-separator></q-separator>

    <q-card-section>
      <q-btn-group spread unelevated>
        <q-btn
          size="lg"
          no-caps
          square
          @click="
            $global.$emit('LagiaLayout', {
              label: 'konsultasi',
              slug: 'konsultasi',
              vendor: 'tourStore',
              value: item,
              product: 'tourProduct',
            })
          "
          color="positive"
          text-color="white"
          label="Tanya"
          icon="fa-brands fa-whatsapp"
        />
        <q-separator vertical></q-separator>
        <q-btn
          size="lg"
          no-caps
          @click="$refs.form.onSubmit({ price_id: getSelectedTourPrice?.id })"
          square
          color="primary"
          text-color="white"
          label="Pesan"
          icon="shopping_cart_checkout"
        />
      </q-btn-group>
    </q-card-section> -->
  </q-card>
  <!-- </div> -->
</template>

<script>
import { ref } from "vue";
import { storeToRefs } from "pinia";

// import { useAddToCartStore } from "stores/lagia-stores/widget/AddToCartStore";

import FormTour from "./FormTour";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useTourCartSelectedStore } from "stores/lagia-stores/tour/TourCartSelectedStore";

export default {
  emits: ["onBubbleEvent"], // <--- add this line
  components: {
    FormTour,
  },
  setup() {
    const _TourCartSelectedStore = useTourCartSelectedStore();
    const {
      selected,
      vat,
      coupon,
      // item,
      getSelectedTourPrice,
      calculate,
      subTotalAnak,
      subTotalDewasa,
    } = storeToRefs(_TourCartSelectedStore);
    const {
      // prompt,
      // quantity,
      min_participant,
      date_start,
      participant_young,
      participant_adult,
      hotel,
    } = storeToRefs(_TourCartSelectedStore); // have all reactive states here

    const {
      // onAdd, onRemove,
      onAddToCart,
    } = _TourCartSelectedStore;

    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    return {
      selected,
      vat,
      coupon,
      // item,
      getSelectedTourPrice,
      calculate,
      subTotalAnak,
      subTotalDewasa,

      onAddToCart,
      // onAdd,
      // onRemove,
      // prompt,

      // quantity,
      min_participant,
      date_start,
      participant_young,
      participant_adult,
      hotel,

      // optionsFn(date) {
      //   return date >= formattedString; //'2019/02/03' && date <= '2019/02/15'
      // },

      showMultiple,
      expanded: ref(false),
    };
  },
  computed: {
    // subTotalAnak() {
    //   return this.participant_young * this.$finalPriceAnak(this.getSelectedTourPrice);
    // },
    // subTotalDewasa() {
    //   return this.participant_adult * this.$finalPrice(this.getSelectedTourPrice);
    // },
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

<style lang="css">
.custom .q-item__label {
  line-height: 1.6 !important;
  font-size: 14px;
}
</style>
