<template>
<div class="row flex flex-center">
  <q-pull-to-refresh ref="pullToRefresh" @refresh="refresh" class="col-12">
    <Container :post_id="post_id" ref="container" />
  </q-pull-to-refresh>
</div>
</template>

<script>
import Container from "./container.vue"

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useDetailListStore } from 'src/stores/profiles/musisi-youtube-detail.js'

export default {
  props: ['post_id'],
  components:{
    Container,
  },
  computed: {
    ...mapState(useDetailListStore, {
    }),
  },
  methods: {
    ...mapActions(useDetailListStore, [
      'komentar_semua',
    ]),
    async refresh(done) {
      await this.komentar_semua({
        id: this.post_id,
        page: 1,
      });
      done() // required
      this.$refs.container?.$refs.virtualListRef?.scrollTo(0, 'center-force')
    },
  }
}
</script>
