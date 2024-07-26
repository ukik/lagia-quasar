import { scroll, date, Notify, Platform, Screen, Cookies } from "quasar";

import { boot } from 'quasar/wrappers'

import { storeToRefs } from "pinia";
import { useInitStore } from "stores/lagia-stores/page/InitStore";


function onOrder(whatsapp) {

  const num = whatsapp
  const msg =
  (
  `*Pesan Konsultasi* %0D%0A`+
  `Halo! *Cubix* senang menerima pesan Anda. %0D%0A %0D%0A`+

  `Perkenalkan saya adalah: %0D%0A` +
  `Nama: Abi %0D%0A` +
  `Telepon: 089457551445 %0D%0A` +
  `Email: Abi@gmail.com %0D%0A` +
  `Alamat: jl. bukit pinang seribut Rt. 19 %0D%0A %0D%0A` +

  `Saya tertarik dengan aset berikut ini: %0D%0A` +
  `https://properti.labsnip.com/detail/123 %0D%0A %0D%0A` +

  `Catatan tambahan saya: %0D%0A` +
  `target elements with the "draggable" class interact('.draggable') .draggable({ // enable inertial throwing inertia: true, // keep the %0D%0A %0D%0A %0D%0A` +

  `Dengan mengirim pesan ini maka: %0D%0A` +
  `- Saya berkenan untuk mendapatkan follow-up, penawaran, dan konsultasi gratis %0D%0A` +
  `- Saya bisa menggunakan jasa jual-beli di Cubix %0D%0A` +
  `- Saya bisa mendapatkan informasi seputar pelatihan, dan seminar properti %0D%0A %0D%0A` +

  `Kami (Cubix) senang bisa berbagi informasi terlengkap dan terkini seputar aset bangunan, properti, lahan, tanah, kavling, dan sebagainya . %0D%0A`+
  `Jika Anda membutuhkan layanan kami, bisa melalui telepon, online, dan offline. %0D%0A`+
  `Terimakasih sudah menyapa kami. Salam & Sukses`
  );

  if(Platform.is.cordova) {
      cordova.InAppBrowser.open(`https://api.whatsapp.com/send?phone=${num}&text=${msg}`, '_system', '')

      // cordova.plugin.media.to.whatsapp.shareMedia(num,num,"com.whatsapp",function(){
      //     console.log("Media To Whatsapp Success")
      // },function(e){
      //     console.log("Media To Whatsapp Error" + e)
      // });
      return
  }


  window.open(`https://api.whatsapp.com/send?phone=${num}&text=${msg}`, '_self')

  // Selamat datang di Cubix
  // Halo! Senang menerima pesan dari Anda.
  // Kami adalah jasa agen jual-beli aset bangunan, properti, lahan, tanah, kavling, dan sebagainya.

  // Perkenalkan saya adalah:
  // Nama:
  // Telepon:
  // Email:
  // Alamat:

  // Sangat tertarik dengan aset berikut ini:
  // https://.....

  // Catatan tambahan saya adalah:
  // ....

  // Saya berkenan untuk mendapatkan follow-up layanan dan konsultasi.

  // Kami (Cubix) senang bisa berbagi informasi terlengkap dan terkini seputar aset bangunan, properti, lahan, tanah, kavling, dan sebagainya

  // Terimakasih dari kami - sehat dan sukses selalu untuk kita bersama.
}
function onKontak(whatsapp){
  // %0a = newline

  // _Cubix_
  // *Cubix*
  // ~Cubix~

  // Spaces uses this command: %20 (but not necessary if inside a PHP variable)

  // Line breaks: %0A or %0D%0A (Totally required)

  // Links: No special character needed

  const num = whatsapp
  // const name = "Megaman 8"
  const msg =
  (
  // `Selamat datang di *Cubix* %0D%0A %0D%0A`+
  `*Pesan Umum* %0D%0A`+
  `Halo! *Cubix* senang menerima pesan Anda. %0D%0A %0D%0A`+

  `Kami adalah jasa agen jual-beli aset bangunan, properti, lahan, tanah, kavling, dan sebagainya. %0D%0A %0D%0A`+

  `Jika Anda membutuhkan layanan kami, bisa melalui telepon, online, dan offline. %0D%0A %0D%0A`+

  `Bagaimana kami menyapa Anda? %0D%0A` +
  `Nama: %0D%0A` +
  `Alamat: %0D%0A %0D%0A` +

  `Terimakasih sudah menyapa kami. Salam & Sukses`

  );

  if(Platform.is.cordova) {
      cordova.InAppBrowser.open(`https://api.whatsapp.com/send?phone=${num}&text=${msg}`, '_system', '')
      // cordova.plugin.media.to.whatsapp.shareMedia(num,num,"com.whatsapp",function(){
      //     console.log("Media To Whatsapp Success")
      // },function(e){
      //     console.log("Media To Whatsapp Error" + e)
      // });
      // return
  }

  // encodeURIComponent
  // (
  // `Selamat Datang di _*Cubix*_ %0D%0A %0D%0A %0D%0A`
  // +
  // `Ini adalah aplikasi jual beli properti, tanah, dan aset %0D%0A %0D%0A`
  // +
  // `Kami agen jual beli terbesar di Kaltim %0D%0A %0D%0A`
  // +
  // `Jika ada yang ingin ditanyakan, jangan sungkan...`
  // )
  // window.open(`https://wa.me/${num}?text=I%27m%20api%20msg%20hello%20${name}%20friend%20${msg}`, '_blank');
  window.open(`https://api.whatsapp.com/send?phone=${num}&text=${msg}`, '_blank')
}
function onKonsultasi(name = null, email = null, question = null){

  const initStore = useInitStore();
  const { getFooterContact } = storeToRefs(initStore); // have all reactive states here

  // console.log('whatsapp', getFooterContact.value?.grid2Value)

  // %0a = newline

  // _Cubix_
  // *Cubix*
  // ~Cubix~

  // Spaces uses this command: %20 (but not necessary if inside a PHP variable)

  // Line breaks: %0A or %0D%0A (Totally required)

  // Links: No special character needed

  const num = getFooterContact.value?.grid2Value
  // const name = "Megaman 8"
  const msg =
  (
  // `Selamat datang di *LAGIA* %0D%0A %0D%0A`+
  `*KONSULTASI* %0D%0A`+
  `Halo Kak!! Terima kasih telah menghubungi LAGIA.
  Kami akan segera merespon secepatnya (pada jam kerja). %0D%0A  %0D%0A`+
  // `. %0D%0A %0D%0A`+
  // `Jika Anda membutuhkan layanan kami, bisa melalui telepon, online, dan offline. %0D%0A %0D%0A`+\

  `Silakan tinggalkan pesan ataupun pertanyaan menggunakan format dibawah ini,
  agar tim kami bisa segera memberikan respon. %0D%0A  %0D%0A`+

  // `Bagaimana kami menyapa Anda? %0D%0A  %0D%0A` +
  `Nama: ${name} %0D%0A` +
  `Email: ${email} %0D%0A` +
  `Pesan/Pertanyaan: ${question} %0D%0A %0D%0A` +

  `Let's explore opportunity with LAGIA.`

  );

  if(Platform.is.cordova) {
      cordova.InAppBrowser.open(`https://api.whatsapp.com/send?phone=${num}&text=${msg}`, '_system', '')
      // cordova.plugin.media.to.whatsapp.shareMedia(num,num,"com.whatsapp",function(){
      //     console.log("Media To Whatsapp Success")
      // },function(e){
      //     console.log("Media To Whatsapp Error" + e)
      // });
      return
  }

  // encodeURIComponent
  // (
  // `Selamat Datang di _*Cubix*_ %0D%0A %0D%0A %0D%0A`
  // +
  // `Ini adalah aplikasi jual beli properti, tanah, dan aset %0D%0A %0D%0A`
  // +
  // `Kami agen jual beli terbesar di Kaltim %0D%0A %0D%0A`
  // +
  // `Jika ada yang ingin ditanyakan, jangan sungkan...`
  // )
  // window.open(`https://wa.me/${num}?text=I%27m%20api%20msg%20hello%20${name}%20friend%20${msg}`, '_blank');
  window.open(`https://api.whatsapp.com/send?phone=${num}&text=${msg}`, '_blank')
}


