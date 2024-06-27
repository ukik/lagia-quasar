export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/transport/vehicle-list",
      name: "/transport/vehicle-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Kendaraan Rental',
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
        title: 'Vendor Rental',
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
        title: 'Harga Rental',
      },
      component: () => import("pages/lagia-pages/transport/transport-price-list.vue"),
    },
  ]
}
