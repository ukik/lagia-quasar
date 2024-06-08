export default function (store, cookies, ssrContext) {
  return [
    // EMPTY
    {
      path: "/service",
      name: "/service",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Package Common',
      },
      component: () => import("pages/lagia-pages/service.vue"),
    },
  ]
}
