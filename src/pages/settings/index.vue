<template>
  <q-list class="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white">

    <!-- <q-item v-if="!storeAuth.user.email_verified_at" @click="sendVerifyEmail" clickable v-close-popup>
      <q-item-section>Please sent email verify</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="email" />
      </q-item-section>
    </q-item>

    <q-separator /> -->

    <q-item :to="goto({
      name: 'form_accounts_profile'
    })" clickable v-close-popup>
      <q-item-section>Formulir Profile</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="create" />
      </q-item-section>
    </q-item>
    <q-item :to="goto({
      name: 'form_accounts_password'
    })" clickable v-close-popup>
      <q-item-section>Formulir Password</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="create" />
      </q-item-section>
    </q-item>
    <q-item :to="goto({
      name: 'form_accounts_biodata'
    })" clickable v-close-popup>
      <q-item-section>Formulir Biodata</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="create" />
      </q-item-section>
    </q-item>
    <q-item :to="goto({
      name: 'form_accounts_social'
    })" clickable v-close-popup>
      <q-item-section>Formulir Social</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="create" />
      </q-item-section>
    </q-item>
    <q-item :to="goto({
      name: 'form_accounts_avatar'
    })" clickable v-close-popup>
      <q-item-section>Formulir Avatar</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="create" />
      </q-item-section>
    </q-item>
    <q-item :to="goto({
      name: 'form_accounts_banner'
    })" clickable v-close-popup>
      <q-item-section>Formulir Banner</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="create" />
      </q-item-section>
    </q-item>
    <q-item :to="goto({
      name: 'form_accounts_career'
    })" clickable v-close-popup>
      <q-item-section>Formulir Career</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="create" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAuthStore } from 'src/stores/auth/auth.js'

export default {
  methods: {
    ...mapActions(useAuthStore, {
      sendVerifyEmail: 'sendVerifyEmail',
    })
  }
}
</script>
