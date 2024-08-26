<template>
  <form
    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 row q-col-gutter-md"
    id="FormTour"
    @submit.prevent.stop="onSubmit"
  >
    <!-- {{ date_start }}, {{ participant_young }}, {{ participant_adult }}, {{ description }},
    {{ hotel }}, -->
    <div class="col-12">
      <q-field
        dense
        outlined
        bg-color="white"
        color="primary"
        ref="dateRef"
        v-model="date_start"
        mask="date"
        placeholder="Tanggal Berangkat"
        hint="Tanggal Berangkat"
        error-message="Tanggal Berangkat"
        :rules="['date']"
        bottom-slots
      >
        <q-date
          today-btn
          bordered
          flat
          class="full-width q-my-md"
          :options="optionsFn"
          v-model="date_start"
        >
        </q-date>
      </q-field>

      <!-- <q-input
        @click="$refs.popupProxy.show()"
        clearable
        outlined
        dense
        bg-color="white"
        color="primary"
        ref="dateRef"
        v-model="date_start"
        mask="date"
        placeholder="Tanggal Berangkat"
        hint="Tanggal Berangkat"
        error-message="Tanggal Berangkat"
        :rules="['date']"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="popupProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date :options="optionsFn" v-model="date_start">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input> -->
    </div>

    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <q-input
        v-if="participant_adult"
        @clear="onMinParticipantRule"
        clearable
        dense
        mask="###"
        unmasked-value
        bg-color="white"
        outlined
        color="primary"
        ref="dewasaRef"
        v-model="participant_adult"
        :placeholder="`Peserta Dewasa (min. ${item?.minParticipant})`"
        :hint="`Peserta Dewasa (min. ${item?.minParticipant})`"
        :error-message="`Peserta Dewasa (min. ${item?.minParticipant})`"
        lazy-rules
        :rules="[(val) => !!val || '', minParticipantRule]"
        bottom-slots
      >
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-person" />
        </template>
      </q-input>
    </div>

    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <q-input
        clearable
        dense
        mask="###"
        bg-color="white"
        outlined
        color="primary"
        ref="youngRef"
        v-model="participant_young"
        placeholder="0"
        hint="Peserta Anak (2-6 thn)"
        error-message="Peserta Anak (2-6 thn)"
      >
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-child-reaching" />
        </template>
      </q-input>
    </div>

    <div class="col-12">
      <q-select
        class="text-capitalize"
        @clear="hotel = 'Pilih Hotel'"
        :clearable="hotel !== 'Pilih Hotel'"
        clearable
        map-options
        emit-value
        option-label="label"
        option-value="value"
        :options="page_hotel_level_price"
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="hotelRef"
        v-model="hotel"
        placeholder="Pilih Hotel"
        hint="Pilih Hotel"
        error-message="Pilih Hotel"
        :rules="[(val) => (!!val && val !== 'Pilih Hotel') || '']"
      >
        <template v-slot:prepend>
          <q-icon name="apartment" />
        </template>
      </q-select>
    </div>

    <div class="col-12">
      <q-input
        type="textarea"
        clearable
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="descRef"
        v-model="description"
        placeholder="Permintaan Khusus"
        hint="Permintaan Khusus"
        error-message="Permintaan Khusus"
      >
        <template v-slot:prepend>
          <q-icon name="description" />
        </template>
      </q-input>
    </div>
  </form>
</template>

<script>
import { storeToRefs, mapState } from "pinia";

import { useTourCartSelectedStore } from "stores/lagia-stores/tour/TourCartSelectedStore";

import { useInitStore } from "src/stores/lagia-stores/page/InitStore";

import { date } from "quasar";

const { addToDate } = date;
const newDate = addToDate(new Date(), { days: 2 });
const formattedString = date.formatDate(newDate, "YYYY/MM/DD");

const options = [
  {
    label: "Tanpa Hotel",
    value: "tanpa hotel",
  },
  {
    label: "Hotel Bintang 1",
    value: "bintang 1",
  },
  {
    label: "Hotel Bintang 2",
    value: "bintang 2",
  },
  {
    label: "Hotel Bintang 3",
    value: "bintang 3",
  },
  {
    label: "Hotel Bintang 4",
    value: "bintang 4",
  },
  {
    label: "Hotel Bintang 5",
    value: "bintang 5",
  },
];

