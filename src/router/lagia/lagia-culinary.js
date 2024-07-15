export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/culinary/store-list",
      name: "/culinary/store-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'vendor kuliner',
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
        title: 'list harga',
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
        title: 'list produk',
      },
      component: () => import("pages/lagia-pages/culinary/culinary-product-list.vue"),
    },

    {
      path: "/culinary/store-detail/:slug/:slug_text?",
      name: "/culinary/store-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail vendor',
      },
      component: () => import("pages/lagia-pages/culinary/culinary-store-detail.vue"),
    },

    {
      path: "/culinary/price-detail/:slug/:slug_text?",
      name: "/culinary/price-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail harga',
      },
      component: () => import("pages/lagia-pages/culinary/culinary-price-detail.vue"),
    },
  ]
}
