export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/lodge/profile-list",
      name: "/lodge/profile-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Destinasi Wisata',
      },
      component: () => import("pages/lagia-pages/lodge/lodge-profile-list.vue"),
    },
    {
      path: "/lodge/room-list",
      name: "/lodge/room-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Destinasi Wisata',
      },
      component: () => import("pages/lagia-pages/lodge/lodge-room-list.vue"),
    },
    {
      path: "/lodge/price-list",
      name: "/lodge/price-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga Ticket Wisata',
      },
      component: () => import("pages/lagia-pages/lodge/lodge-price-list.vue"),
    },

  ]
}