function onKonsultasiProduk(name = null, email = null, question = null, link = null){

  const initStore = useInitStore();
  const { getFooterContact } = storeToRefs(initStore); // have all reactive states here

  const num = getFooterContact.value?.grid2Value
  const msg =
  (
  // `Selamat datang di *LAGIA* %0D%0A %0D%0A`+
  `*KONSULTASI PRODUK* %0D%0A %0D%0A`+

  `*Link*: ${link} %0D%0A %0D%0A`+

  `Halo Kak!! Terima kasih telah menghubungi LAGIA.
  Kami akan segera merespon secepatnya (pada jam kerja). %0D%0A  %0D%0A`+
  // `. %0D%0A %0D%0A`+
  // `Jika Anda membutuhkan layanan kami, bisa melalui telepon, online, dan offline. %0D%0A %0D%0A`+\

  `Silakan tinggalkan pesan ataupun pertanyaan menggunakan format dibawah ini,
  agar tim kami bisa segera memberikan respon. %0D%0A  %0D%0A`+

  // `Bagaimana kami menyapa Anda? %0D%0A  %0D%0A` +
  `Nama: ${name} %0D%0A` +
  `Email: ${email} %0D%0A` +
  `Pesan/Pertanyaan: ${question} %0D%0A %0D%0A` +

  `Let's explore opportunity with LAGIA.`

  );

  if(Platform.is.cordova) {
      cordova.InAppBrowser.open(`https://api.whatsapp.com/send?phone=${num}&text=${msg}`, '_system', '')
      // cordova.plugin.media.to.whatsapp.shareMedia(num,num,"com.whatsapp",function(){
      //     console.log("Media To Whatsapp Success")
      // },function(e){
      //     console.log("Media To Whatsapp Error" + e)
      // });
      return
  }

  // encodeURIComponent
  // (
  // `Selamat Datang di _*Cubix*_ %0D%0A %0D%0A %0D%0A`
  // +
  // `Ini adalah aplikasi jual beli properti, tanah, dan aset %0D%0A %0D%0A`
  // +
  // `Kami agen jual beli terbesar di Kaltim %0D%0A %0D%0A`
  // +
  // `Jika ada yang ingin ditanyakan, jangan sungkan...`
  // )
  // window.open(`https://wa.me/${num}?text=I%27m%20api%20msg%20hello%20${name}%20friend%20${msg}`, '_blank');
  window.open(`https://api.whatsapp.com/send?phone=${num}&text=${msg}`, '_blank')
}


function onCall(){

  const initStore = useInitStore();
  const { getFooterContact } = storeToRefs(initStore); // have all reactive states here

  return 'tel:'+ getFooterContact.value?.grid2Value
}

export default boot(async ({ app, ssrContext, router, store }) => {


  // const routerStore = useRouterStore()

  // onGoto = (routes) => {
  //   const { query } = routes
  //   return {
  //     ...routes,
  //     query: {
  //       ...query,
  //       // lang: routerStore.getQuery?.lang
  //       //   ? routerStore.getQuery?.lang
  //       //   : store.state.value?.lang?.locale //langStore.getLocale,
  //     },
  //   };
  // }

  app.config.globalProperties.$onKonsultasi = onKonsultasi;
  app.config.globalProperties.$onKonsultasiProduk = onKonsultasiProduk;
  app.config.globalProperties.$onCall = onCall;



  // app.config.globalProperties.$getImage = getImage;
})
