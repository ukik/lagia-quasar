<template>
  <!-- <InnerBanner :_title="$route?.meta?.title"></InnerBanner> -->
  <!-- <q-btn @click="onCountdown" label="Test"></q-btn> -->
  <q-dialog
    v-model="dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="fullscreen row flex-center">
      <q-card class="rounded-borders-2 bg-transparent" flat>
        <q-card-actions align="center">
          <q-avatar size="80px" color="blue" text-color="white">
            {{ countdown }}
            <!-- <q-spinner></q-spinner> -->
          </q-avatar>
        </q-card-actions>
        <q-card-actions align="center">
          <q-item-label caption class="bg-white rounded-borders-3 q-pa-md"
            >pop-up pembayaran akan muncul</q-item-label
          >
        </q-card-actions>
      </q-card>
      <!-- <div class="col-12 full-width text-center">
        <span class="bg-white rounded-borders-2" caption>pop-up pembayaran akan muncul</span>
      </div> -->
    </div>
  </q-dialog>

  <!-- ***Inner Banner html end here*** -->
  <div id="PaymentDetail" class="content-page-section row justify-center">
    <div class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12 q-px-md">
      <div v-if="!record && loading" class="col-12 text-center">
        <q-spinner color="primary" size="3em" />
      </div>

      <div class="col-12">
        <q-card-actions class="q-pa-none q-mb-lg" align="between">
          <q-btn :to="{
            name: '/tour/payment-booking'
          }" label="RIWAYAT PESANAN" outline icon="receipt" unelevated />
        </q-card-actions>

        <q-item-label class="text-center text-h5 text-uppercase"
          >INVOICE TOUR</q-item-label
        >
        <q-item-label class="text-body text-center"
          >Terimakasih sudah melakukan pemesanan</q-item-label
        >
        <q-item-label class="text-center text-h6 q-mb-lg text-primary">{{
          record?.orderId
        }}</q-item-label>

        <q-card-actions align="center" class="q-mt-md q-mb-lg">
          <q-btn
            @click="onSnap"
            unelevated
            color="primary"
            icon="payment"
            size="lg"
            label="Status Pembayaran"
          ></q-btn>
          <q-btn
            v-if="record?.transactionId"
            @click="onSnapWindow"
            unelevated
            color="primary"
            icon="search"
            size="lg"
          ></q-btn>
        </q-card-actions>

        <q-card class="q-mb-lg" flat bordered>
          <q-card-section style="font-family: 'Ubuntu', sans-serif">
            <q-item-label class="q-mb-md">
              Terima kasih telah melakukan booking (pemesanan) paket tour di LAGIA TOUR.
              Jika ada hal yang ingin ditanyakan atau dikonsultasikan lebih lanjut.
              Silahkan menghubungi tim Labiru melalui kontak dibawah ini.
            </q-item-label>
            <q-item-label class="q-mb-md">
              Atau Anda juga bisa langsung melakukan pembayaran melalui channel pembayaran
              yang sudah kami sediakan. Jika Anda bingung soal pembayaran, silahkan
              hubungi tim Labiru atau Anda dapat membaca petunjuk cara pembayaran. Terima
              kasih
            </q-item-label>
            <q-item-label>
              Penyesuaian biaya dapat dikonsultasikan dengan tim kami, jangan khawatir
              kami siap membantu Anda mendapatkan layanan terbaik
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
                <q-item-label class="text-title text-bold text-cyan"
                  >000000000000</q-item-label
                >
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
                <q-item-label class="text-title text-bold text-teal"
                  >000000000000</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <q-banner rounded class="bg-teal text-white q-my-md">
          <div class="q-mb-lg">
            Jika ada yang ingin ditanyakan, jangan khawatir kami siap membantu Anda
            mendapatkan layanan terbaik
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
            <q-tab name="detail" label="DETAIL" />
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
                      {{ $dateFormat(record?.tourBookingItem?.dateStart) }}
                    </td>
                  </tr>
                  <tr>
                    <td>Harga Total</td>
                    <td class="text-capitalize">
                      {{ $currency(record?.tourBooking?.fullPayment) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-orange text-white" colspan="3">
                      <div class="row items-center">
                        <q-icon name="info"></q-icon>nominal tagihan dipilih saat checkout
                      </div>
                    </td>
                  </tr>
                  <tr class="text-bold">
                    <td>Nominal Tagihan</td>
                    <td class="text-capitalize">
                      {{ $currency(record?.grossAmount) }}
                    </td>
                  </tr>
                  <tr v-if="record?.transactionTime">
                    <td>Waktu Transaksi</td>
                    <td class="text-capitalize">
                      {{ record?.transactionTime }}
                    </td>
                  </tr>

                  <tr>
                    <td>Status Transaksi</td>
                    <td class="text-capitalize">
                      {{ record?.transactionStatus }}
                    </td>
                  </tr>
                  <tr v-if="record?.transactionId">
                    <td>Transaksi ID</td>
                    <td class="text-capitalize">
                      {{ record?.transactionId }}
                    </td>
                  </tr>
                  <tr v-if="record?.statusMessage">
                    <td>Status Pesan</td>
                    <td class="text-capitalize">
                      {{ record?.statusMessage }}
                    </td>
                  </tr>
                  <tr v-if="record?.statusCode">
                    <td>Status Code</td>
                    <td class="text-capitalize">
                      {{ record?.statusCode }}
                    </td>
                  </tr>
                  <tr>
                    <td>Status Pembayaran</td>
                    <td class="text-capitalize">
                    <q-chip class="q-ma-none" text-color="white" :color="$StatusCodeColor(record?.statusCode)">
                      {{ $StatusCode(record?.statusCode) }}
                    </q-chip>
                    </td>
                  </tr>

                  <!-- <tr>
                    <td>Kunci Signature</td>
                    <td class="text-capitalize">
                      {{ (record?.signatureKey) }}
                    </td>
                  </tr> -->
                  <tr v-if="record?.paymentType">
                    <td>Tipe Pembayaran</td>
                    <td class="text-capitalize">
                      {{ record?.paymentType }}
                    </td>
                  </tr>
                  <tr v-if="record?.fraudStatus">
                    <td>Status Fraud</td>
                    <td class="text-capitalize">
                      {{ record?.fraudStatus }}
                    </td>
                  </tr>
                </table>

                <q-card-actions align="center" class="q-mt-md">
                  <q-btn
                    @click="onSnap"
                    unelevated
                    color="primary"
                    icon="payment"
                    size="lg"
                    label="Status Pembayaran"
                  ></q-btn>
                  <q-btn
                    v-if="record?.transactionId"
                    @click="onSnapWindow"
                    unelevated
                    color="primary"
                    icon="search"
                    size="lg"
                  ></q-btn>
                </q-card-actions>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="detail">
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
                    Setelah menerima konfirmasi pemesanan dari Tim LAGIA TOUR, pemesan
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
                    obyek wisata/makan/hotel dibatalkan bukan karena pihak LAGIA TOUR
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
                    LAGIA TOUR akan mengirim konfirmasi mengenai permintaan anda melalui
                    email atau whatsapp setelah semua syarat dan kondisi pemesanan
                    dipenuhi.
                  </li>
                  <li>
                    Jadwal yang tertera dalam paket dapat berubah sewaktu-waktu sesuai
                    kondisi dilapangan.
                  </li>
                  <li>
                    LAGIA TOUR &amp; Travel bertindak sebagai perantara antara tamu dan
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
                LAGIA TOUR tidak bertanggung jawab dan tidak bisa di tuntut atas:
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

import { mapWritableState, storeToRefs, mapState, mapActions } from "pinia";
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
      // product_price: true,
      // stickyPrice: null,

      // step: 1,
      interval: null,
      countdown: 3,
      tab: "tagihan",
      dialog: false,
    };
  },
  computed: {
    ...mapState(useTourBookingPaymentStore, ["getFormCheck"]),
    ...mapWritableState(useTourBookingPaymentStore, ["record", "loading"]),
  },
  mounted() {
    this.$nextTick(() => {
      // this.onSnap();
    });
    this.$scrollToElement("#PaymentDetail");
    this.onCountdown();
    // this.dialog = true;
  },
  methods: {
    ...mapActions(useTourBookingPaymentStore, ["onUpdate"]),
    // onScrollUp(el) {
    //   setTimeout(() => {
    //     // VERSION 1
    //     // document.querySelector(el).scrollIntoView({
    //     //   behavior: 'smooth'
    //     // });

    //     const ANCHOR = document.querySelector(el);
    //     if (!ANCHOR) return;
    //     console.log("ANCHOR");
    //     this.$scrollToElement(ANCHOR);
    //   }, 500);
    // },
    onCountdown() {
      this.dialog = true;
      this.countdown = 3;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        console.log(this.countdown);
        this.countdown--;
        if (this.countdown <= 0) {
          this.onSnap();
          clearInterval(this.interval);
          this.dialog = false;
        }
      }, 1000);
    },
    onUpdateTest() {
      this.onUpdate({
        status_code: "200",
        status_message: "Success, Credit Card transaction is successful",
        transaction_id: "91bbb1dc-4acc-47b7-8545-9cfb6840410a",
        order_id: "TOUR-6217ea56-f4b6",
        gross_amount: "70290000.00",
        payment_type: "credit_card",
        transaction_time: "2024-08-29 23:09:55",
        transaction_status: "capture",
        fraud_status: "accept",
        bank: "cimb",
        masked_card: "48111111-1114",
        card_type: "credit",
        approval_code: "1724947795771",
        finish_redirect_url:
          "http://trefeltour.test/midtrans/finish?order_id=TOUR-6217ea56-f4b6&status_code=200&transaction_status=capture",
      });
    },
    onSnap() {
      const vm = this;
      try {
        snap.pay(this.record?.snapToken, {
          // Optional
          onSuccess: function (result) {
            /* You may add your own js here, this is just example */
            // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            console.log("onSuccess", result);
            vm.onUpdate(result);
          },
          // Optional
          onPending: function (result) {
            /* You may add your own js here, this is just example */
            // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            console.log("onPending", result);
            vm.onUpdate(result);
          },
          // Optional
          onError: function (result) {
            /* You may add your own js here, this is just example */
            // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            console.log("onError", result);
            vm.onUpdate(result);
          },
          onClose: function (result) {
            /* You may add your own js here, this is just example */
            // document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            console.log("onClose", result);
          },
        });
      } catch (error) {
        this.$NotifyAlert("Coba lagi");
      }
    },
    onSnapWindow() {
      // if(this.is_cordova) {

      //     var options = "location=yes,toolbar=yes,hideurlbar=no,EnableViewPortScale=yes,hardwareback=yes"

      //     var ref = cordova.InAppBrowser.open('https://app.sandbox.midtrans.com/snap/v2/vtweb/'+res.data.payload.snap_token, '_blank', options);

      //     ref.addEventListener('exit', function(event) {
      //     onRequestData(vm.$store, vm.$route)
      //     });

      // } else {

      // }

      var options =
        "location=yes,toolbar=yes,hideurlbar=no,EnableViewPortScale=yes,hardwareback=yes";

      window.open(
        "https://app.sandbox.midtrans.com/snap/v2/vtweb/" + this.record?.snapToken,
        "_blank",
        options
      );
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
