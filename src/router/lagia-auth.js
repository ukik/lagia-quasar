export default function (store, cookies, ssrContext) {
  return [
    // EMPTY
    {
      path: "/login",
      name: "/login",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Login',
      },
      component: () => import("pages/lagia-pages/dashboard/login.vue"),
    },
    {
      path: "/register",
      name: "/register",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Register',
      },
      component: () => import("pages/lagia-pages/dashboard/register.vue"),
    },
  ]
}
