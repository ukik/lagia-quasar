export default function (store, cookies, ssrContext) {
  return [
    // EMPTY
    {
      path: "/travel/package-common",
      name: "/travel/package-common",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Package Common',
      },
      component: () => import("pages/lagia-pages/travel/package-common.vue"),
    },
    {
      path: "/travel/package-detail",
      name: "/travel/package-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Package Detail',
      },
      component: () => import("pages/lagia-pages/travel/package-detail.vue"),
    },
    {
      path: "/travel/package-promo",
      name: "/travel/package-promo",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Package Promo',
      },
      component: () => import("pages/lagia-pages/travel/package-promo.vue"),
    },
    {
      path: "/travel/single-page",
      name: "/travel/single-page",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Single Page',
      },
      component: () => import("pages/lagia-pages/travel/single-page.vue"),
    },

    {
      path: "/travel/store-list",
      name: "/travel/store-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Travel Vendor',
      },
      component: () => import("pages/lagia-pages/travel/store-list.vue"),
    },
    {
      path: "/travel/price-list",
      name: "/travel/price-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Travel Price',
      },
      component: () => import("pages/lagia-pages/travel/price-list.vue"),
    },
    {
      path: "/travel/store-detail/:slug",
      name: "/travel/store-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Travel Vendor Detail',
      },
      component: () => import("pages/lagia-pages/travel/store-detail.vue"),
    },

  ]
}
