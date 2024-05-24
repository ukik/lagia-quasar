<template>
  <q-pull-to-refresh ref="pullToRefresh" @refresh="refresh" class="col-12 q-pt-lg">
    <AvatarClip @onLightBox="onLightBox" />
  </q-pull-to-refresh>

  <q-card bordered flat class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 bg-white">
    <Container ref="container" />
  </q-card>

  <q-no-ssr>
    <vue-easy-lightbox scrollDisabled escDisabled moveDisabled :visible="zoom_visible" :imgs="zoom_images"
      :index="zoom_index" @hide="handleHide"></vue-easy-lightbox>
  </q-no-ssr>

</template>

<script>
import AvatarClip from "./avatar-clip.vue"
import Container from "./container.vue"

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useProfileStore } from 'src/stores/profiles/musisi'

import { useListStore as Agenda } from 'src/stores/profiles/musisi-agenda-list.js'
import { useListStore as Video } from 'src/stores/profiles/musisi-video-list.js'
import { useListStore as Image } from 'src/stores/profiles/musisi-image-list.js'
import { useListStore as Youtube } from 'src/stores/profiles/musisi-youtube-list.js'
import { useListStore as Audio } from 'src/stores/profiles/musisi-audio-list.js'

import { preFetch } from 'quasar/wrappers';

const pagination = {
	current_page: null,
	first_page_url: null,
	from: null,
	last_page: null,
	last_page_url: null,
	links: null,
	next_page_url: null,
	path: null,
	per_page: null,
	prev_page_url: null,
	to: null,
	total: null,
}

export default {
  components:{
    Container,
    AvatarClip,
  },
  computed: {
    ...mapState(useProfileStore, {
      profile_detail: 'profile_detail',
      user: 'user',
      tab: 'tab',
    }),
    ...mapWritableState(Agenda, {
      content_agenda: 'content',
      pagination_agenda: 'pagination',
    }),
    ...mapWritableState(Video, {
      content_video: 'content',
      pagination_video: 'pagination',
    }),
    ...mapWritableState(Image, {
      content_image: 'content',
      pagination_image: 'pagination',
    }),
    ...mapWritableState(Youtube, {
      content_youtube: 'content',
      pagination_youtube: 'pagination',
    }),
    ...mapWritableState(Audio, {
      content_audio: 'content',
      pagination_audio: 'pagination',
    }),
  },
  // Hanya bekerja di component page
  // beforeRouteLeave (to, from , next) {
  // 	if(this.profile_detail.popup) {
  // 		next(false)
  // 	} else {
  // 		next()
  // 	}
  //   // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  //   // if (answer) {
  //   //   next()
  //   // } else {
  //   //   next(false)
  //   // }
  // },
  watch: {
    async route_query(val) {
      switch (this.route_name) {
        case 'profile_musisi':
          this.init({ slug: this.route_param?.slug })
          break;
      }
    }
  },
  beforeRouteUpdate (to, from , next) {
    console.log('beforeRouteUpdate', Number(to.params.slug) != this.auth_id, (to.params.slug) != this.auth_id, to.params, from.params)

    if(to.name == 'profile_musisi') {
      if(process.env.CLIENT) {
        this.init({
          slug: to.params.slug
        });

        this.content_agenda = []
        this.content_video = []
        this.content_image = []
        this.content_youtube = []
        this.content_audio = []

        this.pagination_agenda = pagination
        this.pagination_video = pagination
        this.pagination_image = pagination
        this.pagination_youtube = pagination
        this.pagination_audio = pagination

        if(this.tab == 1) this.init_video()
        if(this.tab == 2) this.init_audio()
        if(this.tab == 3) this.init_agenda()
        if(this.tab == 4) this.init_image()
        if(this.tab == 5) this.init_youtube()
      }
    }

    if(Number(to.params.slug) != this.auth_id) {
      if(to.name == 'profile') {
        next(this.goto({ name: 'profile', params: { slug: this.auth_id }}))
      }
    } else {
      next()
    }
  },
  data() {
    return {
      zoom_visible: false,
      zoom_index: 0, // default: 0,
      zoom_images: [],
    }
  },
  methods: {
    handleHide() {
      this.zoom_visible = false
    },
    onLightBox(event) {
      console.log(event)
      this.zoom_index = event.index
      this.zoom_images = event.images
      this.zoom_visible = true
    },
    ...mapActions(useProfileStore, [
      'init',
    ]),
    ...mapActions(Audio, {
      init_audio: 'request',
    }),
    ...mapActions(Video, {
      init_video: 'request',
    }),
    ...mapActions(Image, {
      init_image: 'request',
    }),
    ...mapActions(Agenda, {
      init_agenda: 'request',
    }),
    ...mapActions(Youtube, {
      init_youtube: 'request',
    }),
    async refresh(done) {
      await this.init({ slug: this.route_param?.slug });
      done() // required
      this.content_agenda = []
      this.content_video = []
      this.content_image = []
      this.content_youtube = []
      this.content_audio = []

      this.pagination_agenda = pagination
      this.pagination_video = pagination
      this.pagination_image = pagination
      this.pagination_youtube = pagination
      this.pagination_audio = pagination

      if(this.tab == 1) this.init_video()
      if(this.tab == 2) this.init_audio()
      if(this.tab == 3) this.init_agenda()
      if(this.tab == 4) this.init_image()
      if(this.tab == 5) this.init_youtube()
      this.$refs.container?.$refs.virtualListRef?.scrollTo(0, 'center-force')
    },
  }
}
</script>
