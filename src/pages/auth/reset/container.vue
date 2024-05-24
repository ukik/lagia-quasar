<template>

    <q-form @submit="onSubmit" class="row flex justify-center items-start q-py-md">

      <div class="row col-11 q-col-gutter-y-lg text-center justify-center">

        <q-input :disable="loading_reset" :loading="loading_reset" hide-bottom-space class="col-12" ref="password" v-model="form_reset.password" clearable type="password" text-color="grey"
          error-message="wajib dilengkapi" bg-color="white" outlined placeholder="New Password" lazy-rules @update:model-value="onCheck"
          :rules="[val => (!!val && val == form_reset.confirm) || 'Password is not matched']">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>


        <q-input :disable="loading_reset" :loading="loading_reset" hide-bottom-space class="col-12" ref="confirm" v-model="form_reset.confirm" clearable
          error-message="wajib dilengkapi" type="password" text-color="grey" bg-color="white" outlined @update:model-value="onCheck"
          placeholder="New Password Confirmation" lazy-rules :rules="[val => (!!val && val == form_reset.password) || 'Password is not matched']">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>

        <div class="col-12 q-mt-xl q-mb-lg">
          <q-btn :disable="loading_reset" :loading="loading_reset"
            class="button-default full-width full-height text-subtitle2" type="submit" icon-right="check_circle"
            unelevated color="primary" label="Reset Password"></q-btn>
        </div>

      </div>

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
      loading_reset: 'loading_reset',
      form_reset: 'form_reset',
    }),
    ...mapWritableState(useAuthStore, {
      loading_reset: 'loading_reset',
      form_reset: 'form_reset',
    }),
  },
  methods: {
    ...mapActions(useAuthStore, [
      'resetPassword',
    ]),
    onCheck() {
      if(this.form_reset.password == this.form_reset.confirm) {
        this.$refs.password.resetValidation();
        this.$refs.confirm.resetValidation();
      } else {
        this.$refs.password.validate();
        this.$refs.confirm.validate();
      }
    },
    async onSubmit() {

      this.$refs.password.validate();
      this.$refs.confirm.validate();

      if (!this.form_reset.password) return;
      if (!this.form_reset.confirm) return;

      const response = await this.resetPassword()

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
      //   confirm: this.confirm,
      // });
    },
  },
};
</script>
