<template>
  <q-dialog position="bottom" v-model="dialog_option">
    <q-list :style="is_mobile_size ? ('width:' + $q.screen.width + 'px') : ('width:300px')" class="bg-white">
      <q-item clickable v-ripple :active="option === 'camera'" @click="onPickerImage_Camera" active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon name="camera" />
        </q-item-section>

        <q-item-section>Camera</q-item-section>
      </q-item>

      <q-item clickable v-ripple :active="option === 'galeri'" @click="onPickerImage_Galeri" active-class="my-menu-link">
        <q-item-section avatar>
          <q-icon name="image" />
        </q-item-section>

        <q-item-section>Galeri</q-item-section>
      </q-item>
    </q-list>
  </q-dialog>

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="red" text-color="white" />
        <span class="q-ml-sm">Yakin menghapus file ini?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Yakin" @click="onConfirm" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- max-file-size="5000000" capture -->
  <input v-show="false" type="file" accept="video/mp4,video/x-m4v,video/*" ref="media" id="media" @change="onFileChange">

  <div class="row text-center justify-center">

    <q-card flat v-if="media" class="col-12 row q-mb-md">
      <div>
        <q-chip class="absolute-top-left q-pa-sm" color="red" text-color="white">Video</q-chip>
      </div>

      <video @error="onError" ref="media" :src="media" id="video-preview" class="col-12" controls></video>

      <q-btn @click="confirm = true" class="absolute-top-right q-ma-sm" round unelevated color="white" text-color="red"
        dense icon="close" />
    </q-card>


    <div v-if="!media || is_error" class="col-11 q-py-md">
      <q-card class="col-12 text-center q-mb-md" flat bordered>
        <q-card-section class="q-py-xl flex flex-center">
          <!-- https://assets4.lottiefiles.com/packages/lf20_bP3BLu.json -->
          <Vue3Lottie style="" animationLink="https://assets9.lottiefiles.com/packages/lf20_knnirj9a.json" :loop="true"
            :autoPlay="true"></Vue3Lottie>

          <div class="full-width">
            <q-btn @click="onDialogOption" label="Ambil Video" no-caps rounded unelevated color="red"
              icon="photo_camera" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useFormStore } from 'src/stores/forms/accounts/preview.js'
import { preFetch } from 'quasar/wrappers';
import { Vue3Lottie } from 'vue3-lottie'
import axios from 'axios'

export default {
  computed: {
    ...mapState(useFormStore, {
      // description: 'description',
      media: 'media',
      // cover: 'cover',
      file_media: 'file_media',
      // file_cover: 'file_cover',
      loading: 'loading',
      loading_create: 'loading_create',
    }),
    ...mapWritableState(useFormStore, {
      // description: 'description',
      media: 'media',
      // cover: 'cover',
      file_media: 'file_media',
      // file_cover: 'file_cover',
      loading: 'loading',
      loading_create: 'loading_create',
    }),
  },
  components: {
    Vue3Lottie
  },
  activated() {
    this.is_error = false
  },
  data() {
    return {
      // video:"",
      dialog_option: false,
      option: '',
      confirm: false,
      // type: '',
      is_error: false
    }
  },
  methods: {
    ...mapActions(useFormStore, [
      'form_delete_single',
    ]),
    onError() {
      this.is_error = true
    },
    onClearInput() {
      // this.$refs.cover.value = null;
      this.$refs.media.value = null;
    },
    async onConfirm() {
      const response = await this.form_delete_single({
        id: this.auth_id
      })
      console.log(response)

      if (response) {
        this.$refs.media.value = null;
      }
      this.confirm = false
    },
    onFileChangeCover(event) {
      const vm = this
      let cover = event.target.files[0];

      let reader = new FileReader();

      reader.readAsDataURL(cover);
      reader.addEventListener('load', function () {
        vm.cover = reader.result
      });

      vm.file_cover = cover
    },
    onFileChange(event) {
      const vm = this
      let media = event.target.files[0];

      // let video = document.getElementById('video-preview');
      let reader = new FileReader();

      reader.readAsDataURL(media);
      reader.addEventListener('load', function () {
        // video.src = reader.result;
        vm.media = reader.result
      });

      vm.file_media = media
    },
    onDialogOption() {
      if (this.is_cordova) {
        this.dialog_option = true
        return
      }
      this.onPickerImage()
    },
    onPickerImage_Galeri() {
      this.option = 'galeri'
      this.onPickerImage()
    },
    onPickerImage_Camera() {
      this.onToastBottom('buka camera')

      this.option = 'camera'
      // this.$refs.file1.click()

      // document.getElementById('file').setAttribute('capture', 'capture');
      // setTimeout(() => {
      // 	this.onPickerImage()
      // }, 500)

      // return

      // capture callback
      var captureSuccess = function (mediaFiles) {
        this.onToastBottom('upload dari galeri')
      };

      // capture error callback
      var captureError = function (error) {
      };

      // start audio capture
      navigator.device.capture.captureImage(captureSuccess, captureError, { limit: 2 });

    },
    onPickerImage() {
      this.$refs.media.click()
    }
  }
};
</script>

<style lang="sass" scoped>
.my-menu-link
  color: white
  background: #F2C037
</style>
