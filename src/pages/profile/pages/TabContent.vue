<template>
  <!--
  Forked from:
  https://quasar.dev/vue-components/virtual-scroll#Example--Different-templates-for-items
-->

  <q-virtual-scroll ref="virtualListRef" :items="content" separator v-slot="{ item, index }"
    style="height: calc(100vh - 145px);">

    <div :ref="'set' + index">

      <div :key="index + 'A'" class="row q-col-gutter-xs q-mb-xs">
        <div v-for="(i, i2) in item" class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
          <q-card flat bordered square style="height:250px;">
            <!-- {{ i.image }} -->
            <img :src="imageSync(i.image?.file)" @error="handleError" style="width:100%; height:100%; object-fit: cover;">
            <!-- <q-img style="height:250px;" :src="imageSync(i.image?.file)" @error="handleError">
                      {{ i.id }}
                      <template v-slot:error>
                        <div class="absolute-full flex flex-center bg-negative text-white">
                          Cannot load image
                        </div>
                      </template>
                    </q-img> -->

            <!-- <q-list>
                      <q-item clickable>
                        <q-item-section>
                          <q-item-label>Bar XYZ</q-item-label>
                          <q-item-label caption>Have a drink.</q-item-label>
                        </q-item-section>
                      </q-item>

                    </q-list> -->
          </q-card>
        </div>
      </div>
    </div>

    <q-item class="q-pa-none q-ma-none" v-if="index === get_content.length - 1" :key="index + 'A'" dense>
      <q-infinite-scroll class="full-width" :debounce="500" ref="infiniteScroll" @load="onLoad" :offset="250">
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-item>

  </q-virtual-scroll>
</template>

<script>

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAgendaListStore } from 'src/stores/profiles/agenda-list.js'
import { preFetch } from 'quasar/wrappers';

export default {
  activated() {
    this.request();
  },
  computed: {
    ...mapState(useAgendaListStore, {
      content: 'content',
      get_content: 'get_content',
      get_current_page: 'get_current_page',
      get_next_page_url: 'get_next_page_url',
      loading: 'loading',
    }),
  },

  data() {
    return {
      mydata: [],
    }
  },
  // watch: {
  //   content: {
  //     deep: true,
  //     handler(val) {
  //       console.log('vvvvv', val)
  //       this.mydata = val.reverse()
  //       // Object.freeze(val)
  //     }
  //   }
  // },
  methods: {
    ...mapActions(useAgendaListStore, [
      'request',
      'request_more',
    ]),
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
        setTimeout(() => {
          // alert(1)
          this.$refs.virtualListRef?.scrollTo(2, 'center-force')
        }, 3000);
      }

      if (!this.get_next_page_url) {
        done(true) //= stop infinite-scroll
      } else {
        done()
      }

    }
  },
  // mounted() {
  //   if(!this.init) return
  //   this.$nextTick(() => {
  //     window.scrollTo(0, document.body.scrollHeight);
  //   })
  // }
}
</script>
