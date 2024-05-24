<template>
  <RecycleScroller :gridItems="gridItems" :itemSize="get_grid" :itemSecondarySize="get_grid" :prerender="10" :items="get_content" :min-item-size="100" class="scroller">
      <template v-slot="{ item, index, active }">

        <q-card flat @click="onProfileDetail({
            type:'DetailYoutube', popup: true, post_id: item.id, title: 'detail youtube', index: index })" bordered
            v-ripple clickable :style="`width:100%; height:${get_grid}px; object-fit: cover; border-color: white;`">

          <YouTube :width="is_higher_ipad_size ? clientWidth/2 : clientWidth" :height="get_grid"
            :src="item.file" :style="`width:100%; height:${get_grid}px; object-fit: cover;`"
            :id="`video${index}`" :ref="`video${index}`" />

          <div class="absolute-full bg-transparent"></div>
        </q-card>


        <q-item class="q-pa-none q-ma-none" v-if="index == get_content.length - 1" :key="index + 'A'" dense>
          <q-infinite-scroll class="full-width" :debounce="0" ref="infiniteScroll" @load="onLoad" :offset="250">
          </q-infinite-scroll>
        </q-item>
      </template>
      <template #after>
        <div v-if="get_next_page_url" class="row justify-center q-my-md">
          <!-- <q-spinner-dots color="primary" size="40px" /> -->
          <q-spinner-tail
            color="primary"
            size="60px"
          />
        </div>
      </template>
    </RecycleScroller>

</template>

<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useListStore } from 'src/stores/profiles/musisi-youtube-list.js'
import { useProfileStore } from 'src/stores/profiles/musisi.js'

export default {
  props: {
    clientWidth: {
      default: 100,
    },
  },
  activated() {
    this.request();
    // if(!this.init) return
    this.$nextTick(() => {
      if(document.getElementById("mypanel")) {
        this.itemSecondarySize = document.getElementById("mypanel").offsetWidth
        console.log('screen_width', document.getElementById("mypanel").offsetWidth)

        if(this.is_lower_ipad_size) this.gridItems = 1
        // if(this.is_higher_ipad_size) this.gridItems = 3
      }
      // window.scrollTo(0, document.body.scrollHeight);
    })
  },
  computed: {
    ...mapState(useListStore, {
      content: 'content',
      get_content: 'get_content',
      get_current_page: 'get_current_page',
      get_next_page_url: 'get_next_page_url',
      // loading: 'loading',
    }),
    get_grid() {
      if(this.is_higher_ipad_size) return this.itemSecondarySize/this.gridItems
      if(this.is_lower_ipad_size && this.is_higher_mobile_size) return 450;
      return 350;
    }
  },
  watch: {
    screen_width(val) {
      if(document.getElementById("mypanel")) {
        this.itemSecondarySize = document.getElementById("mypanel").offsetWidth
        console.log('screen_width', document.getElementById("mypanel").offsetWidth)
      }
      if(this.is_lower_ipad_size) this.gridItems = 1
      // if(this.is_higher_ipad_size) this.gridItems = 3
    },
  },
  data() {
    return {
      itemSecondarySize: 100,
      gridItems: 2,
    }
  },
  methods: {
    ...mapActions(useListStore, [
      'request',
      'request_more',
    ]),
    ...mapActions(useProfileStore, [
      'onProfileDetail',
    ]),
    async onPlay(i) {
      await this.$nextTick(() => {
        document.querySelectorAll('audio').forEach((el, index) => {
          if(`audio${index}` != `audio${i}`) el.pause()
          console.log(el.id, i)
        });
      })
    },
    onVirtualScroll(val) {
      console.log('onVirtualScroll', val)
      // alert(1)
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
  },
}
</script>


