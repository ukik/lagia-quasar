export default function (store, cookies, ssrContext) {
  return [
    {
      path: "/info/single-page/:slug/:id",
      name: "/info/single-page",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Profile Talent',
      },
      component: () => import("pages/lagia-pages/info/single-page.vue"),
    },
  ]
}
