export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/tourism/venue-list",
      name: "/tourism/venue-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Destinasi Wisata',
      },
      component: () => import("pages/lagia-pages/tourism/tourism-venue-list.vue"),
    },
    {
      path: "/tourism/facilities-list",
      name: "/tourism/facilities-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'List Fasilitas',
      },
      component: () => import("pages/lagia-pages/tourism/tourism-facilities-list.vue"),
    },
    {
      path: "/tourism/price-list",
      name: "/tourism/price-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga Ticket Wisata',
      },
      component: () => import("pages/lagia-pages/tourism/tourism-price-list.vue"),
    },
    {
      path: "/tourism/venue-detail/:slug?",
      name: "/tourism/venue-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga Rental',
      },
      component: () => import("pages/lagia-pages/tourism/tourism-venue-detail.vue"),
    },



    {
      path: "/tourism/price-list-2",
      name: "/tourism/price-list-2",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga Ticket Wisata',
      },
      component: () => import("pages/lagia-pages/tourism/tourism-price-list-2.vue"),
    },
  ]
}
