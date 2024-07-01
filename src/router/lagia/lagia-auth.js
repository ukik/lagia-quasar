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
    {
      path: "/forgot-password",
      name: "/forgot-password",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Forget Password',
      },
      component: () => import("pages/lagia-pages/dashboard/forgot-password.vue"),
    },
    {
      path: "/reset-password",
      name: "/reset-password",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Reset Password',
      },
      component: () => import("pages/lagia-pages/dashboard/reset-password.vue"),
    },
    {
      path: "/verify",
      name: "/verify",
      meta: {
        ssr: true,
        logged: false,
        role: '',
        title: 'Email Verification',
      },
      component: () => import("pages/lagia-pages/dashboard/verify.vue"),
    },
  ]
}
