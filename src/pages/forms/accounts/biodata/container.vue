<template>
  <q-no-ssr>

    <q-form @submit="onSubmit" class="row flex justify-center items-start q-py-md">
      <div class="row col-11 q-col-gutter-md q-col-gutter-y-lg text-center justify-center">

        <q-input :disable="loading || loading_create" :loading="loading_create" class="col-12" hide-bottom-space
          v-model="user.birth_place" ref="birth_place" clearable text-color="grey" bg-color="white" outlined placeholder="Tempat Lahir"
          lazy-rules :rules="[(val) => !!val || '']" error-message="wajib dilengkapi">
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
        </q-input>

        <q-input :disable="loading || loading_create" :loading="loading_create" hide-bottom-space
          @click="$refs.date.show()" class="col-12" v-model="user.birth_date" ref="birth_date" clearable
          text-color="grey" placeholder="Tanggal Lahir" bg-color="white" outlined lazy-rules :readonly="user.birth_date ? true : false"
          :rules="[(val) => !!val || '']" error-message="wajib dilengkapi">
          <template v-slot:prepend>
            <!-- <q-icon name="date_range" /> -->
            <q-icon name="date_range">
              <q-popup-proxy ref="date" cover transition-show="scale" transition-hide="scale">
                <q-date mask="YYYY-MM-DD"  v-model="user.birth_date">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="close" color="primary" flat v-close-popup />
                    <!-- <q-btn label="OK" color="primary" flat @click="save" v-close-popup /> -->
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input :disable="loading || loading_create" :loading="loading_create" hide-bottom-space class="col-12"
          maxlength="200" counter input-style="min-height: 100px;" v-model="user.address" ref="address" type="textarea" :rules="[(val) => !!val || '']" error-message="wajib dilengkapi"
          autogrow clearable text-color="grey" bg-color="white" outlined placeholder="Alamat">
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>

        <q-input :disable="loading || loading_create" :loading="loading_create" hide-bottom-space class="col-12"
          maxlength="200" counter input-style="min-height: 150px;" v-model="user.bio" ref="bio" type="textarea" autogrow :rules="[(val) => !!val || '']" error-message="wajib dilengkapi"
          clearable text-color="grey" bg-color="white" outlined placeholder="Write about you here...">
          <template v-slot:prepend>
            <q-icon name="contact_page" />
          </template>
        </q-input>


        <div class="col-12">
          <q-btn :disable="loading_create" :loading="loading_create"
            class="button-default full-width full-height text-subtitle2" type="submit" icon-right="check_circle"
            unelevated color="primary" label="Simpan"></q-btn>
        </div>
      </div>

    </q-form>
  </q-no-ssr>
</template>


<script>
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll

// import Form_Foto from 'src/pages/accounts/Form_Foto.vue'

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useFormStore } from 'src/stores/forms/accounts/biodata.js'

import { date } from 'quasar'
const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')

export default {
  computed: {
    ...mapState(useFormStore, {
      loading: 'loading',
      loading_create: 'loading_create',
      user: 'user',
    }),
    ...mapWritableState(useFormStore, {
      loading: 'loading',
      loading_create: 'loading_create',
      user: 'user',
    }),
  },
  watch: {
    route_name(val) {
      if (val == 'form_accounts_biodata') {
        this.user = {
          id: '',
          birth_place: formattedString,
          birth_date: formattedString,
          address: '',
          bio: '',
        }
      }
    }
  },
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
    ...mapActions(useFormStore, [
      'form_create',
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

      this.$refs.birth_place.validate();
      this.$refs.birth_date.validate();
      this.$refs.address.validate();
      this.$refs.bio.validate();

      if (!this.user.birth_place) return;
      if (!this.user.birth_date) return;
      if (!this.user.address) return;
      if (!this.user.bio) return;

      const response = await this.form_create()
    },
  },
};
</script>
