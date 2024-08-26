<template>
  <div class="items-start q-gutter-md">
    <q-card class="" flat bordered>
      <slot name="header"></slot>

      <q-card-section>
        <q-item dense class="q-pa-none">
          <q-item-section class="q-mb-xs">
            <q-item-label>{{ item?.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label caption>{{ item?.createdAt }}</q-item-label>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="row q-col-gutter-md">
        <div :class="price_css">
          <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md col-12">
            <q-item-label class="text-white text-capitalize"
              >Harga Dewasa {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h5">{{
              $currency($finalPrice(item))
            }}</q-item-label>
          </q-item-section>
        </div>

        <div :class="price_css">
          <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md col-12">
            <q-item-label class="text-white text-capitalize"
              >Harga Anak (2-6 tahun) {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h5">{{
              $currency($finalPriceAnak(item))
            }}</q-item-label>
          </q-item-section>
        </div>
      </q-card-section>

      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <isQItemLabelValue
            label="HPP Dewasa"
            :value="$currency(item?.generalPrice)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="HPP Anak (2-6 tahun)"
            :value="$currency(item?.generalPriceChild)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="Diskon"
            :value="$percent(item?.discountPrice)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="Cashback"
            :value="$currency(item?.cashbackPrice)"
          ></isQItemLabelValue>
          <q-item v-if="simulasi">
            <q-item-section>
              <q-item-label caption>Deskripsi Harga</q-item-label>
              <q-item-label>{{ item?.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <FormTourSimulasi
          :date_sticky="date_sticky"
          ref="form"
          :item="item"
        ></FormTourSimulasi>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-lg" v-if="simulasi" flat bordered>
      <!-- <q-separator v-if="simulasi"></q-separator> -->

      <q-card-section class="bg-grey-1">
        <q-item-section>
          <q-item-label class="text-h6 text-weight-normal">RINCIAN BIAYA</q-item-label>
        </q-item-section>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <q-list>
          <table>
            <tr>
              <td class="text-h6 bg-cyan text-white text-bold" colspan="2">PESERTA</td>
            </tr>
            <tr>
              <td>Peserta Dewasa</td>
              <td class="text-h6">
                {{ participant_adult }}
              </td>
            </tr>
            <tr>
              <td>Peserta Anak (2-6 tahun)</td>
              <td class="text-h6">
                {{ !participant_young ? 0 : participant_young }}
              </td>
            </tr>
            <tr>
              <td>Harga Dewasa</td>
              <td class="text-h6">
                {{ $currency($finalPrice(item)) }}
              </td>
            </tr>
            <tr>
              <td>Harga Anak (2-6 tahun)</td>
              <td class="text-h6">
                {{ $currency($finalPriceAnak(item)) }}
              </td>
            </tr>
            <tr>
              <td>Subtotal Dewasa</td>
              <td class="text-h6">
                {{ $currency(subTotalDewasa) }}
              </td>
            </tr>
            <tr>
              <td>Subtotal Anak (2-6 tahun)</td>
              <td class="text-h6">
                {{ $currency(subTotalAnak) }}
              </td>
            </tr>
            <tr class="text-bold">
              <td>Subtotal Peserta Tour</td>
              <td class="text-h6 text-bold">
                {{ $currency(getTotalNonHotel) }}
              </td>
            </tr>
            <tr>
              <td class="text-h6 bg-cyan text-white text-bold" colspan="2">HOTEL</td>
            </tr>
            <tr>
              <td class="text-body2 bg-orange-1" colspan="2">
                <q-icon name="info"></q-icon>
                budget kamar bisa menyesuaikan kebutuhan Anda
              </td>
            </tr>
            <tr>
              <td>Jenis Hotel</td>
              <td class="text-capitalize">{{ hotel }}</td>
            </tr>
            <tr>
              <td>Harga Kamar Hotel (Terendah)</td>
              <td>{{ $currency(getHotelPrice?.minPrice) }}</td>
            </tr>
            <tr>
              <td>Harga Kamar Hotel (Tertinggi)</td>
              <td>{{ $currency(getHotelPrice?.maxPrice) }}</td>
            </tr>
            <tr>
              <td>Jumlah Kamar (Dipesan)</td>
              <td class="text-capitalize">{{ room_qty }}</td>
            </tr>
            <tr>
              <td>Budget Kamar (Dipesan)</td>
              <td>{{ $currency(room_budget) }}</td>
            </tr>
            <tr class="text-bold">
              <td>Subtotal Anggaran Hotel</td>
              <td class="text-h6 text-bold">
                {{ $currency(grandTotalHotel) }}
              </td>
            </tr>

            <tr>
              <td class="text-h6 bg-cyan text-white text-bold" colspan="2">PEMBAYARAN</td>
            </tr>

            <tr class="text-bold">
              <td>Full Payment 100% (Biaya Tour + Kamar Hotel)</td>
              <td class="">
                {{ $currency(grandTotal) }}
              </td>
            </tr>
            <tr class="text-bold">
              <td>Down Payment 30% (Biaya Tour + Kamar Hotel)</td>
              <td>
                <span>{{ $currency(grandTotalDP) }}</span>
              </td>
            </tr>
          </table>
        </q-list>
      </q-card-section>

      <!-- <q-separator></q-separator> -->
    </q-card>

    <q-card class="q-mt-lg" flat bordered>
      <q-card-section class="row q-col-gutter-md">
        <slot name="buttons">
          <!-- <q-btn-group  spread unelevated> -->
          <!-- <q-btn
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
            label="Pesan via WA"
            icon="fa-brands fa-whatsapp"
          />
          <q-separator vertical></q-separator>
          <q-btn
            size="lg"
            no-caps
            @click="$refs.form.onSubmit({ price_id: item?.id })"
            square
            color="primary"
            text-color="white"
            label="Pesan via APP"
            icon="shopping_cart_checkout"
          /> -->
          <!-- </q-btn-group> -->
        </slot>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState, mapWritableState, storeToRefs } from "pinia";

// import { useAddToCartStore } from "src/stores/lagia-stores/tour/AddToCartStore";

import { useTourProductDetailStore } from "src/stores/lagia-stores/tour/TourProductDetailStore";

import FormTourSimulasi from "./FormTourSimulasi";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

import { useInitStore } from "src/stores/lagia-stores/page/InitStore";

export default {
  props: {
    item: null,
    price_css: {
      default: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 row text-white",
    },
    simulasi: {
      default: true,
    },
    date_sticky: {
      default: false,
    },
  },
  emits: ["onBubbleEvent"], // <--- add this line
  components: {
    FormTourSimulasi,
  },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    return {
      optionsFn(date) {
        return date >= formattedString; //'2019/02/03' && date <= '2019/02/15'
      },

      showMultiple,
      expanded: ref(false),
    };
  },
  computed: {
    ...mapState(useInitStore, ["page_hotel_level_price"]),
    ...mapWritableState(useTourProductDetailStore, [
      "date_start",
      "participant_adult",
      "participant_young",
      "description",
      "hotel",
      "dibayar",
      "dibayar_nominal",

      "room_qty",
      "room_budget",

      "name",
      "email",
      "phone",
      "instance",
      "city",
      "address",
    ]),
    grandTotal() {
      return Number(this.grandTotalHotel) + Number(this.getTotalNonHotel);
    },
    grandTotalDP() {
      return (Number(this.grandTotal) * 30) / 100;
    },
    grandTotalHotel() {
      return Number(this.room_qty) * Number(this.room_budget);
    },
    subTotalAnak() {
      return this.participant_young * this.$finalPriceAnak(this.item);
    },
    subTotalDewasa() {
      return this.participant_adult * this.$finalPrice(this.item);
    },
    getAllPerserta() {
      return Number(this.participant_adult) + Number(this.participant_young);
    },
    getHotelPrice() {
      if (this.page_hotel_level_price && this.hotel !== "Pilih Hotel") {
        let temp = {};
        for (let i = 0; i < this.page_hotel_level_price.length; i++) {
          try {
            if (
              this.hotel.toLowerCase() ===
              this.page_hotel_level_price[i]["label"].toLowerCase()
            ) {
              temp = this.page_hotel_level_price[i];
            }
          } catch (e) {}
        }
        return temp;
      }
    },

    getTotalNonHotel() {
      return Number(this.subTotalAnak) + Number(this.subTotalDewasa);
    },
  },
  methods: {
    onSubmit() {
      this.$refs.form.onSubmit({ price_id: this.item?.id });
    },
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

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: 16px;
}

@media only screen and (max-width: 425px) {
  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    font-size: 15px;
  }
}
</style>
