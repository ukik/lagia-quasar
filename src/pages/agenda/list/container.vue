<template>
  <q-virtual-scroll ref="virtualListRef" @virtual-scroll="onscroll" style="height: calc(100vh - 50px - 0px)"
    class="bg-grey-1" :items="get_data" separator v-slot="{ item, index }">
    <q-list>
      <q-pull-to-refresh :disable="!is_mobile_size" v-if="index === 0" :key="index + 'C'" ref="pullToRefresh"
        @refresh="refresh">
        <q-item class="q-pa-none q-ma-none q-mb-lg" dense>
          <Card @onLightBox="onLightBox" :index="index" :item="item" />
        </q-item>
      </q-pull-to-refresh>

      <q-item class="q-pa-none q-ma-none q-mb-lg" :key="index" v-if="index > 0" dense>
        <transition name="fade-global">
          <Card @onLightBox="onLightBox" :index="index" :item="item" />
        </transition>

      </q-item>
      <q-item class="q-pa-none q-ma-none" v-if="index === get_data.length - 1" :key="index + 'A'" dense>
        <q-infinite-scroll class="full-width" :debounce="200" ref="infiniteScroll" @load="onLoad" :offset="250">
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-item>

    </q-list>

  </q-virtual-scroll>

  <q-no-ssr>
    <vue-easy-lightbox scrollDisabled escDisabled moveDisabled :visible="zoom_visible" :imgs="zoom_images"
      :index="zoom_index" @hide="handleHide"></vue-easy-lightbox>
  </q-no-ssr>

</template>

<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAgendaListStore } from 'src/stores/agenda/list.js'
import { preFetch } from 'quasar/wrappers';

import Card from "./components/card.vue"

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 50 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}

export default {
  components: {
    Card
  },
  computed: {
    ...mapState(useAgendaListStore, {
      get_comment: 'get_comment',
      get_current_page: 'get_current_page',
      get_data: 'get_data',
      get_first_page_url: 'get_first_page_url',
      get_from: 'get_from',
      get_last_page: 'get_last_page',
      get_last_page_url: 'get_last_page_url',
      get_links: 'get_links',
      get_next_page_url: 'get_next_page_url',
      get_path: 'get_path',
      get_per_page: 'get_per_page',
      get_prev_page_url: 'get_prev_page_url',
      get_to: 'get_to',
      get_total: 'get_total',

      loading: 'loading',
    }),
  },
  // preFetch is ROOT only
  // preFetch: preFetch(async ({ store, currentRoute }) => {
  //   const mystore = useAgendaListStore(store);
  //   await mystore.request({
  //     page: currentRoute.params.page
  //   });
  // }),
  data() {
    return {
      text: '',
      zoom_visible: false,
      zoom_index: 0, // default: 0,
      zoom_images: [],
    }
  },
  methods: {
    handleHide() {
      this.zoom_visible = false
    },
    onLightBox(event) {
      console.log(event)
      this.zoom_index = event.index
      this.zoom_images = event.images
      this.zoom_visible = true
    },
    ...mapActions(useAgendaListStore, [
      'request',
      'request_more',
    ]),
    onscroll(event) {
      // if(this.get_data.length <= 0) return
      // this.get_data.forEach((element, index) => {
      //   const media = document.querySelector(`#video${index}`);
      //   if(media) {
      //     if(isInViewport(media)) {
      //       media.play()
      //     } else {
      //       media.pause()
      //     }
      //   }
      // });
    },
    async refresh(done) {
      await this.request({ page: this.route_param?.page });
      this.$refs.infiniteScroll.resume()
      done() // required
    },
    async onLoad(index, done) {

      if (!this.get_next_page_url) {
        done(true)
        return
      }

      const request = await this.request_more();
      if (!request) {
        done(true) //= stop infinite-scroll
      }

      if (!this.get_next_page_url) {
        done(true) //= stop infinite-scroll
      } else {
        done()
      }

    }
  }
}
</script>
