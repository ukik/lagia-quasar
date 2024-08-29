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
        </q-card-section>

        <!-- <q-separator color="white"></q-separator> -->

        <q-card-section class="q-col-gutter-md row">
          <div class="col-12">
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
              :lazy-rules="false"
              :debounce="300"
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

          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <!-- :rules="[(val) => !!val || '']" -->
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
              placeholder="Instansi"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="home" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">(Opsional) Instansi</div>
              </template>
              <template v-slot:hint>
                <span class="text-white">Instansi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
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
              :lazy-rules="false"
              :debounce="300"
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

          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
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
              :lazy-rules="false"
              :debounce="300"
              placeholder="Telepon"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="phone" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Wajib Telepon</div>
              </template>
              <template v-slot:hint>
                <span class="text-white">Telepon *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <q-input
              clearable
              counter
              maxlength="100"
              bg-color="white"
              rounded
              outlined
              color="primary"
              ref="cityRef"
              v-model="city"
              :lazy-rules="false"
              :debounce="300"
              placeholder="Kota Asal"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="near_me" color="primary" />
              </template>
              <template v-slot:error>
                <div class="text-white">Wajib Kota Asal</div>
              </template>
              <template v-slot:hint>
                <span class="text-white">Kota Asal *</span>
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
              :lazy-rules="false"
              :debounce="300"
              placeholder="Alamat"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <template v-slot:prepend>
                <q-icon name="place" color="primary" />
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

        <!-- <q-separator color="white"></q-separator>

        <q-card-actions class="q-pa-md" align="between">
          <q-btn
            @click="onDeletePopup"
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
        </q-card-actions> -->
      </q-card>

      <!-- <q-card flat bordered class="rounded-borders-2 q-mt-lg">
        <q-card-actions class="q-pa-md" align="between">
          <q-btn
            @click="onDeletePopup"
            style="padding: 10px 15px"
            icon="delete"
            unelevated
            color="negative"
            size="18px"
            label="Hapus"
            no-caps
          ></q-btn>
          <q-btn
            type="submit"
            style="padding: 10px 15px"
            icon-right="send"
            unelevated
            color="positive"
            size="18px"
            label="Book Now"
            no-caps
          ></q-btn>
        </q-card-actions>
      </q-card> -->
    </form>
  </div>
</template>

<script>
import { useQuasar, scroll } from "quasar";
import { ref } from "vue";
import { mapActions, mapState, mapWritableState, storeToRefs } from "pinia";
// import { useTourCartSelectedStore } from "stores/lagia-stores/tour/TourCartSelectedStore";
// import { useTourCartListStore } from "stores/lagia-stores/tour/TourCartListStore";

import { useTourOrderDetailStore } from "src/stores/lagia-stores/tour/TourOrderDetailStore";

const { getScrollTarget, setVerticalScrollPosition } = scroll;

// takes an element object
function scrollToElement(el) {
  const target = getScrollTarget(el);
  const offset = el.offsetTop;
  const duration = 10;
  setVerticalScrollPosition(target, offset, duration);
}

