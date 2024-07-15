// import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from 'src/stores/auth/auth';

export default function (store, cookies, ssrContext) {
  console.log("conpas jtccm");
  const auth = useAuthStore(store)
  return [
    // {
    //   path: '/demo',
    //   component: () => import('layouts/MainLayout.vue'),
    //   children: [
    //     { path: '', component: () => import('pages/IndexPage.vue') }
    //   ]
    // },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue'),
      // redirect: '/not-found',
      beforeEnter: (to, from, next) => {
        next({ name: '/not-found'})
      }
    }

    // {
    //   path: '/:catchAll(.*)*',
    //   component: () => import('layouts/LagiaLayout.vue'),
    //   children: [
    //     {
    //       path: '',
    //       component: () => import("pages/lagia-pages/404.vue"),
    //     }
    //   ]
    // }
  ]
}
