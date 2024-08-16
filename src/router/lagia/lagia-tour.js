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
        title: 'list tour',
      },
      component: () => import("pages/lagia-pages/tour/product-list.vue"),
    },

    {
      path: "/tour/product-detail/:slug/:slug_text",
      name: "/tour/product-detail",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail produk',
      },
      component: () => import("pages/lagia-pages/tour/product-detail.vue"),
    },

    {
      path: "/tour/product-order/:slug/:slug_text",
      name: "/tour/product-order",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'pesan',
      },
      component: () => import("pages/lagia-pages/tour/product-order.vue"),
    },


    {
      path: "/tour/cart",
      name: "/tour/cart",
      meta: {
        ssr: true,
        logged: true,
        role: '',
        title: 'keranjang',
      },
      component: () => import("pages/lagia-pages/tour/cart.vue"),
    },
    {
      path: "/tour/booking",
      name: "/tour/booking",
      meta: {
        ssr: true,
        logged: true,
        role: '',
        title: 'list booking',
      },
      component: () => import("pages/lagia-pages/tour/booking.vue"),
    },

    {
      path: "/tour/confirmation/:id",
      name: "/tour/confirmation",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'detail invoice',
      },
      component: () => import("pages/lagia-pages/tour/confirmation.vue"),
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
