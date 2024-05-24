<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="lHh LpR lFf">
    <q-header class="bg-white" v-if="select_route">
      <q-toolbar>


        <q-btn round v-if="route_name !== 'home'" color="primary" flat icon="arrow_back_ios" @click="backOrRedirect({
            name: 'home'
          })" />

        <q-toolbar-title class="text-dark text-capitalize">
          {{ route_meta?.title }}
          <!-- Imajora - <span class="text-weight-thin">Dream Together</span> -->
        </q-toolbar-title>
        <q-space />

        <q-btn round v-if="!is_logged
          && route_name !== 'auth_login'
              " color="primary" flat icon="login" :to="goto({
          name: 'auth_login'
        })" />

        <q-btn v-if="is_lower_ipad_size" flat dense round icon="menu" color="primary" aria-label="Menu"
          @click="toggleLeftDrawer" />


        <q-btn round v-if="is_logged" color="primary" flat icon="o_add_to_queue">

          <q-menu :offset="[0, -5]" anchor="bottom start" self="top left">
            <q-list style="min-width: 200px">
              <q-item :to="goto({
                  name: 'video_create'
                })" clickable v-close-popup>
                <q-item-section>Video</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="fa-solid fa-play" />
                </q-item-section>
              </q-item>
              <q-item :to="goto({
                  name: 'audio_create'
                })" clickable v-close-popup>
                <q-item-section>Audio</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="fa-solid fa-music" />
                </q-item-section>
              </q-item>
              <q-item :to="goto({
                  name: 'agenda_create'
                })" clickable v-close-popup>
                <q-item-section>Agenda</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="fa-regular fa-calendar" />
                </q-item-section>
              </q-item>
              <q-item :to="goto({
                  name: 'image_create'
                })" clickable v-close-popup>
                <q-item-section>Image</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="fa-regular fa-image" />
                </q-item-section>
              </q-item>
              <q-item :to="goto({
                  name: 'youtube_create'
                })" clickable v-close-popup>
                <q-item-section>Youtube</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="fa-brands fa-youtube" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>

        </q-btn>


        <q-btn round v-if="is_logged" color="primary" flat icon="o_settings">

          <q-menu :offset="[0, -5]" anchor="bottom start" self="top left">
            <q-list style="min-width: 250px">
              <q-item :to="goto({
                  name: 'form_accounts_profile'
                })" clickable v-close-popup>
                <q-item-section>Formulir Profile</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="create" />
                </q-item-section>
              </q-item>
              <q-item :to="goto({
                  name: 'form_accounts_password'
                })" clickable v-close-popup>
                <q-item-section>Formulir Password</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="create" />
                </q-item-section>
              </q-item>
              <q-item :to="goto({
                  name: 'form_accounts_biodata'
                })" clickable v-close-popup>
                <q-item-section>Formulir Biodata</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="create" />
                </q-item-section>
              </q-item>
              <q-item :to="goto({
                  name: 'form_accounts_social'
                })" clickable v-close-popup>
                <q-item-section>Formulir Social</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="create" />
                </q-item-section>
              </q-item>
              <q-item :to="goto({
                  name: 'form_accounts_avatar'
                })" clickable v-close-popup>
                <q-item-section>Formulir Avatar</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="create" />
                </q-item-section>
              </q-item>
              <q-item :to="goto({
                  name: 'form_accounts_banner'
                })" clickable v-close-popup>
                <q-item-section>Formulir Banner</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="create" />
                </q-item-section>
              </q-item>
              <q-item :to="goto({
                  name: 'form_accounts_career'
                })" clickable v-close-popup>
                <q-item-section>Formulir Career</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="create" />
                </q-item-section>
              </q-item>
              <q-item :to="goto({
                  name: 'form_accounts_preview'
                })" clickable v-close-popup>
                <q-item-section>Formulir Preview</q-item-section>
                <q-item-section avatar>
                  <q-icon color="grey" name="create" />
                </q-item-section>
              </q-item>

            </q-list>
          </q-menu>

        </q-btn>

        <q-btn round v-if="is_logged" color="primary" flat icon="o_account_circle">
          <q-menu :offset="[0, -5]" anchor="bottom start" self="top left">
            <q-list style="min-width: 250px">
              <q-item :to="goto({
                name: 'profile',
                params: {
                  slug: auth_id
                }
              })" clickable  v-ripple>
                <q-item-section avatar>
                  <q-avatar size="40px">
                    <img  @error="handleError" :src="imageSync(storeAuth?.user?.avatar)" >
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1" class="text-bold">{{ storeAuth.user?.slug }}</q-item-label>
                  <q-item-label caption lines="1">
                    {{ storeAuth.user?.name }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <!-- <div>v{{ $q.version }}</div> -->
      </q-toolbar>
      <q-separator />
    </q-header>

    <!-- :behavior="is_lower_laptop_size ? 'mobile' : 'default'"  -->
    <q-drawer :width="get_width" :mini="get_mini" :min-width="100" v-model="leftDrawerOpen" side="left" show-if-above
      bordered :overlay="is_ipad_size">
      <q-list>
        <q-item v-if="is_higher_ipad_size && is_lower_laptop_size" :to="goto({
            name: 'home'
          })" class="q-pa-none">
          <img src="images/icon.png" />
        </q-item>
        <q-item v-else :to="goto({
            name: 'home'
          })" class="q-pa-none">
          <q-item-label class="text-h5" header>
            <img src="images/logo.png" />
            <div class="text-weight-thin text-h5">Dream Together</div>
          </q-item-label>
        </q-item>
      </q-list>
      <q-separator v-if="!get_mini" />
      <q-list
        :style="is_higher_ipad_size && is_lower_laptop_size ? 'height: calc(100vh - 0px - 50px);' : 'height: calc(100vh - 127px - 50px);'"
        class="scroll">
        <LeftSidebar />
      </q-list>
    </q-drawer>

    <q-drawer v-if="route_name == 'home' && is_higher_laptop_size && is_logged" :width="300" side="right" show-if-above>
      <Snippet />
    </q-drawer>

    <q-dialog persistent :maximized="is_mobile_size ? true : false" v-model="my_walkthrough">
      <q-card class="bg-primary text-center q-pb-xl flex flex-center">
        <!-- <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section> -->
        <Container />
        <q-btn @click="my_walkthrough = false" class="q-mt-lg" color="white" outline label="Skip" icon-right="navigate_next"  />
      </q-card>
    </q-dialog>



    <q-page-container class="items-center justify-evenly bg-grey-1"
      style="overflow-x: hidden;">
      <q-page v-if="route_meta.ssr" class="col-12 row flex justify-center" :class="is_ipad_size ? 'q-pa-md' : ''">
        <!-- <router-view /> -->
        <router-view v-slot="{ Component }">
          <component :is="Component" :key="$route.name"> </component>
        </router-view>
      </q-page>
      <q-page v-show="!route_meta.ssr" class="col-12 row flex justify-center" :class="is_ipad_size ? 'q-pa-md' : ''">
        <!-- v-show di pilih agar tidak ada rerender jika pindah route dari ssr ke no-ssr agar keep-alive tetap jalan -->
        <q-no-ssr>
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
import Snippet from "src/pages/home/snippet/index.vue"

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAgendaListStore } from 'src/stores/agenda/list.js'
import { useAuthStore } from 'src/stores/auth/auth.js'
import { preFetch } from 'quasar/wrappers';

