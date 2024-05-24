import { defineStore } from 'pinia';
import axios from 'axios'

export const useRouterStore = defineStore('router', {
  state: () => ({
    // email: '',
    // password: '',
    // payload: {
    //   "user": {
    //       "id": null,
    //       "name": "",
    //       "role": "",
    //       "avatar": "",
    //       "email_verified_at": null,
    //       "phone_verified_at": null
    //   },
    //   "logged": false,
    //   "token": "",
    //   "csrf": "",
    //   "type": ""
    // },
    // loading: false,
    // loading_create: false,
    // loading_login: false,
    route: {
      name:'',
      path:'',
      query:{
        lang:'',
      },
      params:'',
    },
  }),
  getters: {
    getRouter(state) {
      return state.route;
    },
    getName(state) {
      return state.route.name;
    },
    getPath(state) {
      return state.route.path;
    },
    getQuery(state) {
      return state.route.query;
    },
    getParams(state) {
      return state.route.params;
    },
  },
  actions: {
    async setRouter(value) {
      this.route = value
      return

      // if(this.loading) return

      // this.loading = true

      // const results = await axios.get(`api/auth/init`)
      // .catch(err => {
      //   console.log(err?.response)
      //   const message = err?.response?.data?.meta?.message
      //   if(message) {
      //     if(message == "could_not_create_token") {
      //       this.payload = {
      //         "user": {
      //             "id": null,
      //             "name": "",
      //             "role": "",
      //             "avatar": "",
      //             "email_verified_at": null,
      //             "phone_verified_at": null
      //         },
      //         "logged": false,
      //         "token": "",
      //         "csrf": "",
      //         "type": ""
      //       }
      //     }
      //   }
      //   // errorNotify()
      //   return null
      // })

      // this.loading = false

      // if(!results) return
      // if(!results.data.payload) return

      // this.payload = results.data.payload

      // return results.data.payload
    },
    whateverAction (value) {
      setTimeout(() => {
        // this.router.push(value)
      }, 5000);
    }
  },
});
