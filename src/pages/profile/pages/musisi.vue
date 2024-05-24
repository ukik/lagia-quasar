<template>
  <q-tabs inline-label no-caps outside-arrows align="center" breakpoint="0" :mobile-arrows="is_mobile_size && !is_cordova"
    dense v-model="tab" class="text-pink col-12 text-weight-regular">


    <q-tab name="1"><q-icon size="xs" name="fa-solid fa-play" class="q-mb-xs"></q-icon> <span
        v-if="!is_mobile_size">&nbsp; Video</span> </q-tab>

    <q-tab name="2"><q-icon size="xs" name="fa-solid fa-music" class="q-mb-xs"></q-icon> <span
        v-if="!is_mobile_size">&nbsp; Audio</span> </q-tab>

    <q-tab name="3"><q-icon size="xs" name="fa-regular fa-calendar" class="q-mb-xs"></q-icon> <span
        v-if="!is_mobile_size">&nbsp; Agenda</span> </q-tab>

    <q-tab name="4"><q-icon size="xs" name="fa-regular fa-image" class="q-mb-xs"></q-icon>
      <span v-if="!is_mobile_size">&nbsp; Images</span>
    </q-tab>

    <q-tab name="5"><q-icon size="xs" name="fa-brands fa-youtube" class="q-mb-xs"></q-icon> <span
        v-if="!is_mobile_size">&nbsp; Youtube</span> </q-tab>

    <!-- <q-tab  name="6"><q-icon size="sm" name="fa-solid fa-guitar"
        class="q-mb-xs"></q-icon>Cover</q-tab> -->
  </q-tabs>

  <q-separator class="full-width q-mt-none" />

  <q-tab-panels swipeable id="mypanel" class="col-12 q-mt-none" v-model="tab" keep-alive animated>
    <q-tab-panel name="1" class="q-pa-none" style="height: calc(100vh - 110px);">
      <TabVideo />
    </q-tab-panel>

    <q-tab-panel name="2" class="q-pa-none" style="height: calc(100vh - 110px);">
      <TabAudio />
    </q-tab-panel>

    <q-tab-panel name="3" class="q-pa-none" style="height: calc(100vh - 110px);">
      <TabAgenda />
      <!-- <TabContentAgenda /> -->
    </q-tab-panel>

    <q-tab-panel name="4" class="q-pa-none" style="height: calc(100vh - 110px);">
      <TabImage />
      <!-- <TabContentPlaylist /> -->
    </q-tab-panel>

    <q-tab-panel name="5" class="q-pa-none" style="height: calc(100vh - 110px);">
      <TabYoutube :clientWidth="clientWidth" />
      <!-- <TabContentOriginal /> -->
    </q-tab-panel>

    <!-- <q-tab-panel name="6" class="q-pa-none" >
      <TabContent />
    </q-tab-panel> -->
  </q-tab-panels>
</template>

<script>
import TabAgenda from "./TabAgendaScroll.vue"
import TabAudio from "./TabAudioScroll.vue"
import TabImage from "./TabImageScroll.vue"
import TabVideo from "./TabVideoScroll.vue"
// import TabYoutube from "./youtube/list/container.vue"
import TabYoutube from "./TabYoutubeScroll.vue"

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useProfileStore } from 'src/stores/profiles/musisi.js'

export default {
  components: {
    TabAgenda,
    TabAudio,
    TabImage,
    TabVideo,
    TabYoutube,
  },
  computed: {
    ...mapState(useProfileStore, {
      tab: 'tab',
    }),
    ...mapWritableState(useProfileStore, {
      tab: 'tab',
    }),
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
        if (!document.getElementById('mypanel')) return
        this.clientWidth = document.getElementById('mypanel').clientWidth
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (document.getElementById('mypanel')) this.clientWidth = document.getElementById('mypanel').clientWidth
    })
  },
}
</script>