import { onRequestPrefetch } from 'src/prefetch/index.js'
import _ from 'lodash'

import Container from "src/pages/walkthrough/container.vue"

export default defineComponent({
  name: 'MainLayout',
  preFetch: preFetch(async ({ store, currentRoute, ssrContext }) => {
    if (process.env.SERVER) await onRequestPrefetch(store, currentRoute, ssrContext)
  }),
  computed: {
    ...mapState(useAgendaListStore, {
      content: 'content'
    }),
    ...mapState(useAuthStore, {
      payload: 'payload'
    }),
    select_route() {
      return true
      switch (this.route_name) {
        case 'auth_login':
          // case 'auth_login':
          // case 'auth_signup':
          // case 'auth_forget':
          // case 'auth_verified':
          // case 'auth_redirect_password':
          // case 'auth_redirect_profile':
          // case 'auth_sent':
          // case 'auth_reset':
          return false
        default:
          return true
      }
    },
    get_width() {
      if (this.is_higher_laptop_size) return 300
    },
    get_mini() {
      if (this.is_lower_laptop_size && this.is_higher_ipad_size) return true
      return false
    }
  },
  watch: {
    '$route': function (val) {
      if (process.env.CLIENT) onRequestPrefetch(this.$store, this.$route, null)
    },
  },
  created() {
    if (process.env.CLIENT && process.env.MODE == 'spa') onRequestPrefetch(this.$store, this.$route, null)
  },
  components: {
    LeftSidebar,
    Snippet,
    Container,
  },
  methods: {
    backOrRedirect(route) {
      this.$router.back()
      return
      // below code masalahnya klu back harus ke home dulu
      const vm = this
      const originRoute = { ...vm.$route }
      vm.$router.back()
      // Of course, we must detect until a $nextTick is reached
      vm.$nextTick(() => {
        // If the route is not changed, we do the redirect
        if (_.isEqual(originRoute, vm.$route)) {
          // Redirect to the home path by default
          vm.$router.replace(route)
        }
      })
    },
  },
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      my_walkthrough: ref(true),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  }
})
</script>