export default {
  setup() {
    // const { onAddToBook } = useTourCartSelectedStore();

    const $q = useQuasar();

    // const name = ref("demo@gmail.com");
    const nameRef = ref(null);

    // const email = ref("demo@gmail.com");
    const emailRef = ref(null);

    // const phone = ref(423523523);
    const phoneRef = ref(null);

    // const instance = ref("demo@gmail.com");
    const instanceRef = ref(null);

    // const city = ref("demo@gmail.com");
    const cityRef = ref(null);

    // const address = ref("demo@gmail.com");
    const addressRef = ref(null);

    // const accept = ref(false);

    // const position = ref(null);
    // const position_options = ref(["Google", "Facebook", "Twitter", "Apple", "Oracle"]);

    const {
      name,
      email,
      phone,
      instance,
      city,
      address,
    } = storeToRefs(useTourOrderDetailStore())

    return {
      // onAddToBook,
      // nameRules: [(val) => (val && val.length > 0) || ""],

      name,
      email,
      phone,
      instance,
      city,
      address,

      nameRef,
      emailRef,
      phoneRef,
      instanceRef,
      cityRef,
      addressRef,

      // ageRules: [
      //   (val) => (val !== null && val !== "") || "Please type your age",
      //   (val) => (val > 0 && val < 100) || "Please type a real age",
      // ],

      // position,
      // position_options,

      // accept,
      notify(message) {
        $q.notify({
            color: "negative",
            message: message,
            position: "top",
          });
      },
      async onSubmit() {
        nameRef.value.validate();
        emailRef.value.validate();
        phoneRef.value.validate();
        // instanceRef.value.validate();
        cityRef.value.validate();
        addressRef.value.validate();

        // @click="onAddToBook"
        if(nameRef.value.hasError) this.notify("Nama (wajib)")
        if(emailRef.value.hasError) this.notify("Email (wajib)")
        if(phoneRef.value.hasError) this.notify("Telepon (wajib)")
        // if(instanceRef.value.hasError) this.notify("Instansi (wajib)")
        if(cityRef.value.hasError) this.notify("Kota Asal (wajib)")
        if(addressRef.value.hasError) this.notify("Alamat (wajib)")

        return
        if (
          nameRef.value.hasError ||
          emailRef.value.hasError ||
          phoneRef.value.hasError ||
          instanceRef.value.hasError ||
          cityRef.value.hasError ||
          addressRef.value.hasError
        ) {
          // form has error
          $q.notify({
            color: "negative",
            message: "Lengkapi formulir pelanggan",
          });
          return;
          // } else if (accept.value !== true) {
          //   $q.notify({
          //     color: "negative",
          //     message: "You need to accept the license and terms first",
          //   });
          //   return;
        } else {
          // $q.notify({
          //   icon: "done",
          //   color: "positive",
          //   message: "Submitted",
          // });
        }

        // await onAddToBook({
        //   payload: {
        //     full_name: name.value,
        //     email: email.value,
        //     phone: phone.value,
        //     instance: instance.value,
        //     city: city.value,
        //     address: address.value,
        //   },
        // });
      },

      onReset() {
        name.value = null;
        email.value = null;
        phone.value = null;
        instance.value = null;
        city.value = null;
        address.value = null;

        nameRef.value.resetValidation();
        emailRef.value.resetValidation();
        phoneRef.value.resetValidation();
        instanceRef.value.resetValidation();
        cityRef.value.resetValidation();
        addressRef.value.resetValidation();
      },
    };
  },
  computed: {
    ...mapWritableState(useTourOrderDetailStore, [
      "date_start",
      "participant_adult",
      "participant_young",
      "description",
      "hotel",
      "dibayar",
      "dibayar_percent",

      "room_qty",
      "room_budget",

      "name",
      "email",
      "phone",
      "instance",
      "city",
      "address",
    ])
  },
  mounted() {
    this.$refs?.nameRef.validate();
    this.$refs?.emailRef.validate();
    this.$refs?.phoneRef.validate();
    // this.$refs?.instanceRef.validate();
    this.$refs?.cityRef.validate();
    this.$refs?.addressRef.validate();

  },
  methods: {
    // ...mapActions(useTourCartSelectedStore, [
    //   "onRemove",
    //   "onSelectedRemove",
    //   "onAddToBook",
    // ]),
    // ...mapActions(useTourCartListStore, ["onRecordRemove"]),

    // async onDeletePopup() {
    //   const vm = this;

    //   const id = this.selected[0]?.id;

    //   vm.$swal
    //     .fire({
    //       title: "Apa anda yakin?",
    //       text: "Hapus data ini dari keranjang",
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonText: "Yes, hapus saja!",
    //       cancelButtonText: "Tidak, cancel!",
    //       confirmButtonColor: "#3085d6",
    //       cancelButtonColor: "#d33",
    //       reverseButtons: true,
    //     })
    //     .then(async (result) => {
    //       if (result.isConfirmed) {
    //         vm.$q.loading.show();

    //         const remove = await vm.onRemove([id]);

    //         vm.$q.loading.hide();

    //         if (remove) {
    //           // vm.$swal.fire({
    //           //   title: "Deleted!",
    //           //   text: "Data berhasil dihapus  :)",
    //           //   icon: "success",
    //           //   showConfirmButton: true,
    //           //   confirmButtonText: "Tutup",
    //           //   timer: 1500,
    //           // });

    //           vm.$q.notify({
    //             icon: "done",
    //             color: "positive",
    //             message: "Deleted!",
    //             caption: "Data berhasil dihapus",
    //           });

    //           await vm.onRecordRemove(id);
    //           await vm.onSelectedRemove(id);

    //           const ANCHOR = document.querySelector("#ANCHOR");
    //           scrollToElement(ANCHOR);
    //         }
    //       } else if (
    //         /* Read more about handling dismissals below */
    //         result.dismiss === vm.$swal.DismissReason.cancel
    //       ) {
    //         // vm.$swal.fire({
    //         //   title: "Cancelled",
    //         //   text: "Data batal dihapus :)",
    //         //   icon: "error",
    //         //   showConfirmButton: true,
    //         //   confirmButtonText: "Tutup",
    //         //   timer: 1500,
    //         // });

    //         vm.$q.notify({
    //           icon: "close",
    //           color: "negative",
    //           message: "Cancelled!",
    //           caption: "Data gagal dihapus",
    //         });
    //       }
    //     });
    // },
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
  font-weight: 700;
}
</style>
