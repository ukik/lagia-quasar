export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/transport/vehicle-list/1",
      name: "/transport/vehicle-list/1",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Kendaraan Rental',
      },
      component: () => import("pages/lagia-pages/transport-1/transport-vehicle-list.vue"),
    },
    {
      path: "/transport/rental-list/1",
      name: "/transport/rental-list/1",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Vendor Rental',
      },
      component: () => import("pages/lagia-pages/transport-1/transport-rental-list.vue"),
    },
    {
      path: "/transport/driver-list/1",
      name: "/transport/driver-list/1",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Driver Rental',
      },
      component: () => import("pages/lagia-pages/transport-1/transport-driver-list.vue"),
    },
    {
      path: "/transport/price-list/1",
      name: "/transport/price-list/1",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga Rental',
      },
      component: () => import("pages/lagia-pages/transport-1/transport-price-list.vue"),
    },
  ]
}
