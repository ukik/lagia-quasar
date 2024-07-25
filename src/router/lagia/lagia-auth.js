// import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useAuthStore } from "src/stores/auth/auth"
import { storeToRefs } from 'pinia';

export default function (store, cookies, ssrContext) {

  const authStore = useAuthStore(store)
  // const { auth, getIsLogin, getLoading } = storeToRefs(authStore)

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
  ]
}