export default {
  props: ["item"],
  data() {
    return {
      slug: "tour",
    };
  },
  mounted() {
    // console.log(formattedString, newDate);
    // this.onMinParticipantRule();
  },
  // props: ["item"],
  setup() {
    const store = useTourCartSelectedStore();
    const {
      getHotelPrice,

      date_start,
      participant_young,
      participant_adult,
      description,
      hotel,
    } = storeToRefs(store); // have all reactive states here
    const { onAddToCart } = store;

    return {
      onAddToCart,
      date_start,
      participant_young,
      participant_adult,
      description,
      hotel,

      getHotelPrice,

      options: options,

      optionsFn(date) {
        return date >= formattedString; //'2019/02/03' && date <= '2019/02/15'
      },
    };
  },
  watch: {
    hotel(val) {
      alert(val)
    }
  },
  computed: {
    ...mapState(useInitStore, ["page_hotel_level_price"]),
    // ...mapState(useTourCartSelectedStore, ['hotel'])
    // getHotelPrice() {
    //   if (this.page_hotel_level_price) {
    //     let temp = null;
    //     for (let i = 0; i < this.page_hotel_level_price.length; i++) {
    //       if (this.hotel === this.page_hotel_level_price[i]["label"]) {
    //         temp = this.page_hotel_level_price[i];
    //       }
    //     }
    //     return temp;
    //   }
    // },
  },
  methods: {
    onMinParticipantRule() {
      this.participant_adult = this.item?.minParticipant;
    },
    minParticipantRule(val) {
      // simulating a delay

      const vm = this;

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // call
          //  resolve(true)
          //     --> content is valid
          //  resolve(false)
          //     --> content is NOT valid, no error message
          //  resolve(error_message)
          //     --> content is NOT valid, we have error message

          const stat = val >= Number(vm.item?.minParticipant);

          if (!stat) vm.onMinParticipantRule();

          resolve(stat || "(Minimal) Peserta " + vm.item?.minParticipant + " (wajib)");

          // calling reject(...) will also mark the input
          // as having an error, but there will not be any
          // error message displayed below the input
          // (only in browser console)
        }, 0);
      });
    },
    async onSubmit({ price_id }) {
      return;
      const vm = this;

      vm.$refs?.dewasaRef?.validate();
      // vm.$refs?.youngRef?.validate();
      vm.$refs?.dateRef?.validate();
      vm.$refs?.hotelRef?.validate();

      if (vm.$refs?.dateRef?.hasError) {
        return vm.$q.notify({
          color: "negative",
          message: "Tanggal Berangkat (wajib)",
          position: "top",
        });
      } else if (vm.participant_adult < Number(vm.item?.minParticipant))
        return vm.$q.notify({
          color: "negative",
          message: "(Minimal) Peserta " + this.item?.minParticipant + " (wajib)",
          position: "top",
        });

      if (vm.$refs?.dewasaRef?.hasError) {
        return vm.$q.notify({
          color: "negative",
          message: "(Minimal) Peserta " + this.item?.minParticipant + " (wajib)",
          position: "top",
        });
      } else if (vm.$refs?.hotelRef?.hasError) {
        return vm.$q.notify({
          color: "negative",
          message: "Hotel (wajib)",
          position: "top",
        });
      } else {
        return;
        const resp = await vm.onAddToCart({
          price_id,
          slug: vm.slug,
        });

        if (resp?.status == 401) {
          vm.$global.$emit("LagiaLayout", {
            label: "dialogAuth",
            slug: null,
            vendor: null,
            value: null,
            product: null,
          });
        }

        if (resp) {
          let timerInterval;

          vm.$swal({
            title: "Berhasil",
            text: "Data sudah tersimpan",
            // html: "I will close in <b></b> milliseconds.",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
              vm.$swal.showLoading();
              const timer = vm.$swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                // timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === vm.$swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
          vm.$emit("onBubbleEventSuccess");
        }

        // console.log("DialogAddToCart resp", resp?.status);
        // await this.$onKonsultasi(this.name, this.question, this.email);
        // this.$q.notify({
        //   icon: "done",
        //   color: "positive",
        //   message: "Submitted",
        //   position: "top",
        // });
        // this.question = "";
      }
    },
  },
};
</script>

<style>
#FormTour .q-field--with-bottom {
  /* padding-bottom: 0px; */
}
</style>
