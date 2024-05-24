export default function (store, cookies, ssrContext) {
  return [
    {
      path: '/',
      component: () => import('layouts/LagiaLayout.vue'),
      children: [

        // EMPTY
        {
          path: "/lagia/index",
          name: "lagia/index",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia index',
          },
          component: () => import("pages/pages/index.vue"),
        },
        {
          path: "/reels",
          name: "reels",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'reels',
          },
          component: () => import("pages/EmptyPage.vue"),
        },
        {
          path: "/explore",
          name: "explore",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'explore',
          },
          component: () => import("pages/EmptyPage.vue"),
        },
        {
          path: "/marketplace",
          name: "marketplace",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'marketplace',
          },
          component: () => import("pages/EmptyPage.vue"),
        },

        {
          path: "/venua",
          name: "venua",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'venua',
          },
          component: () => import("pages/EmptyPage.vue"),
        },
        {
          path: "/agenda",
          name: "agenda",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'agenda',
          },
          component: () => import("pages/EmptyPage.vue"),
        },
        {
          path: "/community",
          name: "community",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'community',
          },
          component: () => import("pages/EmptyPage.vue"),
        },
        {
          path: "/learning",
          name: "learning",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'learning',
          },
          component: () => import("pages/EmptyPage.vue"),
        },
        {
          path: "/business",
          name: "business",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'business',
          },
          component: () => import("pages/EmptyPage.vue"),
        },

        {
          path: "/message",
          name: "message",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'message',
          },
          component: () => import("pages/EmptyPage.vue"),
        },
        {
          path: "/notification",
          name: "notification",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'notification',
          },
          component: () => import("pages/EmptyPage.vue"),
        },

      ]
    }
  ]
}
