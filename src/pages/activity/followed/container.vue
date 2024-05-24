<template>
  <q-virtual-scroll id="virtualListRef" ref="virtualListRef" @virtual-scroll="onscroll"
    style="height: calc(100vh - 110px);" class="bg-white" :items="get_content" separator v-slot="{ item, index }">
    <q-list>
      <q-pull-to-refresh :disable="!is_mobile_size" v-if="index === 0" :key="index + 'C'" ref="pullToRefresh"
        @refresh="refresh">
        <q-item class="q-pa-none q-ma-none" dense>
          <Card :ref="`card${index}`" :index="index" :item="item" />
        </q-item>
      </q-pull-to-refresh>

      <q-item class="q-pa-none q-ma-none" :key="index" v-if="index > 0" dense>
        <Card :ref="`card${index}`" :index="index" :item="item" />
      </q-item>
      <q-item class="q-pa-none q-ma-none" v-if="index === get_content.length - 1" :key="index + 'A'" dense>
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
</template>

<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useListStore } from 'src/stores/activity/followed-list.js'
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
    ...mapState(useListStore, {
      get_content: 'get_content',
      get_next_page_url: 'get_next_page_url',
      // get_path: 'get_path',
      // get_per_page: 'get_per_page',
      // get_prev_page_url: 'get_prev_page_url',
      // get_to: 'get_to',
      // get_total: 'get_total',

      loading: 'loading',
    }),
    // ...mapWritableState(useListStore, {
    // }),
  },
  // preFetch is ROOT only
  // preFetch: preFetch(async ({ store, currentRoute }) => {
  //   const mystore = useListStore(store);
  //   await mystore.request({
  //     page: currentRoute.params.page
  //   });
  // }),
  data() {
    return {
      text: '',
    }
  },
  // created() {
  //   this.request({
  //     page: 1,
  //   });
  // },
  deactivated() {

  },
  activated() {
    this.request({
      page: 1,
    });
  },
  methods: {
    ...mapActions(useListStore, [
      'request',
      'request_more',
    ]),
    onscroll(event) {
      return
      if (this.get_data.length <= 0) return
      this.get_data.forEach((element, index) => {
        const media = document.querySelector(`#video${index}`);
        // console.log(this.$refs[`video${index}`])
        if (media) {
          if (isInViewport(media)) {
            // media.playVideo()
            this.$refs[`card${index}`].onPlay()
          } else {
            // this.$refs[`video${index}`].pauseVideo()
            this.$refs[`card${index}`].onPause()
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
