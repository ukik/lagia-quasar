<template>
  <div class="form-box">
    <q-card flat class="rounded-borders-2 bg-form">
      <q-card-section class="text-center">
        <!-- <h2>LOGIN</h2> -->
        <!-- <img style="height: 48px" src="assets/images/site-logo.png" /> -->
        <!-- <q-separator color="white" class="q-my-sm"></q-separator> -->
        <div class="text-h5 text-uppercase text-white">Login</div>
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
              :loading="loading.form_login"
              :disable="loading.form_login"
              type="text"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="emailRef"
              v-model="form_login.email"
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
                <span class="text-white" v-if="form_login.email">Email</span>
                <span class="text-white" v-else>Email wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input
              :loading="loading.form_login"
              :disable="loading.form_login"
              type="text"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="passwordRef"
              v-model="form_login.password"
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
                <span class="text-white" v-if="form_login.password">Password</span>
                <span class="text-white" v-else>Password wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12 text-center row items-center" v-if="false">
            <q-item
              style=""
              tag="label"
              class="rounded-borders-3 q-pa-none bg-white"
              v-ripple
            >
              <q-item-section
                class="bg-white q-px-md rounded-borders-3"
                style="border-top-right-radius: 0px; border-bottom-right-radius: 0px"
              >
                <q-checkbox
                  :loading="loading.form_login"
                  :disable="loading.form_login"
                  dense
                  v-model="form_login.remember"
                  size="lg"
                />
              </q-item-section>
              <q-separator vertical></q-separator>
              <q-item-section side class="">
                <q-item-label class="text-dark q-pr-md">Remember me?</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <q-card-actions class="col-12 text-center q-mt-lg" align="between">
            <q-btn
              :loading="loading.form_login"
              :disable="loading.form_login"
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
              :loading="loading.form_login"
              :disable="loading.form_login"
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
      <slot name="bottom">
        <q-card-section>
          <div class="col-12 row items-center justify-center text-white">
            <div class="text-left">Don't have an account?</div>
            <q-btn
              flat
              :to="{ name: '/register' }"
              capitalize
              outline
              color="white"
              size="16px"
              class="rounded-borders-4"
              label="Register"
            ></q-btn>
          </div>

          <div class="col-12 row items-center justify-center text-white">
            <div class="text-left">I forget password!</div>
            <q-btn
              flat
              :to="{ name: '/forgot-password' }"
              capitalize
              outline
              color="white"
              size="16px"
              class="rounded-borders-4"
              label="Ask password"
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

import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

export default {
  setup() {
    const store = useAuthStore();
    const { onLogin, onClearLogin } = store;
    const { form_login, auth, loading } = storeToRefs(store);

    const $q = useQuasar();

    const emailRef = ref(null);
    const passwordRef = ref(null);
    const rememberRef = ref(null);

    return {
      store,
      auth,
      form_login,
      loading,

      emailRef,
      passwordRef,
      rememberRef,

      onLogin,
      onClearLogin,
    };
  },
  methods: {
    async onSubmit() {
      this.$refs.emailRef.validate();
      this.$refs.passwordRef.validate();

      // rememberRef.value.validate();

      if (this.$refs.emailRef.hasError || this.$refs.passwordRef.hasError) {
        this.$q.notify({
          color: "negative",
          message: "Peringatan",
          caption: "Lengkapi form login",
          position: "top",
        });
        return;
      }

      this.$q.loading.show();
      const resp = await this.onLogin();
      this.$q.loading.hide();

      if (resp.isLogin) {
        if (this.$route.name == "/login") {
          this.$router.push({ name: "/lagia/dashboard" });
        }
        this.$emit("onBubbleEventLogged");
      }

      // $q.notify({
      //   icon: "done",
      //   color: "positive",
      //   message: "Submitted",
      // });
    },

    onReset() {
      this.onClearLogin();

      this.$refs.emailRef.resetValidation();
      this.$refs.passwordRef.resetValidation();
    },
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
