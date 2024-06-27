import lagia_auth from './lagia-auth';
import lagia_travel from './lagia-travel';
import lagia_pages from './lagia-pages';
import lagia_transport from './lagia-transport';
import lagia_tourism from './lagia-tourism';
import lagia_talent from './lagia-talent';
import lagia_souvenir from './lagia-souvenir';
import lagia_culinary from './lagia-culinary';
import lagia_lodge from './lagia-lodge';
import lagia_transport_1 from './lagia-transport-1';

export default function (store, cookies, ssrContext) {
  return [
    {
      path: '/',
      component: () => import('layouts/LagiaLayout.vue'),
      children: [
        ...lagia_auth(store, cookies, ssrContext),
        ...lagia_travel(store, cookies, ssrContext),
        ...lagia_transport(store, cookies, ssrContext),
        ...lagia_transport_1(store, cookies, ssrContext),
        ...lagia_pages(store, cookies, ssrContext),
        ...lagia_tourism(store, cookies, ssrContext),
        ...lagia_talent(store, cookies, ssrContext),
        ...lagia_souvenir(store, cookies, ssrContext),
        ...lagia_culinary(store, cookies, ssrContext),
        ...lagia_lodge(store, cookies, ssrContext),

        {
          path: "", // /lagia/index
          name: "/lagia/index",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia index',
          },
          component: () => import("pages/lagia-pages/index.vue"),
        },
        {
          path: "/lagia/team", // /lagia/index
          name: "/lagia/team",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia team',
          },
          component: () => import("pages/lagia-pages/team.vue"),
        },
        {
          path: "/lagia/destination", // /lagia/index
          name: "/lagia/destination",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia team',
          },
          component: () => import("pages/lagia-pages/destination.vue"),
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
