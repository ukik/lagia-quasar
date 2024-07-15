export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/tourism/venue-list",
      name: "/tourism/venue-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'vendor wisata',
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
        title: 'list fasilitas',
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
        title: 'list harga',
      },
      component: () => import("pages/lagia-pages/tourism/tourism-price-list.vue"),
    },
    {
      path: "/tourism/venue-detail/:slug/:slug_text?",
      name: "/tourism/venue-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail venue',
      },
      component: () => import("pages/lagia-pages/tourism/tourism-venue-detail.vue"),
    },
    {
      path: "/tourism/price-detail/:slug/:slug_text?",
      name: "/tourism/price-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail harga',
      },
      component: () => import("pages/lagia-pages/tourism/tourism-price-detail.vue"),
    },

    {
      path: "/tourism/price-list-2",
      name: "/tourism/price-list-2",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'list harga 2',
      },
      component: () => import("pages/lagia-pages/tourism/tourism-price-list-2.vue"),
    },
  ]
}
