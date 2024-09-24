<template>
  <div class="form-box">
    <q-card flat class="rounded-borders-2 bg-form">
      <q-card-section class="text-center">
        <!-- <h2>LOGIN</h2> -->
        <!-- <img style="height: 48px" src="assets/images/site-logo.png" /> -->
        <!-- <q-separator color="white" class="q-my-sm"></q-separator> -->
        <div class="text-h5 text-uppercase text-white">Registrasi</div>
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
            <q-input :loading="loading.form_register" :disable="loading.form_register"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="nameRef"
              v-model="form_register.name"
              placeholder="Name"
              :lazy-rules="true"
              :rules="nameRules"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Nama kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form_register.name">Nama</span>
                <span class="text-white" v-else>Nama wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input :loading="loading.form_register" :disable="loading.form_register"
              type="text"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="usernameRef"
              v-model="form_register.username"
              placeholder="Username"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="face" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Username kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form_register.username">Username</span>
                <span class="text-white" v-else>Username wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input :loading="loading.form_register" :disable="loading.form_register"
              clearable
              maxlength="25"
              mask="+62 #### #### ###########"
              counter
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="phoneRef"
              v-model="form_register.phone"
              placeholder="Telepon"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="phone" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Telepon kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form_register.phone">Telepon</span>
                <span class="text-white" v-else>Telepon wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input :loading="loading.form_register" :disable="loading.form_register"
              type="text"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="emailRef"
              v-model="form_register.email"
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
                <span class="text-white" v-if="form_register.email">Email</span>
                <span class="text-white" v-else>Email wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input :loading="loading.form_register" :disable="loading.form_register"
              type="text"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="passwordRef"
              v-model="form_register.password"
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
                <span class="text-white" v-if="form_register.password">Password</span>
                <span class="text-white" v-else>Password wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input :loading="loading.form_register" :disable="loading.form_register"
              type="password"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="passwordConfirmationRef"
              v-model="form_register.passwordConfirmation"
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
                <span class="text-white" v-if="form_register.passwordConfirmation"
                  >Konfirmasi Password</span
                >
                <span class="text-white" v-else>Konfirmasi Password wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-select :loading="loading.form_register" :disable="loading.form_register"
              option-label="label"
              emit-value
              map-options
              @popup-show="onPlaceholder('hide')"
              @popup-hide="onPlaceholder('show')"
              @clear="onPlaceholder('show')"
              @focus="onPlaceholder('hide')"
              @blur="onPlaceholder('show')"
              :options="genderOptions"
              :clearable="form_register.gender !== 'Gender'"
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="genderRef"
              v-model="form_register.gender"
              placeholder="Gender"
              :lazy-rules="true"
              :rules="[(val) => (!!val && val !== 'Gender') || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="wc" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Gender kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form_register.gender">Gender</span>
                <span class="text-white" v-else>Gender wajib diisi *</span>
              </template>
            </q-select>
          </div>

          <div v-if="false" class="col-12 text-center row items-center">
            <q-card-section
              :class="[$q.screen.width > 425 ? '' : 'col-12 order-last']"
              class="rounded-borders-3 row q-pa-none row justify-center"
              style="background: rgba(255, 255, 255, 0.125)"
            >
              <q-field :loading="loading.form_register" :disable="loading.form_register"
                ref="acceptRef"
                v-model="accept"
                dense
                :rules="[(val) => !!val || '']"
                bottom-slots
                borderless
                :lazy-rules="true"
                class="q-pa-none q-py-sm q-px-sm row col-auto"
              >
                <q-toggle :loading="loading.form_register" :disable="loading.form_register" class="col-auto" v-model="accept" color="white">
                  <div class="text-white q-pr-md">Saya setuju terms & conditions</div>
                </q-toggle>
                <template v-slot:error> </template>
              </q-field>
            </q-card-section>

            <q-space v-if="$q.screen.width > 425"></q-space>

            <div
              class="col-auto text-center"
              :class="[$q.screen.width > 425 ? '' : 'q-mb-lg col-12']"
            >
              <q-btn :loading="loading.form_register" :disable="loading.form_register"
                outline
                class="rounded-borders-3"
                color="white"
                label="baca"
                icon="privacy_tip"
              ></q-btn>
            </div>
          </div>

          <div class="col-12 text-center row justify-center q-mt-lg">
            <q-btn :loading="loading.form_register" :disable="loading.form_register"
              type="submit"
              icon-right="login"
              outline
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-sm"
              label="login"
            ></q-btn>
            <div class="col-1"></div>
            <q-btn :loading="loading.form_register" :disable="loading.form_register"
              type="reset"
              icon-right="delete"
              outline
              bg-color="orange"
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-sm"
              label="reset"
            ></q-btn>
          </div>
        </form>
      </q-card-section>
      <div class="col-12 q-mt-md"></div>
      <q-separator color="white-1"></q-separator>
      <q-card-section>
        <div class="col-12 row items-center justify-center text-white">
          <div class=" text-left">Apakah Anda punya akun?</div>
          <q-btn capitalize
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
    const { onRegister, onClearRegister } = store;
    const { form_register, auth, loading } = storeToRefs(store);

    const $q = useQuasar();

    const nameRef = ref(null);
    const usernameRef = ref(null);
    const phoneRef = ref(null);
    const emailRef = ref(null);
    const passwordRef = ref(null);
    const passwordConfirmationRef = ref(null);
    const genderRef = ref(null);

    // const name = ref(null);
    // const username = ref(null);
    // const phone = ref(null);
    // const email = ref(null);
    // const password = ref(null);
    // const passwordConfirmation = ref(null);
    // const gender = ref("Gender");

    const genderOptions = [
      {
        label: "Pria",
        value: "man",
        check: "XXXXXXXX",
      },
      {
        label: "Wanita",
        value: "women",
        check: "ZZZZZZZZ",
      },
    ];

    // const age = ref(null);
    // const ageRef = ref(null);

    const accept = ref(false);
    const acceptRef = ref(null);

    // const position = ref(null);
    // const position_options = ref(["Google", "Facebook", "Twitter", "Apple", "Oracle"]);

    return {
      store,
      auth,
      form_register,
      loading,

      nameRef,
      usernameRef,
      phoneRef,
      emailRef,
      passwordRef,
      passwordConfirmationRef,
      genderRef,

      // email,
      // name,
      // username,
      // phone,
      // password,
      // passwordConfirmation,
      // gender,

      genderOptions,

      nameRules: [(val) => (val && val.length > 0) || ""],

      // age,
      // ageRef,
      // ageRules: [
      //   (val) => (val !== null && val !== "") || "Please type your age",
      //   (val) => (val > 0 && val < 100) || "Please type a real age",
      // ],

      // position,
      // position_options,

      accept,
      acceptRef,

      onPlaceholder(val) {
        if (val === "show") {
          if (!form_register.gender) form_register.gender = "Gender";
          // } else {
          //   gender.value = null
        }
      },

      async onSubmit() {
        nameRef.value.validate();
        usernameRef.value.validate();
        phoneRef.value.validate();
        emailRef.value.validate();
        passwordRef.value.validate();
        passwordConfirmationRef.value.validate();
        genderRef.value.validate();

        // acceptRef.value.validate();

        if (
          nameRef.value.hasError ||
          usernameRef.value.hasError ||
          phoneRef.value.hasError ||
          emailRef.value.hasError ||
          passwordRef.value.hasError ||
          passwordConfirmationRef.value.hasError ||
          genderRef.value.hasError
        ) {
          $q.notify({
            color: "negative",
            message: "Peringatan",
            caption: "Lengkapi form registrasi",
            position: "top",
          });
          return;
          // form has error
        } else if (accept.value !== true) {
          // $q.notify({
          //   color: "negative",
          //   message: "Peringatan",
          //   caption: "Anda harus menerima lisensi dan persyaratannya terlebih dahulu", // "You need to accept the license and terms first",
          //   position: "top",
          // });
        }

        await onRegister();

        // $q.notify({
        //   icon: "done",
        //   color: "positive",
        //   message: "Submitted",
        // });
      },

      onReset() {
        onClearRegister();

        accept.value = false;

        nameRef.value.resetValidation();
        usernameRef.value.resetValidation();
        phoneRef.value.resetValidation();
        emailRef.value.resetValidation();
        passwordRef.value.resetValidation();
        passwordConfirmationRef.value.resetValidation();
        genderRef.value.resetValidation();
        // acceptRef.value.resetValidation();
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
