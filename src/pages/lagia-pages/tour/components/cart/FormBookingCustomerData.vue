<template>
  <div class="form-box">
    <form
      id="form-career-component"
      @submit.prevent.stop="onSubmit"
      @reset.prevent.stop="onReset"
    >
      <q-card flat class="rounded-borders-2 bg-form">
        <q-card-section class="text-center">
          <h2 class="q-mb-none">DATA PELANGGAN</h2>
          <h5 class="subtitle q-mb-sm">SILAHKAN LENGKAPI</h5>
          <span class="text-caption"
            >Isi formulir dibawah ini dengan informasi yang benar</span
          >
          <!-- <p>Isi formulir dibawah ini dengan informasi yang benar</p> -->
        </q-card-section>

        <q-separator color="white"></q-separator>

        <q-card-section class="q-col-gutter-md row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <q-input
              clearable
              counter
              maxlength="100"
              bg-color="white"
              rounded
              outlined
              color="primary"
              ref="nameRef"
              v-model="name"
              lazy-rules
              placeholder="Nama Lengkap"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Wajib Nama Lengkap</div>
              </template>
              <template v-slot:hint>
                <span class="text-white">Nama Lengkap *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <q-input
              clearable
              counter
              maxlength="100"
              bg-color="white"
              rounded
              outlined
              color="primary"
              ref="instanceRef"
              v-model="instance"
              lazy-rules
              placeholder="Instansi"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Wajib Instansi</div>
              </template>
              <template v-slot:hint>
                <span class="text-white">Instansi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <q-input
              type="email"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              rounded
              outlined
              color="primary"
              ref="emailRef"
              v-model="email"
              lazy-rules
              placeholder="Email"
              :rules="[(val) => !!val || '', 'email']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Wajib Email</div>
              </template>
              <template v-slot:hint>
                <span class="text-white">Email *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <q-input
              clearable
              counter
              maxlength="25"
              mask="+62 #### #### ###########"
              bg-color="white"
              rounded
              outlined
              color="primary"
              ref="phoneRef"
              v-model="phone"
              lazy-rules
              placeholder="Telepon"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Wajib Telepon</div>
              </template>
              <template v-slot:hint>
                <span class="text-white">Telepon *</span>
              </template>
            </q-input>
          </div>

          <!-- <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <q-select
              clearable
              multiple
              bg-color="white"
              rounded
              outlined
              color="primary"
              ref="positionRef"
              v-model="position"
              :options="position_options"
              label="Your position *"
              lazy-rules
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Posisi tidak boleh kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white">Posisi wajib diisi *</span>
              </template>
            </q-select>
          </div> -->

          <div class="col-12">
            <q-input
              type="textarea"
              clearable
              counter
              maxlength="300"
              bg-color="white"
              rounded
              outlined
              color="primary"
              ref="addressRef"
              v-model="address"
              lazy-rules
              placeholder="Alamat"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Wajib Alamat</div>
              </template>
              <template v-slot:hint>
                <span class="text-white">Alamat *</span>
              </template>
            </q-input>
          </div>

          <!-- <div class="col-12">
            <q-input
              type="textarea"
              clearable
              counter
              maxlength="2000"
              bg-color="white"
              rounded
              outlined
              color="primary"
              ref="addressRef"
              v-model="address"
              label="Your interest & personality *"
              lazy-rules
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Minat & personaliti tidak boleh kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white">Minat & personaliti wajib diisi *</span>
              </template>
            </q-input>
          </div> -->
          <!-- <q-input
      ref="ageRef"
      filled
      type="number"
      v-model="age"
      label="Your age *"
      lazy-rules
      :rules="ageRules"
    />

    <q-toggle v-model="accept" label="I accept the license and terms" /> -->
        </q-card-section>

        <q-separator color="white"></q-separator>

        <q-card-actions class="q-pa-md" align="between">
          <q-btn
            style="padding: 10px 15px"
            icon="delete"
            unelevated
            color="white"
            text-color="red"
            size="18px"
            label="Hapus"
            no-caps
          ></q-btn>
          <q-btn
            style="padding: 10px 15px"
            icon-right="send"
            unelevated
            color="white"
            text-color="positive"
            size="18px"
            label="Book Now"
            no-caps
          ></q-btn>
          <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
        </q-card-actions>
      </q-card>
    </form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, defineProps } from "vue";

export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const nameRef = ref(null);

    const email = ref(null);
    const emailRef = ref(null);

    const phone = ref(null);
    const phoneRef = ref(null);

    const instance = ref(null);
    const instanceRef = ref(null);

    const city = ref(null);
    const cityRef = ref(null);

    const address = ref(null);
    const addressRef = ref(null);

    const accept = ref(false);

    // const position = ref(null);
    // const position_options = ref(["Google", "Facebook", "Twitter", "Apple", "Oracle"]);

    return {
      name,
      nameRef,
      // nameRules: [(val) => (val && val.length > 0) || ""],

      email,
      emailRef,

      phone,
      phoneRef,

      instance,
      instanceRef,

      city,
      cityRef,

      address,
      addressRef,

      // ageRules: [
      //   (val) => (val !== null && val !== "") || "Please type your age",
      //   (val) => (val > 0 && val < 100) || "Please type a real age",
      // ],

      // position,
      // position_options,

      accept,

      onSubmit() {
        nameRef.value.validate();
        ageRef.value.validate();

        if (nameRef.value.hasError || ageRef.value.hasError) {
          // form has error
        } else if (accept.value !== true) {
          $q.notify({
            color: "negative",
            message: "You need to accept the license and terms first",
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
        age.value = null;

        nameRef.value.resetValidation();
        ageRef.value.resetValidation();
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
.form-box {
  color: white;
  h5 {
    color: white;
    font-size: 16px;
  }
  h2 {
    color: white;
  }
}
h2 {
  font-size: 32px;
  font-weight: 800;
}
</style>
