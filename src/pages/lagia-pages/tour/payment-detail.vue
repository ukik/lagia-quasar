<template>
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <!-- ***Inner Banner html end here*** -->
  <div id="product-detail" class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div v-if="!record && loading" class="col-12 text-center">
        <q-spinner color="primary" size="3em" />
      </div>

      <div class="col-12">
        <q-card flat bordered>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="tagihan" label="TAGIHAN" />
            <q-tab name="invoice" label="INVOICE" />
            <q-tab name="product" label="PRODUK" />
            <q-tab name="kebijakan" label="KEBIJAKAN" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="tagihan">
              <q-list>
                <table>
                  <tr>
                    <td>Nama Pemesan</td>
                    <td class="">
                      {{ record?.firstName }}
                    </td>
                  </tr>
                  <tr>
                    <td>Paket</td>
                    <td class="">
                      {{ record?.tourBookingItem?.name }}
                    </td>
                  </tr>
                  <tr>
                    <td>Kategori</td>
                    <td class="text-capitalize">
                      {{ record?.tourProduct?.category }}
                    </td>
                  </tr>
                  <tr>
                    <td>Durasi</td>
                    <td class="text-capitalize">
                      {{ record?.tourProduct?.durasi }}
                    </td>
                  </tr>
                  <tr>
                    <td>Hotel</td>
                    <td class="text-capitalize">
                      {{ record?.tourBookingItem?.hotel }}
                    </td>
                  </tr>
                  <tr>
                    <td>Peserta</td>
                    <td class="text-capitalize">
                      {{ record?.tourBookingItem?.participantAdult }} Dewasa,
                      {{ record?.tourBookingItem?.participantYoung }} Anak (2-6 tahun)
                    </td>
                  </tr>
                  <tr>
                    <td>Berangkat</td>
                    <td class="text-capitalize">
                      <!-- {{ dateFormat(record?.tourBookingItem?.dateStart) }} -->
                    </td>
                  </tr>
                </table>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="invoice">
              <!-- <div class="text-h6">Alarms</div> -->
              <StoreInvoice
                :about_vendor="false"
                :item_product="{
                  category: record?.category,
                  durasi: record?.durasi,
                  level: record?.level,
                  province: record?.province,
                  city: record?.city,
                  country: record?.country,
                }"
                :item="record"
                :item_store="record?.tourStore"
              />
            </q-tab-panel>

            <q-tab-panel name="product">
              <div v-if="record?.tourStore" class="col-12">
                <PriceReferenceStore :item="record?.tourStore"></PriceReferenceStore>
              </div>
              <StoreDetailProductContent
                class="q-mt-lg"
                :record="record?.tourProduct"
              ></StoreDetailProductContent>
            </q-tab-panel>

            <q-tab-panel name="kebijakan">
              <!-- <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. -->
              <div style="height: auto; overflow-x: hidden; overflow-y: scrollX">
                <h3><strong>HARGA</strong></h3>
                <ol>
                  <li>
                    Harga yang kami tawarkan adalah dalam bentuk Rupiah (IDR) dan hanya
                    berlaku bagi wisatawan domestik (WNI) dan pemegang KIMS/KITAS.
                  </li>
                  <li>
                    Harga yang tertulis adalah harga net, per orang (kecuali harga
                    family).
                  </li>
                  <li>
                    Untuk harga kamar ditetapkan berdasarkan pemakaian satu kamar untuk 2
                    (dua) orang atau twin sharing kecuali ada permintaan lain.
                  </li>
                  <li>
                    Harga Paket sudah termasuk dengan yang tertera di bawah paket. Mohon
                    pahami apa yang termasuk dan tidak termasuk dalam paket yang Anda
                    pesan.
                  </li>
                  <li>
                    Harga yang tertera adalah harga untuk PRIVATE TOUR (tidak digabung
                    dengan peserta lain) kecuali paket ‘open trip’.
                  </li>
                  <li>
                    Harga masih bisa berubah sewaktu-waktu sebelum adanya uang muka (DP)
                  </li>
                  <li>
                    Harga yang tercantum berlaku hingga <u>Desember 2017</u> dan pada
                    periode low season
                  </li>
                  <li>
                    Biaya tambahan akan dikenakan untuk periode liburan, lebaran, natal,
                    dan tahun baru serta makan malam wajib di hotel.
                  </li>
                </ol>

                <hr />

                <h3><strong>CARA PEMESANAN</strong></h3>
                <ol>
                  <li>
                    Pemesanan / Pertanyaan / Konsultasi dapat melalui kontak berikut :
                    <ul>
                      <li>
                        <strong>Telepon</strong>:&nbsp;
                        <a href="tel:+62274881812">0274-881812</a>
                      </li>
                      <li>
                        <strong>Whatsapp/SMS</strong>:
                        <a href="https://wa.me/6282314057888">0823-1405-7888</a>
                      </li>
                      <li>
                        <strong>Email</strong>:
                        <a href="mailto:cs@labirutour.com">cs@labirutour.com</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Atau [isi kolom order] yang ada dibawah penawaran paket yang tertera
                    di website ini, Dengan melengkapi data-data yang diperlukan seperti :
                    <ol>
                      <li>Nama Pemesan</li>
                      <li>Nomor HP pemesan</li>
                      <li>Jumlah peserta</li>
                      <li>Periode / Tanggal kegiatan</li>
                      <li>
                        Jadwal Kedatangan dan Kepulangan seperti nomor penerbangan atau
                        sejenisnya
                      </li>
                      <li>Paket Wisata yang dikehendaki atau rekues destinasi wisata</li>
                      <li>Hotel tempat menginap</li>
                    </ol>
                  </li>
                  <li>
                    Pemesanan hotel sudah termasuk sarapan pagi untuk 2 orang, jika lebih
                    akan di kenakan extra bed dengan tambahan biaya.
                  </li>
                  <li>
                    Setelah menerima konfirmasi pemesanan dari Tim Labiru Tour, pemesan
                    melakukan pembayaran sesuai metode yang telah ditentukan.
                  </li>
                  <li>
                    Pemesanan paket wisata yang bersifat mendadak (last minute) diwajibkan
                    untuk melakukan pembayaran penuh sebelum kedatangan.
                  </li>
                </ol>

                <hr />

                <h3><strong>METODE PEMBAYARAN</strong></h3>
                <ol>
                  <li>
                    Deposit sebesar 30% dari total biaya untuk setiap reservasi/pemesanan
                  </li>
                  <li>
                    Pembayaran deposit 30% dilakukan setelah reservasi anda dikonfirmasi
                    oleh team kami bahwa pelayanan yang anda pesan tersedia. Kami tidak
                    akan meminta deposit dalam bentuk apapun bilamana pemesanan anda belum
                    dikonfirmasi.
                  </li>
                  <li>
                    Sisa pembayaran setelah pembayaran deposit dapat dilakukan paling
                    lambat 1 (satu) minggu sebelum keberangkatan.
                  </li>
                  <li>
                    Pembayaran dapat dilakukan melalui nomor rekening berikut :
                    <ul>
                      <li><strong>Mandiri: </strong>900.001.092.9348</li>
                      <li><strong>BCA: </strong>651.024.6339</li>
                      <li><strong>a/n: </strong>Marczumi Rumambay</li>
                    </ul>
                    dan bukti transfer / pembayaran di email ke
                    <a href="mailto:admin@labirutour.com">admin@labirutour.com</a>
                  </li>
                  <li>
                    Apabila bukti pembayaran melalui transfer bank belum kami terima, baik
                    melalui email, whatsapp atau media lainnya, maka dianggap belum
                    melakukan pembayaran.
                  </li>
                  <li>
                    Kami tidak bertanggung jawab dengan adanya pajak / jasa pengiriman
                    pembayaran ke rekening kami.
                  </li>
                </ol>

                <hr />

                <h3><strong>PEMBATALAN &amp; PERUBAHAN JADWAL</strong></h3>
                <ol>
                  <li>
                    Biaya pembatalan dikenakan dengan ketentuan sebagai berikut:
                    <ul>
                      <li>
                        25% dari total harga apabila pembatalan dilakukan 30 hari – 15
                        hari sebelum tanggal keberangkatan
                      </li>
                      <li>
                        50% dari total harga apabila pembatalan dilakukan 14 hari – 8 hari
                        sebelum tanggal keberangkatan
                      </li>
                      <li>
                        75% dari total harga apabila pembatalan dilakukan 7 hari – 4 hari
                        sebelum keberangkatan
                      </li>
                      <li>
                        100% dari total harga apabila pembatalan dilakukan 3 hari sebelum
                        keberangkatan.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Jika terjadi pembatalan perorangan atau pengurangan peserta, maka
                    tagihan tetap sesuai dengan pemesanan awal atau setelah melakukan
                    pembayaran deposit atau uang muka.
                  </li>
                  <li>
                    Penggantian tanggal atau perubahan jadwal akan di sesuaikan dengan
                    kondisi available hotel, transport dan/atau yang lainnya. Penggantian
                    tanggal atau perubahan jadwal dapat di lakukan minimal 14 hari sebelum
                    kedatangan.
                  </li>
                </ol>

                <hr />

                <h3><strong>PENGEMBALIAN (<em>REFUND</em>)</strong></h3>
                <ol>
                  <li>
                    Tidak ada pengembalian (<em>refund</em>) dan pengurangan biaya jika
                    obyek wisata/makan/hotel dibatalkan bukan karena pihak Labiru Tour
                    &amp; Travel, melainkan oleh pihak peserta atau dikarenakan force
                    majeure atau kejadian di luar dugaan.
                  </li>
                  <li>
                    Pengembalian (<em>refund</em>) tidak berlaku untuk pembatalan
                    perorangan atau pengurangan peserta setelah terjadi kesepakatan atau
                    pembayaran DP.
                  </li>
                  <li>
                    Jika ada pengembalian biaya karena adanya pembatalan pemesanan paket
                    wisata, maka proses pengembalian dana (refund) berlangsung selama 14
                    hari kerja.
                  </li>
                </ol>

                <hr />

                <h3><strong>KATEGORI ANAK-ANAK</strong></h3>
                Kategori anak-anak adalah rentang usia 2 – 6 tahun, dengan ketentuan harga
                berikut
                <ul>
                  <li>Sekamar dengan orang tua (1 dewasa + 1 anak) dihitung 100%</li>
                  <li>
                    Sekamar dengan orang tua (2 dewasa + 1 anak) tambah extrabed dihitung
                    75%
                  </li>
                  <li>
                    Sekamar dengan orang tua (2 dewasa + 1 anak) tanpa extrabed dihitung
                    50%
                  </li>
                  <li>
                    Maksimal 1 anak sekamar dengan orang tua dengan penambahan 1 extrabed
                  </li>
                  <li>Bayi / infant (0 – 24 bulan) tidak dikenakan biaya</li>
                </ul>

                <hr />

                <h3><strong>LAIN-LAIN</strong></h3>
                <ol>
                  <li>
                    Konfirmasi sangat tergantung dari tersedianya tempat, terutama untuk
                    akomodasi/hotel. Kami akan berusaha sebaik-baiknya untuk mencarikan
                    hotel yang setara apabila hotel yang diminta dalam keadaan penuh.
                    Labiru Tour akan mengirim konfirmasi mengenai permintaan anda melalui
                    email atau whatsapp setelah semua syarat dan kondisi pemesanan
                    dipenuhi.
                  </li>
                  <li>
                    Jadwal yang tertera dalam paket dapat berubah sewaktu-waktu sesuai
                    kondisi dilapangan.
                  </li>
                  <li>
                    Labiru Tour &amp; Travel bertindak sebagai perantara antara tamu dan
                    perusahaan transportasi atau hotel dan tidak bertanggung jawab jika
                    terjadi pembatalan (delay), kehilangan bagasi, kecelakaan, bencana
                    alam serta segala sesuatu yang diluar dugaan.
                  </li>
                  <li>
                    Wisatawan juga disarankan untuk memberikan tip untuk bellboy hotel,
                    supir, dan guide. Besaran tip bersifat sukarela, pemimpin group (tour
                    leader) akan menyarankan wisatawan untuk hal ini.
                  </li>
                  <li>
                    Tambahan syarat dan ketentuan berlaku untuk pemesanan paket wisata dan
                    layanan wisata lainnya yang akan diinformasikan kepada Anda. Jika Anda
                    tidak setuju untuk mematuhi persyaratan dan kondisi lain termasuk
                    syarat dan ketentuan tambahan yang berlaku dalam kaitannya dengan
                    paket wisata dan jasa wisata lainnya , maka kami berhak membatalkan
                    pemesanan Anda.
                  </li>
                </ol>

                <hr />

                <h3><strong>SANGKALAN atau DISCLAIMER</strong></h3>
                LABIRU TOUR tidak bertanggung jawab dan tidak bisa di tuntut atas:
                <ol>
                  <li>
                    Kerusakan, kehilangan dan keterlambatan bagasi oleh maskapai
                    penerbangan, hotel dan alat angkutan lainnya.
                  </li>
                  <li>
                    Untuk keterlambatan bagasi dari pesawat yang dipergunakan, setiap
                    peserta wajib mengambil bagasinya sendiri di airport manapun juga.
                  </li>
                  <li>
                    Keterlambatan sebuah pesawat, di-\'cancel\'nya sebuah pesawat dan
                    seluruh kejadian yang terjadi di luar agenda paket wisata kami.
                  </li>
                  <li>
                    Perubahan acara perjalanan akibat dari bencana alam, kerusuhan dan
                    lain sebagainya yang bersifat \'Force Majeur\'.
                  </li>
                  <li>
                    Meninggalnya seorang peserta akibat sakit yang diderita, kecelakaan,
                    dll.
                  </li>
                  <li>
                    Kami hanya menyediakan jasa pelayanan dan tidak bertanggungjawab atas
                    pembatalan pesawat, kematian, kecelakaan, kehilangan barang bawaan
                    atau barang pribadi (Kamera, tas, perhiasan, dll ) pada waktu di hotel
                    atau di luar jadwal wisata kami
                  </li>
                  <li>Kehilangan peralatan wisata karena kelalaian peserta.</li>
                </ol>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
