export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/culinary/store-list",
      name: "/culinary/store-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Profile Talent',
      },
      component: () => import("pages/lagia-pages/culinary/culinary-store-list.vue"),
    },
    {
      path: "/culinary/price-list",
      name: "/culinary/price-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga Talent',
      },
      component: () => import("pages/lagia-pages/culinary/culinary-price-list.vue"),
    },

    {
      path: "/culinary/product-list",
      name: "/culinary/product-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga product',
      },
      component: () => import("pages/lagia-pages/culinary/culinary-product-list.vue"),
    },

    {
      path: "/culinary/store-detail/:slug?",
      name: "/culinary/store-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Harga Rental',
      },
      component: () => import("pages/lagia-pages/culinary/culinary-store-detail.vue"),
    },
  ]
}
