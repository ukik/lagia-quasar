<template>
  <div class="
    col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white flex flex-center
    scroll">

    <div class="row col-11 q-col-gutter-y-lg text-center justify-center">

      <q-list v-if="verified == 'verified'" bordered class="col-12 text-center q-pa-xl">
        <img src="images/logo.png" />
        <div class="text-h6 q-py-lg text-positive">Verification Success</div>

        <div class="q-px-md q-mb-lg text-grey-8">
          Terimakasih sudah berhasil melakukan verifikasi email.
        </div>
      </q-list>

      <q-list v-if="verified == 'wrong'" style="border-color: red;" bordered class="col-12 text-center q-pa-xl">
        <img src="images/logo.png" />
        <div class="text-h6 q-py-lg text-negative">Verification Failed</div>

        <div class="q-px-md q-mb-lg text-grey-8">
          Maaf proses verifikasi email Anda tidak berhasil. <br> Silahkan coba kirim ulang email verifikasi baru.
        </div>
      </q-list>

      <q-list v-if="!verified" class="col-12 text-center q-py-md">
        <img src="images/logo.png" />
        <!-- <div class="text-h6 q-pb-lg">Verification Process</div> -->

        <div class="q-px-md q-mb-lg text-grey-8">
          <q-spinner
            color="primary"
            size="3em"
          />
        </div>
      </q-list>


    </div>

  </div>

</template>

<script>
// import Container from "./container.vue"

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAuthStore } from 'src/stores/auth/auth.js'

import { preFetch } from 'quasar/wrappers';

export default {
  preFetch: preFetch(async ({ store, currentRoute }) => {
    const mystore = useAuthStore(store);
    await mystore.verifyAccount({
      token: currentRoute.params.token
    });
  }),
  computed: {
    ...mapState(useAuthStore, {
      verified: 'verified',
    }),
  },
}
</script>
