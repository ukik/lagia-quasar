<template>
  <q-pull-to-refresh ref="pullToRefresh" :disable="is_mobile_size"  @refresh="refresh" class="
    col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12
    scroll">
    <Container ref="container" />
  </q-pull-to-refresh>

</template>

<script>
import Container from "./container.vue"

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useVideoListStore } from 'src/stores/video/list-favorite.js'
import { preFetch } from 'quasar/wrappers';

import Card from "./components/card.vue"

export default {
  components:{
    Card,
    Container,
  },
  activated() {
    this.request();
  },
  methods: {
    ...mapActions(useVideoListStore, [
      'request',
    ]),
    async refresh(done) {
      await this.request();
      done() // required
      this.$refs.container?.$refs.virtualListRef?.scrollTo(0, 'center-force')
    },
  }
}
</script>
