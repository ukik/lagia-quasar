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
      {{ form }}
        <form
          id="form-career-component"
          @keyup.enter="onSubmit"
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class="q-col-gutter-md row q-col-gutter-y-lg"
        >
          <div class="col-12">
            <q-input
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="nameRef"
              v-model="form.name"
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
                <span class="text-white" v-if="name">Nama</span>
                <span class="text-white" v-else>Nama wajib diisi *</span>
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
              ref="usernameRef"
              v-model="username"
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
                <span class="text-white" v-if="name">Username</span>
                <span class="text-white" v-else>Username wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-input
              clearable
              maxlength="25"
              mask="+62 #### #### ###########"
              counter
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="phoneRef"
              v-model="phone"
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
                <span class="text-white" v-if="name">Telepon</span>
                <span class="text-white" v-else>Telepon wajib diisi *</span>
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
              ref="emailRef"
              v-model="form.email"
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
                <span class="text-white" v-if="name">Email</span>
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
              v-model="password"
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
                <span class="text-white" v-if="name">Password</span>
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
              ref="confirmRef"
              v-model="confirm"
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
                <span class="text-white" v-if="name">Konfirmasi Password</span>
                <span class="text-white" v-else>Konfirmasi Password wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-12">
            <q-select
              @popup-show="onPlaceholder('hide')"
              @popup-hide="onPlaceholder('show')"
              @clear="onPlaceholder('show')"
              @focus="onPlaceholder('hide')"
              @blur="onPlaceholder('show')"
              :options="genderOptions"
              :clearable="gender !== 'Gender'"
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="genderRef"
              v-model="gender"
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
                <span class="text-white" v-if="name">Gender</span>
                <span class="text-white" v-else>Gender wajib diisi *</span>
              </template>
            </q-select>
          </div>

          <div class="col-12 text-center row items-center">
            <q-card-section :class="[ $q.screen.width > 425 ? '' : 'col-12 order-last']"
              class="rounded-borders-3 row q-pa-none row justify-center"
              style="background: rgba(255, 255, 255, 0.125)"
            >
              <q-field
                ref="acceptRef"
                v-model="accept"
                dense
                :rules="[(val) => !!val || '']"
                bottom-slots
                borderless
                :lazy-rules="true"
                class="q-pa-none q-py-sm q-px-sm row col-auto"
              >
                <q-toggle class="col-auto" v-model="accept" color="white">
                  <div class="text-white q-pr-md">Saya setuju terms & conditions</div>
                </q-toggle>
                <template v-slot:error>
                  <!-- Please use a maximum value of 30. -->
                </template>
              </q-field>
            </q-card-section>

            <q-space v-if="$q.screen.width > 425"></q-space>

            <div class="col-auto text-center" :class="[ $q.screen.width > 425 ? '' : 'q-mb-lg col-12']">
              <q-btn
                outline
                class="rounded-borders-3 "
                color="white"
                label="baca"
                icon="privacy_tip"
              ></q-btn>
            </div>
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
import { ref, defineProps } from "vue"

export default {
  setup() {
    const store = useRegisterStore()
    const {form} = storeToRefs(store)

    const $q = useQuasar();

    const name = ref(null);
    const nameRef = ref(null);

    const username = ref(null);
    const usernameRef = ref(null);

    const phone = ref(null);
    const phoneRef = ref(null);

    const email = ref(null);
    const emailRef = ref(null);

    const password = ref(null);
    const passwordRef = ref(null);

    const confirm = ref(null);
    const confirmRef = ref(null);

    const gender = ref("Gender");
    const genderRef = ref(null);
    const genderOptions = [
      {
        label: "Pria",
        value: "man",
      },
      {
        label: "Wanita",
        value: "women",
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
      form,

      email,

      name,
      nameRef,

      username,
      usernameRef,

      phone,
      phoneRef,

      email,
      emailRef,

      password,
      passwordRef,

      confirm,
      confirmRef,

      gender,
      genderRef,
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
          if (!gender.value) gender.value = "Gender";
          // } else {
          //   gender.value = null
        }
      },

      onSubmit() {
        nameRef.value.validate();
        usernameRef.value.validate();
        phoneRef.value.validate();
        emailRef.value.validate();
        passwordRef.value.validate();
        confirmRef.value.validate();
        genderRef.value.validate();

        acceptRef.value.validate();

        if (
          nameRef.value.hasError ||
          usernameRef.value.hasError ||
          phoneRef.value.hasError ||
          emailRef.value.hasError ||
          passwordRef.value.hasError ||
          confirmRef.value.hasError ||
          genderRef.value.hasError
        ) {
          $q.notify({
            color: "negative",
            message: "Peringatan",
            caption: "Lengkapi form registrasi",
            position: "top",
          });
          // form has error
        } else if (accept.value !== true) {
          $q.notify({
            color: "negative",
            message: "Peringatan",
            caption: "Anda harus menerima lisensi dan persyaratannya terlebih dahulu", // "You need to accept the license and terms first",
            position: "top",
          });
        } else {
          $q.notify({
            icon: "done",
            color: "positive",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
        username.value = null;
        phone.value = null;
        email.value = null;
        password.value = null;
        confirm.value = null;
        gender.value = "Gender";
        accept.value = false;

        nameRef.value.resetValidation();
        usernameRef.value.resetValidation();
        phoneRef.value.resetValidation();
        emailRef.value.resetValidation();
        passwordRef.value.resetValidation();
        confirmRef.value.resetValidation();
        genderRef.value.resetValidation();
        acceptRef.value.resetValidation();
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
