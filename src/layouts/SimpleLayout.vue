<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="storeAuth?.logged" :mini="false" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label class="text-h5" header>
          Imajora
        </q-item-label>
        <LeftSidebar />
      </q-list>
    </q-drawer>

    <!-- <q-page-container>
      <router-view />
    </q-page-container> -->
    <q-page-container class="items-center justify-evenly bg-grey-1">
      <q-page class="col-12 row flex justify-center">
        <!-- {{ content }} -->
        <!-- -- {{ payload }} -->
        <!-- <router-view /> -->

        <router-view v-if="route_meta.ssr" v-slot="{ Component }">
          <component :is="Component" :key="$route.name"> </component>
        </router-view>

        <q-no-ssr v-if="!route_meta.ssr">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" :key="$route.name"> </component>
            </keep-alive>
          </router-view>
        </q-no-ssr>

        <!-- <router-view name="indonesia" v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.name">
            </component>
          </keep-alive>
        </router-view> -->

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

import LeftSidebar from "./LeftSidebar.vue"

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAgendaListStore } from 'src/stores/agenda/list.js'
import { useAuthStore } from 'src/stores/auth/auth.js'
import { preFetch } from 'quasar/wrappers';

import { onRequestPrefetch } from 'src/prefetch/index.js'

export default defineComponent({
  name: 'MainLayout',
  preFetch: preFetch(async ({ store, currentRoute, ssrContext }) => {
    if(process.env.SERVER) await onRequestPrefetch(store, currentRoute, ssrContext)
  }),
  computed: {
    ...mapState(useAgendaListStore, {
      content: 'content'
    }),
    ...mapState(useAuthStore, {
      payload: 'payload'
    }),
  },
  watch: {
    '$route.name': function(val) {
      if(process.env.CLIENT) onRequestPrefetch(this.$store, this.$route, null)
    }
  },
  created(){
    if(process.env.CLIENT && process.env.MODE == 'spa') onRequestPrefetch(this.$store, this.$route, null)
  },
  components: {
    LeftSidebar
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
