// import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useAuthStore } from "src/stores/auth/auth"
import { storeToRefs } from 'pinia';

export default function (store, cookies, ssrContext) {

  const authStore = useAuthStore(store)
  const { getAuth } = storeToRefs(authStore);
  console.log('ROUTER LAGIA AUTH', store.state.value)

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
      beforeEnter: (to, from, next) => {
        console.log('lagia-auth', authStore?.is_logged)

        if (to.meta.logged && authStore?.is_logged) {
          // console.log('beforeEach boot/lagia-.js 1')
          next({ name: "/lagia/index" })
        } else {
          next()
        }
        // if(to?.name == '/lagia/career-detail') {
        //   next({ name: '/lagia/career' })
        // } else {
        //   next()
        // }
      }
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

    {
      path: "/lagia/dashboard",
      name: "/lagia/dashboard",
      meta: {
        ssr: false,
        logged: false,
        role: '',
        title: 'dashboard',
      },
      component: () => import("pages/lagia-pages/dashboard/dashboard.vue"),
    },
    {
      path: "/edit/customer",
      name: "/edit/customer",
      meta: {
        ssr: false,
        logged: true,
        role: '',
        title: 'Pelanggan',
      },
      component: () => import("pages/lagia-pages/dashboard/edit-customer.vue"),
    },
    {
      path: "/edit/email",
      name: "/edit/email",
      meta: {
        ssr: false,
        logged: true,
        role: '',
        title: 'Sunting Email',
      },
      component: () => import("pages/lagia-pages/dashboard/edit-email.vue"),
    },
    // {
    //   path: "/re-request-verification",
    //   name: "/re-request-verification",
    //   meta: {
    //     ssr: false,
    //     logged: true,
    //     role: '',
    //     title: 'Pelanggan',
    //   },
    //   component: () => import("pages/lagia-pages/dashboard/re-request-verification.vue"),
    // },








    // DI BAWAH BELUM DI PROSES
    {
      path: "/edit/account",
      name: "/edit/account",
      meta: {
        ssr: false,
        logged: true,
        role: '',
        title: 'Akun',
      },
      component: () => import("pages/lagia-pages/dashboard/edit-account.vue"),
    },
    {
      path: "/edit/phone",
      name: "/edit/phone",
      meta: {
        ssr: false,
        logged: true,
        role: '',
        title: 'Sunting Telepon',
      },
      component: () => import("pages/lagia-pages/dashboard/edit-phone.vue"),
    },

    // {
    //   path: "/edit/password",
    //   name: "/edit/password",
    //   meta: {
    //     ssr: false,
    //     logged: true,
    //     role: '',
    //     title: 'Sunting Password',
    //   },
    //   component: () => import("pages/lagia-pages/dashboard/edit-password.vue"),
    // },

  ]
}
