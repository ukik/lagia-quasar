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
    <q-list align="left" class="row">
      <q-item clickable v-ripple class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
        <q-item-section avatar>
          <q-avatar color="orange">
            <q-icon color="white" name="fa fa-phone fa-lg"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Telepon</q-item-label>
          <q-item-label class="text-title text-bold text-orange"
            >000000000000</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
        <q-item-section avatar>
          <q-avatar color="green">
            <q-icon color="white" name="fa-brands fa-whatsapp"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>Whatsapp</q-item-label>
          <q-item-label class="text-title text-bold text-green"
            >000000000000</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
        <q-item-section avatar>
          <q-avatar color="cyan">
            <q-icon color="white" name="message"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>SMS Center</q-item-label>
          <q-item-label class="text-title text-bold text-cyan">000000000000</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
        <q-item-section avatar>
          <q-avatar color="teal">
            <q-icon color="white" name="email"></q-icon>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label caption>SMS Center</q-item-label>
          <q-item-label class="text-title text-bold text-teal">000000000000</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
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
    <q-card-section v-if="about_vendor">
      <q-item-section>
        <q-item-label class="text-h6 text-weight-normal">TENTANG VENDOR</q-item-label>
      </q-item-section>
    </q-card-section>

    <q-separator v-if="about_vendor"></q-separator>

    <VendorInvoice v-if="item_store && about_vendor" :item="item_store"></VendorInvoice>

    <q-separator v-if="about_vendor"></q-separator>

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
            <td class="text-h6 bg-cyan text-white text-bold" colspan="2">CATATAN KHUSUS</td>
          </tr>

          <tr class="">
            <td colspan="2">{{ !description ? 'Tidak Ada' : description }}</td>
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

    <!-- <q-card-section>
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
    </q-card-section> -->

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

    <!-- <q-card-section>
      <q-list bordered separator>
        <q-item-label header>Full Payment 100%</q-item-label>
        <q-item v-if="subTotalDewasa" tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio v-model="dibayar" val="lunas_double_bed" color="cyan" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption> Grandtotal (Peserta Double Bed) </q-item-label>
            <q-item-label class="text-h6">
              {{ $currency(getDoubleBed + getTotalNonHotel) }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="subTotalDewasa" tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio v-model="dibayar" val="lunas_single_bed" color="teal" />
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
        <q-item v-if="subTotalDewasa" tag="label" v-ripple>
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
        <q-item v-if="subTotalDewasa" tag="label" v-ripple>
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
    </q-card-section> -->

    <q-card-section v-if="subTotalDewasa">
      <q-list bordered>
        <q-item tag="label" v-ripple>
          <q-item-section avatar>
            <q-radio v-model="dibayar" val="full_payment" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold text-uppercase">
              Full Payment 100%
            </q-item-label>
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
            <q-item-label class="text-bold text-uppercase">
              Down Payment {{ dibayar_percent }}%</q-item-label
            >
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
            <q-item-label
              class="text-h6"
              :class="[getDPRule ? 'text-dark' : 'text-negative']"
            >
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
            <q-input
              suffix="%"
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

  </q-card>
</template>

<script>
import { date } from "quasar";
import { ref } from "vue";
import { mapState, mapWritableState, storeToRefs } from "pinia";

import { useTourOrderDetailStore } from "stores/lagia-stores/tour/TourOrderDetailStore";

// import FormTourSimulasi from "./FormTourSimulasi";
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
    about_vendor: {
      default: true,
    },
  },
  emits: ["onBubbleEvent"], // <--- add this line
  components: {
    // FormTourSimulasi,
    VendorInvoice,
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
      console.log(val);
      if (val == "dp_payment")
        setTimeout(() => {
          this.$refs?.dibayarPercentRef?.validate();
        }, 300);
    },
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
    dateFormat(val) {
      if (!val) return;
      const timeSplit = val.split("/");

      let newDate = new Date(timeSplit[0], timeSplit[1], timeSplit[2]);
      // const timeStamp = date.extractDate(val, 'DD/MM/YYYY')
      return date.formatDate(newDate, "DD MMMM YYYY");
    },
    onSubmit() {
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
          console.log("minDPRule", val, stat);

          if (!stat) resolve(false); // vm.dibayar_percent = 30;

          resolve(true);
          // resolve(stat || "Minimal down payment (DP 30%) (wajib)");
          // calling reject(...) will also mark the input
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
