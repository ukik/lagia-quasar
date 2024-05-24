<template>
  <q-dialog :class="[is_mobile_size ? 'q-dialog-mobile' : '']" v-model="profile_detail.popup" :maximized="is_mobile_size">
    <q-layout view="hHh lpR fFf" container class="bg-white"
      :style="is_mobile_size ? '' : 'width: 700px; max-width: 70vw;'">
      <q-page-container>
        <component :post_id="profile_detail.post_id" :is="profile_detail.type"></component>
      </q-page-container>
    </q-layout>
  </q-dialog>

  <q-no-ssr>
    <vue-easy-lightbox scrollDisabled escDisabled moveDisabled :visible="tab_zoom_visible" :imgs="tab_zoom_images"
      :index="tab_zoom_index" @hide="handleHide"></vue-easy-lightbox>

    <vue-easy-lightbox scrollDisabled escDisabled moveDisabled :visible="zoom_visible"
      :imgs="getLightbox(user.banner, 'file')" :index="zoom_index" @hide="handleHide"></vue-easy-lightbox>
  </q-no-ssr>


  <div class="row flex flex-center">
    <div class="row col-12 text-center justify-center q-gutter-y-lg">


      <!-- <div class="full-width absolute" style="
            height:200px;
            background-image: url('https://cdn.game.tv/game-tv-content/images_3/c5fe7911559e21c08f59d655593a20cc/Banners.jpg');
            background-size:cover;
            background-repeat: no-repeat;
            background-position: center;
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;">
      </div> -->

      <!-- <div class="col-12 text-h4 q-mb-md text-bold">
          My Biodata
        </div> -->

      <div class="col-12" style="margin-top:50px;">
        <Biodata :loading="loading" :user="user" />
        <!-- <a href="http://localhost:9100/profile">http://localhost:9100/profile</a> -->
      </div>

      <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12 ">
        <q-tabs style="height: 75px;" value="" no-caps inline-label align="justify" indicator-color="transparent" class=""
          content-class="text-weight-light">
          <q-route-tab :to="goto({
              name: 'activity',
              params: {
                user_id: user?.id
              },
              query: {
                tab: 1
              }
            })" style="width:50%;">
            <div>
              <b class="text-subtitle1 text-weight-bold">{{ user.followed_total?.total }}</b>
              <br>
              <a class="text-body2 text-grey-7">Mengikuti</a>
            </div>
          </q-route-tab>

          <q-separator vertical color="grey-3" />

          <q-route-tab :to="goto({
              name: 'activity',
              params: {
                user_id: user?.id
              },
              query: {
                tab: 2
              }
            })" style="width:50%;">
            <div>
              <b class="text-subtitle1 text-weight-bold">{{ user.follow_total?.total }}</b>
              <br>
              <a class="text-body2 text-grey-7">Pengikut</a>
            </div>
          </q-route-tab>

          <q-separator vertical color="grey-3" />

          <q-route-tab :to="{
            name: 'liked',
            params: {
              user_id: user?.id
            },
          }" style="width:50%;">
            <div>
              <b class="text-subtitle1 text-weight-bold">{{ user.liked_total?.total }}</b>
              <br>
              <a class="text-body2 text-grey-7">Disukai</a>
            </div>
          </q-route-tab>

          <q-separator vertical color="grey-3" />

          <q-route-tab :to="{
            name: 'favorite',
            params: {
              user_id: user?.id
            },
          }" style="width:50%;">
            <div>
              <b class="text-subtitle1 text-weight-bold">{{ user.bookmarked_total?.total }}</b>
              <br>
              <a class="text-body2 text-grey-7">Favorit</a>
            </div>
          </q-route-tab>

        </q-tabs>
      </div>

      <!-- <div class="col-12">
          <Social />
        </div> -->

      <!-- <div class="row q-col-gutter-sm col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
            <q-btn icon="fab fa-facebook" color="red" class="text-body2 full-width" style="" outline
              label="youtube"></q-btn>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
            <q-btn icon="fab fa-facebook" color="blue" class="text-body2 full-width" outline label="facebook"></q-btn>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
            <q-btn icon="fab fa-instagram" color="pink" class="text-body2 full-width" outline label="instagram"></q-btn>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
            <q-btn icon="fab fa-tiktok" color="dark" class="text-body2 full-width" outline label="tiktok"></q-btn>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
            <q-btn icon="fab fa-twitter" color="cyan" class="text-body2 full-width" outline label="twitter"></q-btn>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-6">
            <q-btn icon="fab fa-pinterest" color="purple" class="text-body2 full-width" outline label="pinterest"></q-btn>
          </div>
          <div class="col-12">
            <q-btn icon="fa fa-link" color="pink" class="text-body2 full-width"  outline  label="website"></q-btn>
          </div>
        </div> -->

      <div class="col-12 row flex flex-center q-col-gutter-sm">
        <div>
          <q-btn @click="user?.id == auth_id && !user.social?.youtube ? $router.push({ name:'form_accounts_social' }) : ''" :tag="user.social?.youtube ? 'a' : ''" :target="user.social?.youtube ? '_blank' : ''" :href="user.social?.youtube"
            icon="fab fa-youtube" :color="user.social?.youtube ? 'red' : 'grey'" class="text-body2" outline round>
            <q-tooltip>youtube</q-tooltip>
          </q-btn>
        </div>
        <div>
          <q-btn @click="user?.id == auth_id && !user.social?.facebook ? $router.push({ name:'form_accounts_social' }) : ''" :tag="user.social?.facebook ? 'a' : ''" :target="user.social?.facebook ? '_blank' : ''" :href="user.social?.facebook"
            icon="fab fa-facebook" :color="user.social?.facebook ? 'blue' : 'grey'" class="text-body2" outline round>
            <q-tooltip>facebook</q-tooltip>
          </q-btn>
        </div>
        <div>
          <q-btn @click="user?.id == auth_id && !user.social?.instagram ? $router.push({ name:'form_accounts_social' }) : ''" :tag="user.social?.instagram ? 'a' : ''" :target="user.social?.instagram ? '_blank' : ''" :href="user.social?.instagram"
            icon="fab fa-instagram" :color="user.social?.instagram ? 'pink' : 'grey'" class="text-body2" outline round>
            <q-tooltip>instagram</q-tooltip>
          </q-btn>
        </div>
        <div>
          <q-btn @click="user?.id == auth_id && !user.social?.tiktok ? $router.push({ name:'form_accounts_social' }) : ''" :tag="user.social?.tiktok ? 'a' : ''" :target="user.social?.tiktok ? '_blank' : ''" :href="user.social?.tiktok" icon="fab fa-tiktok"
            :color="user.social?.tiktok ? 'dark' : 'grey'" class="text-body2" outline round>
            <q-tooltip>tiktok</q-tooltip>
          </q-btn>
        </div>
        <div>
          <q-btn @click="user?.id == auth_id && !user.social?.twitter ? $router.push({ name:'form_accounts_social' }) : ''" :tag="user.social?.twitter ? 'a' : ''" :target="user.social?.twitter ? '_blank' : ''" :href="user.social?.twitter"
            icon="fab fa-twitter" :color="user.social?.twitter ? 'cyan' : 'grey'" class="text-body2" outline round>
            <q-tooltip>twitter</q-tooltip>
          </q-btn>
        </div>
        <div>
          <q-btn @click="user?.id == auth_id && !user.social?.pinterest ? $router.push({ name:'form_accounts_social' }) : ''" :tag="user.social?.pinterest ? 'a' : ''" :target="user.social?.pinterest ? '_blank' : ''" :href="user.social?.pinterest"
            icon="fab fa-pinterest" :color="user.social?.pinterest ? 'purple' : 'grey'" class="text-body2" outline round>
            <q-tooltip>pinterest</q-tooltip>
          </q-btn>
        </div>
        <div>
          <q-btn @click="user?.id == auth_id && !user.social?.website ? $router.push({ name:'form_accounts_social' }) : ''" :tag="user.social?.website ? 'a' : ''" :target="user.social?.website ? '_blank' : ''" :href="user.social?.website" icon="public"
            :color="user.social?.website ? 'pink' : 'grey'" class="text-body2" outline round>
            <q-tooltip>website</q-tooltip>
          </q-btn>
        </div>
      </div>


      <!-- <div class="col-12 text-h6 text-weight-regular text-grey-8">
          Featured Video
        </div> -->

      <video @error="onError" v-if="!loading && !is_error" ref="video" :height="is_mobile_size ? 250 : 350"
        :src="imageSync(user.preview)" id="video-preview" class="col-12" controls>
        Your browser does not support HTML video.
      </video>

      <!-- <div class="col-12 text-h6 text-weight-regular text-grey-8">
          Featured Banner
        </div> -->

      <!-- <div class="col-12 row q-px-md"> -->
      <q-card flat  v-if="user.banner.length > 0" class="col-12">
        <q-carousel :style="[is_mobile_size ? 'height:250px;' : 'height:450px;']" v-model="slide" swipeable animated
          autoplay arrows navigation infinite>
          <!-- <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
            <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" /> -->
          <q-carousel-slide class="no-scroll q-pa-none" v-for="(el, index) in   user.banner  " :key="index" :name="index">
            <q-img @click="zoom_index = index; zoom_visible = true;" :src="imageSync(el.file)" alt="mountains" class="fit"
              style="object-fit: cover;">
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-negative text-white">
                  Cannot load image
                </div>
              </template>
            </q-img>
          </q-carousel-slide>
        </q-carousel>
      </q-card>
      <!-- </div> -->

      <div v-if=" false " class="col-12 row q-col-gutter-sm flex flex-center">
        <!-- <div class="col-auto">
            <q-btn @click="tab_category = 'musisi'" color="pink" class="text-body2 full-width" style="" unelevated rounded :outline="tab_category != 'musisi'">
              Musisi
            </q-btn>
          </div>
          <div class="col-auto">
            <q-btn @click="tab_category = 'studio'" color="teal" class="text-body2 full-width" style="" unelevated rounded :outline="tab_category != 'studio'">
              Studio
            </q-btn>
          </div>
          <div class="col-auto">
            <q-btn @click="tab_category = 'venue'" color="primary" class="text-body2 full-width" style="" unelevated rounded :outline="tab_category != 'venue'">
              Venue
            </q-btn>
          </div> -->

        <div class="col-auto">
          <q-btn @click=" onCategory('musisi') " color="dark" class="text-body2 full-width" style="" unelevated rounded
            :outline=" tab_category != 'musisi' ">
            Musisi
          </q-btn>
        </div>
        <div class="col-auto">
          <q-btn @click=" tab_category = 'studio' " color="dark" class="text-body2 full-width" style="" unelevated rounded
            :outline=" tab_category != 'studio' ">
            Studio
          </q-btn>
        </div>
        <div class="col-auto">
          <q-btn @click=" tab_category = 'venue' " color="dark" class="text-body2 full-width" style="" unelevated rounded
            :outline=" tab_category != 'venue' ">
            Venue / Cafe
          </q-btn>
        </div>

      </div>

      <!--
        ROUTER VERSION
        <div class="col-12 row q-col-gutter-sm">
          <div class="col">
            <q-btn :to="{name:'profile_musisi'}" color="pink" class="text-body2 full-width" style="" unelevated rounded :outline="tab_category != 'musisi'">
              Musisi
            </q-btn>
          </div>
          <div class="col">
            <q-btn :to="{name:'profile_studio'}" color="teal" class="text-body2 full-width" style="" unelevated rounded :outline="tab_category != 'studio'">
              Studio
            </q-btn>
          </div>
          <div class="col">
            <q-btn :to="{name:'profile_venue'}" color="primary" class="text-body2 full-width" style="" unelevated rounded :outline="tab_category != 'venue'">
              Venue
            </q-btn>
          </div>
        </div>
        <router-view />
        -->




      <TabMusisi />
      <!-- <TabMusisi v-if="tab_category == 'musisi'" />
        <TabStudio v-if="tab_category == 'studio'" />
        <TabVenue v-if="tab_category == 'venue'" /> -->




      <!-- <q-tabs v-if="tab_category == 'musisi'" no-caps outside-arrows :mobile-arrows="is_mobile_size && !is_cordova" dense v-model="tab"
          class="text-pink col-12 text-weight-regular">
          <q-tab name="1"><q-icon size="sm" name="fa fa-drum" class="q-mb-xs"></q-icon>Perform</q-tab>
          <q-tab name="2"><q-icon size="sm" name="fa-solid fa-microphone-lines" class="q-mb-xs"></q-icon>Karir</q-tab>
          <q-tab name="3"><q-icon size="sm" name="fa-regular fa-calendar" class="q-mb-xs"></q-icon>Agenda</q-tab>
          <q-tab name="4"><q-icon size="sm" name="fa-solid fa-list" class="q-mb-xs"></q-icon>Playlist</q-tab>
          <q-tab name="5"><q-icon size="sm" name="fa-solid fa-user-check" class="q-mb-xs"></q-icon>Original</q-tab>
          <q-tab name="6"><q-icon size="sm" name="fa-solid fa-guitar" class="q-mb-xs"></q-icon>Cover</q-tab>
        </q-tabs>


        <q-tabs v-if="tab_category == 'studio'" align="center" no-caps outside-arrows :mobile-arrows="is_mobile_size && !is_cordova" dense inline-label v-model="tab" :breakpoint="0"
          class="text-teal col-12 text-weight-regular">
          <q-tab name="2" icon="home">&nbsp;&nbsp;Detail</q-tab>
          <q-tab name="3" icon="fa-regular fa-calendar">&nbsp;&nbsp;Agenda</q-tab>
          <q-tab name="4" icon="fa-solid fa-location">&nbsp;&nbsp;Lokasi</q-tab>
        </q-tabs>

        <q-tabs v-if="tab_category == 'venue'" align="center" no-caps outside-arrows :mobile-arrows="is_mobile_size && !is_cordova" dense inline-label v-model="tab" :breakpoint="0"
          class="text-primary col-12 text-weight-regular">
          <q-tab name="2" icon="home">&nbsp;&nbsp;Detail</q-tab>
          <q-tab name="3" icon="fa-regular fa-calendar">&nbsp;&nbsp;Agenda</q-tab>
          <q-tab name="4" icon="fa-solid fa-location">&nbsp;&nbsp;Lokasi</q-tab>
        </q-tabs> -->

    </div>
  </div>
