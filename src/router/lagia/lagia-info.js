export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/info/single-page/:slug/:id",
      name: "/info/single-page",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'single page',
      },
      component: () => import("pages/lagia-pages/info/single-page.vue"),
    },

    {
      path: "/info/privacy-policy/:slug/:id",
      name: "/info/privacy-policy",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Kebijakan Privasi',
      },
      component: () => import("pages/lagia-pages/info/single-page.vue"),
    },

    {
      path: "/info/terms-condition/:slug/:id",
      name: "/info/terms-condition",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Syarat Ketentuan',
      },
      component: () => import("pages/lagia-pages/info/single-page.vue"),
    },
  ]
}
