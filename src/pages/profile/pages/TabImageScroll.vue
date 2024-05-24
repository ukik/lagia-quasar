<template>
  <RecycleScroller :gridItems="gridItems" :itemSize="itemSecondarySize/gridItems" :itemSecondarySize="itemSecondarySize/gridItems" :prerender="10" :items="get_content" :min-item-size="100" class="scroller">
      <template v-slot="{ item, index, active }">

        <q-card @click="onProfileDetail({ type:'DetailImage', popup: true, post_id: item.id, title: 'detail image', index: index })" v-ripple clickable flat bordered square class="bg-black text-white" style="border-color: white;">
          <!-- <img :src="imageSync(item.image?.file)" @error="handleError" :style="`width:100%; height:${itemSecondarySize/gridItems}px; object-fit: cover;`"> -->
          <q-img :src="imageSync(item.image?.file)" :style="`width:100%; height:${itemSecondarySize/gridItems}px; object-fit: cover;`">
            <q-chip size="sm" outline  color="white" text-color="white" class="absolute-top-left" icon="o_image">
              {{ item?.images_count }}
            </q-chip>
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-dark text-white">
                <q-chip size="sm" outline  color="white" text-color="white" class="absolute-top-left" icon="o_image">
                  {{ item?.images_count }}
                </q-chip>
                Cannot load thumbail
              </div>
            </template>
          </q-img>
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
import { useListStore } from 'src/stores/profiles/musisi-image-list.js'
import { useProfileStore } from 'src/stores/profiles/musisi.js'

export default {
  activated() {
    this.request();
    // if(!this.init) return
    this.$nextTick(() => {
      if(document.getElementById("mypanel")) {
        this.itemSecondarySize = document.getElementById("mypanel").offsetWidth
        console.log('screen_width', document.getElementById("mypanel").offsetWidth)

        // if(this.$q.screen.name == 'xs') this.gridItems = 1
        if(this.is_higher_ipad_size) this.gridItems = 3
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
  },
  watch: {
    screen_width(val) {
      if(document.getElementById("mypanel")) {
        this.itemSecondarySize = document.getElementById("mypanel").offsetWidth
        console.log('screen_width', document.getElementById("mypanel").offsetWidth)
      }
      // if(this.$q.screen.name == 'xs') this.gridItems = 1
      if(this.is_higher_ipad_size) this.gridItems = 3
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