</template>


<script>

// import Form_Foto from './Form_Foto.vue'
import Biodata from './biodata.vue'
// import Social from './Penawaran_Terbaik.vue'
import TabMusisi from './pages/musisi.vue'
import TabStudio from './pages/studio.vue'
import TabVenue from './pages/venue.vue'

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useProfileStore } from 'src/stores/profiles/musisi'

// import { date } from 'quasar'
// const timeStamp = Date.now()
// const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')

import DetailAgenda from './pages/agenda/komentar-semua/container.vue'
import DetailVideo from './pages/video/komentar-semua/container.vue'
import DetailAudio from './pages/audio/komentar-semua/container.vue'
import DetailImage from './pages/image/komentar-semua/container.vue'
import DetailYoutube from './pages/youtube/komentar-semua/container.vue'

export default {
  computed: {
    ...mapState(useProfileStore, {
      loading: 'loading',
      user: 'user',
      profile_detail: 'profile_detail',
    }),
    ...mapWritableState(useProfileStore, {
      loading: 'loading',
      user: 'user',
      profile_detail: 'profile_detail',
    }),
  },
  components: {
    // Form_Foto,
    DetailAgenda,
    DetailVideo,
    DetailAudio,
    DetailImage,
    DetailYoutube,

    Biodata,
    // Social,
    TabMusisi,
    TabStudio,
    TabVenue,
  },
  mounted() {
    const vm = this
    this.$global.$on('profile-detail', function (event) {
      // console.log(event)
      console.log(event)
      switch (event.type) {
        case 'tab-image':
          vm.tab_zoom_visible = event.zoom_visible
          vm.tab_zoom_index = event.zoom_index
          vm.tab_zoom_images = vm.getLightbox(event.zoom_images, 'file')
          break;
      }
    });

  },
  activated() {
    this.is_error = false
  },
  deactivated() {
    this.$global.$off('profile-detail')
  },
  data() {
    return {
      // profile_detail: {
      //   type: '',
      //   popup: false,
      //   post_id: null,
      // },

      tab_category: 'musisi',
      tab: '1',
      slide: 1,

      zoom_visible: false,
      zoom_index: 0, // default: 0,
      zoom_images: [],

      tab_zoom_visible: false,
      tab_zoom_index: 0, // default: 0,
      tab_zoom_images: [],

      is_ready: false,

      is_error: false,

    }
  },
  methods: {
    handleHide() {
      this.zoom_visible = false
      this.tab_zoom_visible = false
    },
    onCategory(val) {
      this.tab_category = val
      this.$nextTick(() => {
        // gak tau kenapa smooth gak jalan
        window.scrollTo({ top: 0, behavior: 'smooth' }, document.body.scrollHeight);
      })
    },
    async onCheck() {
      if (this.password) this.$refs.password.validate();
      if (this.password_confirmation) this.$refs.password_confirmation.validate();
    },
    onError() {
      this.is_error = true
    }
  },
};
</script>
