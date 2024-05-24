<template>
  <div class="
    col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white flex flex-center
    scroll">

    <div class="row col-11 q-col-gutter-y-lg text-center justify-center">

      <q-list v-if="form_forget?.note?.message == 'sent'" bordered class="col-11 text-center q-mt-lg q-py-md">
        <div class="text-h6 q-py-lg">Email Sent</div>

        <div class="q-px-md q-mb-lg text-grey-8">
          We sent an email to <b class="text-black">{{ form_forget?.email }}</b> with a link to get back into your account.

        </div>
      </q-list>

      <q-list v-if="form_forget?.note?.message == 'limit'" style="border-color: red;" bordered class="col-11 text-center q-mt-lg q-py-md">
        <div class="text-h6 q-py-lg">Email Limit</div>

        <div class="q-px-md q-mb-lg text-grey-8">
          Mencapai batas maksimal kirim 3 email sehari. <br>
          We sent an email to <b class="text-black">{{ form_forget?.email }}</b> with a link to get back into your account.

        </div>
      </q-list>


    </div>

  </div>

</template>

<script>
// import Container from "./container.vue"

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAuthStore } from 'src/stores/auth/auth.js'

export default {
  computed: {
    ...mapState(useAuthStore, {
      form_forget: 'form_forget',
    }),
  },
}
</script>
