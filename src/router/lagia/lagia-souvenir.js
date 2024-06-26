export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/souvenir/store-list",
      name: "/souvenir/store-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Profile Talent',
      },
      component: () => import("pages/lagia-pages/souvenir/souvenir-store-list.vue"),
    },
    {
      path: "/souvenir/price-list",
      name: "/souvenir/price-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga Talent',
      },
      component: () => import("pages/lagia-pages/souvenir/souvenir-price-list.vue"),
    },
    {
      path: "/souvenir/product-list",
      name: "/souvenir/product-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga Talent',
      },
      component: () => import("pages/lagia-pages/souvenir/souvenir-product-list.vue"),
    },

    {
      path: "/souvenir/store-detail/:slug?",
      name: "/souvenir/store-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga Rental',
      },
      component: () => import("pages/lagia-pages/souvenir/souvenir-store-detail.vue"),
    },
  ]
}
