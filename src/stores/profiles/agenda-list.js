import { defineStore } from 'pinia';
import axios from 'axios'
//import { useRouterStore } from 'src/stores/router-store'
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

export const useAgendaListStore = defineStore('agenda-list', {
  state: () => ({
    content: [],
    pagination,

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

    async request (payload = null) {

      if(this.loading) return

      // const { parent_id } = route.getParams // gak support preFetch

      this.loading = true

      const results = await axios.get(`api/profile/musisi/agenda?page=${Number(this.pagination.current_page) + 1}`)
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

        this.content.push(response.data)
        // Object.freeze(this.content)
      }
    },

    async request_more () {
      if(this.loading) return

      const next_page = this.pagination.last_page > this.pagination.current_page ? (Number(this.pagination.current_page) + 1) : this.pagination.last_page

      this.loading = true

      const results = await axios.get(`api/profile/musisi/agenda?page=${next_page}`)
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

        // // let content = this.content
        // // content.push({
        // //   inner: response.data
        // // })
        // let temp = [];
        // const ct = this.content
        // for (let i = 0; i < ct.length; i++) {
        //   temp.push(ct[i]);
        // }
        // temp.push(response.data)
        // this.content = temp
        // // this.content = content
        // console.log('123456', this.content)
        // // Object.freeze(this.content)

        this.content.push(response.data)
        this.content.reverse()
      }

    },

  },
});
