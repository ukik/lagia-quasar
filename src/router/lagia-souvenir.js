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
  ]
}
