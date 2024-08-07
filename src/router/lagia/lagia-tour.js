export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/tour/store-list",
      name: "/tour/store-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'vendor tour',
      },
      component: () => import("pages/lagia-pages/tour/store-list.vue"),
    },
    {
      path: "/tour/price-list",
      name: "/tour/price-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'list harga',
      },
      component: () => import("pages/lagia-pages/tour/price-list.vue"),
    },

    {
      path: "/tour/product-list",
      name: "/tour/product-list",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'list paket',
      },
      component: () => import("pages/lagia-pages/tour/product-list.vue"),
    },

    {
      path: "/tour/product-detail/:slug/:slug_text?",
      name: "/tour/product-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail vendor',
      },
      component: () => import("pages/lagia-pages/tour/product-detail.vue"),
    },





    {
      path: "/tour/store-detail/:slug/:slug_text?",
      name: "/tour/store-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail vendor',
      },
      component: () => import("pages/lagia-pages/tour/store-detail.vue"),
    },

    {
      path: "/tour/price-detail/:slug/:slug_text?",
      name: "/tour/price-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail harga',
      },
      component: () => import("pages/lagia-pages/tour/price-detail.vue"),
    },
  ]
}
