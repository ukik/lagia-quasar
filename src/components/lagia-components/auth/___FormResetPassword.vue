<template>
  <div class="form-box">
    <q-banner v-if="change_password_dikirim.pending" class="bg-primary text-white rounded-borders-2 q-mb-md">
      Email telah dikirim ke alamat yang Anda berikan. Silakan ikuti tautan dalam email untuk menyelesaikan permintaan ganti email Anda.
      <template v-slot:action>
        <q-btn flat color="white" icon="close" label="tutup" />
      </template>
      <template v-slot:avatar>
        <q-icon name="done" color="white" />
      </template>
    </q-banner>

    <q-banner v-if="change_password_dikirim.error || change_password_dikirim.message" class="bg-negative text-white rounded-borders-2 q-mb-md">
      Terjadi kesalahan: {{ change_password_dikirim.message }}.
      <template v-slot:action>
        <q-btn flat color="white" icon="close" label="tutup" />
      </template>
      <template v-slot:avatar>
        <q-icon name="done" color="white" />
      </template>
    </q-banner>

    <q-banner v-if="change_password_dikirim.success" class="bg-positive text-white rounded-borders-2 q-mb-md">
      Verifikasi akun berhasil dilakukan.
      <template v-slot:action>
        <q-btn flat color="white" icon="close" label="tutup" />
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
        <div class="text-h5 text-uppercase text-white">Reset Password</div>
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
              :disable="loading.form_reset_password"
              type="text"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="emailRef"
              v-model="form_reset_password.email"
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
                <span class="text-white" v-if="form_reset_password.email">Email</span>
                <span class="text-white" v-else>Email wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input
              :disable="loading.form_reset_password"
              type="text"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="passwordRef"
              v-model="form_reset_password.password"
              placeholder="Password Baru"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="key" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Password kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form_reset_password.password"
                  >Password</span
                >
                <span class="text-white" v-else>Password wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input
              :disable="loading.form_reset_password"
              type="password"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="passwordConfirmationRef"
              v-model="form_reset_password.passwordConfirmation"
              placeholder="Konfirmasi Password Baru"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="key" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Konfirmasi password kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form_reset_password.passwordConfirmation"
                  >Konfirmasi Password</span
                >
                <span class="text-white" v-else>Konfirmasi Password wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input
              :disable="loading.form_reset_password"
              type="text"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="tokenRef"
              v-model="form_reset_password.token"
              placeholder="Token"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="key" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Token kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form_reset_password.token">Token</span>
                <span class="text-white" v-else>Token wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <q-card-actions class="col-12 text-center q-mt-lg" align="center">
            <q-btn
              :disable="loading.form_reset_password"
              type="submit"
              icon-right="send"
              outline
              color="white"
              size="16px"
              class="rounded-borders-4"
              label="verifikasi password"
            ></q-btn>
            <!-- <q-btn
              :disable="loading.form_reset_password"
              type="submit"
              icon-right="login"
              outline
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-sm"
              label="login"
            ></q-btn> -->
            <!-- <div class="col-1"></div> -->
            <!-- <q-btn
              :disable="loading.form_reset_password"
              type="reset"
              icon-right="delete"
              outline
              bg-color="orange"
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-sm"
              label="reset"
            ></q-btn> -->
          </q-card-actions>
        </form>
      </q-card-section>
      <div class="col-12 q-mt-md"></div>
      <q-separator color="white-1"></q-separator>
      <q-card-section>
        <div class="col-12 row items-center justify-center text-white">
          <div class="col-xl col-lg col-md col-sm col-xs-12 "
            :class="[$q.screen.width > 425 ? 'text-left' : 'text-center']"
          >Tidak menerima email atau token kedaluwarsa?</div>
          <q-btn
            @click="onRequestToken"
            outline
            color="white"
            size="16px"
            class="rounded-borders-4"
            label="Kirim Ulang Token"
          ></q-btn>
        </div>
      </q-card-section>
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
    const { onResetPassword, onClearResetPassword } = store;
    const { form_reset_password, auth, loading } = storeToRefs(store);

    const $q = useQuasar();

    const emailRef = ref(null);
    const passwordRef = ref(null);
    const passwordConfirmationRef = ref(null);
    const tokenRef = ref(null);

    return {
      store,
      auth,
      form_reset_password,
      loading,
      emailRef,
      passwordRef,
      passwordConfirmationRef,
      tokenRef,

      async onSubmit() {
        emailRef.value.validate();
        passwordRef.value.validate();
        passwordConfirmationRef.value.validate();
        tokenRef.value.validate();

        if (
          emailRef.value.hasError ||
          passwordRef.value.hasError ||
          passwordConfirmationRef.value.hasError ||
          tokenRef.value.hasError
        ) {
          $q.notify({
            color: "negative",
            message: "Peringatan",
            caption: "Lengkapi form registrasi",
            position: "top",
          });
          return;
        }

        await onResetPassword();
      },

      onReset() {
        onClearResetPassword();

        emailRef.value.resetValidation();
        passwordRef.value.resetValidation();
        passwordConfirmationRef.value.resetValidation();
        tokenRef.value.resetValidation();
      },
    };
  },
  computed: {
    ...mapWritableState(useAuthStore, [
      'change_password_dikirim',
      'form_forgot_password',
      'form_reset_password',
      'getAuthUser',
    ])
  },
  mounted() {
    this.form_reset_password.email = this.$route?.query?.email
    this.form_reset_password.token = this.$route?.query?.token
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
