<template>
  <q-no-ssr>

    <q-form @submit="onSubmit" class="row flex justify-center items-start q-py-md">
      <div class="row col-11 q-col-gutter-y-lg text-center justify-center">

        <q-input :disable="loading_forget" :loading="loading_forget" class="col-12" hide-bottom-space
          v-model="form_forget.email" ref="email" clearable text-color="grey" bg-color="white" outlined placeholder="Email"
          lazy-rules :rules="[(val) => !!val || '']" error-message="wajib dilengkapi">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <div class="col-12">
          <q-btn :disable="loading_forget" :loading="loading_forget"
            class="button-default full-width full-height text-subtitle2" type="submit" icon-right="check_circle"
            unelevated color="primary" label="Sent login link"></q-btn>
        </div>

        <div class="col-12 text-center">
          <q-btn :to="{
            name: 'auth_signup'
          }" dense flat no-caps text-color="blue">
            Create a new account
          </q-btn>
        </div>

        <!-- <div class="col-12">
          <q-btn :disable="loading_forget" :loading="loading_forget"
            class="full-width full-height text-subtitle2" no-caps type="submit" icon-right="check_circle"
            unelevated color="grey" label="Sent login link"></q-btn>
        </div> -->

      </div>

      <q-list bordered class="col-11 text-center q-mt-lg q-py-md">
          I have account to use,
          <q-btn :to="{
            name: 'auth_login'
          }" dense flat no-caps text-color="blue">
            Back to login
          </q-btn>
      </q-list>

    </q-form>
  </q-no-ssr>
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
      loading_forget: 'loading_forget',
      form_forget: 'form_forget',
    }),
    ...mapWritableState(useAuthStore, {
      loading_forget: 'loading_forget',
      form_forget: 'form_forget',
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
      'sendForgetEmail',
    ]),
    async onSubmit() {

      this.$refs.email.validate();

      if (!this.form_forget.email) return;

      const response = await this.sendForgetEmail()

      if(response) {
        this.$router.push(this.goto({
            name:'auth_sent'
          })
        )
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
