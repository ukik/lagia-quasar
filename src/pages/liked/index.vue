<template>

  <q-pull-to-refresh ref="pullToRefresh" :disable="is_mobile_size"  @refresh="refresh" class="
    col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white">
    <Tab ref="container" />
  </q-pull-to-refresh>

</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { preFetch } from 'quasar/wrappers';

import Tab from "./tab.vue"

import { useAgendaListStore } from 'src/stores/agenda/list-liked.js'
import { useAudioListStore } from 'src/stores/audio/list-liked.js'
import { useImageListStore } from 'src/stores/image/list-liked.js'
import { useVideoListStore } from 'src/stores/video/list-liked.js'
import { useYoutubeListStore } from 'src/stores/youtube/list-liked.js'

export default {
  components:{
    Tab
  },
  methods: {
    ...mapActions(useAgendaListStore, {
      agenda_refresh: 'request',
    }),
    ...mapActions(useAudioListStore, {
      audio_refresh: 'request',
    }),
    ...mapActions(useImageListStore, {
      image_refresh: 'request',
    }),
    ...mapActions(useVideoListStore, {
      video_refresh: 'request',
    }),
    ...mapActions(useYoutubeListStore, {
      youtube_refresh: 'request',
    }),
    async refresh(done) {

      if(this.tab_liked == 1) await this.video_refresh();
      if(this.tab_liked == 2) await this.audio_refresh();
      if(this.tab_liked == 3) await this.agenda_refresh();
      if(this.tab_liked == 4) await this.image_refresh();
      if(this.tab_liked == 5) await this.youtube_refresh();

      done() // required
      this.$refs.container?.$refs.container?.$refs.virtualListRef?.scrollTo(0, 'center-force')
    },
  }
}
</script>
