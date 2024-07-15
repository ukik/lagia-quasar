export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/souvenir/store-list",
      name: "/souvenir/store-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'vendor souvenir',
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
        title: 'list harga',
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
        title: 'list produk',
      },
      component: () => import("pages/lagia-pages/souvenir/souvenir-product-list.vue"),
    },

    {
      path: "/souvenir/store-detail/:slug/:slug_text?",
      name: "/souvenir/store-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail vendor',
      },
      component: () => import("pages/lagia-pages/souvenir/souvenir-store-detail.vue"),
    },

    {
      path: "/souvenir/price-detail/:slug/:slug_text?",
      name: "/souvenir/price-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail harga',
      },
      component: () => import("pages/lagia-pages/souvenir/souvenir-price-detail.vue"),
    },
  ]
}
