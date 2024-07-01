export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/talent/profile-list",
      name: "/talent/profile-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Profile Talent',
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
        title: 'Talent List',
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
        title: 'Harga Talent',
      },
      component: () => import("pages/lagia-pages/talent/talent-price-list.vue"),
    },

    {
      path: "/talent/profile-detail/:slug?",
      name: "/talent/profile-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga Rental',
      },
      component: () => import("pages/lagia-pages/talent/talent-profile-detail.vue"),
    },


  ]
}
