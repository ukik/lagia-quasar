export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/lodge/profile-list",
      name: "/lodge/profile-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'vendor hotel',
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
        title: 'list kamar',
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
        title: 'list harga',
      },
      component: () => import("pages/lagia-pages/lodge/lodge-price-list.vue"),
    },

    {
      path: "/lodge/profile-detail/:slug/:slug_text?",
      name: "/lodge/profile-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail vendor',
      },
      component: () => import("pages/lagia-pages/lodge/lodge-profile-detail.vue"),
    },

    {
      path: "/lodge/price-detail/:slug/:slug_text?",
      name: "/lodge/price-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail harga',
      },
      component: () => import("pages/lagia-pages/lodge/lodge-price-detail.vue"),
    },
  ]
}
