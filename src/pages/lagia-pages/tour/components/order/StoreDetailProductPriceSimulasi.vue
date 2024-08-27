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
              <td>Harga Kamar Hotel (Rata-rata)</td>
              <td>{{ $currency(getHotelAVG) }}</td>
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

      <q-separator v-if="subTotalDewasa"></q-separator>

      <q-card-section class="bg-grey-1" v-if="subTotalDewasa">
        <q-item-section>
          <q-item-label class="text-h6 text-weight-normal"
            >PILIH NOMINAL DIBAYAR</q-item-label
          >
        </q-item-section>
      </q-card-section>

      <q-separator v-if="subTotalDewasa"></q-separator>

      <q-card-section v-if="subTotalDewasa">

        <q-list bordered >

          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="full_payment" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold text-uppercase"> Full Payment 100% </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="dibayar == 'full_payment'">
            <q-item-section avatar>
              <!-- <q-avatar icon="done" /> -->
            </q-item-section>
            <q-item-section>
              <q-item-label header class="q-pa-none">
                Full Payment 100% (Biaya Tour & Kamar Hotel)
              </q-item-label>
              <q-item-label class="text-h6">
                {{ $currency(grandTotal) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="dp_payment" color="pink" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold text-uppercase"> Down Payment {{ dibayar_percent }}%</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="dibayar == 'dp_payment'">
            <q-item-section avatar>
              <!-- <q-avatar icon="done" /> -->
            </q-item-section>
            <q-item-section>
              <q-item-label header class="q-pa-none">
                Down Payment {{ dibayar_percent }}% (Biaya Tour & Kamar Hotel)
              </q-item-label>
              <q-item-label class="text-h6" :class="[ getDPRule ? 'text-dark' : 'text-negative']">
                {{ $currency(grandTotalDP) }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="dibayar == 'dp_payment'">
            <q-item-section avatar>
              <!-- <q-avatar icon="done" /> -->
            </q-item-section>
            <q-item-section>
              Minimal down payment (DP 30%)
              <q-input suffix="%"
              debounce="100"
                clearable
                @clear="dibayar_percent = 30"
                dense
                type="number"
                max="100"
                min="30"
                bg-color="white"
                outlined
                color="primary"
                ref="dibayarPercentRef"
                v-model="dibayar_percent"
                placeholder="0"
                hint="Minimal down payment (DP 30%) (wajib)"
                error-message="Minimal down payment (DP 30%) (wajib)"

                :rules="[minDPRule, (val) => !!val || '']"
              >
                <template v-slot:prepend>
                  <!-- <q-icon name="fa-regular fa-credit-card" /> -->
                </template>
              </q-input>
            </q-item-section>
          </q-item>

          <!-- <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="full_payment" color="cyan" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption> Full Payment 100% (Biaya Tour + Kamar Hotel) </q-item-label>
              <q-item-label class="text-h6">
                {{ $currency(grandTotal) }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator></q-separator>
          <q-item-label header>Down Payment 30% </q-item-label>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="dibayar" val="dp_payment" color="orange" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption> Down Payment 30% (Biaya Tour + Kamar Hotel) </q-item-label>
              <q-item-label class="text-h6">
                {{ $currency(grandTotalDP) }}
              </q-item-label>
            </q-item-section>
          </q-item> -->
        </q-list>

        <q-banner rounded class="bg-teal text-white q-mt-md">
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

      </q-card-section>

      <!-- <q-separator></q-separator> -->
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState, mapWritableState, storeToRefs } from "pinia";

// import { useAddToCartStore } from "src/stores/lagia-stores/tour/AddToCartStore";

import { useTourOrderDetailStore } from "src/stores/lagia-stores/tour/TourOrderDetailStore";

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
  mounted() {
    this.$refs?.dibayarPercentRef?.validate();
  },
  watch: {
    dibayar(val) {
      console.log(val)
      if(val == 'dp_payment') setTimeout(() => {
        this.$refs?.dibayarPercentRef?.validate();
      }, 300);
    },
    dibayar_percent(val) {
      // console.log(1111)
      // if(val <= 100 && val >= 30) {
      //   // this.dibayar_percent = 100
      //   this.$refs?.dibayarPercentRef?.resetValidation();
      //   return
      // } else if(val > 100) {
      //   this.dibayar_percent = 100
      //   this.$refs?.dibayarPercentRef?.resetValidation();
      //   return
      // } else if(val < 30) {
      //   this.dibayar_percent = 30
      //   this.$refs?.dibayarPercentRef?.resetValidation();
      //   return
      // }
      // this.$refs?.dibayarPercentRef?.validate();
      // console.log(this.$refs?.dibayarPercentRef?.hasError)
    }
  },
  computed: {
    ...mapState(useInitStore, ["page_hotel_level_price"]),
    ...mapWritableState(useTourOrderDetailStore, [
      "date_start",
      "participant_adult",
      "participant_young",
      "description",
      "hotel",
      "dibayar",
      "dibayar_percent",

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
      return (Number(this.grandTotal) * Number(this.dibayar_percent)) / 100;
    },
    grandTotalHotel() {
      return Number(this.room_qty) * Number(this.room_budget);
    },
    getHotelAVG() {
      return (
        (Number(this.getHotelPrice?.maxPrice) + Number(this.getHotelPrice?.minPrice)) / 2
      );
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
    getDPRule() {
      return Number(this.dibayar_percent) >= 30 &&  Number(this.dibayar_percent) <= 100
    }
  },
  methods: {
    onSubmit() {
      if(this.dibayar == 'dp_payment') {
        this.$refs?.dibayarPercentRef?.validate();
        if (this.$refs?.dibayarPercentRef?.hasError) {
          return this.$NotifyAlert("Down Payment (30% sd 100%) (wajib)")
        }
      }


      this.$refs.form.onSubmit({ price_id: this.item?.id });
    },
    minDPRule(val) {

      const vm = this;

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // call
          //  resolve(true)
          //     --> content is valid
          //  resolve(false)
          //     --> content is NOT valid, no error message
          //  resolve(error_message)
          //     --> content is NOT valid, we have error message
          const stat = val >= 30 && val <= 100;
          console.log('minDPRule', val, stat)

          if (!stat) resolve(false) // vm.dibayar_percent = 30;

          resolve(true)
          // resolve(stat || "Minimal down payment (DP 30%) (wajib)");

          // calling reject(...) will also mark the input
          // as having an error, but there will not be any
          // error message displayed below the input
          // (only in browser console)
        }, 0);
      });
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
