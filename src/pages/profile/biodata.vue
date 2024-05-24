<template>
  <div>

    <div class="q-pt-md">
      <!-- <div class="row flex-center q-mb-lg" @click="onLottePlay">
        <Vue3Lottie ref="lottie" class="absolute" :autoPlay="false" animationLink="https://assets9.lottiefiles.com/temp/lf20_fUJGYM.json" :height="280" :width="280" @onComplete="onComplete" :loop="2"/>
        <q-avatar size="98px" @click="onZoom" style="width: 170px; height: 170px; ">
          <img ref="foto_profile" loading="lazy" :src="imageSync(user.avatar)" @error="handleError"
            style="border-radius:50px; object-fit: cover;">
        </q-avatar>
      </div> -->

      <q-btn v-if="auth_id != route_param?.slug" @click="onFollow(); authCheck(); gotoLogin();" class="q-mr-sm"
        :color="!user.follow ? 'positive' : 'primary'" icon="check"
        :label="!user.follow ? 'Mengikuti' : 'Berhenti Mengikuti'" unelevated rounded />

      <q-btn v-if=" is_logged && auth_id == route_param?.slug " :to=" goto({ name: 'settings' }) "
        class="q-mr-sm" color="primary" outline icon="settings" label="Settings" unelevated rounded />

      <div id="nama" class="text-h6 text-center text-capitalize q-mt-md">{{ user.nama }}</div>
      <div class="text-body2 text-grey-6 text-center">
        ID: {{ user.slug }}
      </div>

      <div class="text-caption" :class=" [user.email_verified_at ? 'text-green' : 'text-red'] ">
        {{ user.email_verified_at ? 'Sudah' : 'Belum' }} Terverifikasi
      </div>

      <div v-if="!user.email_verified_at && user.id == auth_id" >
        <q-btn :disabled="email_verify_limit" class="q-mt-md" @click="sendVerifyEmail" no-caps icon="email" unelevated outline label="Please sent email verify">
        </q-btn>
        <div class="text-caption q-mt-xs">{{ message }}</div>
      </div>

      <div class="q-pa-md">{{ user.bio }}</div>

      <!-- <q-btn @click="onSubmit" outline
			:label="mengikuti ? 'Sudah Berteman' : 'Belum Mengikuti'" dense
			class="q-px-sm q-mb-sm"
			rounded no-caps unelevated
			:color="mengikuti ? 'blue' : 'green'" /> -->

    </div>

    <q-dialog v-model=" confirm " persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section style="font-size:14px;">
          Apakah berhenti mengikuti?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Batal" color="teal" v-close-popup />
          <q-btn flat @click=" onRequest " label="Berhenti Mengikuti" color="teal" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <!-- <q-no-ssr>
    <CoolLightBox
        :items="img_collection"
        :index="img_zoom_index"
        @close="img_zoom_index = null">
      </CoolLightBox>
    </q-no-ssr> -->
    <q-no-ssr>
      <vue-easy-lightbox scrollDisabled escDisabled moveDisabled :visible=" zoom_visible " :imgs=" zoom_images "
        :index=" zoom_index " @hide=" handleHide "></vue-easy-lightbox>
    </q-no-ssr>

  </div>
</template>


<script type="text/javascript">

import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import AstronautJSON from 'src/assets/lotties/5483-loading-circle.json'

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAuthStore } from 'src/stores/auth/auth';
import { useProfileStore } from 'src/stores/profiles/musisi'

export default {
  props: ['user', 'loading'],
  computed: {
    ...mapState(useAuthStore, {
      auth: 'payload',
      message: 'message',
      email_verify_limit: 'email_verify_limit',
    }),
    // ...mapState(useProfileStore, {
    //   loading: 'loading',
    // }),
    ...mapWritableState(useAuthStore, {
      auth: 'payload',
    }),
  },
  components: {
    Vue3Lottie,
  },
  methods: {
    handleHide() {
      this.zoom_visible = false
    },
    ...mapActions(useProfileStore, {
      follow: 'follow',
    }),
    ...mapActions(useAuthStore, {
      sendVerifyEmail: 'sendVerifyEmail',
    }),
    onComplete() {
      alert(1)
    },
    onFollow() {
      this.follow({
        user_id: this.route_param?.slug,
      })
    },
    onLottePlay() {
      return
      this.$refs.lottie.play()
    },
    async onSubmit() {

      if (this.mengikuti) {
        this.confirm = true
        return
      }

      this.onRequest()
    },
    async onRequest() {
      const form = {
        id_user_teman: this.user.id,
      }

      const request = await this.dispatchVuex('aggregator/set_teman', form)
      this.dispatchVuex('profile/set_mengikuti', request.data)

      console.log(request)
    },

    onZoom() {
      const foto_profile = this.$refs.foto_profile.src
      this.zoom_index = 0
      this.zoom_images = [foto_profile]
      this.zoom_visible = true
    },
  },
  data() {
    return {
      AstronautJSON,

      confirm: false,
      zoom_visible: false,
      zoom_index: 0, // default: 0,
      zoom_images: [],
      mengikuti: true,
    }
  }
};
</script>

