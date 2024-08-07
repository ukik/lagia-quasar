export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/talent/profile-list",
      name: "/talent/profile-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'vendor talent',
      },
      component: () => import("pages/lagia-pages/talent/talent-profile-list.vue"),
    },

    {
      path: "/talent/skill-list",
      name: "/talent/skill-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'list skill',
      },
      component: () => import("pages/lagia-pages/talent/talent-skill-list.vue"),
    },

    {
      path: "/talent/price-list",
      name: "/talent/price-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'list harga',
      },
      component: () => import("pages/lagia-pages/talent/talent-price-list.vue"),
    },

    {
      path: "/talent/profile-detail/:slug/:slug_text?",
      name: "/talent/profile-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail talent',
      },
      component: () => import("pages/lagia-pages/talent/talent-profile-detail.vue"),
    },

    {
      path: "/talent/price-detail/:slug/:slug_text?",
      name: "/talent/price-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail harga',
      },
      component: () => import("pages/lagia-pages/talent/talent-price-detail.vue"),
    },

  ]
}
