<template>

    <q-card flat bordered>
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
          <q-item>
            <q-item-section>
              <q-item-label caption>Deskripsi Harga</q-item-label>
              <q-item-label>{{ item?.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <FormTourSimulasiRangkuman :date_sticky="date_sticky" ref="form" :item="item"></FormTourSimulasiRangkuman>
      </q-card-section>

      <q-separator v-if="simulasi"></q-separator>

      <q-card-section v-if="simulasi">
        <q-item-section>
          <q-item-label class="text-h6 text-weight-normal">RINCIAN BIAYA</q-item-label>
        </q-item-section>
      </q-card-section>

      <q-separator v-if="simulasi"></q-separator>

      <q-card-section v-if="simulasi">
        <!-- <q-item-label class="text-h6 q-mb-md text-bold text-dark"
          >DAFTAR HARGA</q-item-label
        > -->
        <!-- <q-list bordered class="q-mx-md q-mb-md">
          <q-item>
            <q-item-section>
              <q-item-label caption>Subtotal Dewasa</q-item-label>
              <q-item-label>{{ $currency(subTotalDewasa) }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>Subtotal Anak (2-6 tahun)</q-item-label>
              <q-item-label >{{ $currency(subTotalAnak) }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>Subtotal Dijumlah (diluar hotel)</q-item-label>
              <q-item-label >{{
                $currency(subTotalAnak + subTotalDewasa)
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list> -->

        <q-list>
          <table>
            <tr>
              <td>Peserta Dewasa</td>
              <td class="text-h6">
                {{ participant_adult }}
              </td>
            </tr>
            <tr>
              <td>Peserta Anak (2-6 tahun)</td>
              <td class="text-h6">
                {{ participant_young }}
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
            <tr>
              <td>Subtotal Biaya Tour (diluar hotel)</td>
              <td class="text-h6">
                {{ $currency(getTotalNonHotel) }}
              </td>
            </tr>
            <tr>
              <td>Jenis Hotel</td>
              <td class="text-capitalize">{{ hotel }}</td>
            </tr>
            <tr>
              <td>Kamar Hotel (Harga Min.)</td>
              <td>{{ $currency(getHotelPrice?.minPrice) }}</td>
            </tr>
            <tr>
              <td>Kamar Hotel (Harga Max.)</td>
              <td>{{ $currency(getHotelPrice?.maxPrice) }}</td>
            </tr>
            <tr>
              <td>Kamar Hotel (Rata-rata)</td>
              <td>{{ $currency(getAVGHotel) }}</td>
            </tr>
            <tr>
              <td>Subtotal Kamar Hotel (Rata-rata) (Peserta Single Bed)</td>
              <td>{{ $currency(getSingleBed) }}</td>
            </tr>
            <tr>
              <td>Subtotal Kamar Hotel (Rata-rata) (Peserta Double Bed)</td>
              <td>{{ $currency(getDoubleBed) }}</td>
            </tr>

            <!-- <tr class="text-bold">
              <td>Grand Total + Hotel Harga Minimal</td>
              <td class="text-positive">
                {{
                  $currency(Number(getTotalNonHotel) + Number(getHotelPrice?.minPrice))
                }}
              </td>
            </tr>
            <tr class="text-bold">
              <td>Grand Total + Hotel Harga Maksimal</td>
              <td class="text-orange">
                {{
                  $currency(Number(getTotalNonHotel) + Number(getHotelPrice?.maxPrice))
                }}
              </td>
            </tr> -->
            <tr class="">
              <td>Grandtotal + Hotel (Peserta Single Bed) (Rata-rata)</td>
              <td class="">
                {{ $currency(getSingleBed + getTotalNonHotel) }}
              </td>
            </tr>
            <tr class="">
              <td>Grandtotal + Hotel (Peserta Double Bed) (Rata-rata)</td>
              <td class="">
                {{ $currency(getDoubleBed + getTotalNonHotel) }}
              </td>
            </tr>
            <tr class="text-bold">
              <td>Down Payment 30% dari Grandtotal (Peserta Double Bed)</td>
              <td>
                <span>{{ $currency(getDPDoubleBed) }}</span>
              </td>
            </tr>
            <tr class="text-bold">
              <td>Down Payment 30% dari Grandtotal (Peserta Single Bed)</td>
              <td>
                <span>{{ $currency(getDPSingleBed) }}</span>
              </td>
            </tr>
          </table>
        </q-list>
      </q-card-section>

      <!-- <q-separator></q-separator> -->

      <q-card-section v-if="false" class="row q-col-gutter-md">
        <slot name="buttons">
          <!-- <q-btn-group  spread unelevated> -->
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
            />
          <!-- </q-btn-group> -->
        </slot>
      </q-card-section>
    </q-card>

</template>

<script>
import { ref } from "vue";
import { mapState, mapWritableState, storeToRefs } from "pinia";

import { useTourOrderDetailStore } from "stores/lagia-stores/tour/TourOrderDetailStore";

import FormTourSimulasiRangkuman from "./FormTourSimulasiRangkuman";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

import { useInitStore } from "src/stores/lagia-stores/page/InitStore";

export default {
  props: {
    item: null,
    price_css: {
      default: "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 row text-white",
    },
    simulasi: {
      default: true
    },
    date_sticky: {
      default: false
    }
  },
  emits: ["onBubbleEvent"], // <--- add this line
  components: {
    FormTourSimulasiRangkuman,
  },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    const store = useTourOrderDetailStore();
    const {
      prompt,
      quantity,
      date_start,
      participant_young,
      participant_adult,
      hotel,
    } = storeToRefs(store); // have all reactive states here
    const { onAdd, onRemove, onAddToCart } = store;

    return {
      onAddToCart,
      onAdd,
      onRemove,
      prompt,
      quantity,
      date_start,
      participant_young,
      participant_adult,
      hotel,

      optionsFn(date) {
        return date >= formattedString; //'2019/02/03' && date <= '2019/02/15'
      },

      showMultiple,
      expanded: ref(false),
    };
  },
  computed: {
    ...mapState(useInitStore, ["page_hotel_level_price"]),
    ...mapWritableState(useTourOrderDetailStore, [
      "participant_young",
      "participant_adult",
      "hotel",
    ]),
    subTotalAnak() {
      return this.participant_young * this.$finalPriceAnak(this.item);
    },
    subTotalDewasa() {
      return this.participant_adult * this.$finalPrice(this.item);
    },
    getAVGHotel() {
      return (Number(this.getHotelPrice?.maxPrice) + Number(this.getHotelPrice?.minPrice))/2
    },
    getAllPerserta() {
      return Number(this.participant_adult)+Number(this.participant_young)
    },
    getDoubleBed() {
      const bagi =  this.getAllPerserta / 2;
      const sisa = this.getAllPerserta % 2

      return (this.getAVGHotel * (bagi + sisa))
    },
    getSingleBed() {
      const all =  this.getAllPerserta

      return (this.getAVGHotel * all)
    },
    getDPSingleBed() {
      const cal = (this.getSingleBed + this.getTotalNonHotel)
      return (cal * 30) / 100;
    },
    getDPDoubleBed() {
      const cal = (this.getDoubleBed + this.getTotalNonHotel)
      return (cal * 30) / 100;
    },
    // getSelectedTourPrice: state => {
    //   if (state.selected.length > 0) return state.selected[0]?.tourPrice
    //   return []
    // },
    // subTotalAnak: state => {
    //   if (state.selected.length <= 0) return 0
    //   return state.participant_young * finalPriceAnak(state.selected[0]?.tourPrice);
    // },
    // subTotalDewasa: state => {
    //   if (state.selected.length <= 0) return 0
    //   return state.participant_adult * finalPrice(state.selected[0]?.tourPrice);
    // },
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
    getGrandAvg() {
      return (
        Number(this.subTotalAnak) +
        Number(this.subTotalDewasa) +
        (Number(this.getHotelPrice?.minPrice) + Number(this.getHotelPrice?.maxPrice)) / 2
      );
    },
    getDPAvg() {
      return this.getGrandAvg - (this.getGrandAvg * 30) / 100;
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
</style>
