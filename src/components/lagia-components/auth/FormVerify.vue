<template>
  <div class="form-box">
    <q-card flat class="rounded-borders-2 bg-form">
      <q-card-section class="text-center">
        <!-- <h2>LOGIN</h2> -->
        <!-- <img style="height: 48px" src="assets/images/site-logo.png" /> -->
        <!-- <q-separator color="white" class="q-my-sm"></q-separator> -->
        <div class="text-h5 text-uppercase text-white">Email Verification</div>
        <div class="text-body text-capitalize text-white">fill the form below</div>
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
              type="text"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="emailRef"
              v-model="form_verify.email"
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
                <span class="text-white" v-if="form_verify.email">Email</span>
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
              ref="tokenRef"
              v-model="form_verify.token"
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
                <span class="text-white" v-if="form_verify.token">Token</span>
                <span class="text-white" v-else>Token wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <q-card-actions class="col-12 text-center q-mt-lg" align="between">
            <q-btn
              :loading="loading.form_verify"
              :disable="loading.form_verify"
              type="submit"
              icon-right="login"
              outline
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-sm"
              label="login"
            ></q-btn>
            <!-- <div class="col-1"></div> -->
            <q-btn
              :loading="loading.form_verify"
              :disable="loading.form_verify"
              type="reset"
              icon-right="delete"
              outline
              bg-color="orange"
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-sm"
              label="reset"
            ></q-btn>
          </q-card-actions>
        </form>
      </q-card-section>
      <div class="col-12 q-mt-md"></div>
      <q-separator color="white-1"></q-separator>
      <q-card-section>
        <div class="col-12 row items-center text-white">
          <div class="col text-left">Not receive email or token expired?</div>
          <q-btn
            @click="onSubmit('resend')"
            :loading="loading.form_verify"
            outline
            color="white"
            size="16px"
            class="rounded-borders-4"
            label="Resend"
          ></q-btn>
        </div>
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
    const { onVerify, onRequestVerification, onClearVerify } = store;
    const { form_verify, auth, loading } = storeToRefs(store);

    const $q = useQuasar();

    const emailRef = ref(null);
    const tokenRef = ref(null);

    return {
      store,
      auth,
      loading,
      form_verify,

      emailRef,
      tokenRef,

      async onSubmit(type = null) {
        emailRef.value.validate();
        tokenRef.value.validate();

        if (emailRef.value.hasError || tokenRef.value.hasError) {
          $q.notify({
            color: "negative",
            message: "Peringatan",
            caption: "Lengkapi form registrasi",
            position: "top",
          });
          return;
        }

        if (type == "resend") return await onRequestVerification();
        await onVerify();
      },

      onReset() {
        onClearVerify();

        emailRef.value.resetValidation();
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
