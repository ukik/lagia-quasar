<template>
  <form
    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 row q-col-gutter-md"
    id="FormTour"
    @submit.prevent.stop="onSubmit"
  >
    <div class="col-12" v-if="false">
      <q-field
        class="row"
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
          class="col q-my-md"
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
        error-message="Tanggal Berangkat (wajib)"
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
    </div>

    <div class="col-12">
      Berapa jumlah perserta Dewasa? (Min. {{ item?.minParticipant }})
      <q-input
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
        :error-message="`Peserta Dewasa (min. ${item?.minParticipant}) (wajib)`"
        lazy-rules
        :rules="[(val) => !!val || '', minParticipantRule]"
        bottom-slots
      >
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-person" />
        </template>
      </q-input>
    </div>

    <div class="col-12">
      Berapa jumlah perserta Peserta Anak (2-6 thn)?
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
      Apa hotel yang ingin digunakan?
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
        error-message="Pilih Hotel (wajib)"
        :rules="[(val) => (!!val && val !== 'Pilih Hotel') || '']"
      >
        <template v-slot:prepend>
          <q-icon name="apartment" />
        </template>
      </q-select>
    </div>

    <div
      class="col-12"
      v-if="
        hotel?.toLocaleLowerCase() !== 'pilih hotel' &&
        hotel?.toLocaleLowerCase() !== 'tanpa hotel'
      "
    >
      Berapa kamar yang diinginkan?
      <q-input
        min="1"
        max="0"
        clearable
        dense
        mask="###"
        bg-color="white"
        outlined
        color="primary"
        ref="roomRef"
        v-model="room_qty"
        placeholder="0"
        hint="Jumlah Kamar (min. 1)"
        error-message="Jumlah Kamar (min. 1) (wajib)"
        :rules="[(val) => !!val || '']"
      >
        <template v-slot:prepend>
          <q-icon name="meeting_room" />
        </template>
      </q-input>
    </div>

    <div
      class="col-12"
      v-if="
        hotel?.toLocaleLowerCase() !== 'pilih hotel' &&
        hotel?.toLocaleLowerCase() !== 'tanpa hotel'
      "
    >
      Berapa budget kamar yang diinginkan?
      <br><b class="text-capitalize">{{hotel}}</b> - Harga {{ $currency(getHotelPrice?.minPrice) }} s/d {{ $currency(getHotelPrice?.maxPrice) }}
      <q-input
        clearable
        dense
        mask="Rp. #############"
        unmasked-value
        bg-color="white"
        outlined
        color="primary"
        ref="roomBudgetRef"
        v-model="room_budget"
        placeholder=""
        :hint="`Budget Kamar (wajib) di atas (min. ${$currency(getHotelPrice?.minPrice)})`"
        :error-message="`Budget Kamar (wajib) di atas (min. ${$currency(getHotelPrice?.minPrice)})`"
        :rules="[(val) => !!val || '', minPrice]"
      >
        <template v-slot:prepend>
          <q-icon name="meeting_room" />
        </template>
      </q-input>
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

import { useTourProductDetailStore } from "stores/lagia-stores/tour/TourProductDetailStore";

import { useInitStore } from "src/stores/lagia-stores/page/InitStore";

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
  mounted() {
    // console.log(formattedString, newDate);
    this.onMinParticipantRule();

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
    return {
      options: options,

      optionsFn(date) {
        return date >= formattedString; //'2019/02/03' && date <= '2019/02/15'
      },
    };
  },
  watch: {
    hotel() {
      this.$refs?.roomBudgetRef?.validate()
    }
  },
  computed: {
    ...mapState(useInitStore, ["page_hotel_level_price"]),
    ...mapWritableState(useTourProductDetailStore, [
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
    ]),
    // getPriceCart() {
    //   if (!this.item) return 0;
    //   return Math.round(this.$finalPrice(this.item) * this.quantity);
    // },
    getHotelPrice() {
      if (this.page_hotel_level_price && this.hotel !== "Pilih Hotel") {
        let temp = {};
        for (let i = 0; i < this.page_hotel_level_price.length; i++) {
          try {
            if (
              this.hotel.toLowerCase() ===
              this.page_hotel_level_price[i]["label"].toLowerCase()
            ) {
              temp = this.page_hotel_level_price[i];
            }
          } catch (e) {}
        }
        return temp;
      }
    },

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
    minPrice(val) {
      const vm = this;

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const stat = val >= Number(vm.getHotelPrice?.minPrice);

          if (!stat) vm.room_budget = vm.getHotelPrice?.minPrice;

          resolve(stat || "Budget Terendah Rp." + vm.getHotelPrice?.minPrice + " (wajib)");
        }, 0);
      });
    },
    async onSubmit({ price_id }) {
      const vm = this;

      vm.$refs?.dewasaRef?.validate();
      // vm.$refs?.youngRef?.validate();
      vm.$refs?.dateRef?.validate();
      vm.$refs?.hotelRef?.validate();
      vm.$refs?.roomRef?.validate();
      vm.$refs?.roomBudgetRef?.validate();

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
      }
      if (vm.$refs?.dewasaRef?.hasError) {
        return vm.$q.notify({
          color: "negative",
          message: "(Minimal) Peserta " + this.item?.minParticipant + " (wajib)",
          position: "top",
        });
      }
      if (vm.$refs?.hotelRef?.hasError) {
        return vm.$q.notify({
          color: "negative",
          message: "Hotel (wajib)",
          position: "top",
        });
      }

      if(vm.hotel?.toLocaleLowerCase() !== 'pilih hotel' && vm.hotel?.toLocaleLowerCase() !== 'tanpa hotel') {
        if (vm.$refs?.roomRef?.hasError) {
          return vm.$q.notify({
            color: "negative",
            message: "Jumlah Kamar (min. 1) (wajib)",
            position: "top",
          });
        }
      }

      this.$q.notify({
        message: "Simpan data formulir",
        color: "positive",
        position: "bottom",
      });

      vm.$router.push({
        name: "/tour/product-order",
        params: {
          ...this.$route.params,
        },
        // query: {
        //   page: 1,
        //   perPage: 25,
        //   search: "",
        //   orderField: "desc",
        //   orderDirection: false,
        //   selected_id: price_id,
        // },
      });

    },
  },
};
</script>

<style>
#FormTour .q-field--with-bottom {
  /* padding-bottom: 0px; */
}
</style>
