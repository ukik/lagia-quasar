<template>
  <q-pull-to-refresh @refresh="refresh" :disable="!is_mobile_size" class="col-12 bg-white" v-if="get_comments_data.length <= 0">
    <q-item v-if="get_detail?.id" class="q-pa-none q-ma-none q-mb-lg" dense>
      <Card :clientWidth="clientWidth" :index="get_detail?.id" :item="get_detail" />
    </q-item>
  </q-pull-to-refresh>

  <div class="col-12 bg-white" v-if="get_comments_data.length <= 0">
    <q-separator color="grey-3" />
    <q-item-label lines="1" class="q-py-lg q-pl-md">Semua Komentar</q-item-label>
  </div>

  <q-virtual-scroll ref="virtualListRef" v-if="get_comments_data.length > 0" @virtual-scroll="onscroll" :style="get_height"
    class="col-12 bg-white" :items="get_comments_data" separator v-slot="{ item, index }">
    <q-list>
      <q-pull-to-refresh class="bg-white" :disable="!is_mobile_size" v-if="index === 0" :key="index + 'C'"
        ref="pullToRefresh" @refresh="refresh">

        <q-item class="q-pa-none q-ma-none" dense>
          <Card :clientWidth="clientWidth" :index="index" :item="get_detail" />
        </q-item>

        <q-item-label lines="1" class="q-pt-lg q-pl-md">Semua Komentar</q-item-label>

      </q-pull-to-refresh>

      <q-item class="q-pa-none q-ma-none q-pl-md bg-white" :key="index" dense>
        <Komentar @onBalas="reply = item" :index="index" :item="item" />
      </q-item>

      <q-item class="q-pa-none q-ma-none" v-if="index >= get_comments_data.length - 1" :key="index + 'A'" dense>
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

  <q-header class="bg-white text-dark">
    <q-toolbar>
      <q-btn flat v-close-popup round dense icon="close" />
      <q-toolbar-title class="text-capitalize">{{ profile_detail.title }}</q-toolbar-title>
      <q-space />
      <q-btn :loading="loading_komentar_semua" flat round dense icon="refresh" @click="init" />
    </q-toolbar>
  </q-header>


  <q-footer class="bg-transparent text-black row flex flex-center">
    <q-list bordered class="col-12  bg-white q-pt-md">
      <q-item dense>
        <q-item-section>
          <q-item-label v-if="reply">
            <q-item-label caption lines="1">Membalas</q-item-label>
            <q-chip  :to="goto({ name:'profile_musisi', params: { slug: reply?.user?.id } })" size="12px" :disable="loading_komentar_semua_comment" class="q-mx-none" @remove="reply = null"
              removable color="red" text-color="white">
              <q-avatar>
                <img @error="handleError" :src="imageSync(reply?.user?.avatar)" >
              </q-avatar>
              <div class="ellipsis">
                <!-- @ -->{{ reply?.user?.name }}
              </div>
            </q-chip>
          </q-item-label>
          <q-item-label>
            <q-input :loading="loading_komentar_semua_comment" dense outlined
              :disable="loading_komentar_semua_comment || loading_komentar_semua" v-model="text_komentar_semua"
              maxlength="2500" counter clearable placeholder="Add a comment" autogrow
              input-style="min-height: unset; max-height: 200px;">
              <template v-if="text_komentar_semua" v-slot:after>
                <q-btn :disable="loading_komentar_semua_comment" :loading="loading_komentar_semua_comment"
                  @click="onComment(); authCheck(); gotoLogin();" dense label="post" flat color="primary" />
              </template>
            </q-input>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-footer>
</template>

<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useDetailListStore } from 'src/stores/profiles/musisi-youtube-detail.js'
import { useProfileStore } from 'src/stores/profiles/musisi.js'

import Komentar from "./components/komentar.vue"
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
  props: ['post_id'],
  components: {
    Komentar,
    Card,
  },
  computed: {
    ...mapState(useProfileStore, {
      profile_detail: 'profile_detail',
    }),
    ...mapState(useDetailListStore, {
      get_detail: 'get_detail',

      get_comments_current_page: 'get_comments_current_page',
      get_comments_data: 'get_comments_data',
      get_comments_first_page_url: 'get_comments_first_page_url',
      get_comments_from: 'get_comments_from',
      get_comments_last_page: 'get_comments_last_page',
      get_comments_last_page_url: 'get_comments_last_page_url',
      get_comments_links: 'get_comments_links',
      get_comments_next_page_url: 'get_comments_next_page_url',
      get_comments_path: 'get_comments_path',
      get_comments_per_page: 'get_comments_per_page',
      get_comments_prev_page_url: 'get_comments_prev_page_url',
      get_comments_to: 'get_comments_to',
      get_comments_total: 'get_comments_total',

      text_komentar_semua: 'text_komentar_semua',

      loading_komentar_semua: 'loading_komentar_semua',
      loading_komentar_semua_comment: 'loading_komentar_semua_comment',
    }),
    ...mapWritableState(useDetailListStore, {
      text_komentar_semua: "text_komentar_semua",
    }),
    get_height() {
      if(this.is_mobile_size) return 'height: calc(100vh - 50px - 80px)'
      // if(!this.is_mobile_size && this.get_comments_data.length < 0) return 'height: calc(100vh - 50px - 80px)'
      return 'height: calc(100vh - 50px - 130px)'
    }
  },
  data() {
    return {
      reply: null,
      clientWidth: 100,
    }
  },
  created() {
    this.init()
  },
  watch: {
    screen_width() {
      this.$nextTick(() => {
        if(!document.getElementById('virtualListRef')) return
        this.clientWidth = document.getElementById('virtualListRef').clientWidth
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(document.getElementById('virtualListRef')) this.clientWidth = document.getElementById('virtualListRef').clientWidth
    })
  },
  methods: {
    ...mapActions(useDetailListStore, [
      'komentar_semua',
      'komentar_semua_more',
      'komentar_semua_comment',
    ]),
    init() {
      if (!this.post_id) return
      this.komentar_semua({
        id: this.post_id,
        page: 1,
      });
    },
    onscroll(event) {
    },
    // async onComment() {
    //   const response = await this.komentar_semua_comment({
    //     index: this.index,
    //     post_id: this.get_comment?.post_id,
    //     parent_id: this.route_param?.id,
    //     replied_id: this.get_comment?.user_id,
    //   })
    //   console.log('response', response)
    //   if(response) {
    //     this.reply = null
    //   }
    // },
    async onComment() {
      const response = await this.komentar_semua_comment({
        index: this.index,
        post_id: this.post_id,
        parent_id: this.reply?.id == undefined ? '' : this.reply?.id,
        replied_id: this.reply?.user_id == undefined ? '' : this.reply?.user_id,
      })
      console.log('onComment', response)
      if (response) {
        this.reply = null
      }
    },
    async refresh(done) {
      this.komentar_semua({
        id: this.post_id,
        page: 1,
      });
      this.$refs.infiniteScroll?.resume()
      done() // required
    },
    async onLoad(index, done) {

      if (!this.get_comments_next_page_url) {
        done(true)
        return
      }

      const request = await this.komentar_semua_more({
        id: this.post_id,
        page: 1,
      });

      if (!request) {
        done(true) //= stop infinite-scroll
      }

      if (!this.get_comments_next_page_url) {
        done(true) //= stop infinite-scroll
      } else {
        done()
      }

    }
  }
}
</script>
