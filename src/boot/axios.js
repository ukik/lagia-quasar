
import { boot } from 'quasar/wrappers'
import axios from 'axios'

import { Loading, Notify, Cookies, Platform, Screen } from 'quasar'

// const api = axios.create({ baseURL: 'http://localhost:8000' })
import { useAuthStore } from 'src/stores/lagia-stores/auth/AuthStore';
import { useRouterStore } from 'src/stores/lagia-stores/RouterStore'

// import { host } from 'src/boot/common'
import domains from 'src/settings/domains'
const { apiDomain } = domains()
const host = apiDomain

import { storeToRefs } from 'pinia';

export default boot(async ({ app, ssrContext, router, store, urlPath }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const _store = useAuthStore(store)
  const route = useRouterStore(store)
  const { auth } = storeToRefs(_store)
  const { onClearAuth } = _store

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  let cookies = null
  let token = null
  let csrf = null

  const is_cookie_secure = {
    secure: process.env.PROD ? true : false,
    path: '/' // wajib
  }

  axios.defaults.baseURL = host

  axios.defaults.params = {} // wajib ada
  axios.defaults.params['mode'] = 'human' // digunakan untuk merubah createdAt & updatedAt ke diffForHumans

  axios.interceptors.request.use(function (config) {
    // console.log('axios', config.headers)mode

    cookies = process.env.SERVER
      ? Cookies.parseSSR(ssrContext)
      : Cookies // otherwise we're on client

    // config.headers.common['Authorization'] = `Bearer`
    // if(cookies.has('imajora_cookie')) {
    token = cookies.get('accessToken')
    config.headers.common['Authorization'] = `Bearer ${token}`
    // }

    if (cookies.has('imajora_csrf')) {
      csrf = cookies.get('imajora_csrf')
      config.headers.common['imajora_csrf'] = csrf
    }

    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers.post['Content-Type'] = 'multipart/form-data'
    config.headers.post['Content-Type'] = 'application/json'
    config.headers.post['Content-Type'] = 'application/pdf';

    console.log('boot/axios.js A', config)

    return config

  }, function (error) {
    // Loading.hide()
    console.log('boot/axios.js B', error.response)

    const message = err?.response?.data?.meta?.message

    // if(message) {
    //   if(message == "could_not_create_token") {
    //     cookies.remove('imajora_cookie')
    //     cookies.remove('imajora_csrf')
    //   }
    // }

    return Promise.reject(error)
  })


  axios.interceptors.response.use(async function (response) {

    Loading.hide()

    // console.log('boot/axios.js C', response)
    // console.log('axios.interceptors.response.use', response?.data?.data?.accessToken, response?.data?.isLogin, route?.getName)

    if (
      route.getName === '/register' ||
      route.getName === '/login'
    ) {

      // await cookies.set('imajora_csrf', response?.data?.payload?.csrf, is_cookie_secure)
      // await cookies.set('imajora_cookie', response?.data?.payload?.token, is_cookie_secure)

      // if(response?.data?.data?.accessToken) await cookies.set('accessToken', response?.data?.data?.accessToken, is_cookie_secure)
      // await cookies.set('XSRF-TOKEN', response.data.payload.token, is_cookie_secure)
    }

    /*
    switch (response?.data?.meta?.message) {
      case 'login':
        await cookies.set('imajora_csrf', response.data.payload.csrf, is_cookie_secure)
        await cookies.set('imajora_cookie', response.data.payload.token, is_cookie_secure)
        break;
    }
    */

    // always update Login status
    if(response?.data?.isLogin) {
      auth.isLogin = response?.data?.isLogin
      if(response?.data?.data?.accessToken) await cookies.set('accessToken', response?.data?.data?.accessToken, is_cookie_secure)
    } else {
      // dipindah ke pinia saat user click logout
      await onClearAuth()
      await cookies.remove('accessToken')
      if(route.getMeta?.logged) router.replace({ name: '/login' })
    }



    // switch (response?.data?.payload) {
    //   case 'logout':
    //     // await cookies.remove('imajora_cookie')
    //     // await cookies.remove('imajora_csrf')
    //     await cookies.remove('accessToken')

    //     router.replace({ name: 'home' })
    //     break;
    // }



    // if(route.getName != 'auth_login') {
    //   if(response?.data?.init) {
    //     await auth.setInit(response?.data?.init)
    //   }
    // }
    console.log('boot/axios.js C', route, response?.data?.isLogin, route.getMeta)

    return response

  })


}, function (error) {
  // Loading.hide()
  console.log('boot/axios.js C', error?.response)

  try {
    if(error?.response?.status == 401) {
      // dipindah ke pinia saat user click logout
      Cookies.remove('accessToken')
    }

    if (error.response.data) { }
  } catch (err) { }

  return Promise.reject(error.response)
})
