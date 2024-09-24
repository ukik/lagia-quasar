<template>
  <div class="form-box">


    <q-banner v-if="change_password_dikirim.pending" class="bg-primary text-white rounded-borders-2 q-mb-md">
      Email telah dikirim ke alamat yang Anda berikan. Silakan ikuti tautan dalam email untuk menyelesaikan permintaan ganti email Anda.
      <template v-slot:action>
        <q-btn flat color="white" icon="close" label="tutup" @click="change_password_dikirim.pending = false" />
      </template>
      <template v-slot:avatar>
        <q-icon name="done" color="white" />
      </template>
    </q-banner>

    <q-banner v-if="change_password_dikirim.error && change_password_dikirim.message" class="bg-negative text-white rounded-borders-2 q-mb-md">
      Terjadi kesalahan: {{ change_password_dikirim.message }}.
      <template v-slot:action>
        <q-btn flat color="white" icon="close" label="tutup" @click="change_password_dikirim.error = false" />
      </template>
      <template v-slot:avatar>
        <q-icon name="done" color="white" />
      </template>
    </q-banner>

    <q-banner v-if="change_password_dikirim.success" class="bg-positive text-white rounded-borders-2 q-mb-md">
      Verifikasi akun berhasil dilakukan.
      <template v-slot:action>
        <q-btn flat color="white" icon="close" label="tutup" @click="change_password_dikirim.success = false" />
      </template>
      <template v-slot:avatar>
        <q-icon name="done" color="white" />
      </template>
    </q-banner>



    <q-card flat class="rounded-borders-2 bg-form">
      <q-card-section class="text-center">
        <!-- <h2>LOGIN</h2> -->
        <!-- <img style="height: 48px" src="assets/images/site-logo.png" /> -->
        <!-- <q-separator color="white" class="q-my-sm"></q-separator> -->
        <div class="text-h5 text-uppercase text-white">Lupa Password</div>
        <div class="text-body text-capitalize text-white">isi formulir di bawah ini</div>
        <!-- <p>
          Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
          Vestibulum cumque laudantm sit.
        </p> -->
      </q-card-section>
      <q-separator color="white-1"></q-separator>
      <q-card-section class="q-mt-md">
        <form
          id="form-career-component"
          @keyup.enter="onSubmit"
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class="q-col-gutter-md row q-col-gutter-y-lg"
        >
          <div class="col-12">
            <q-input
              :disable="loading.form_forgot_password"
              type="text"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="emailRef"
              v-model="form_forgot_password.email"
              placeholder="Email"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Email kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form_forgot_password.email">Email</span>
                <span class="text-white" v-else>Email wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <q-card-actions class="col-12 text-center q-mt-lg" align="between">
            <q-btn
              :disable="loading.form_forgot_password"
              type="submit"
              icon-right="send"
              outline
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-md"
              label="Kirim Token"
            ></q-btn>
            <!-- <div class="col-1"></div> -->
            <!-- <q-btn
              :loading="loading.form_forgot_password"
              :disable="loading.form_forgot_password"
              type="reset"
              icon-right="delete"
              outline
              bg-color="orange"
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-sm"
              label="reset"
            ></q-btn> -->
            <q-btn to="/reset-password"
              :disable="loading.form_forgot_password"
              icon-right="arrow_forward"
              outline
              bg-color="orange"
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-sm"
              label="Reset Password"
            ></q-btn>
          </q-card-actions>
        </form>
      </q-card-section>
      <div class="col-12 q-mt-md"></div>
      <q-separator color="white-1"></q-separator>
      <slot name="bottom">
        <q-card-section>
          <div class="col-12 row items-center justify-center text-white">
            <div class="text-left">Belum punya akun?</div>
            <q-btn
              flat
              :to="{ name: '/register' }"
              capitalize
              outline
              color="white"
              size="16px"
              class="rounded-borders-4"
              label="Registrasi"
            ></q-btn>
          </div>

          <div class="col-12 row items-center justify-center text-white">
            <div class="text-left">Apakah Anda punya akun?</div>
            <q-btn
              capitalize
              flat
              :to="{ name: '/login' }"
              outline
              color="white"
              size="16px"
              class="rounded-borders-4"
              label="Login"
            ></q-btn>
          </div>
        </q-card-section>
      </slot>
    </q-card>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, defineProps } from "vue";

import { mapWritableState, storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

export default {
  setup() {
    const store = useAuthStore();
    const { onForgotPassword, onClearForgotPassword } = store;
    const { form_forgot_password, change_password_dikirim, auth, loading } = storeToRefs(store);

    const $q = useQuasar();

    const emailRef = ref(null);

    return {
      store,
      auth,
      form_forgot_password,
      loading,
      emailRef,
      change_password_dikirim,

      async onSubmit() {
        emailRef.value.validate();

        if (emailRef.value.hasError) {
          $q.notify({
            color: "negative",
            message: "Peringatan",
            caption: "Email wajib diisi",
            position: "top",
          });
          return;
        }

        await onForgotPassword();
      },

      onReset() {
        onClearForgotPassword();

        emailRef.value.resetValidation();
      },
    };
  },
  computed: {
    ...mapWritableState(useAuthStore, [
      'form_forgot_password',
      'form_reset_password',
    ])
  },
  watch: {
    form_forgot_password(email) {
      this.form_reset_password.email = val?.email
    }
  }
};
</script>

<style>
#form-career-component .q-field--outlined .q-field__control:hover:before {
  border-color: #ffffff75 !important;
}
#form-career-component .q-field__counter {
  color: white;
}
</style>
<style scoped>
.subtitle {
  color: white;
}
h2 {
  color: white;
  font-size: 40px;
  font-weight: 800;
}
</style>
