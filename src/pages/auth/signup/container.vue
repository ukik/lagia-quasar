<template>
  <q-no-ssr>

    <q-form @submit="onSubmit" class="row flex justify-center items-start q-py-md">
      <div class="row col-11 q-col-gutter-y-lg text-center justify-center">

        <q-input :disable="loading_register" :loading="loading_register" class="col-12" hide-bottom-space
          v-model="form_register.email" ref="email" clearable text-color="grey" bg-color="white" outlined placeholder="Email"
          lazy-rules :rules="[(val) => !!val || '']" error-message="wajib dilengkapi">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <q-input :disable="loading_register" :loading="loading_register" class="col-12" hide-bottom-space
          v-model="form_register.name" ref="name" clearable text-color="grey" bg-color="white" outlined placeholder="Nama Lengkap"
          lazy-rules :rules="[(val) => !!val || '']" error-message="wajib dilengkapi">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input :disable="loading_register" :loading="loading_register" class="col-12" hide-bottom-space
          v-model="form_register.username" ref="username" clearable text-color="grey" bg-color="white" outlined placeholder="Username"
          lazy-rules :rules="[(val) => !!val || '']" error-message="wajib dilengkapi">
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
        </q-input>

        <q-input :disable="loading_register" :loading="loading_register" class="col-12" hide-bottom-space type="password"
          v-model="form_register.password" ref="password" clearable text-color="grey" bg-color="white" outlined placeholder="Password"
          lazy-rules :rules="[(val) => !!val || '']" error-message="wajib dilengkapi">
          <template v-slot:prepend>
            <q-icon name="key" />
          </template>
        </q-input>

        <q-list  class="col-12 text-center">
          By signing up, you agree to our Terms ,
            <q-btn :to="{
              name: 'auth_login'
            }" dense flat no-caps text-color="blue">
              Privacy Policy
            </q-btn>
            and
            <q-btn :to="{
              name: 'auth_login'
            }" dense flat no-caps text-color="blue">
              Cookies Policy
            </q-btn>
            .
        </q-list>


        <div class="col-12">
          <q-btn :disable="loading_register" :loading="loading_register"
            class="button-default full-width full-height text-subtitle2" type="submit" icon-right="check_circle"
            unelevated color="primary" label="Login"></q-btn>
        </div>


        <!-- <div class="col-12 text-center">
          <q-btn :to="{
            name: 'auth_login',
            params: {
              id: route_param?.id
            }
          }" dense flat no-caps text-color="blue">
            Ganti Password
          </q-btn>
        </div> -->

        <q-list bordered class="col-12 text-center q-mt-lg q-py-md">
            Have an account?
            <q-btn :to="{
              name: 'auth_login'
            }" dense flat no-caps text-color="blue">
              Log in
            </q-btn>
        </q-list>


      </div>

    </q-form>
  </q-no-ssr>
</template>


<script>
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAuthStore } from 'src/stores/auth/auth'

import { date } from 'quasar'
const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')

export default {
  computed: {
    ...mapState(useAuthStore, {
      loading_register: 'loading_register',
      form_register: 'form_register',
    }),
    ...mapWritableState(useAuthStore, {
      loading_register: 'loading_register',
      form_register: 'form_register',
    }),
  },
  // watch: {
  //   route_name(val) {
  //     if (val == 'form_accounts_biodata') {
  //       this.user = {
  //         id: '',
  //         birth_place: formattedString,
  //         birth_date: formattedString,
  //         address: '',
  //         bio: '',
  //       }
  //     }
  //   }
  // },
  components: {
    // Form_Foto
  },
  data() {
    return {
      // date: formattedString,
      // proxyDate: ('2019/03/01'),
    }
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
      'register',
    ]),
    // updateProxy() {
    //   this.user.birth_date = this.date
    // },

    // save() {
    //   this.date = this.user.birth_place
    //   // this.user.birth_place = this.proxyDate
    // },
    // async onCheck() {
    //   if (this.password) this.$refs.password.validate();
    //   if (this.password_confirmation) this.$refs.password_confirmation.validate();
    // },
    async onSubmit() {
      this.allValidate(this.$refs)

      // this.$refs.email.validate();
      // this.$refs.birth_date.validate();
      // this.$refs.address.validate();
      // this.$refs.bio.validate();
      // this.$refs.phone.validate();
      // this.$refs.password.validate();
      // this.$refs.password_confirmation.validate();

      if (!this.form_register.email) return;
      if (!this.form_register.name) return;
      if (!this.form_register.password) return;
      if (!this.form_register.username) return;

      const response = await this.register()
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
