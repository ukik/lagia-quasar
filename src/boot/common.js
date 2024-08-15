import { scroll, date, Notify, Platform, Screen, Cookies } from "quasar";

var default_avatar = "https://secure.gravatar.com/avatar?d=wavatar";

export const host = "https://api.imajora.labsnip.com/"; // 'http://properti-backend.local/'; //

export const default_title =
  "Cubix - Marketing & Agency | wujudkan impianmu - miliki aset idaman";
export const default_description =
  "Pusat jual beli aset properti, ruko, kavling, lahan, material, jasa yang terintegrasi & terpercaya";
export const default_alt =
  "Cubix - Marketing & Agency | wujudkan impianmu - miliki aset idaman";
export const default_footer_mark = `${new Date().getFullYear()} © CUBIX - All Rights Reserved`;

import { boot } from "quasar/wrappers";
import { useAuthStore } from "src/stores/auth/auth";

// import { mapGetters } from "vuex";
import { useRouterStore } from 'src/stores/router-store'
import { useGlobalStore } from 'src/stores/global'

let onGoto = null;
import { mapState, mapWritableState, mapActions } from 'pinia'


import formatTime from "src/utils/formatTime"
import formatDate from "src/utils/formatDate"
const stringToBoolean = (stringValue) => {
  switch (stringValue?.toLowerCase()?.trim()) {
    case "true":
    case "yes":
    case "1":
      return true;

    case "false":
    case "no":
    case "0":
    case null:
    case undefined:
      return false;

    default:
      return JSON.parse(stringValue);
  }
}


function getImage(key) {
  switch (key) {
    case "guide":
      return "/assets/category-talent/guide.jpg";
    case "media":
      return "/assets/category-talent/media.avif";
    case "mc":
      return "/assets/category-talent/mc.jpg";
    case "dancer":
      return "/assets/category-talent/dancer.jpg";
    case "singer":
      return "/assets/category-talent/singer.jpg";
    case "band":
      return "/assets/category-talent/band.jpg";
    case "comedian":
      return "/assets/category-talent/comedian.jpg";
    case "others":
      return "/assets/category-talent/others.avif";
  }
}

function getRatingTestimonial(key) {
  switch (key) {
    case "1":
    case 1:
      return "/assets/rating/rating_1.png";
    case "2":
    case 2:
      return "/assets/rating/rating_2.png";
    case "3":
    case 3:
      return "/assets/rating/rating_3.png";
    case "4":
    case 4:
      return "/assets/rating/rating_4.png";
    case "5":
    case 5:
      return "/assets/rating/in-love.png";
  }
}

function getSplit(item) {
  if (!item) return [];
  try {
    return item.split(",");
  } catch (error) {
    return item;
  }
}
// function finalPrice({ general, discount, cashback }) {
//   console.log('getTotalAmount', { general, discount, cashback })
//   const total =  (Number(general) - ((Number(general) * Number(discount)/100)) - Number(cashback))
//   console.log('getTotalAmount', total)
//   return total;
// }

import currency from "src/utils/currency";
import percent from "src/utils/percent";

function finalPrice(item) {
  // console.log('getTotalAmount', { general, discount, cashback })
  const general = item?.generalPrice
  const discount = item?.discountPrice
  const cashback = item?.cashbackPrice

  const total = (Number(general) - ((Number(general) * Number(discount) / 100)) - Number(cashback))
  // console.log('getTotalAmount', total)
  return total;
}

function finalPriceAnak(item) {
  // console.log('getTotalAmount', { general, discount, cashback })
  const general = item?.generalPriceChild
  const discount = item?.discountPrice
  const cashback = item?.cashbackPrice

  const total = (Number(general) - ((Number(general) * Number(discount) / 100)) - Number(cashback))
  // console.log('getTotalAmount', total)
  return total;
}

function finalPriceBooking(item) {
  // console.log('getTotalAmount', { general, discount, cashback })
  const general = item?.getPrice
  const discount = item?.getDiscount
  const cashback = item?.getCashback

  const total = (Number(general) - ((Number(general) * Number(discount) / 100)) - Number(cashback))
  // console.log('getTotalAmount', total)
  return total;
}

