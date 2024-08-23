import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { Cookies } from 'quasar'
import routes from './routes';
// import simple from './simple';
// import business from './business';
import lagia from './lagia';


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
// import { useAuthStore } from 'src/stores/auth/auth';

function isNullOrUndefined(obj) {
  return typeof obj === "undefined" || obj === null;
}

function isNotNullOrUndefined(obj) {
  return typeof obj !== "undefined" || obj !== null;
}

function backTop(to) {
  if (isNotNullOrUndefined(to.query.lockY)) {
    if (to.query.lockY) {
      return isNaN(to.query.lockY) ? to.meta.savedPositionY : to.query.lockY
    }
    return 0
  }
}



export default route(function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies // otherwise we're on client

  const Router = createRouter({
    scrollBehavior(to, from, savedPosition) {

      if (savedPosition) {
        console.log('savedPosition YES', savedPosition)
        return savedPosition;
      } else {
        console.log('savedPosition NO', savedPosition)
        const container = document.querySelector('#PriceReference')
        if(container) {
          return {
            // could also be
            // el: document.getElementById('main'),
            el: '#PriceReference',
            // 10px above the element
            top: 10,
          }
        }
        const ANCHOR = document.querySelector('#ANCHOR')
        if(ANCHOR) {
          return {
            // could also be
            // el: document.getElementById('main'),
            el: '#ANCHOR',
            // 10px above the element
            top: 10,
          }
        }

        return savedPosition;
        return { top: 0 };
      }

    },
    // scrollBehavior: () => ({ left: 0, top: 0 }),
    // scrollBehavior: () => ({ x: 0, y: 0 }),
    // scrollBehavior(to, from, savedPosition) {
    //   console.log('scrollBehavior', to)
    //   if (to.name == 'artikel') {
    //     setTimeout(() => {
    //       window.scrollTo({
    //         top: 0
    //       });
    //     }, 250)
    //     return
    //   }
    //   if (to.query.footerY) {
    //     setTimeout(() => {
    //       window.scrollTo({
    //         top: 0
    //       });
    //     }, 250)
    //     return
    //   }

    //   // console.log('scrollBehavior', from.meta.savedPositionY, to.meta.savedPosition, savedPosition, from.meta.keepAlive, document.body.scrollTop)
    //   if (savedPosition) {
    //     return savedPosition;
    //   } else {
    //     if (from.meta.keepAlive) {
    //       from.meta.savedPosition = document.body.scrollTop;
    //     }
    //     return {
    //       x: 0,
    //       y: backTop(to), //to.meta.savedPosition || 0
    //     };
    //   }
    //   // console.log('savedPositionY from', from.name, from.meta.savedPositionY)
    //   // console.log('savedPositionY to', to.name, to.meta.savedPositionY)
    //   // console.log('scrollY', isNullOrUndefined(to.query.scrollY))
    //   // return {
    //   //   x: 0,
    //   //   y: isNullOrUndefined(to.query.scrollY) ? to.meta.savedPositionY : to.query.scrollY
    //   // };
    // },

    // routes,
    routes: [
      ...routes(store, cookies, ssrContext),
      // ...business(store, cookies, ssrContext),
      ...lagia(store, cookies, ssrContext),
      // ...simple(store, cookies, ssrContext),
    ],

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
