<template>

  <q-pull-to-refresh ref="pullToRefresh" :disable="is_mobile_size"  @refresh="refresh" class="
    col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white
    scroll">

    <!-- <q-toolbar class="text-primary">
      <q-btn flat round dense icon="fa-solid fa-chevron-left" />
      <q-toolbar-title class="text-capitalize">
        {{ user?.name }}
      </q-toolbar-title>
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar> -->

    <Tab ref="container" @onBubbleEvent="tab = $event" />
  </q-pull-to-refresh>

</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useListStore as Follow } from 'src/stores/activity/follow-list.js'
import { useListStore as Followed } from 'src/stores/activity/followed-list.js'
import { preFetch } from 'quasar/wrappers';

import Tab from "./tab.vue"

export default {
  components:{
    Tab
  },
  computed: {
    ...mapState(Follow, {
      follow_user: 'user'
    }),
    ...mapState(Followed, {
      followed_user: 'user'
    }),
  },
  watch: {
    follow_user: {
      deep: true,
      handler(value) {
        // console.log('follow_user', value)
        if(value?.name) this.user = value
      }
    },
    followed_user: {
      deep: true,
      handler(value) {
        // console.log('followed_user', value)
        if(value?.name) this.user = value
      }
    },
  },
  // preFetch: preFetch(async ({ store, currentRoute }) => {
  //   const mystore = useAudioListStore(store);
  //   await mystore.request({
  //     page: currentRoute.params.page
  //   });
  // }),
  data() {
    return {
      tab: 1,
      user: null,
    }
  },
  methods: {
    ...mapActions(Follow, {
      follow_request: 'refresh',
    }),
    ...mapActions(Followed, {
      followed_request: 'refresh',
    }),
    async refresh(done) {
      if(this.tab == 1) await this.follow_request();
      if(this.tab == 2) await this.followed_request();

      done() // required
      this.$refs.container?.$refs.container?.$refs.virtualListRef?.scrollTo(0, 'center-force')
    },
  }
}
</script>
