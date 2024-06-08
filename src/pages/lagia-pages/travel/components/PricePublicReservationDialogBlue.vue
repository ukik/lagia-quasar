<template>
  <form class="form-box" id="form-career-component"
          @keyup.enter="onSubmit"
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset">
    <q-card flat class="rounded-borders-2 bg-form">
      <q-card-section class="text-center">
        <!-- <h2>LOGIN</h2> -->
        <!-- <img style="height: 48px" src="assets/images/site-logo.png" /> -->
        <!-- <q-separator color="white" class="q-my-sm"></q-separator> -->
        <div class="text-h5 text-uppercase text-white">Request Travel</div>
        <div class="text-body text-capitalize text-white">complete the form below</div>
        <!-- <p>
          Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
          Vestibulum cumque laudantm sit.
        </p> -->
      </q-card-section>
      <q-separator color="white-1"></q-separator>
      <q-card-section class="q-mt-md">
        <div
          class="q-col-gutter-md row q-col-gutter-y-lg"
        >
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="name_passanger_ref"
              v-model="form.name_passanger"
              placeholder="Name"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Nama kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.name_passanger">Nama</span>
                <span class="text-white" v-else>Nama wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              type="text"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="ktp_pessanger_ref"
              v-model="form.ktp_pessanger"
              placeholder="KTP"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="face" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">KTP kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.ktp_pessanger">KTP</span>
                <span class="text-white" v-else>KTP wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <!-- <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              clearable
              maxlength="25"
              mask="+62 #### #### ###########"
              counter
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="phoneRef"
              v-model="form.phone"
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
                <span class="text-white" v-if="form.phone">Telepon</span>
                <span class="text-white" v-else>Telepon wajib diisi *</span>
              </template>
            </q-input>
          </div> -->

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              type="date"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="birth_date_ref"
              v-model="form.birth_date"
              placeholder="Tanggal Lahir"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Tanggal Lahir kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.birth_date">Tanggal Lahir</span>
                <span class="text-white" v-else>Tanggal Lahir wajib diisi *</span>
              </template>
            </q-input>
          </div>


          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-select :loading="loading" :disable="loading"
              option-label="label"
              emit-value
              map-options
              @clear="onPlaceholder"
              :options="categoryOptions"
              :clearable="form.category !== 'Category'"
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="category_ref"
              v-model="form.category"
              placeholder="Category"
              :lazy-rules="true"
              :rules="[(val) => (!!val && val !== 'Category') || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="wc" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Category kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.category">Category</span>
                <span class="text-white" v-else>Category wajib diisi *</span>
              </template>
            </q-select>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              type="number"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="seat_no_ref"
              v-model="form.seat_no"
              placeholder="Jumlah Kursi"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="key" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Jumlah Kursi kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.seat_no"
                  >Jumlah Kursi</span
                >
                <span class="text-white" v-else>Jumlah Kursi wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              type="number"
              mask="Rp. ##############"
              unmasked-value
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="min_budget_ref"
              v-model="form.min_budget"
              placeholder="Min Budget"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="key" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Min Budget kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.min_budget"
                  >Min Budget</span
                >
                <span class="text-white" v-else>Min Budget wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              type="number"
              mask="Rp. ##############"
              unmasked-value
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="max_budget_ref"
              v-model="form.max_budget"
              placeholder="Max Budget"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="key" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Max Budget kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.max_budget"
                  >Max Budget</span
                >
                <span class="text-white" v-else>Max Budget wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-select :loading="loading" :disable="loading"
              option-label="label"
              emit-value
              map-options
              @clear="onPlaceholderTicketStatus"
              :options="ticketStatusOptions"
              :clearable="form.ticket_status !== 'Ticket Status'"
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="ticket_status_ref"
              v-model="form.ticket_status"
              placeholder="Tiket Status"
              :lazy-rules="true"
              :rules="[(val) => (!!val && val !== 'Ticket Status') || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="wc" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Tiket Status kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.ticket_status">Tiket Status</span>
                <span class="text-white" v-else>Tiket Status wajib diisi *</span>
              </template>
            </q-select>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              type="date"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="starting_date_ref"
              v-model="form.starting_date"
              placeholder="Tanggal Berangkat"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Tanggal Berangkat kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.starting_date">Tanggal Berangkat</span>
                <span class="text-white" v-else>Tanggal Berangkat wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              type="time"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="starting_time_ref"
              v-model="form.starting_time"
              placeholder="Jam Berangkat"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Jam Berangkat kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.starting_time">Jam Berangkat</span>
                <span class="text-white" v-else>Jam Berangkat wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="starting_location_ref"
              v-model="form.starting_location"
              placeholder="Lokasi Berangkat"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Lokasi Berangkat kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.starting_location">Lokasi Berangkat</span>
                <span class="text-white" v-else>Lokasi Berangkat wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="arrival_location_ref"
              v-model="form.arrival_location"
              placeholder="Tempat Tujuan"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Tempat Tujuan kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.arrival_location">Tempat Tujuan</span>
                <span class="text-white" v-else>Tempat Tujuan wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="starting_terminal_ref"
              v-model="form.starting_terminal"
              placeholder="Terminal Berangkat"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Terminal Berangkat kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.starting_terminal">Terminal Berangkat</span>
                <span class="text-white" v-else>Terminal Berangkat wajib diisi *</span>
              </template>
            </q-input>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <q-input :loading="loading" :disable="loading"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="arrival_terminal_ref"
              v-model="form.arrival_terminal"
              placeholder="Terminal Tujuan"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Terminal Tujuan kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.arrival_terminal">Terminal Tujuan</span>
                <span class="text-white" v-else>Terminal Tujuan wajib diisi *</span>
              </template>
            </q-input>
          </div>


          <div class="col-12">
            <q-input :loading="loading" :disable="loading"
              type="textarea"
              clearable
              counter
              maxlength="100"
              bg-color="white"
              :rounded="true"
              outlined
              color="primary"
              ref="description_ref"
              v-model="form.description"
              placeholder="Deskripsi"
              :lazy-rules="true"
              :rules="[(val) => !!val || '']"
              bottom-slots
            >
              <!-- <template v-slot:prepend>
                <q-icon name="key" color="primary" />
              </template> -->
              <template v-slot:error>
                <div class="text-white">Deskripsi kosong</div>
              </template>
              <template v-slot:hint>
                <span class="text-white" v-if="form.description"
                  >Deskripsi</span
                >
                <span class="text-white" v-else>Deskripsi wajib diisi *</span>
              </template>
            </q-input>
          </div>







        </div>
      </q-card-section>
      <div class="col-12 q-mt-md"></div>
      <q-separator color="white-1"></q-separator>
      <q-card-section>
        <div class="col-12 text-center row justify-center">
            <q-btn :loading="loading" :disable="loading"
              type="submit"
              icon-right="login"
              outline
              color="white"
              size="16px"
              class="rounded-borders-4 q-mx-sm"
              label="login"
            ></q-btn>
            <div class="col-1"></div>
            <q-btn :loading="loading" :disable="loading"
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
      </q-card-section>
    </q-card>
  </form>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, defineProps } from "vue";

