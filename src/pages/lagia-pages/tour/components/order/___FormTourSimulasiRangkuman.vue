<template>
  <form
    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 row q-col-gutter-md"
    id="FormTour"
    @submit.prevent.stop="onSubmit"
  >
    <!-- <div class="col-12">
      <q-field
        v-if="date_sticky"
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

      <q-input
        v-else-if="!date_sticky"
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
      </q-input>
    </div> -->

    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <q-input
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

    <div class="col-12" id="hotelRef">
      <q-select
        @clear="hotel = 'Pilih Hotel'"
        :clearable="hotel !== 'Pilih Hotel'"
        clearable
        map-options
        emit-value
        option-label="label"
        option-value="value"
        :options="options"
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
    <!-- <div class="col-12">
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
    </div> -->
  </form>
</template>

<script>
import { storeToRefs, mapState, mapWritableState } from "pinia";

import { useTourOrderDetailStore } from "stores/lagia-stores/tour/TourOrderDetailStore";

import { Cookies, date } from "quasar";

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
  props: ["item", "date_sticky"],
  data() {
    return {
      slug: "tour",
    };
  },
  mounted() {
    // alert(111)
    // console.log(formattedString, newDate);
    // this.onMinParticipantRule();

    // const cookies_name = this.$route.params?.slug_text; //window.location.href
    // const cookies = this.$q.cookies.get(cookies_name);

    // if (!cookies) return;
    // this.$q.notify({
    //   message: "Load data formulir",
    //   color: "positive",
    // });

    // this.date_start = cookies.state.date_start;
    // this.participant_young = cookies.state.participant_young;
    // this.participant_adult = cookies.state.participant_adult;
    // this.description = cookies.state.description;
    // this.hotel = cookies.state.hotel;

    // console.log("GET COOKIES", cookies);
  },
  // props: ["item"],
  setup() {
    const store = useTourOrderDetailStore();
    const {
      // prompt,
      // quantity,
      // date_start,
      // participant_young,
      // participant_adult,
      // // description,
      // hotel,
    } = storeToRefs(store); // have all reactive states here
    const {
      // onAdd, onRemove,
      onAddToCart,
    } = store;

    return {
      onAddToCart,
      // onAdd,
      // onRemove,
      // prompt,
      // quantity,
      // date_start,
      // participant_young,
      // participant_adult,
      // // description,
      // hotel,
      options: options,

      optionsFn(date) {
        return date >= formattedString; //'2019/02/03' && date <= '2019/02/15'
      },
    };
  },
  computed: {
    ...mapWritableState(useTourOrderDetailStore, [
      "date_start",
      "participant_young",
      "participant_adult",
      "description",
      "hotel",
    ]),

    // getPriceCart() {
    //   if (!this.item) return 0;
    //   return Math.round(this.$finalPrice(this.item) * this.quantity);
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
      const vm = this;

      vm.$refs?.dewasaRef?.validate();
      // vm.$refs?.youngRef?.validate();
      vm.$refs?.dateRef?.validate();
      vm.$refs?.hotelRef?.validate();

      // if (vm.$refs?.dateRef?.hasError) {
      //   return vm.$q.notify({
      //     color: "negative",
      //     message: "Tanggal Berangkat (wajib)",
      //     position: "top",
      //   });
      // } else
      if (vm.participant_adult < Number(vm.item?.minParticipant)) {
        return vm.$q.notify({
          color: "negative",
          message: "(Minimal) Peserta " + this.item?.minParticipant + " (wajib)",
          position: "top",
        });
      } else if (vm.$refs?.dewasaRef?.hasError) {
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
        const payload = {
          route: {
            url: window.location.href,
            host: this.$getHost(),
            path: this.$route.path,
            name: this.$route.name,
            params: this.$route.params,
            query: this.$route.query,
          },
          state: {
            date_start: this.date_start,
            participant_young: this.participant_young,
            participant_adult: this.participant_adult,
            description: this.description,
            hotel: this.hotel,
          },
        };

        const cookies_name = this.$route.params?.slug_text; //window.location.href
        vm.$q.cookies.set(cookies_name, JSON.stringify(payload), {
          secure: true,
          path: "/", // wajib
        });

        // console.log('GET JSON.stringify(payload)', vm.$q.cookies.get(window.location.href))

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
        return;
        if (resp) {
          vm.$router.push({
            name: "/tour/cart",
            query: {
              page: 1,
              perPage: 25,
              search: "",
              orderField: "desc",
              orderDirection: false,
              selected_id: price_id,
            },
          });

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
