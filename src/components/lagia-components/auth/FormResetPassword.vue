<template>
  <div class="form-box">
    <q-card flat class="rounded-borders-2 bg-form q-pa-sm">
      <q-card-section class="text-center q-mt-md">
        <!-- <h2>LOGIN</h2> -->
        <img style="height: 48px" src="assets/images/site-logo.png" />
        <q-separator color="white" class="q-my-sm"></q-separator>
        <div class="text-body text-capitalize text-white">fill the form below</div>
        <!-- <p>
          Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
          Vestibulum cumque laudantm sit.
        </p> -->
      </q-card-section>
      <q-card-section>

        <form
          id="form-career-component"
          @keyup.enter="onSubmit"
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class="q-col-gutter-md row q-col-gutter-y-lg"
        >

          <div class="col-12">
            <q-input
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
              placeholder="Password"
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
                <span class="text-white" v-if="form_reset_password.password">Password</span>
                <span class="text-white" v-else>Password wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input
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
              placeholder="Konfirmasi Password"
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


          <div class="col-12 text-center q-mt-lg">
            <q-btn
              type="submit"
              icon-right="login"
              outline
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-sm"
              label="login"
            ></q-btn>

            <q-btn
              type="reset"
              icon-right="refresh"
              outline
              bg-color="orange"
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-sm"
              label="reset"
            ></q-btn>

            <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
          </div>
        </form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, defineProps } from "vue";

import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

export default {
  setup() {
    const store = useAuthStore();
    const { onResetPassword, onClearResetPassword } = store;
    const { form_reset_password, auth } = storeToRefs(store);

    const $q = useQuasar();

    const emailRef = ref(null);
    const passwordRef = ref(null);
    const passwordConfirmationRef = ref(null);
    const tokenRef = ref(null);

    return {
      store,
      auth,
      form_reset_password,

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