// import StepperOrderAccordion from "./components/order/StepperOrderAccordion.vue";
// import StepperOrder from "./components/order/StepperOrder.vue";

// import FormInformasi from "./components/order/FormInformasi.vue";

// import FormLogin from "./components/order/FormLogin.vue";
// import FormRegister from "./components/order/FormRegister.vue";

import StoreDetailProductContent from "./components/order/StoreDetailProductContent.vue";
import PriceReferenceStore from "./components/order/PriceReferenceStore";
// import StoreDetailProductPriceSimulasi from "./components/order/StoreDetailProductPriceSimulasi";
// // import StoreDetailProductPriceSimulasiRangkuman from "./components/order/StoreDetailProductPriceSimulasiRangkuman";
// import FormBookingCustomerData from "./components/order/FormBookingCustomerData";
import StoreInvoice from "./components/payment/StoreInvoice";

// SOLUSI SSR via SETUP

import { useTourBookingPaymentStore } from "stores/lagia-stores/tour/TourBookingPaymentStore";
import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

import { mapWritableState, storeToRefs, mapState } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

// import { useRoute } from "vue-router";
// const route = useRoute();

defineOptions({
  // preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
  //   console.log('running preFetch XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  //   return useTourBookingPaymentStore(store).onFetch(currentRoute?.params?.slug);
  // }
  preFetch: preFetch(
    ({
      store,
      currentRoute,
      previousRoute,
      redirect,
      ssrContext,
      urlPath,
      publicPath,
    }) => {
      console.log("running preFetch XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
      return useTourBookingPaymentStore(store).onFetch(currentRoute?.params?.slug);
    }
  ),
});

const $auth = useAuthStore();
const { auth } = storeToRefs($auth);

const $store = useTourBookingPaymentStore();
const {
  dataType,
  record,
  isMaintenance,

  loading,
} = storeToRefs($store); // have all reactive states here
</script>

<script>
import { date } from "quasar";
import { mapWritableState } from "pinia";

import { useTourBookingPaymentStore } from "stores/lagia-stores/tour/TourBookingPaymentStore";

export default {
  // props: ["scrollY"],
  data() {
    return {
      product_price: true,
      stickyPrice: null,

      step: 1,

      tab: "tagihan",
    };
  },
  computed: {
    ...mapState(useTourBookingPaymentStore, ["getFormCheck"]),
    ...mapWritableState(useTourBookingPaymentStore, [
      // "date_start",
      // "participant_adult",
      // "participant_young",
      // "description",
      // "hotel",
      // "dibayar",
      // "dibayar_percent",

      // "room_qty",
      // "room_budget",

      // "name",
      // "email",
      // "phone",
      // "instance",
      // "city",
      // "address",

      "record",

      "loading",
    ]),
    to_watch() {
      return {
        date_start: this.date_start,
        participant_adult: this.participant_adult,
        participant_young: this.participant_young,
        description: this.description,
        hotel: this.hotel,
        dibayar: this.dibayar,
        dibayar_percent: this.dibayar_percent,

        room_qty: this.room_qty,
        room_budget: this.room_budget,

        name: this.name,
        email: this.email,
        phone: this.phone,
        instance: this.instance,
        city: this.city,
        address: this.address,
      };
    },
  },
  // watch: {
  //   to_watch() {
  //     this.setCookies();
  //   },
  //   step() {
  //     this.onScrollUp("#product-detail");
  //   }
  // },
  mounted() {
    return;
    const vm = this;
    const cookies_name =
      "TOUR-" + this.$route.params?.slug + "-" + this.$route.params?.slug_text; //window.location.href

    if (!this.$q.cookies.has(cookies_name)) return;
    vm.getCookies(cookies_name);
    return;

    this.$q.notify({
      message: "Load Data Formulir?",
      color: "primary",
      position: "bottom",
      actions: [
        {
          label: "Ya",
          color: "white",
          handler: () => {
            vm.getCookies(cookies_name);
          },
        },
        {
          label: "Tidak",
          color: "white",
          handler: () => {
            /* ... */
          },
        },
      ],
    });
  },
  // watch: {
  //   step(val) {
  //   }
  // },
  methods: {
    onScrollUp(el) {
      setTimeout(() => {
        // VERSION 1
        // document.querySelector(el).scrollIntoView({
        //   behavior: 'smooth'
        // });

        const ANCHOR = document.querySelector(el);
        if (!ANCHOR) return;
        console.log("ANCHOR");
        this.$scrollToElement(ANCHOR);
      }, 500);
    },
    getCookies(cookies_name) {
      const cookies = this.$q.cookies.get(cookies_name);
      console.log("getDateDiff", this.getDateDiff(cookies.state.date_start));

      if (this.getDateDiff(cookies.state.date_start) >= 0) {
        this.date_start = cookies.state.date_start;
      }

      this.participant_adult = cookies.state.participant_adult;
      this.participant_young = cookies.state.participant_young;
      this.description = cookies.state.description;
      this.hotel = cookies.state.hotel;
      this.dibayar = cookies.state.dibayar;
      this.dibayar_percent = cookies.state.dibayar_percent;

      this.room_qty = cookies.state.room_qty;
      this.room_budget = cookies.state.room_budget;

      this.name = cookies.state.name;
      this.email = cookies.state.email;
      this.phone = cookies.state.phone;
      this.instance = cookies.state.instance;
      this.city = cookies.state.city;
      this.address = cookies.state.address;

      console.log("GET COOKIES", cookies);
    },
    setCookies() {
      console.log("SET COOKIES product-order");
      const payload = {
        route: {
          url: window.location.href,
          host: this.$getHost(),
          path: this.$route.path,
          name: this.$route.name,
          params: this.$route.params,
          query: this.$route.query,
        },
        state: {
          date_start: this.date_start,
          participant_adult: this.participant_adult,
          participant_young: this.participant_young,
          description: this.description,
          hotel: this.hotel,
          dibayar: this.dibayar,
          dibayar_percent: this.dibayar_percent,

          room_qty: this.room_qty,
          room_budget: this.room_budget,

          name: this.name,
          email: this.email,
          phone: this.phone,
          instance: this.instance,
          city: this.city,
          address: this.address,
        },
      };

      const cookies_name =
        "TOUR-" + this.$route.params?.slug + "-" + this.$route.params?.slug_text; // this.$route.params?.slug_text; //window.location.href
      this.$q.cookies.set(cookies_name, JSON.stringify(payload), {
        secure: true,
        path: "/", // wajib
      });

      // this.$q.notify({
      //   message: "Simpan data formulir",
      //   color: "positive",
      //   position: "bottom"
      // });
    },
    getDateDiff(date_start) {
      // const payload = date_start?.split('/')

      let max = new Date();
      max = date.addToDate(max, { days: 3 });
      //const min = this.$stringToDate("17/9/2014","dd/MM/yyyy","/"); //new Date(date_start); //date.buildDate({ year: payload[0], month: payload[1], date: payload[2] })
      const min = new Date(date_start);
      const unit = "days";

      console.log(date_start, max, min);
      // const diff =
      return date.getDateDiff(min, max, unit);
    },
    onSubmit(i) {
      this.$refs["side_price" + i][i]?.onSubmit();
    },
    onBubbleEventRangkuman() {
      for (let i = 0; i < this.record?.tourPrices.length; i++) {
        const id = this.record?.tourPrices[i].id;
        this.$refs["StoreDetailProductPriceSimulasiRef" + id][i]?.onSubmit();
      }
      this.$refs?.FormBookingCustomerDataRef.onSubmit();
      this.$refs?.FormInformasiRef.onSubmit();
    },
  },
};
</script>

<style scoped>
.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

/* p {
  line-height: 1.6;
  margin: 0 0 15px;
  word-wrap: break-word;
} */

h3 {
  font-size: 22px;
  font-weight: 700;
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
