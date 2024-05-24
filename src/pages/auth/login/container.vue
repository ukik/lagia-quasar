<template>
  <q-form @submit="onSubmit" class="row flex justify-center items-start q-py-md">
    <div class="row col-11 q-col-gutter-y-lg text-center justify-center">

      <q-input :disable="loading_login" :loading="loading_login" class="col-12" hide-bottom-space v-model="email"
        ref="email" clearable text-color="grey" bg-color="white" outlined placeholder="Email" lazy-rules
        :rules="[(val) => !!val || '']" error-message="wajib dilengkapi">
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>

      <q-input :disable="loading_login" :loading="loading_login" class="col-12" hide-bottom-space v-model="password" type="password"
        ref="password" clearable text-color="grey" bg-color="white" outlined placeholder="Password" lazy-rules
        :rules="[(val) => !!val || '']" error-message="wajib dilengkapi">
        <template v-slot:prepend>
          <q-icon name="key" />
        </template>
      </q-input>

      <div class="col-12">
        <q-btn :disable="loading_login" :loading="loading_login"
          class="button-default full-width full-height text-subtitle2" type="submit" icon-right="check_circle" unelevated
          color="primary" label="Login"></q-btn>
      </div>

      <div class="col-12 text-center">
        <q-btn :to="{
          name: 'auth_forget'
        }" dense flat no-caps text-color="blue">
          Forget Password
        </q-btn>
      </div>

    </div>

    <q-list bordered class="col-11 text-center q-mt-lg q-py-md">
      Don't have an account?
      <q-btn :to="{
        name: 'auth_signup'
      }" dense flat no-caps text-color="blue">
        Sign up
      </q-btn>
    </q-list>

  </q-form>
</template>


<script>
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAuthStore } from 'src/stores/auth/auth.js'

import { date } from 'quasar'
const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')

export default {
  computed: {
    ...mapState(useAuthStore, {
      loading_login: 'loading_login',
      email: 'email',
      password: 'password',
    }),
    ...mapWritableState(useAuthStore, {
      loading_login: 'loading_login',
      email: 'email',
      password: 'password',
    }),
  },
  mounted() {
    // this.$nextTick(() => {
    //   const el = document.getElementById("children_account");
    //   const target = getScrollTarget(el)
    //   const offset = el.offsetTop
    //   const duration = 500
    //   setVerticalScrollPosition(target, offset, duration)
    // })
  },
  methods: {
    ...mapActions(useAuthStore, [
      'login',
    ]),
    async onSubmit() {

      this.$refs.email.validate();
      this.$refs.password.validate();

      if (!this.email) return;
      if (!this.password) return;

      const response = await this.login()
      if (response) {
        this.$router.replace({
          name: 'profile',
          params: {
            slug: this.auth_id
          }
        })
      }

      // if (!this.password) return;

      // const telp = this.phone.indexOf('+62') > -1 ? this.phone : ('+62'+this.phone)
      // const telp =
      //   this.phone.indexOf(this.country_selected) > -1
      //     ? this.phone
      //     : this.country_selected + this.phone;

      // this.$store.dispatch("auth/register", {
      //   country_selected: this.country_selected,
      //   phone: telp,
      //   password: this.password,
      //   password_confirmation: this.password_confirmation,
      // });
    },
  },
};
</script>