function finalPriceAnakBooking(item) {
  // console.log('getTotalAmount', { general, discount, cashback })
  const general = item?.getPriceChild
  const discount = item?.getDiscount
  const cashback = item?.getCashback

  const total = (Number(general) - ((Number(general) * Number(discount) / 100)) - Number(cashback))
  // console.log('getTotalAmount', total)
  return total;
}


function shuffleArray(arr) {
  if(!arr) return []
  return arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function onMap(url) {
  window.open(url, '_blank');
}


function onTelp (val) {
  window.open(val);
}


function getHost() {
  return window.location.protocol +
            "//" +
            window.location.host +
            "/"
}


export default boot(async ({ app, ssrContext, router, store }) => {

  const routerStore = useRouterStore()

  // router.beforeEach((ctx1) => {
  //   //console.log(ctx1)
  //   app.config.globalProperties.$route_meta = ctx1.meta;
  //   app.config.globalProperties.$route_path = ctx1.path;
  //   app.config.globalProperties.$route_params = ctx1.params;
  //   app.config.globalProperties.$route_query = ctx1.query;
  //   app.config.globalProperties.$route_name = ctx1.name;
  // })
  //console.log(app.config.globalProperties.$route_name)
  // //console.log(ctx.router, ctx.store.state.value?.lang?.locale, ctx.store.state.value?.routerStore?.route);

  onGoto = (routes) => {
    const { query } = routes
    return {
      ...routes,
      query: {
        ...query,
        // lang: routerStore.getQuery?.lang
        //   ? routerStore.getQuery?.lang
        //   : store.state.value?.lang?.locale //langStore.getLocale,
      },
    };
  }
  app.config.globalProperties.$onGoto = onGoto;


  app.config.globalProperties.$getImage = getImage;
  app.config.globalProperties.$formatTime = formatTime;
  app.config.globalProperties.$formatDate = formatDate;
  app.config.globalProperties.$stringToBoolean = stringToBoolean;
  app.config.globalProperties.$defaultUser = "assets/default-user.png";
  app.config.globalProperties.$defaultErrorImage = "https://cdn.quasar.dev/logo-v2/header.png";

  app.config.globalProperties.$finalPrice = finalPrice;
  app.config.globalProperties.$finalPriceAnak = finalPriceAnak;

  app.config.globalProperties.$finalPriceBooking = finalPriceBooking;
  app.config.globalProperties.$finalPriceAnakBooking = finalPriceAnakBooking;

  app.config.globalProperties.$currency = currency;
  app.config.globalProperties.$percent = percent;

  app.config.globalProperties.$getRatingTestimonial = getRatingTestimonial;
  app.config.globalProperties.$getSplit = getSplit;

  app.config.globalProperties.$shuffleArray = shuffleArray;
  app.config.globalProperties.$onMap = onMap;

  app.config.globalProperties.$onTelp = onTelp;

  app.config.globalProperties.$year = new Date().getFullYear();

  app.config.globalProperties.$getHost = getHost;




  // app.config.globalProperties.$is_mobile_size = () => Screen.width <= 425;
  // app.config.globalProperties.$is_higher_mobile_size = () => Screen.width > 425;
  // app.config.globalProperties.$is_higher_ipad_size = () => Screen.width > 768;
  // app.config.globalProperties.$is_ipad_size = () => Screen.width <= 768 && Screen.width >= 425;
  // app.config.globalProperties.$is_lower_ipad_size = () => Screen.width <= 768;
  // app.config.globalProperties.$is_lower_laptop_size = () => Screen.width <= 1024;
  // app.config.globalProperties.$is_higher_ipad_size_route = () => Screen.width > 768 ? "" : "";
  // app.config.globalProperties.$is_mobile_size_route = () => Screen.width <= 425 ? "" : "";
  // app.config.globalProperties.$is_higher_desktop_size = () => Screen.width > 1440;
  // app.config.globalProperties.$is_cordova = () => { if (process.env.CLIENT) return Platform.is.cordova }

  app.mixin({
    data() {
      return {
        default_avatar,
        server_host: host,

        default_title,
        default_description,
        default_alt,
        default_footer_mark,

        default_image: "images/error-404-flat-illustration-vector.jpg",

        whatsapp: +6289616432187,
      };
    },
    computed: {
      ...mapState(useAuthStore, {
        storeAuth: 'payload',
        is_logged: 'is_logged',
        auth_id: 'auth_id',
      }),
      ...mapState(useGlobalStore, {
        tab_favorite: 'tab_favorite',
        tab_liked: 'tab_liked',
        tab_home: 'tab_home',
      }),
      ...mapWritableState(useGlobalStore, {
        tab_favorite: 'tab_favorite',
        tab_liked: 'tab_liked',
        tab_home: 'tab_home',
      }),
      goto() {
        return function (route) {
          const { query } = route
          return {
            ...route,
            query: {
              ...query,
              // lang: this.route_query?.lang
              //   ? this.route_query?.lang
              //   : this.$store.state.locale,
            },
          };
        };
      },
      // DIALOG_OPEN() {
      //   return this.$store.getters.DIALOG_OPEN;
      // },

      route_meta() {
        return this.$route.meta;
      },
      route_path() {
        return this.$route.path;
      },
      route_param() {
        return this.$route.params;
      },
      route_name() {
        return this.$route.name;
      },
      route_query() {
        return this.$route.query;
      },

      is_platform() {
        if (process.env.CLIENT) {
          return Platform.is.platform; // PRODUCTION UNLOCKED
        }
      },
      is_ssr() {
        return process.env.SERVER;
      },
      screen_width() {
        return Screen.width;
      },
      screen_height() {
        return Screen.height;
      },
      is_desktop() {
        if (process.env.CLIENT) {
          return Platform.is.desktop; // PRODUCTION UNLOCKED
        }
      },
      is_mobile() {
        if (process.env.CLIENT) {
          return Platform.is.mobile; // PRODUCTION UNLOCKED
        }
      },
      is_cordova() {
        if (process.env.CLIENT) {
          return Platform.is.cordova; // PRODUCTION UNLOCKED
        }
      },
      is_browser() {
        if (process.env.CLIENT) {
          return Platform.is.browser; // PRODUCTION UNLOCKED
        }
      },
      is_mobile_size() {
        return Screen.width <= 425;
      },
      is_higher_mobile_size() {
        return Screen.width > 425;
      },
      is_higher_ipad_size() {
        return Screen.width > 768;
      },
      is_ipad_size() {
        return Screen.width <= 768 && Screen.width >= 425;
      },
      is_lower_ipad_size() {
        return Screen.width <= 768;
      },
      is_lower_laptop_size() {
        return Screen.width <= 1024;
      },
      is_higher_laptop_size() {
        return Screen.width > 1024;
      },
      is_higher_ipad_size_route() {
        return Screen.width > 768 ? "" : "";
      },
      is_mobile_size_route() {
        return Screen.width <= 425 ? "" : "";
      },
      is_higher_desktop_size() {
        return Screen.width > 1440;
      },

      img_checker_galeri() {
        return function (val) {
          try {
            if (val == null || val == undefined) {
              return "";
            }

            let n = val.substring(0, 5);
            let result = n.includes("http" || "https");

            return result ? val : host + val;
          } catch (error) {
            return "";
          }
        };
      },
    },
    methods: {
      underconstruction() {
        if (!this.is_logged) {
          this.$q.notify({
            message: 'Under Construction',
            // caption: 'wajib login',
            color: 'red',
          })
        }
      },
      authCheck() {
        if (!this.is_logged) {
          this.$q.notify({
            // message: 'Wajib masuk akun Anda',
            // caption: 'wajib login',
            color: 'cyan',
            icon: 'login',
            position: 'bottom',
            actions: [
              {
                label: 'Click Here To Login', color: 'white', handler: () => {

                  this.$router.push({
                    name: 'auth_login'
                  })

                }
              }
            ]
          })
        }
      },
      gotoLogin() {
        // this.$router.push({
        //   name:'auth_login'
        // })
      },
      imageSync(val) {
        return val
        console.log('imageSync', (val?.toString().includes('http') || val?.toString().includes('https')) ? val : host + val)
        // const n = val?.toString() ? val?.toString() : null
        // if(!n) return default_avatar
        return (val?.toString().includes('http') || val?.toString().includes('https')) ? val : host + val
      },
      getLightbox(state, value) {
        let imgs = []
        state.forEach(element => {
          if (element[value].includes("http") || element[value].includes("https")) {
            imgs.push(element[value])
          } else {
            imgs.push(host + element[value])
          }
        })
        return imgs
      },
      img_checker(val) {
        // //////console.log('img_checker', ifImageExist(val))
        try {
          if (val == null || val == undefined) {
            return default_avatar;
          }

          return val;

          // let n = val.substring(0, 5);
          // let result = n.includes("http");

          // return result ? val : this.server_host+'/'+val
        } catch (error) {
          return default_avatar;
        }
      },
      removeslug(str) {
        if (str == undefined) return str;
        if (str == null) return str;

        try {
          let n = str.toString();
          if (n) {
            n.replaceAll("-", " ");
          }
        } catch (err) {
          return str.toString();
        }
      },
      isValidEmail(val) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || ""; //'Invalid email';
      },
      handleError(e) {
        // //console.log(e)
        e.target.src = default_avatar;
      },
      random_boolean() {
        return Math.round(Math.random() * 10) < 5 ? true : false;
      },

      async onGotoBack() {
        // const set_route = this.$route.name
        await this.$router.back()
      },

      // onEmit(payload) {
      //   this.$global.$emit(this.route_name, payload);
      // },
      onOrder() {
        const num = this.whatsapp;
        const msg =
          `*Pesan Konsultasi* %0D%0A` +
          `Halo! *Cubix* senang menerima pesan Anda. %0D%0A %0D%0A` +
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
          `Kami (Cubix) senang bisa berbagi informasi terlengkap dan terkini seputar aset bangunan, properti, lahan, tanah, kavling, dan sebagainya . %0D%0A` +
          `Jika Anda membutuhkan layanan kami, bisa melalui telepon, online, dan offline. %0D%0A` +
          `Terimakasih sudah menyapa kami. Salam & Sukses`;

        if (this.$q.platform.is.cordova) {
          cordova.InAppBrowser.open(
            `https://api.whatsapp.com/send?phone=${num}&text=${msg}`,
            "_system",
            ""
          );

          // cordova.plugin.media.to.whatsapp.shareMedia(num,num,"com.whatsapp",function(){
          //     //console.log("Media To Whatsapp Success")
          // },function(e){
          //     //console.log("Media To Whatsapp Error" + e)
          // });
          return;
        }

        window.open(
          `https://api.whatsapp.com/send?phone=${num}&text=${msg}`,
          "_self"
        );

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
      },
      onKontak() {
        // %0a = newline

        // _Cubix_
        // *Cubix*
        // ~Cubix~

        // Spaces uses this command: %20 (but not necessary if inside a PHP variable)

        // Line breaks: %0A or %0D%0A (Totally required)

        // Links: No special character needed

        const num = this.whatsapp;
        // const name = "Megaman 8"
        const msg =
          // `Selamat datang di *Cubix* %0D%0A %0D%0A`+
          `*Pesan Umum* %0D%0A` +
          `Halo! *Cubix* senang menerima pesan Anda. %0D%0A %0D%0A` +
          `Kami adalah jasa agen jual-beli aset bangunan, properti, lahan, tanah, kavling, dan sebagainya. %0D%0A %0D%0A` +
          `Jika Anda membutuhkan layanan kami, bisa melalui telepon, online, dan offline. %0D%0A %0D%0A` +
          `Bagaimana kami menyapa Anda? %0D%0A` +
          `Nama: %0D%0A` +
          `Alamat: %0D%0A %0D%0A` +
          `Terimakasih sudah menyapa kami. Salam & Sukses`;

        if (this.$q.platform.is.cordova) {
          cordova.InAppBrowser.open(
            `https://api.whatsapp.com/send?phone=${num}&text=${msg}`,
            "_system",
            ""
          );
          // cordova.plugin.media.to.whatsapp.shareMedia(num,num,"com.whatsapp",function(){
          //     //console.log("Media To Whatsapp Success")
          // },function(e){
          //     //console.log("Media To Whatsapp Error" + e)
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
        window.open(
          `https://api.whatsapp.com/send?phone=${num}&text=${msg}`,
          "_blank"
        );
      },
    },
  });
});
