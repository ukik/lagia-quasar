<template>
  <!-- <q-virtual-scroll ref="virtualListRef" :items="content" separator v-slot="{ item, index }"
    style="height: calc(100vh - 145px);">

    <div>
      <div :key="index + 'A'" class="row q-col-gutter-xs q-mb-xs">
        <div v-for="(i, i2) in item" class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <q-card flat bordered square style="height:450px;">
            <q-img :src="imageSync(i.cover)" @error="handleError" style="width:100%; height:100%; object-fit: cover;">
              <div class="absolute-full flex flex-center row">
              <q-card-section class="col-12">
                <q-item-label class="q-mb-sm">
                  <audio style="height:40px;" class="full-width" controls
                    src="https://vgmsite.com/soundtracks/megaman-8-original-soundtrack-saturn-version/wohpqjpj/01%20-%20opening.mp3"></audio>
                </q-item-label>
                <q-item-label>Jikustik</q-item-label>
                <q-item-label caption lines="1" class="text-white">Melangkah Lagi</q-item-label>
                <q-item-label class="q-mb-sm">genre: <router-link to="#" class="text-white">#pop</router-link></q-item-label>
                <q-item-label class="flex flex-center">
                  <q-btn @click="fixed = true" size="12px" unelevated rounded class="q-ma-none q-mr-xs" color="red" text-color="white"
                    icon="fab fa-youtube" label="youtube"></q-btn>
                  <q-btn unelevated rounded size="12px" class="q-ma-none" color="blue" text-color="white"
                    icon="fa-solid fa-paperclip" label="external"></q-btn>
                </q-item-label>
              </q-card-section>

            </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>


    <q-item class="q-pa-none q-ma-none" v-if="index == get_content.length - 1" :key="index + 'A'" dense>
      <q-infinite-scroll class="full-width" :debounce="0" ref="infiniteScroll" @load="onLoad" :offset="250">
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-item>

  </q-virtual-scroll> -->

  <!-- page-mode  -->

  <RecycleScroller :gridItems="gridItems" :itemSize="itemSecondarySize/gridItems" :itemSecondarySize="itemSecondarySize/gridItems" :prerender="10" :items="get_content" :min-item-size="100" class="scroller">
      <template v-slot="{ item, index, active }">

        <q-card flat bordered square class="bg-dark" style="border-color: white;">
          <q-img :src="imageSync(item.cover)"  @error="handleError" :style="`width:100%; height:${itemSecondarySize/gridItems}px; object-fit: cover;`">
            <div class="absolute-full flex flex-center row">
              <q-card class="absolute-full bg-transparent" @click="onProfileDetail({ type:'DetailAudio', popup: true, post_id: item.id, title: 'detail audio', index: index })" v-ripple clickable></q-card>

              <!-- <q-card-section class="col-12">
                <q-item-label class=""> -->
                  <audio @play="onPlay(index)" :id="`#audio${index}`" style="height:40px;" class="full-width" controls
                    :src="item.file"></audio>
                <!-- </q-item-label> -->

                <!-- <q-list bordered style="border-color:white; border-radius: 5px;" class="q-my-md">
                  <q-item @click="onProfileDetail({ type:'DetailAudio', popup: true, post_id: item.id, title: 'detail audio' })" v-ripple clickable class="q-pa-md">
                    <q-item-section >
                      <q-item-label>Jikustik</q-item-label>
                      <q-item-label caption lines="1" class="text-white">Melangkah Lagi</q-item-label>
                      <q-item-label>genre: <router-link to="#" class="text-white">#pop</router-link></q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list> -->

                <!-- <q-item-label class="flex flex-center">
                  <q-btn @click="fixed = true" size="12px" unelevated rounded class="q-ma-none q-mr-xs" color="red" text-color="white"
                    icon="fab fa-youtube" label="youtube"></q-btn>
                  <q-btn unelevated rounded size="12px" class="q-ma-none" color="blue" text-color="white"
                    icon="fa-solid fa-paperclip" label="external"></q-btn>
                  <q-btn outline round size="12px" class="q-ma-none" color="blue" text-color="white"
                    icon="search"></q-btn>
                </q-item-label> -->
              <!-- </q-card-section> -->
            </div>
          </q-img>
        </q-card>

        <q-item class="q-pa-none q-ma-none" v-if="index == get_content.length - 1" :key="index + 'A'" dense>
          <q-infinite-scroll class="full-width" :debounce="0" ref="infiniteScroll" @load="onLoad" :offset="250">
            <!-- <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template> -->
          </q-infinite-scroll>
        </q-item>
        <!-- <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[
          item.message,
        ]" :data-index="index"> -->
          <!-- <div>
            <q-item :key="index" class="animate__swing">
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                  elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
                <q-icon name="star" color="yellow" />
              </q-item-section>
            </q-item>
          </div> -->
        <!-- </DynamicScrollerItem> -->
      </template>
      <template #after>
        <div v-if="get_next_page_url" class="row justify-center q-my-md">
          <!-- <q-spinner-dots color="primary" size="40px" /> -->
          <q-spinner-tail
            color="primary"
            size="60px"
          />
        </div>
        <!-- <div ref="lastElementRef" :class="$style['placeholder']" /> //Placeholder 'element; we use to check if someone reached end of list  -->
      </template>
    </RecycleScroller>

</template>

<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useListStore } from 'src/stores/profiles/musisi-audio-list.js'
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


