<template>
  <q-pull-to-refresh ref="pullToRefresh" :disable="is_mobile_size" @refresh="refresh" class="
      col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white">
    <Container ref="container" />
  </q-pull-to-refresh>

  <transition name="fade-global">
    <q-footer class="bg-transparent text-black row flex flex-center">
      <q-list v-if="this.file_media" class="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white">

        <q-banner flat class="bg-grey-2">
          <template v-slot:avatar>
            <q-icon name="info" color="blue-4" />
          </template>
          <div class="row flex items-center">
            <span>Maksimal 100 MB</span>
            <q-space />
            <q-btn @click="onSubmit" :disable="loading || loading_create" :loading="loading || loading_create" dense label="post" unelevated class="q-px-sm"
              icon="done" color="primary" />
          </div>
        </q-banner>

      </q-list>
    </q-footer>
  </transition>
</template>


<script>
import { scroll } from 'quasar'

import Container from './components/form.vue'

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useFormStore } from 'src/stores/forms/accounts/preview.js'
import { preFetch } from 'quasar/wrappers';

export default {
  components: {
    Container,
  },
  computed: {
    ...mapState(useFormStore, {
      loading: 'loading',
      loading_create: 'loading_create',
      // user: 'user',
      file_media: 'file_media',
    }),
    ...mapWritableState(useFormStore, {
      loading: 'loading',
      loading_create: 'loading_create',
      // user: 'user',
      file_media: 'file_media',
    }),
  },
  // preFetch: preFetch(async ({ store, currentRoute }) => {
  //   console.log(currentRoute)
  //   const mystore = useFormStore(store);
  //   await mystore.form_edit();
  // }),

  methods: {
    ...mapActions(useFormStore, [
      'form_edit',
      'form_create',
    ]),
    async onSubmit() {
      if (!this.auth_id) {
        if (!this.file_media) return;
      }

      const response = await this.form_create()

      if(response) this.$refs.container.$refs.media.value = null;
    },
    async refresh(done) {
      await this.form_edit({ id: this.auth_id });
      done() // required
      this.$refs.container?.$refs.virtualListRef?.scrollTo(0, 'center-force')
    },
  }
}
</script>
