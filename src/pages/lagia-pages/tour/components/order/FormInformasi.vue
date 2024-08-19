<template>
  <form
    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 row q-col-gutter-md"
    id="FormTour"
    @submit.prevent.stop="onSubmit"
  >
    <div class="col-12">
      <q-item-label class="text-center text-h6 text-uppercase"
        >Tanggal Berangkat</q-item-label
      >
      <q-item-label class="text-caption text-center q-mb-lg"
        >Pilih tanggal keberangkatan (minimal +3 H)</q-item-label
      >

      <q-input
        @click="$refs.popupProxy.show()"
        clearable
        outlined
        dense
        bg-color="white"
        color="primary"
        ref="datePickerRef"
        v-model="date_start"
        mask="date"
        placeholder="Tanggal Berangkat"
        :rules="['date']"
        :lazy-rules="false"
        :debounce="300"
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
    </div>

    <div class="col-12">
      <q-item-label class="text-center text-h6 text-uppercase"
        >Permintaan Khusus</q-item-label
      >
      <q-item-label class="text-caption text-center q-mb-lg"
        >Tambah catatan jika dibutuhkan</q-item-label
      >

      <q-input
      input-style="min-height: 300px;"
        type="textarea"
        autogrow
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
        :lazy-rules="false"
        :debounce="300"
      >
        <template v-slot:prepend>
          <q-icon name="description" />
        </template>
      </q-input>
    </div>


  </form>
</template>

<script>
import { storeToRefs, mapState, mapWritableState } from "pinia";

import { useTourOrderDetailStore } from "stores/lagia-stores/tour/TourOrderDetailStore";

import { Cookies, date } from "quasar";

const { addToDate } = date;
const newDate = addToDate(new Date(), { days: 3 });
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
  mounted() {
    this.$refs?.dateRef?.validate();
    this.$refs?.datePickerRef?.validate();
  },
  methods: {
    notify(message) {
      this.$q.notify({
          color: "negative",
          message: message,
          position: "top",
        });
    },
    async onSubmit() {
      const vm = this;

      // vm.$refs?.dewasaRef?.validate();
      // vm.$refs?.youngRef?.validate();
      vm.$refs?.dateRef?.validate();
      vm.$refs?.datePickerRef?.validate();

      // vm.$refs?.hotelRef?.validate();

      if (this.$refs?.dateRef?.hasError || this.$refs?.datePickerRef?.hasError) this.notify("Tanggal Barangkat (wajib)")
      return

      if (vm.$refs?.dateRef?.hasError) {
        return vm.$q.notify({
          color: "negative",
          message: "Tanggal Berangkat (wajib)",
          position: "top",
        });
        // } else
        // if (vm.participant_adult < Number(vm.item?.minParticipant)) {
        //   return vm.$q.notify({
        //     color: "negative",
        //     message: "(Minimal) Peserta " + this.item?.minParticipant + " (wajib)",
        //     position: "top",
        //   });
        // } else if (vm.$refs?.dewasaRef?.hasError) {
        //   return vm.$q.notify({
        //     color: "negative",
        //     message: "(Minimal) Peserta " + this.item?.minParticipant + " (wajib)",
        //     position: "top",
        //   });
        // } else if (vm.$refs?.hotelRef?.hasError) {
        //   return vm.$q.notify({
        //     color: "negative",
        //     message: "Hotel (wajib)",
        //     position: "top",
        //   });
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
