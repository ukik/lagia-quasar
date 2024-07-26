<template>
  <form
    class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 row q-col-gutter-md"
    id="form-add-to-cart"
    @submit.prevent.stop="onSubmit"
  >
    <div class="col-12">
      <q-input
        clearable
        outlined
        dense
        bg-color="white"
        color="primary"
        ref="dateRef"
        v-model="date_start"
        mask="date"
        placeholder="Tanggal Berangkat"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
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
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <q-input
        clearable
        dense
        mask="##"
        bg-color="white"
        outlined
        color="primary"
        ref="dewasaRef"
        v-model="participant_adult"
        input-class="text-center"
        placeholder="Peserta"
        lazy-rules
        :rules="[(val) => !!val || '', (val) => val > 0 || '']"
        bottom-slot
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
        mask="##"
        bg-color="white"
        outlined
        color="primary"
        ref="youngRef"
        v-model="participant_young"
        input-class="text-center"
        placeholder="Peserta Anak (2-6 thn) "
      >
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-child-reaching" />
        </template>
      </q-input>
    </div>
    <div class="col-12">
      <q-select
        :clearable="hotel !== 'Pilih Hotel'"
        clearable
        option-label="label"
        :options="options"
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="hotelRef"
        v-model="hotel"
        input-class="text-center"
        placeholder="Pilih Hotel"
        lazy-rules
        :rules="[(val) => (!!val && val !== 'Pilih Hotel') || '']"
      >
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-child-reaching" />
        </template>
      </q-select>
    </div>
  </form>
</template>

<script>
import { storeToRefs } from "pinia";

import { useAddToCartStore } from "stores/lagia-stores/widget/AddToCartStore";

import PriceListCard from "./PriceListCard";

import { date } from "quasar";

const { addToDate } = date;
const newDate = addToDate(new Date(), { days: 2 });
const formattedString = date.formatDate(newDate, "YYYY/MM/DD");

const options = [
  {
    label: "Tanpa Hotel",
    value: "",
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
  components: {
    PriceListCard,
  },
  data() {
    return {
      item: null,
      slug: "",
    };
  },
  mounted() {
    // console.log(formattedString, newDate);
  },
  // props: ["item"],
  setup() {
    const store = useAddToCartStore();
    const {
      prompt,
      quantity,
      date_start,
      participant_young,
      participant_adult,
      hotel,
    } = storeToRefs(store); // have all reactive states here
    const { onAdd, onRemove, onAddToCart } = store;

    return {
      onAddToCart,
      onAdd,
      onRemove,
      prompt,
      quantity,
      date_start,
      participant_young,
      participant_adult,
      hotel,
      options: options,

      optionsFn(date) {
        return date >= formattedString; //'2019/02/03' && date <= '2019/02/15'
      },
    };
  },
  // computed: {
  //   getPriceCart() {
  //     if (!this.item) return 0;
  //     return Math.round(this.$finalPrice(this.item) * this.quantity);
  //   },
  // },
  methods: {
    async onSubmit({ price_id, slug }) {
      const vm = this;

      vm.$refs?.dewasaRef?.validate();
      // vm.$refs?.youngRef?.validate();
      vm.$refs?.dateRef?.validate();
      vm.$refs?.hotelRef?.validate();

      if (vm.$refs?.dateRef?.hasError) {
        return vm.$q.notify({
          color: "negative",
          message: "Tanggal berangkat wajib",
          position: "top",
        });
      } else if (vm.participant_adult <= 0)
        return vm.$q.notify({
          color: "negative",
          message: "Dewasa minimal 1",
          position: "top",
        });

      if (vm.$refs?.dewasaRef?.hasError) {
        return vm.$q.notify({
          color: "negative",
          message: "Dewasa minimal 1",
          position: "top",
        });
      } else if (vm.$refs?.hotelRef?.hasError) {
        return vm.$q.notify({
          color: "negative",
          message: "Hotel wajib pilih",
          position: "top",
        });
      } else {
        const resp = await vm.onAddToCart({
          price_id,
          slug,
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

        if (resp) this.$emit("onBubbleEventSuccess");

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
#form-add-to-cart .q-field--with-bottom {
  padding-bottom: 0px;
}
</style>
