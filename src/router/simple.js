import { useAuthStore } from 'src/stores/auth/auth';

export default function (store, cookies, ssrContext) {
  const auth = useAuthStore(store)
  return [

    // { path: '/pinia', component: () => import('pages/pinia.vue') },
    { path: '/vue3-virtual-list', component: () => import('pages/vue3-virtual-list.vue') }, // BERAT & LAMBAT
    { path: '/MansoryGridWall', component: () => import('pages/MansoryGridWall.vue') }, // BELUM DAPAT HINT UNTUK UKURAN CONTAINER

    { path: '/DynamicScroller', component: () => import('pages/DynamicScroller.vue') },
    { path: '/RecycleScroller', component: () => import('pages/RecycleScroller.vue') },
    { path: '/VirtualScrollGrid', component: () => import('pages/VirtualScrollGrid.vue') },

    { path: '/vue-virtual-scroll-grid', component: () => import('pages/vue-virtual-scroll-grid.vue') }, // BAGUS

    {
      path: '/simple',
      component: () => import('layouts/SimpleLayout.vue'),
      children: [
        {
          path: 'verify/:token',
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'LoginPage',
          },
          component: () => import('pages/IndexPage.vue')
        },
      ]
    }
  ]
}
