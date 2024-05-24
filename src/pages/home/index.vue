<template>
<!-- <div class="row col-12"> -->
  <!-- <div class="row col-8"> -->
    <q-pull-to-refresh ref="pullToRefresh" class="row col-12 flex justify-center" @refresh="refresh">
      <q-tabs no-caps
        v-if="screen_width <= 768 && get_content.length > 0"
        inline-label
        v-model="tab"
        align="left"
        :style="`width:${screen_width}px;`"
        class="text-white q-mb-sm"
        indicator-color="transparent"
        >
        <template v-for="(item, index) in get_content">
        <q-tab :key="index"
          class="q-pa-none q-ma-none border_radius_2"
          v-if="item.id != auth_id"
          name="0">
          <Avatar :user="item" width='width:100px;' size='75px' />
        </q-tab>
      </template>
      </q-tabs>

      <q-scroll-area v-if="screen_width > 768 && get_content.length > 0" class="q-mb-md" :style="is_ipad_size ? 'height: 120px; width:100vw;' : 'height: 120px; width:800px;'" :class="is_ipad_size ? 'q-my-md' : 'q-mt-lg'">
        <div class="row no-wrap">
          <template v-for="(item, index) in get_content">
            <div v-if="item.id != auth_id">
              <Avatar :user="item" width='width:100px;' size='85px' />
            </div>
          </template>
        </div>
      </q-scroll-area>
    </q-pull-to-refresh>

    <div ref="container" class="row col-xl-5 col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <!-- <div class="bg-white col-12 row q-mb-md flex justify-center">
        <div v-if="screen_width > 768" class="row q-col-gutter-x-sm q-col-gutter-y-sm flex justify-center q-py-md">
          <div v-for="(item, index) in songs" class="col-auto">
            <q-btn dense
              :disable="get_loading"
              no-caps
              @click="onCategory(item.value)" color="primary" class="text-body2 q-px-sm" style="" unelevated :flat="route_query?.category != item.value">
              {{ item?.label }}
            </q-btn>
          </div>
        </div>

        <q-tabs
          v-else
          inline-label
          v-model="tab"
          align="left"
          :style="`width:${screen_width}px;`"
          class="text-white q-mb-sm q-mt-sm"
          indicator-color="transparent"
          >
          <q-tab v-for="(item, index) in songs" :key="index"
            class="q-pa-none q-ma-none border_radius_2 q-col-gutter-x-sm"
            name="0">
            <q-btn @click="onCategory(item.value)" color="primary" class="text-body2" :disable="get_loading" no-caps
            :class="[ index >= songs.length-1 ? 'q-mr-sm' : '' ]"
            style="" unelevated rounded :outline="route_query?.category != item.value">
              {{ item?.label }}
            </q-btn>
          </q-tab>
        </q-tabs>

      </div> -->

      <q-card bordered flat class="bg-white col-12 row">
        <keep-alive>
          <Tab ref="container" />
        </keep-alive>
      </q-card>
    <!-- </div> -->
  <!-- </div> -->
  <!-- <div class="row col-8">
    <Snippet />
  </div> -->
</div>
</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { preFetch } from 'quasar/wrappers';

import Tab from "./tab.vue"
import Avatar from "./avatar.vue"
import Snippet from "./snippet/index.vue"

import { useAgendaListStore } from 'src/stores/agenda/list.js'
import { useAudioListStore } from 'src/stores/audio/list.js'
import { useImageListStore } from 'src/stores/image/list.js'
import { useVideoListStore } from 'src/stores/video/list.js'
import { useYoutubeListStore } from 'src/stores/youtube/list.js'

import { useHomeStore } from 'src/stores/home.js'

import songs from "src/models/songs.js"


export default {
  // preFetch: preFetch(async ({ store, currentRoute }) => {
  //   const mystore = useHomeStore(store);
  //   await mystore.request();
  // }),
  activated() {
    // this.request()
  },
  components: {
    Avatar,
    Tab,
    Snippet,
  },
  computed: {
    ...mapState(useHomeStore, {
      get_content: 'get_content',
    }),
    ...mapState(useAgendaListStore, {
      agenda_loading: 'loading',
    }),
    ...mapState(useAudioListStore, {
      audio_loading: 'loading',
    }),
    ...mapState(useImageListStore, {
      image_loading: 'loading',
    }),
    ...mapState(useVideoListStore, {
      video_loading: 'loading',
    }),
    ...mapState(useYoutubeListStore, {
      youtube_loading: 'loading',
    }),
    get_loading() {
      return this.agenda_loading || this.audio_loading || this.image_loading || this.video_loading || this.youtube_loading
    }
  },
  data() {
    return {
      tab: '0',
      // tab_category: '',
      clientWidth: null,
      songs: [
       {
          id:0,
          value:"semua",
          label:"semua",
          url:"/images/music/classic.jpg",
        },
        ...songs,
      ]
    }
  },
  watch: {
    async route_query(val) {
      // if(this.route_name != 'home') return
      // if (this.tab_liked == 1) await this.video_refresh();
      // if (this.tab_liked == 2) await this.audio_refresh();
      // if (this.tab_liked == 3) await this.agenda_refresh();
      // if (this.tab_liked == 4) await this.image_refresh();
      // if (this.tab_liked == 5) await this.youtube_refresh();
    },
    screen_width() {
      this.$nextTick(() => {
        if(!document.getElementById('mypanel')) return
        this.clientWidth = document.getElementById('mypanel').clientWidth
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(document.getElementById('mypanel')) this.clientWidth = document.getElementById('mypanel').clientWidth
    })
    // if(this.get_content.length > 0) return
    // this.request()
  },
  methods: {
    ...mapActions(useHomeStore, {
      request: 'request',
    }),
    ...mapActions(useAgendaListStore, {
      agenda_refresh: 'home_request',
    }),
    ...mapActions(useAudioListStore, {
      audio_refresh: 'home_request',
    }),
    ...mapActions(useImageListStore, {
      image_refresh: 'home_request',
    }),
    ...mapActions(useVideoListStore, {
      video_refresh: 'home_request',
    }),
    ...mapActions(useYoutubeListStore, {
      youtube_refresh: 'home_request',
    }),
    onCategory(val) {
      if(val == this.route_query?.category) {
        this.$router.replace({
          query: { category: 'semua' }
        })
        return
      }
      this.$router.replace({
        query: { category: val }
      })
    },
    async refresh(done) {

      if (this.tab_liked == 1) await this.video_refresh();
      if (this.tab_liked == 2) await this.audio_refresh();
      if (this.tab_liked == 3) await this.agenda_refresh();
      if (this.tab_liked == 4) await this.image_refresh();
      if (this.tab_liked == 5) await this.youtube_refresh();

      done() // required
      this.$refs.container?.$refs.container?.$refs.virtualListRef?.scrollTo(0, 'center-force')
    },
  }
}
</script>
