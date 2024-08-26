<template>
  <div>
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
        <FormTourSimulasi
          :date_sticky="date_sticky"
          ref="form"
          :item="item"
        ></FormTourSimulasi>
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
            <tr class="text-bold">
              <td>Grandtotal Biaya Tour + Kamar Hotel (Peserta Single Bed)</td>
              <td class="">
                {{ $currency(getSingleBed + getTotalNonHotel) }}
              </td>
            </tr>
            <tr class="text-bold">
              <td>Grandtotal Biaya Tour + Kamar Hotel (Peserta Double Bed)</td>
              <td class="">
                {{ $currency(getDoubleBed + getTotalNonHotel) }}
              </td>
            </tr>

            <tr class="text-bold">
              <td>Down Payment 30% dari Grandtotal (Peserta Single Bed)</td>
              <td>
                <span>{{ $currency(getDPSingleBed) }}</span>
              </td>
            </tr>
            <tr class="text-bold">
              <td>Down Payment 30% dari Grandtotal (Peserta Double Bed)</td>
              <td>
                <span>{{ $currency(getDPDoubleBed) }}</span>
              </td>
            </tr>
          </table>
        </q-list>
      </q-card-section>

      <q-separator v-if="getFormCheck && prop_dibayar"></q-separator>

      <q-card-section v-if="getFormCheck && prop_dibayar">
        <q-item-section>
          <q-item-label class="text-h6 text-weight-normal"
            >PILIH NOMINAL DIBAYAR</q-item-label
          >
        </q-item-section>
      </q-card-section>

      <q-separator v-if="getFormCheck && prop_dibayar"></q-separator>

      <!-- <q-card-section v-if="prop_dibayar">
        <q-list bordered separator>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="lunas_double_bed" color="cyan" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Full Payment 100% dari Grandtotal (Peserta Double Bed)
              </q-item-label>
              <q-item-label class="text-h6">
                {{ $currency(getDoubleBed + getTotalNonHotel) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="lunas_single_bed" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Full Payment 100% dari Grandtotal (Peserta Single Bed)
              </q-item-label>
              <q-item-label class="text-h6">
                {{ $currency(getSingleBed + getTotalNonHotel) }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="dp_double_bed" color="orange" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Down Payment 30% dari Grandtotal (Peserta Double Bed)
              </q-item-label>
              <q-item-label class="text-h6">
                {{ $currency(getDPDoubleBed) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="dp_single_bed" color="pink" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Down Payment 30% dari Grandtotal (Peserta Single Bed)
              </q-item-label>
              <q-item-label class="text-h6">
                {{ $currency(getDPSingleBed) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section> -->

      <q-card-section v-if="subTotalDewasa">
        <q-banner rounded class="bg-teal text-white q-mb-md">
          <div class="q-mb-lg">
            Penyesuaian biaya dapat dikonsultasikan dengan tim kami, jangan khawatir kami
            siap membantu Anda mendapatkan layanan terbaik
          </div>
          <template v-slot:action>
            <q-btn
              unelevated
              outline
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
              label="Tanya Admin"
              icon="fa-brands fa-whatsapp"
            />
          </template>
        </q-banner>

        <q-list v-if="subTotalDewasa" bordered separator>
          <q-item-label header>Full Payment 100%</q-item-label>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="get_full_payment_single_bed" color="cyan" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption> Grandtotal (Peserta Double Bed) </q-item-label>
              <q-item-label class="text-h6">
                {{ $currency(getDoubleBed + getTotalNonHotel) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="get_full_payment_double_bed" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption> Grandtotal (Peserta Single Bed) </q-item-label>
              <q-item-label class="text-h6">
                {{ $currency(getSingleBed + getTotalNonHotel) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item-label header>Down Payment 30% </q-item-label>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="get_dp_payment_single_bed" color="orange" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption> Grandtotal (Peserta Double Bed) </q-item-label>
              <q-item-label class="text-h6">
                {{ $currency(getDPDoubleBed) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="get_dp_payment_double_bed" color="pink" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption> Grandtotal (Peserta Single Bed) </q-item-label>
              <q-item-label class="text-h6">
                {{ $currency(getDPSingleBed) }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- <q-separator></q-separator> -->
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState, mapWritableState, storeToRefs } from "pinia";

import { useTourOrderDetailStore } from "stores/lagia-stores/tour/TourOrderDetailStore";

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
    prop_dibayar: null,
  },
  emits: ["onBubbleEvent"], // <--- add this line
  components: {
    FormTourSimulasi,
  },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    const store = useTourOrderDetailStore();
    // const {
    //   prompt,
    //   quantity,
    //   date_start,
    //   participant_young,
    //   participant_adult,
    //   hotel,
    // } = storeToRefs(store); // have all reactive states here
    const {
      // onAdd, onRemove,
      onAddToCart,
    } = store;

    return {
      onAddToCart,
      // onAdd,
      // onRemove,
      // prompt,
      // quantity,
      // date_start,
      // participant_young,
      // participant_adult,
      // hotel,

      optionsFn(date) {
        return date >= formattedString; //'2019/02/03' && date <= '2019/02/15'
      },

      showMultiple,
      expanded: ref(false),
    };
  },
  computed: {
    ...mapState(useInitStore, ["page_hotel_level_price"]),
    ...mapState(useTourOrderDetailStore, ['getFormCheck']),
    ...mapWritableState(useTourOrderDetailStore, [
      "quantity",
      "date_start",
      "participant_young",
      "participant_adult",
      "hotel",
      "dibayar",
      "dibayar_nominal",
    ]),
    subTotalAnak() {
      return this.participant_young * this.$finalPriceAnak(this.item);
    },
    subTotalDewasa() {
      return this.participant_adult * this.$finalPrice(this.item);
    },
    getAVGHotel() {
      return (
        (Number(this.getHotelPrice?.maxPrice) + Number(this.getHotelPrice?.minPrice)) / 2
      );
    },
    getAllPerserta() {
      return Number(this.participant_adult) + Number(this.participant_young);
    },
    getDoubleBed() {
      const bagi = this.getAllPerserta / 2;
      const sisa = this.getAllPerserta % 2;

      return this.getAVGHotel * (bagi + sisa);
    },
    getSingleBed() {
      const all = this.getAllPerserta;

      return this.getAVGHotel * all;
    },
    getDPSingleBed() {
      const cal = this.getSingleBed + this.getTotalNonHotel;
      return (cal * 30) / 100;
    },
    getDPDoubleBed() {
      const cal = this.getDoubleBed + this.getTotalNonHotel;
      return (cal * 30) / 100;
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
  watch: {
    // dibayar(val) {
    //   switch (val) {
    //     case "lunas_double_bed":
    //       this.dibayar_nominal = this.getDoubleBed + this.getTotalNonHotel;
    //       break;
    //     case "lunas_single_bed":
    //       this.dibayar_nominal = this.getSingleBed + this.getTotalNonHotel;
    //       break;
    //     case "dp_double_bed":
    //       this.dibayar_nominal = this.getDPDoubleBed;
    //       break;
    //     case "dp_single_bed":
    //       this.dibayar_nominal = this.getDPSingleBed;
    //       break;
    //   }
    // },
  },
  methods: {
    notify(message) {
      this.$q.notify({
        color: "negative",
        message: message,
        position: "top",
      });
    },
    onSubmit() {
      if (!this.dibayar) this.notify("Pilih Nominal Dibayar (wajib)");
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
