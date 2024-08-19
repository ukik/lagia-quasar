<template>
  <q-item-label class="text-center text-h6 text-uppercase">INVOICE TOUR</q-item-label>
  <q-item-label class="text-body text-center q-mb-lg"
    >Periksa kembali data invoice sebelum melakukan pembayaran</q-item-label
  >
  <!-- <q-item-label class="text-caption text-center q-mb-lg"
    >Setelah konfirmasi dilakukan invoice tidak dapat diubah</q-item-label
  > -->

  <!-- <q-card flat bordered>
    <q-card-section>
      <q-item-label class="q-mb-md">
      Terima kasih telah melakukan booking (pemesanan) paket tour di Labiru Tour. Jika ada hal yang ingin ditanyakan atau dikonsultasikan lebih lanjut. Silahkan menghubungi tim Labiru melalui kontak dibawah ini.
    </q-item-label>
    <q-item-label>
      Atau Anda juga bisa langsung melakukan pembayaran melalui channel pembayaran yang sudah kami sediakan. Jika Anda bingung soal pembayaran, silahkan hubungi tim Labiru atau Anda dapat membaca petunjuk cara pembayaran. Terima kasih
    </q-item-label>

    </q-card-section>
  </q-card> -->

  <q-card class="q-mb-lg" flat bordered>
    <q-card-section style="font-family: 'Ubuntu', sans-serif">
      <q-item-label class="q-mb-md">
        Terima kasih telah melakukan booking (pemesanan) paket tour di Labiru Tour. Jika
        ada hal yang ingin ditanyakan atau dikonsultasikan lebih lanjut. Silahkan
        menghubungi tim Labiru melalui kontak dibawah ini.
      </q-item-label>
      <q-item-label class="q-mb-md">
        Atau Anda juga bisa langsung melakukan pembayaran melalui channel pembayaran yang
        sudah kami sediakan. Jika Anda bingung soal pembayaran, silahkan hubungi tim
        Labiru atau Anda dapat membaca petunjuk cara pembayaran. Terima kasih
      </q-item-label>
      <q-item-label>
        Penyesuaian biaya dapat dikonsultasikan dengan tim kami, jangan khawatir kami siap
        membantu Anda mendapatkan layanan terbaik
      </q-item-label>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-actions align="center" class="row">
      <q-item clickable v-ripple class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
        <q-item-section avatar>
          <q-avatar color="orange">
            <q-icon color="white" name="fa fa-phone fa-lg"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Telepon</q-item-label>
          <q-item-label class="text-h6 text-bold text-orange">000000000000</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
        <q-item-section avatar>
          <q-avatar color="green">
            <q-icon color="white" name="fa-brands fa-whatsapp"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Whatsapp</q-item-label>
          <q-item-label class="text-h6 text-bold text-green">000000000000</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
        <q-item-section avatar>
          <q-avatar color="cyan">
            <q-icon color="white" name="message"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>SMS Center</q-item-label>
          <q-item-label class="text-h6 text-bold text-cyan">000000000000</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
        <q-item-section avatar>
          <q-avatar color="teal">
            <q-icon color="white" name="email"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>SMS Center</q-item-label>
          <q-item-label class="text-h6 text-bold text-teal">000000000000</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-actions>
  </q-card>

  <!-- <q-banner bordered rounded class="bg-form text-white q-mb-md">
    <q-card-section class="q-pa-none">
      <q-item-label class="q-mb-md">
        Terima kasih telah melakukan booking (pemesanan) paket tour di Labiru Tour. Jika
        ada hal yang ingin ditanyakan atau dikonsultasikan lebih lanjut. Silahkan
        menghubungi tim Labiru melalui kontak dibawah ini.
      </q-item-label>
      <q-item-label class="q-mb-md">
        Atau Anda juga bisa langsung melakukan pembayaran melalui channel pembayaran yang
        sudah kami sediakan. Jika Anda bingung soal pembayaran, silahkan hubungi tim
        Labiru atau Anda dapat membaca petunjuk cara pembayaran. Terima kasih
      </q-item-label>
      <q-item-label>
        Penyesuaian biaya dapat dikonsultasikan dengan tim kami, jangan khawatir kami siap
        membantu Anda mendapatkan layanan terbaik
      </q-item-label>
    </q-card-section>

    <template v-slot:action>
      <q-btn
        unelevated
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
        icon="fa-brands fa-whatsapp"
     >

     </q-btn>
    </template>
  </q-banner> -->

  <q-card flat bordered>
    <q-card-section>
      <q-item-section>
        <q-item-label class="text-h6 text-weight-normal">TENTANG VENDOR</q-item-label>
      </q-item-section>
    </q-card-section>

    <q-separator></q-separator>

    <VendorInvoice v-if="item_store" :item="item_store"></VendorInvoice>

    <q-separator></q-separator>

    <q-card-section>
      <q-item-section>
        <q-item-label class="text-h6 text-weight-normal">HARGA PRODUK</q-item-label>
      </q-item-section>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-section>
      <q-list>
        <table>
          <tr>
            <td>Label Harga</td>
            <td class="">
              {{ item?.name }}
            </td>
          </tr>
          <tr>
            <td>HPP Dewasa</td>
            <td class="">
              {{ $currency(item?.generalPrice) }}
            </td>
          </tr>
          <tr>
            <td>HPP Anak (2-6 tahun)</td>
            <td class="">
              {{ $currency(item?.generalPriceChild) }}
            </td>
          </tr>
          <tr>
            <td>Diskon</td>
            <td class="">
              {{ $percent(item?.discountPrice) }}
            </td>
          </tr>
          <tr>
            <td>Cashback</td>
            <td class="">
              {{ $currency(item?.cashbackPrice) }}
            </td>
          </tr>
          <tr>
            <td>Deskripsi Harga</td>
            <td class="">
              {{ item?.description }}
            </td>
          </tr>
          <tr class="text-bold">
            <td>Harga Dewasa</td>
            <td class="">
              {{ $currency($finalPrice(item)) }}
            </td>
          </tr>
          <tr class="text-bold">
            <td>Harga Anak (2-6 tahun)</td>
            <td class="">
              {{ $currency($finalPriceAnak(item)) }}
            </td>
          </tr>
        </table>
      </q-list>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-section>
      <q-item-section>
        <q-item-label class="text-h6 text-weight-normal">RINCIAN BIAYA</q-item-label>
      </q-item-section>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-section>
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

    <q-separator></q-separator>

    <q-card-section>
      <q-item-section>
        <q-item-label class="text-h6 text-weight-normal">DETAIL ORDER</q-item-label>
      </q-item-section>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-section>
      <q-list>
        <table>
          <tr>
            <td>Nama Pemesan</td>
            <td class="">
              {{ name }}
            </td>
          </tr>
          <tr>
            <td>Paket</td>
            <td class="">
              {{ item?.name }}
            </td>
          </tr>
          <tr>
            <td>Kategori</td>
            <td class="text-capitalize">
              {{ item_product?.category }}
            </td>
          </tr>
          <tr>
            <td>Durasi</td>
            <td class="text-capitalize">
              {{ item_product?.durasi }}
            </td>
          </tr>
          <tr>
            <td>Hotel</td>
            <td class="text-capitalize">
              {{ hotel }}
            </td>
          </tr>
          <tr>
            <td>Peserta</td>
            <td class="text-capitalize">
              {{ participant_adult }} Dewasa, {{ participant_young }} Anak (2-6 tahun)
            </td>
          </tr>
          <tr>
            <td>Berangkat</td>
            <td class="text-capitalize">
              {{ dateFormat(date_start) }}
            </td>
          </tr>
        </table>
      </q-list>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-section>
      <q-item-section>
        <q-item-label class="text-h6 text-weight-normal"
          >PILIH NOMINAL DIBAYAR</q-item-label
        >
      </q-item-section>
    </q-card-section>

    <q-separator></q-separator>

    <q-card-section>
      <q-list bordered separator>
        <q-item-label header>Full Payment 100%</q-item-label>
        <q-item tag="label" v-ripple>
          <!-- <q-item-section avatar>
            <q-radio v-model="dibayar" val="lunas_double_bed" color="cyan" />
          </q-item-section> -->
          <q-item-section>
            <q-item-label caption> Grandtotal (Peserta Double Bed) </q-item-label>
            <q-item-label class="text-h6">
              {{ $currency(getDoubleBed + getTotalNonHotel) }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item tag="label" v-ripple>
          <!-- <q-item-section avatar>
            <q-radio v-model="dibayar" val="lunas_single_bed" color="teal" />
          </q-item-section> -->
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
            <q-radio v-model="dibayar" val="dp_double_bed" color="orange" />
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
            <q-radio v-model="dibayar" val="dp_single_bed" color="pink" />
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
import { date } from "quasar";
import { ref } from "vue";
import { mapState, mapWritableState, storeToRefs } from "pinia";

import { useTourOrderDetailStore } from "stores/lagia-stores/tour/TourOrderDetailStore";

import FormTourSimulasi from "./FormTourSimulasi";
import VendorInvoice from "./VendorInvoice.vue";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

import { useInitStore } from "src/stores/lagia-stores/page/InitStore";

export default {
  props: {
    item: null,
    item_store: null,
    item_product: null,
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
    VendorInvoice,
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
    ...mapWritableState(useTourOrderDetailStore, [
      "date_start",
      "participant_adult",
      "participant_young",
      "description",
      "hotel",
      "dibayar",

      "name",
      "email",
      "phone",
      "instance",
      "city",
      "address",
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
  methods: {
    dateFormat(val) {
      const timeSplit = val.split("/");

      let newDate = new Date(timeSplit[0], timeSplit[1], timeSplit[2]);
      // const timeStamp = date.extractDate(val, 'DD/MM/YYYY')
      return date.formatDate(newDate, "DD MMMM YYYY");
    },
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
