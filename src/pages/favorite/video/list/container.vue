<template>
  <!-- <q-no-ssr> -->
  <!-- <q-pull-to-refresh ref="pullToRefresh" :disable="is_mobile_size" v-if="get_data.length > 0" @refresh="refresh" class="scroll"> -->

    <!-- <q-scroll-area @scroll="onscroll" id="scrollAreaRef" ref="scrollAreaRef" style="height: calc(100vh - 50px - 80px)"> -->

    <q-virtual-scroll ref="virtualListRef" @virtual-scroll="onscroll"
      style="height: calc(100vh - 50px - 36px)"
      class="bg-grey-1"
      :items="get_data"
      separator
      v-slot="{ item, index }"
    >
      <q-list>
        <q-pull-to-refresh :disable="!is_mobile_size" v-if="index === 0" :key="index+'C'" ref="pullToRefresh" @refresh="refresh">
          <q-item class="q-pa-none q-ma-none q-mb-lg" dense>
              <Card :index="index" :item="item" />
          </q-item>
        </q-pull-to-refresh>

        <q-item class="q-pa-none q-ma-none q-mb-lg"
          :key="index" v-if="index > 0"
          dense
        >
            <transition name="fade-global">
              <Card :index="index" :item="item" />
            </transition>
        </q-item>
        <q-item class="q-pa-none q-ma-none" v-if="index === get_data.length-1"
            :key="index+'A'"
            dense
          >
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

    <!-- </q-scroll-area> -->

  <!-- </q-pull-to-refresh> -->

  <!-- </q-no-ssr> -->
</template>

<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useVideoListStore } from 'src/stores/video/list-favorite.js'
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
  components:{
    Card
  },
  computed: {
    ...mapState(useVideoListStore, {
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
    // ...mapWritableState(useVideoListStore, {
    // }),
  },
  // preFetch is ROOT only
  // preFetch: preFetch(async ({ store, currentRoute }) => {
  //   const mystore = useVideoListStore(store);
  //   await mystore.request({
  //     page: currentRoute.params.page
  //   });
  // }),
  data() {
    return {
      text: '',
    }
  },
  methods: {
    ...mapActions(useVideoListStore, [
      'request',
      'request_more',
      // 'request_reset',
      // 'request_delete',
      // 'request_input',
      // 'clean',
      // 'paginate_total',
      // 'update',
    ]),
    onscroll(event) {
      // console.log(event)
      // if(event.index <= 0) {
      //   this.$refs.pullToRefresh.disable = false
      //   this.is_disable_pull_to_refresh = false
      // } else {
      //   this.$refs.pullToRefresh.disable = true
      //   this.is_disable_pull_to_refresh = true
      // }

      if(this.get_data.length <= 0) return
      this.get_data.forEach((element, index) => {
        const media = document.querySelector(`#video${index}`);
        if(media) {
          if(isInViewport(media)) {
            media?.play()
          } else {
            media?.pause()
          }
        }

      });
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
      if(!request) {
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
