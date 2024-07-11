import lagia_auth from './lagia-auth';
import lagia_travel from './lagia-travel';
import lagia_pages from './lagia-pages';
import lagia_transport from './lagia-transport';
import lagia_tourism from './lagia-tourism';
import lagia_talent from './lagia-talent';
import lagia_souvenir from './lagia-souvenir';
import lagia_culinary from './lagia-culinary';
import lagia_lodge from './lagia-lodge';
import lagia_info from './lagia-info';

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
        ...lagia_info(store, cookies, ssrContext),

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
          path: "/lagia/404",
          name: "/lagia/404",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia 404',
          },
          component: () => import("pages/lagia-pages/404.vue"),
        },
        {
          path: "/lagia/about",
          name: "/lagia/about",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia about',
          },
          component: () => import("pages/lagia-pages/about.vue"),
        },
        {
          path: "/lagia/booking",
          name: "/lagia/booking",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia booking',
          },
          component: () => import("pages/lagia-pages/booking.vue"),
        },
        {
          path: "/lagia/career-detail",
          name: "/lagia/career-detail",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia career detail',
          },
          component: () => import("pages/lagia-pages/career-detail.vue"),
        },
        {
          path: "/lagia/career",
          name: "/lagia/career",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia about',
          },
          component: () => import("pages/lagia-pages/career.vue"),
        },
        {
          path: "/lagia/cart",
          name: "/lagia/cart",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia cart',
          },
          component: () => import("pages/lagia-pages/cart.vue"),
        },
        {
          path: "/lagia/comming-soon",
          name: "/lagia/comming-soon",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia comming soon',
          },
          component: () => import("pages/lagia-pages/comming-soon.vue"),
        },
        {
          path: "/lagia/confirmation",
          name: "/lagia/confirmation",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia confirmation',
          },
          component: () => import("pages/lagia-pages/confirmation.vue"),
        },
        {
          path: "/lagia/contact-us",
          name: "/lagia/contact-us",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia contact us',
          },
          component: () => import("pages/lagia-pages/contact-us.vue"),
        },
        // {
        //   path: "/lagia/demo",
        //   name: "/lagia/demo",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'lagia demo',
        //   },
        //   component: () => import("pages/lagia-pages/demo.vue"),
        // },
        {
          path: "/lagia/destination",
          name: "/lagia/destination",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia destination',
          },
          component: () => import("pages/lagia-pages/destination.vue"),
        },
        {
          path: "/lagia/faq",
          name: "/lagia/faq",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia faq',
          },
          component: () => import("pages/lagia-pages/faq.vue"),
        },
        {
          path: "/lagia/gallery",
          name: "/lagia/gallery",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia gallery',
          },
          component: () => import("pages/lagia-pages/gallery.vue"),
        },
        // {
        //   path: "/lagia/masonry",
        //   name: "/lagia/masonry",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'lagia masonry',
        //   },
        //   component: () => import("pages/lagia-pages/masonry.vue"),
        // },
        // {
        //   path: "/lagia/package-common",
        //   name: "/lagia/package-common",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'lagia package common',
        //   },
        //   component: () => import("pages/lagia-pages/package-common.vue"),
        // },
        // {
        //   path: "/lagia/package-detail",
        //   name: "/lagia/package-detail",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'lagia package detail',
        //   },
        //   component: () => import("pages/lagia-pages/package-detail.vue"),
        // },
        {
          path: "/lagia/package-promo",
          name: "/lagia/package-promo",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia package promo',
          },
          component: () => import("pages/lagia-pages/package-promo.vue"),
        },
        // {
        //   path: "/lagia/pinia",
        //   name: "/lagia/pinia",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'lagia pinia',
        //   },
        //   component: () => import("pages/lagia-pages/pinia.vue"),
        // },
        {
          path: "/lagia/profile",
          name: "/lagia/profile",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia profile',
          },
          component: () => import("pages/lagia-pages/profile.vue"),
        },
        // {
        //   path: "/lagia/routes",
        //   name: "/lagia/routes",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'lagia routes',
        //   },
        //   component: () => import("pages/lagia-pages/routes.vue"),
        // },
        {
          path: "/lagia/service",
          name: "/lagia/service",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia service',
          },
          component: () => import("pages/lagia-pages/service.vue"),
        },
        {
          path: "/lagia/single-page",
          name: "/lagia/single-page",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia single page',
          },
          component: () => import("pages/lagia-pages/single-page.vue"),
        },
        {
          path: "/lagia/team",
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
          path: "/lagia/testimonial",
          name: "/lagia/testimonial",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia testimonial',
          },
          component: () => import("pages/lagia-pages/testimonial.vue"),
        },
        // {
        //   path: "/lagia/todopinia",
        //   name: "/lagia/todopinia",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'lagia todopinia',
        //   },
        //   component: () => import("pages/lagia-pages/TodoPinia.vue"),
        // },
        // {
        //   path: "/lagia/todopiniaversib",
        //   name: "/lagia/todopiniaversib",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'lagia todopiniaversib',
        //   },
        //   component: () => import("pages/lagia-pages/TodoPiniaVersiB.vue"),
        // },
        {
          path: "/lagia/transaction-history",
          name: "/lagia/transaction-history",
          meta: {
            ssr: true,
            logged: false,
            role: '',
            title: 'lagia transaction history',
          },
          component: () => import("pages/lagia-pages/transaction-history.vue"),
        },









        // {
        //   path: "/explore",
        //   name: "explore",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'explore',
        //   },
        //   component: () => import("pages/EmptyPage.vue"),
        // },
        // {
        //   path: "/marketplace",
        //   name: "marketplace",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'marketplace',
        //   },
        //   component: () => import("pages/EmptyPage.vue"),
        // },

        // {
        //   path: "/venua",
        //   name: "venua",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'venua',
        //   },
        //   component: () => import("pages/EmptyPage.vue"),
        // },
        // {
        //   path: "/agenda",
        //   name: "agenda",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'agenda',
        //   },
        //   component: () => import("pages/EmptyPage.vue"),
        // },
        // {
        //   path: "/community",
        //   name: "community",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'community',
        //   },
        //   component: () => import("pages/EmptyPage.vue"),
        // },
        // {
        //   path: "/learning",
        //   name: "learning",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'learning',
        //   },
        //   component: () => import("pages/EmptyPage.vue"),
        // },
        // {
        //   path: "/business",
        //   name: "business",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'business',
        //   },
        //   component: () => import("pages/EmptyPage.vue"),
        // },

        // {
        //   path: "/message",
        //   name: "message",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'message',
        //   },
        //   component: () => import("pages/EmptyPage.vue"),
        // },
        // {
        //   path: "/notification",
        //   name: "notification",
        //   meta: {
        //     ssr: true,
        //     logged: false,
        //     role: '',
        //     title: 'notification',
        //   },
        //   component: () => import("pages/EmptyPage.vue"),
        // },

      ]
    }
  ]
}
