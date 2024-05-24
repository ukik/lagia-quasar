import { defineStore } from 'pinia';
import axios from 'axios'
import { useRouterStore } from 'src/stores/router-store'
import { Loading, Notify, Cookies, QSpinnerClock, Platform } from 'quasar'

function errorNotify() {
  Notify.create({
    message: 'Proses Gagal',
    caption: 'something error happened',
    color: 'negative',
    icon: 'highlight_off',
    position: 'top',
  })
}

const pagination = {
	current_page: null,
	first_page_url: null,
	from: null,
	last_page: null,
	last_page_url: null,
	links: null,
	next_page_url: null,
	path: null,
	per_page: null,
	prev_page_url: null,
	to: null,
	total: null,
}

const user = {
  id: null,
  name: null,
}

export const useListStore = defineStore('follow-list', {
  state: () => ({
    content: [],
    pagination,
    loading_follow: false,
    loading: false,
    user,
  }),
  getters: {
    get_content: (state) => state.content,
    get_current_page: (state) => state.pagination?.current_page,
    get_next_page_url: (state) => state.pagination?.next_page_url,

    get_lightbox: (state) => {
      let imgs = []
      state.detail.images.forEach(element => {
        imgs.push(element.file)
      });
      return imgs
    }
  },
  actions: {
    async refresh (payload = null) {

      if(this.loading) return

      const { user_id } = useRouterStore().getParams // gak support preFetch

      this.loading = true

      const results = await axios.get(`api/profile/activity/follow/${user_id}?page=1`)
      .catch(err => {
        console.log(err)
        errorNotify()
        return null
      })

      console.log(results)

      this.loading = false

      if(!results) return

      if(results.data.payload.content?.data.length > 0) {

        const response = results.data.payload.content

        this.pagination = {
          current_page: response.current_page,
          first_page_url: response.first_page_url,
          from: response.from,
          last_page: response.last_page,
          last_page_url: response.last_page_url,
          links: response.links,
          next_page_url: response.next_page_url,
          path: response.path,
          per_page: response.per_page,
          prev_page_url: response.prev_page_url,
          to: response.to,
          total: response.total,
        }

        this.content = response.data
        this.user = results.data.payload.user
      }
    },

    async request (payload = null) {
      console.log(this.content)
      // biar gak double init tiap v-if di jalankan
      if(this.content.length > 0) return

      if(this.loading) return

      const { user_id } = useRouterStore().getParams // gak support preFetch

      this.loading = true

      const results = await axios.get(`api/profile/activity/follow/${user_id}?page=${Number(this.pagination.current_page) + 1}`)
      .catch(err => {
        console.log(err)
        errorNotify()
        return null
      })

      console.log(results)

      this.loading = false

      if(!results) return

      if(results.data.payload.content?.data.length > 0) {

        const response = results.data.payload.content

        this.pagination = {
          current_page: response.current_page,
          first_page_url: response.first_page_url,
          from: response.from,
          last_page: response.last_page,
          last_page_url: response.last_page_url,
          links: response.links,
          next_page_url: response.next_page_url,
          path: response.path,
          per_page: response.per_page,
          prev_page_url: response.prev_page_url,
          to: response.to,
          total: response.total,
        }

        if(this.content.length > 0) {
          this.content = [
            ...this.content,
            ...response.data,
          ]
          return
        }

        this.content = response.data
        this.user = results.data.payload.user
        // this.content.push(response.data)
      }
    },

    async request_more () {
      if(this.loading) return

      const next_page = this.pagination.last_page > this.pagination.current_page ? (Number(this.pagination.current_page) + 1) : this.pagination.last_page

      this.loading = true

      const { user_id } = useRouterStore().getParams // gak support preFetch

      const results = await axios.get(`api/profile/activity/follow/${user_id}?page=${next_page}`)
      .catch(err => {
        errorNotify()
        return null
      })

      this.loading = false

      if(!results) return

      if(results.data.payload.content?.data.length > 0) {

        const response = results.data.payload.content

        this.pagination = {
          current_page: response.current_page,
          first_page_url: response.first_page_url,
          from: response.from,
          last_page: response.last_page,
          last_page_url: response.last_page_url,
          links: response.links,
          next_page_url: response.next_page_url,
          path: response.path,
          per_page: response.per_page,
          prev_page_url: response.prev_page_url,
          to: response.to,
          total: response.total,
        }

        if(this.content.length <= 0) {
          this.content = response.data
          return
        }

        this.content = [
          ...this.content,
          ...response.data,
        ]
        // this.content.push(response.data)
        // this.content.reverse()
      }

    },

    async follow (payload = null) {

      if(this.loading_follow) return

      this.loading_follow = true

      const results = await axios({
        method: 'post',
        url: `api/profile/activity/follow/${payload.user_id}`,
      })
      .catch(err => {
        errorNotify()
        return null
      })

      this.loading_follow = false

      if(!results) return

      const content = this.content.data

      for (let i = 0; i < content.length; i++) {
        const element = content[i];
        if(element.user_id == results.data.payload.check.user_id) {
          if(results.data.payload.status == 'add') {
            element.user.follow = true
          }
          if(results.data.payload.status == 'remove') {
            element.user.follow = false
          }
        }
      }
    },

  },
});
