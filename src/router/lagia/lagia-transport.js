export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/transport/vehicle-list",
      name: "/transport/vehicle-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'vendor rental',
      },
      component: () => import("pages/lagia-pages/transport/transport-vehicle-list.vue"),
    },
    {
      path: "/transport/rental-list",
      name: "/transport/rental-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'list rental',
      },
      component: () => import("pages/lagia-pages/transport/transport-rental-list.vue"),
    },
    // {
    //   path: "/transport/driver-list",
    //   name: "/transport/driver-list",
    //   meta: {
    //     ssr: true,
    //     logged: false,
    //     role: '',
    //     title: 'Driver Rental',
    //   },
    //   component: () => import("pages/lagia-pages/transport/transport-driver-list.vue"),
    // },
    {
      path: "/transport/price-list",
      name: "/transport/price-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'list harga',
      },
      component: () => import("pages/lagia-pages/transport/transport-price-list.vue"),
    },
    {
      path: "/transport/rental-detail/:slug/:slug_text?",
      name: "/transport/rental-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail vendor',
      },
      component: () => import("pages/lagia-pages/transport/transport-rental-detail.vue"),
    },
    {
      path: "/transport/price-detail/:slug/:slug_text?",
      name: "/transport/price-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail harga',
      },
      component: () => import("pages/lagia-pages/transport/transport-price-detail.vue"),
    },


  ]
}