import { storeToRefs } from "pinia";
import { useTravelReservationStore } from "src/stores/lagia-stores/travel/TravelReservationStore";

export default {
  setup() {
    const store = useTravelReservationStore();
    const { onRequestReservation, onClearReservationForm } = store;
    const { form, loading } = storeToRefs(store);

    const $q = useQuasar();

    const name_passanger_ref = ref(null);
    const ktp_passanger_ref = ref(null);
    const birth_date_ref = ref(null);
    const category_ref = ref(null);
    const seat_no_ref = ref(null);
    const min_budget_ref = ref(null);
    const max_budget_ref = ref(null);
    const ticket_status_ref = ref(null);
    const description_ref = ref(null);
    const starting_date_ref = ref(null);
    const starting_time_ref = ref(null);
    const starting_location_ref = ref(null);
    const arrival_location_ref = ref(null);
    const starting_terminal_ref = ref(null);
    const arrival_terminal_ref = ref(null);

    const categoryOptions = [
      {
        label: "Mobil",
        value: "mobil",
        check: "XXXXXXXX",
      },
      {
        label: "Motor",
        value: "motor",
        check: "ZZZZZZZZ",
      },
      {
        label: "Bus",
        value: "bus",
        check: "ZZZZZZZZ",
      },
      {
        label: "Truck",
        value: "truck",
        check: "ZZZZZZZZ",
      },
      {
        label: "Pickup",
        value: "pickup",
        check: "ZZZZZZZZ",
      },
      {
        label: "Train",
        value: "train",
        check: "ZZZZZZZZ",
      },
      {
        label: "Kapal",
        value: "kapal",
        check: "ZZZZZZZZ",
      },
      {
        label: "Pesawat",
        value: "pesawat",
        check: "ZZZZZZZZ",
      }
    ];


    const ticketStatusOptions = [
      {
        label: "Ekonomi",
        value: "ekonomi",
        check: "XXXXXXXX",
      },
      {
        label: "Bisnis",
        value: "bisnis",
        check: "ZZZZZZZZ",
      },
    ];

    return {
      store,

      form,
      loading,

      // name_passanger,
      // ktp_passanger,
      // birth_date,
      // category,
      // seat_no,
      // min_budget,
      // max_budget,
      // ticket_status,
      // description,
      // starting_date,
      // starting_time,
      // starting_location,
      // arrival_location,
      // starting_terminal,
      // arrival_terminal,

      categoryOptions,
      ticketStatusOptions,

      onPlaceholder() {
        form.value.category = "Category";
      },
      onPlaceholderTicketStatus() {
        form.value.ticket_status = "Ticket Status";
      },

      async onSubmit() {
        name_passanger.value.validate();
        ktp_passanger.value.validate();
        birth_date.value.validate();
        category.value.validate();
        seat_no.value.validate();
        min_budget.value.validate();
        max_budget.value.validate();
        ticket_status.value.validate();
        description.value.validate();
        starting_date.value.validate();
        starting_time.value.validate();
        starting_location.value.validate();
        arrival_location.value.validate();
        starting_terminal.value.validate();
        arrival_terminal.value.validate();

        if (

          name_passanger.value.hasError ||
          ktp_passanger.value.hasError ||
          birth_date.value.hasError ||
          category.value.hasError ||
          seat_no.value.hasError ||
          min_budget.value.hasError ||
          max_budget.value.hasError ||
          ticket_status.value.hasError ||
          description.value.hasError ||
          starting_date.value.hasError ||
          starting_time.value.hasError ||
          starting_location.value.hasError ||
          arrival_location.value.hasError ||
          starting_terminal.value.hasError ||
          arrival_terminal
        ) {
          $q.notify({
            color: "negative",
            message: "Peringatan",
            caption: "Wajib lengkapi form",
            position: "top",
          });
          return;
          // form has error
        }

        await onRequestReservation();
      },

      onReset() {
        onClearReservationForm();

        name_passanger.value.resetValidation();
        ktp_passanger.value.resetValidation();
        birth_date.value.resetValidation();
        category.value.resetValidation();
        seat_no.value.resetValidation();
        min_budget.value.resetValidation();
        max_budget.value.resetValidation();
        ticket_status.value.resetValidation();
        description.value.resetValidation();
        starting_date.value.resetValidation();
        starting_time.value.resetValidation();
        starting_location.value.resetValidation();
        arrival_location.value.resetValidation();
        starting_terminal.value.resetValidation();
        arrival_terminal.value.resetValidation();

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
