import { boot } from 'quasar/wrappers'
import { defineAsyncComponent } from 'vue'

// import Vue3Tour from 'vue3-tour'
// import VueEasyLightbox from 'vue-easy-lightbox'

import 'vue3-tour/dist/vue3-tour.css'

// tidak bisa lazy component
// import VRuntimeTemplate from "vue3-runtime-template";

// import Skeleton_Twitter from 'src/components/skeleton/Skeleton_Twitter.vue'
// import Skeleton_Twitch from 'src/components/skeleton/Skeleton_Twitch.vue'

// import ListItemButton from 'src/components/list_item_button.vue'
// import FilterGuru from 'src/components/filter_guru.vue'

// import Entry from 'src/pages/Entry.vue'

import 'vue3-carousel/dist/carousel.css'
// import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

import Wrapper from 'src/components/Wrapper.vue'

// import { GoogleMap, Marker } from 'vue3-google-map'

// import SkeletonTwitch from 'src/components/SkeletonTwitch.vue'

export default boot(async ({ app, ssrContext, router, store }) => {

  // app.component('Carousel',
  //   defineAsyncComponent(() => Carousel)
  // )

  // app.component('Slide',
  //   defineAsyncComponent(() => Slide)
  // )

  // app.component('Pagination',
  //   defineAsyncComponent(() => Pagination)
  // )

  // app.component('Navigation',
  //   defineAsyncComponent(() => Navigation)
  // )

  // app.use(Vue3Tour)
  // app.use(VueEasyLightbox)

  // app.component('VRuntimeTemplate', VRuntimeTemplate)

  // app.component('Skeleton_Twitch', Skeleton_Twitch)
  // app.component('Skeleton_Twitter', Skeleton_Twitter)

  // app.component('ListItemButton', ListItemButton)

  // app.component('GoogleMap', GoogleMap);
  // app.component('Marker', Marker);


  app.component('Wrapper', Wrapper)
  app.component('TransactionHistoryProduct',
    defineAsyncComponent(() => import('src/components/lagia-components/TransactionHistoryProduct.vue'))
  )
  app.component('SinglePageContent',
    defineAsyncComponent(() => import('src/components/lagia-components/SinglePageContent.vue'))
  )
  app.component('RelatedImageSlideCarousel',
    defineAsyncComponent(() => import('src/components/lagia-components/RelatedImageSlideCarousel.vue'))
  )
  app.component('RelatedImageSlide',
    defineAsyncComponent(() => import('src/components/lagia-components/RelatedImageSlide.vue'))
  )
  app.component('ProductCartInformation',
    defineAsyncComponent(() => import('src/components/lagia-components/ProductCartInformation.vue'))
  )
  app.component('ProductCart',
    defineAsyncComponent(() => import('src/components/lagia-components/ProductCart.vue'))
  )
  app.component('ProductCalculate',
    defineAsyncComponent(() => import('src/components/lagia-components/ProductCalculate.vue'))
  )
  app.component('MorePackageSide',
    defineAsyncComponent(() => import('src/components/lagia-components/MorePackageSide.vue'))
  )
  app.component('LayoutRightDrawerContent',
    defineAsyncComponent(() => import('src/components/lagia-components/LayoutRightDrawerContent.vue'))
  )
  app.component('LayoutLeftMenu',
    defineAsyncComponent(() => import('src/components/lagia-components/LayoutLeftMenu.vue'))
  )
  app.component('LayoutHeaderMenu',
    defineAsyncComponent(() => import('src/components/lagia-components/LayoutHeaderMenu.vue'))
  )
  app.component('LayoutFooter',
    defineAsyncComponent(() => import('src/components/lagia-components/LayoutFooter.vue'))
  )





  app.component('ItinerarySide',
    defineAsyncComponent(() => import('src/components/lagia-components/ItinerarySide.vue'))
  )
  app.component('InnerBanner',
    defineAsyncComponent(() => import('src/components/lagia-components/InnerBanner.vue'))
  )
  app.component('HomeTron',
    defineAsyncComponent(() => import('src/components/lagia-components/HomeTron.vue'))
  )
  app.component('HomeTestimonial',
    defineAsyncComponent(() => import('src/components/lagia-components/HomeTestimonial.vue'))
  )
  app.component('HomePromo',
    defineAsyncComponent(() => import('src/components/lagia-components/HomePromo.vue'))
  )
  app.component('HomePackage',
    defineAsyncComponent(() => import('src/components/lagia-components/HomePackage.vue'))
  )
  app.component('HomeGallery',
    defineAsyncComponent(() => import('src/components/lagia-components/HomeGallery.vue'))
  )
  app.component('HomeDestination',
    defineAsyncComponent(() => import('src/components/lagia-components/HomeDestination.vue'))
  )
  app.component('HomeCounter',
    defineAsyncComponent(() => import('src/components/lagia-components/HomeCounter.vue'))
  )
  app.component('HomeCallActionPromo',
    defineAsyncComponent(() => import('src/components/lagia-components/HomeCallActionPromo.vue'))
  )


  app.component('HomeCallActionOffer',
    defineAsyncComponent(() => import('src/components/lagia-components/HomeCallActionOffer.vue'))
  )
  app.component('HomeCallAction',
    defineAsyncComponent(() => import('src/components/lagia-components/HomeCallAction.vue'))
  )
  app.component('HomeBlog',
    defineAsyncComponent(() => import('src/components/lagia-components/HomeBlog.vue'))
  )
  app.component('GoogleMapPackageSide',
    defineAsyncComponent(() => import('src/components/lagia-components/GoogleMapPackageSide.vue'))
  )
  app.component('FormRegister',
    defineAsyncComponent(() => import('src/components/lagia-components/FormRegister.vue'))
  )
  app.component('FormLogin',
    defineAsyncComponent(() => import('src/components/lagia-components/FormLogin.vue'))
  )
  app.component('FormCareer',
    defineAsyncComponent(() => import('src/components/lagia-components/FormCareer.vue'))
  )
  app.component('FormBookingPackageSide',
    defineAsyncComponent(() => import('src/components/lagia-components/FormBookingPackageSide.vue'))
  )



  app.component('FormBookingPackageFull',
    defineAsyncComponent(() => import('src/components/lagia-components/FormBookingPackageFull.vue'))
  )
  app.component('ExampleList',
    defineAsyncComponent(() => import('src/components/lagia-components/ExampleList.vue'))
  )
  // app.component('ExampleComponent',
  //   defineAsyncComponent(() => import('src/components/lagia-components/ExampleComponent.vue'))
  // )
  app.component('EasyLightbox',
    defineAsyncComponent(() => import('src/components/lagia-components/EasyLightbox.vue'))
  )
  app.component('DestinationRating',
    defineAsyncComponent(() => import('src/components/lagia-components/DestinationRating.vue'))
  )
  app.component('ContactUsGoogleMap',
    defineAsyncComponent(() => import('src/components/lagia-components/ContactUsGoogleMap.vue'))
  )
  app.component('ContactUsForm',
    defineAsyncComponent(() => import('src/components/lagia-components/ContactUsForm.vue'))
  )
  app.component('ConfirmationPaymentBanner',
    defineAsyncComponent(() => import('src/components/lagia-components/ConfirmationPaymentBanner.vue'))
  )
  app.component('ConfirmationPayment',
    defineAsyncComponent(() => import('src/components/lagia-components/ConfirmationPayment.vue'))
  )
  app.component('ConfirmationDetail',
    defineAsyncComponent(() => import('src/components/lagia-components/ConfirmationDetail.vue'))
  )
  app.component('ConfirmationBooking',
    defineAsyncComponent(() => import('src/components/lagia-components/ConfirmationBooking.vue'))
  )
  app.component('CareerDetailSummary',
    defineAsyncComponent(() => import('src/components/lagia-components/CareerDetailSummary.vue'))
  )
  app.component('CareerDetailSend',
    defineAsyncComponent(() => import('src/components/lagia-components/CareerDetailSend.vue'))
  )
  app.component('CareerDetailHow',
    defineAsyncComponent(() => import('src/components/lagia-components/CareerDetailHow.vue'))
  )
  app.component('CallActionPromo',
    defineAsyncComponent(() => import('src/components/lagia-components/CallActionPromo.vue'))
  )
  app.component('CallActionOffer',
    defineAsyncComponent(() => import('src/components/lagia-components/CallActionOffer.vue'))
  )
  app.component('CallActionBenifitCareer',
    defineAsyncComponent(() => import('src/components/lagia-components/CallActionBenifitCareer.vue'))
  )
  app.component('BookingSummary',
    defineAsyncComponent(() => import('src/components/lagia-components/BookingSummary.vue'))
  )
  app.component('BookingProfileForm',
    defineAsyncComponent(() => import('src/components/lagia-components/BookingProfileForm.vue'))
  )
  app.component('BookingPaymentForm',
    defineAsyncComponent(() => import('src/components/lagia-components/BookingPaymentForm.vue'))
  )
  app.component('BookingAddressForm',
    defineAsyncComponent(() => import('src/components/lagia-components/BookingAddressForm.vue'))
  )

  app.component('AboutContent',
    defineAsyncComponent(() => import('src/components/lagia-components/AboutContent.vue'))
  )

  app.component('AboutBrands',
    defineAsyncComponent(() => import('src/components/lagia-components/AboutBrands.vue'))
  )


  // app.component('HomeTron',
  //   defineAsyncComponent(() => import('src/components/lagia-components/HomeTron.vue'))
  // )
  // app.component('HomeDestination',
  //   defineAsyncComponent(() => import('src/components/lagia-components/HomeDestination.vue'))
  // )
  // app.component('HomePackage',
  //   defineAsyncComponent(() => import('src/components/lagia-components/HomePackage.vue'))
  // )
  // app.component('HomeCallActionPromo',
  //   defineAsyncComponent(() => import('src/components/lagia-components/HomeCallActionPromo.vue'))
  // )
  // app.component('HomePromo',
  //   defineAsyncComponent(() => import('src/components/lagia-components/HomePromo.vue'))
  // )
  // app.component('HomeCounter',
  //   defineAsyncComponent(() => import('src/components/lagia-components/HomeCounter.vue'))
  // )
  // app.component('HomeGallery',
  //   defineAsyncComponent(() => import('src/components/lagia-components/HomeGallery.vue'))
  // )
  // app.component('HomeCallActionOffer',
  //   defineAsyncComponent(() => import('src/components/lagia-components/HomeCallActionOffer.vue'))
  // )
  // app.component('HomeBlog',
  //   defineAsyncComponent(() => import('src/components/lagia-components/HomeBlog.vue'))
  // )
  // app.component('HomeTestimonial',
  //   defineAsyncComponent(() => import('src/components/lagia-components/HomeTestimonial.vue'))
  // )
  // app.component('HomeCallAction',
  //   defineAsyncComponent(() => import('src/components/lagia-components/HomeCallAction.vue'))
  // )

  app.component('TombolBalasKomentar',
    defineAsyncComponent(() => import('src/components/TombolBalasKomentar.vue'))
  )

  // app.component('SkeletonTwitch', SkeletonTwitch)

  // app.component('SkeletonTwitch', SkeletonTwitch)

  // app.component('QCurrencyInput', QCurrencyInput)

})
