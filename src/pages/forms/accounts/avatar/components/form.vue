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

  <vue-easy-lightbox scrollDisabled escDisabled moveDisabled :visible="zoom_visible" :imgs="get_lightbox"
    :index="zoom_index" @hide="handleHide"></vue-easy-lightbox>

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
  <input v-show="false" multiple type="file" accept="image/*" ref="cover" id="cover" @change="onFileChangeCover">

  <div class="row text-center justify-center ">

    <q-card v-for="(item, i) in  cover " flat square v-if="cover.length > 0" class="col-12 row q-mb-md">

      <q-img @error="onError" ref="cover" style="object-fit: cover; height: auto;" :src="item?.file" loading="lazy">
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Cannot load image
          </div>
        </template>
        <div @click="onLightBox(i)" class="full-width full-height bg-transparent"></div>
        <div class="full-width  absolute-bottom">
          <q-btn @click="onPickerImage" label="Ambil Gambar" no-caps rounded unelevated color="primary"
            icon="photo_camera" />
        </div>
      </q-img>

      <q-btn @click="confirm = true; index = i; selected = item;" class="absolute-top-right q-ma-sm" round unelevated
        color="white" text-color="red" dense icon="close" />

    </q-card>

    <div v-if="is_error || cover.length < 1" class="col-11 q-py-md">
      <q-card class="col-12 text-center q-mb-md" flat bordered>
        <q-card-section class="q-py-xl flex flex-center">

          <Vue3Lottie style="" animationLink="https://assets6.lottiefiles.com/packages/lf20_8qbuaxlc.json" :loop=" true "
            :autoPlay=" true "></Vue3Lottie>

          <div class="full-width">
            <q-btn @click=" onPickerImage " label="Ambil Gambar" no-caps rounded unelevated color="primary"
              icon="photo_camera" />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- <div class="col-11">
      <q-btn @click="onSubmit" :disable="loading_create" :loading="loading_create"
        class="button-default full-height text-subtitle2" type="submit" icon-right="check_circle" unelevated
        color="primary" label="Simpan"></q-btn>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useFormStore } from 'src/stores/forms/accounts/avatar.js'
import { preFetch } from 'quasar/wrappers';
import { Vue3Lottie } from 'vue3-lottie'
import axios from 'axios'

export default {
  computed: {
    ...mapState(useFormStore, {
      // description: 'description',
      cover: 'cover',
      file_cover: 'file_cover',
      max: 'max',
      loading: 'loading',
      loading_create: 'loading_create',
      get_lightbox: 'get_lightbox',
    }),
    ...mapWritableState(useFormStore, {
      // description: 'description',
      cover: 'cover',
      file_cover: 'file_cover',
      max: 'max',
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
      zoom_visible: false,
      zoom_index: 0, // default: 0,

      dialog_option: false,
      option: '',
      confirm: false,
      index: null,
      selected: null,

      is_error: false,
    }
  },
  methods: {
    ...mapActions(useFormStore, [
      'form_delete_single',
      'form_create',
    ]),
    onError() {
      this.is_error = true
    },
    async onSubmit() {
      // console.log(this.description)
      // if (!this.description) return;

      if (!this.auth_id) {
        // if (!this.file_media) return;
        if (this.file_cover.length <= 0) return;
      }

      const response = await this.form_create()

      // if(response?.id) {
      //   this.$router.replace({
      //     name:'image_create',
      //     params: {
      //       id: response.id
      //     }
      //   })
      // }

    },
    onClearInput() {
      this.$refs.cover.value = null;
    },
    onLightBox(val) {
      this.zoom_index = val;
      this.zoom_visible = true;
    },
    handleHide() {
      this.zoom_visible = false
    },
    async onConfirm() {
      const response = await this.form_delete_single({
        index: this.index,
        id: this.auth_id,
        selected: this.selected,
      })
      this.confirm = false

      if (response) {
        // console.log('this.$refs.cover.value',this.$refs.cover.value)
        // this.cover = null;
        this.$refs.cover.value = null;
        this.max++
        // if(this.type == 'cover') {
        //   this.cover = null; this.$refs.cover.value = null;
        // }
        // if(this.type == 'media') {
        //   this.media = null; this.$refs.media.value = null;
        // }

        // this.type = ''
      }
    },
    onFileChangeCover(event) {
      const vm = this

      vm.max = 1
      vm.cover = []
      vm.file_cover = []

      let file = event.target.files;
      for (let i = 0; i < file.length; i++) {
        if (vm.max <= 0) return
        vm.max--

        const element = file[i];

        // Preview jika mau, jadi base64
        let reader = new FileReader();
        reader.onloadend = () => {
          vm.cover.push({
            file: reader.result,
            id: '',
          })
        }
        reader.readAsDataURL(element);
        vm.file_cover.push({
          file: element,
          id: '',
        })
      };

      this.$refs.cover.value = null;

    },
    // onFileChange(event){
    //   const vm = this
    //   let media = event.target.files[0];

    //   let reader = new FileReader();

    //   reader.readAsDataURL( media );
    //   reader.addEventListener('load', function(){
    //     // video.src = reader.result;
    //     vm.media = reader.result
    //   });

    //   vm.file_media = media
    // },
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
      let fileUpload = document.getElementById('cover')
      if (fileUpload != null) {
        fileUpload.click()
      }
      // this.$refs.cover.click()
    }
  }
};
</script>

