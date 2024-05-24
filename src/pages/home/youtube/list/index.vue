<template>
  <div ref="pullToRefresh" disable @refresh="refresh" class="
    col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12
    scroll">
    <Container ref="container" />
  </div>

</template>

<script>
import Container from "./container.vue"

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useYoutubeListStore } from 'src/stores/youtube/list.js'
import { preFetch } from 'quasar/wrappers';

export default {
  components:{
    Container,
  },
  computed: {
    ...mapState(useYoutubeListStore, {
      get_data: 'get_data',
    }),
  },
  activated() {
    // if(this.get_data.length > 0) return
    this.request()
  },
  methods: {
    ...mapActions(useYoutubeListStore, {
      request: 'home_request'
    }),
    async refresh(done) {
      await this.request();
      done() // required
      this.$refs.container?.$refs.virtualListRef?.scrollTo(0, 'center-force')
    },
  }
}
</script>
