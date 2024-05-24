<template>
  <q-tabs inline-label no-caps outside-arrows align="left" breakpoint="0" :mobile-arrows="is_mobile_size && !is_cordova"
    dense v-model="tab" class="text-dark col-12 text-weight-regular">

    <q-tab name="1"><span>&nbsp; Mengikuti</span> </q-tab>

    <q-tab name="2"><span>&nbsp; Pengikut</span> </q-tab>

    <!-- <q-tab name="3"><q-icon size="sm" name="fa-regular fa-calendar" class="q-mb-xs"></q-icon> <span>&nbsp; Disukai</span> </q-tab>

    <q-tab name="4"><q-icon size="sm" name="fa-regular fa-image" class="q-mb-xs"></q-icon>
      <span>&nbsp; Favorit</span>
    </q-tab> -->

  </q-tabs>

  <q-separator />

  <q-tab-panels @transition="$emit('onBubbleEvent', tab)" swipeable id="mypanel" class="col-12" v-model="tab" keep-alive animated>
    <q-tab-panel name="1" class="q-pa-none" style="height: calc(100vh - 137px)">
      <ContainerFollow ref="container" />
    </q-tab-panel>

    <q-tab-panel name="2" class="q-pa-none" style="height: calc(100vh - 137px)">
      <ContainerFollowed ref="container" />
    </q-tab-panel>

    <!-- <q-tab-panel name="3" class="q-pa-none" style="height: calc(100vh - 110px);">
      <ContainerLiked ref="container" />
    </q-tab-panel>

    <q-tab-panel name="4" class="q-pa-none" style="height: calc(100vh - 110px);">
      <ContainerFavorite ref="container" />
    </q-tab-panel> -->

  </q-tab-panels>
</template>

<script>
import ContainerFollow from "./follow/container.vue"
import ContainerFollowed from "./followed/container.vue"
// import ContainerLiked from "./liked/container.vue"
// import ContainerFavorite from "./favorite/container.vue"

export default {
  components: {
    ContainerFollow,
    ContainerFollowed,
    // ContainerLiked,
    // ContainerFavorite,
    // TabAudio,
    // TabImage,
    // TabVideo,
    // TabYoutube,
  },
  emits:['onBubbleEvent'],
  watch: {
    tab(val) {
      this.$router.replace({
        query: {
          tab: this.tab
        }
      })
    }
  },
  activated() {
    this.tab = this.route_query?.tab
  },
  data() {
    return {
      tab: '1',
    }
  },
}
</script>
