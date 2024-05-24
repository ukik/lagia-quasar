<template>
<!-- <q-card class="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white scroll"> -->
  <q-tabs inline-label no-caps outside-arrows align="center" breakpoint="0" :mobile-arrows="is_mobile_size && !is_cordova" dense v-model="tab_home"
    class="text-dark col-12 text-weight-regular">

    <q-tab  name="1">
      <q-icon size="xs" name="fa-solid fa-play" class="q-mb-xs"></q-icon>
      <span v-if="!is_mobile_size">&nbsp; Video</span>
    </q-tab>

    <q-tab  name="2">
      <q-icon size="xs" name="fa-solid fa-music" class="q-mb-xs"></q-icon>
      <span v-if="!is_mobile_size">&nbsp; Audio</span>
    </q-tab>

    <q-tab  name="3">
      <q-icon size="xs" name="fa-regular fa-calendar" class="q-mb-xs"></q-icon>
      <span v-if="!is_mobile_size">&nbsp; Agenda</span>
    </q-tab>

    <q-tab  name="4">
      <q-icon size="xs" name="fa-regular fa-image" class="q-mb-xs"></q-icon>
      <span v-if="!is_mobile_size">&nbsp; Images</span>
    </q-tab>

    <q-tab  name="5">
      <q-icon size="xs" name="fa-brands fa-youtube" class="q-mb-xs"></q-icon>
      <span v-if="!is_mobile_size">&nbsp; Youtube</span>
    </q-tab>


    <!-- <q-route-tab name="1" :to="goto({ name: 'liked_agenda' })" exact replace label="Agenda" />
    <q-route-tab name="2" :to="goto({ name: 'liked_image' })" exact replace label="Image" />
    <q-route-tab name="3" :to="goto({ name: 'liked_video' })" exact replace label="Video" />
    <q-route-tab name="4" :to="goto({ name: 'liked_audio' })" exact replace label="Audio" />
    <q-route-tab name="5" :to="goto({ name: 'liked_youtube' })" exact replace label="Youtube" /> -->

  </q-tabs>

  <q-separator class="full-width" />

  <q-tab-panels id="mypanel" class="col-12 bg-white" v-model="tab_home" keep-alive animated>

    <q-tab-panel name="1" class="q-pa-none" >
      <TabVideo />
    </q-tab-panel>

    <q-tab-panel name="2" class="q-pa-none" >
      <TabAudio />
    </q-tab-panel>

    <q-tab-panel name="3" class="q-pa-none" >
      <TabAgenda />
    </q-tab-panel>

    <q-tab-panel name="4" class="q-pa-none" >
      <TabImage />
    </q-tab-panel>

    <q-tab-panel name="5" class="q-pa-none" >
      <TabYoutube />
    </q-tab-panel>

  </q-tab-panels>
<!-- </q-card> -->
</template>

<script>
import TabAgenda from "./agenda/list/index.vue"
import TabAudio from "./audio/list/index.vue"
import TabImage from "./image/list/index.vue"
import TabVideo from "./video/list/index.vue"
import TabYoutube from "./youtube/list/index.vue"

import { mapState, mapWritableState, mapActions } from 'pinia'

export default {
  components: {
    TabAgenda,
    TabAudio,
    TabImage,
    TabVideo,
    TabYoutube,
  },
  data() {
    return {
      // tab: '1',
      init: false,
      clientWidth: 500,
    }
  },
  watch: {
    screen_width() {
      this.$nextTick(() => {
        if(!document.getElementById('mypanel')) return
        this.clientWidth = document.getElementById('mypanel').clientWidth
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(document.getElementById('mypanel')) this.clientWidth = document.getElementById('mypanel').clientWidth
    })
  },
}
</script>
