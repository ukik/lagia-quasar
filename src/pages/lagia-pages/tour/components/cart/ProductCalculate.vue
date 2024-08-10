<template>
  <div>
    <q-card flat bordered class="q-mt-lg">
      <q-card-section>
        <q-input
          :loading="loading"
          outlined
          bottom-slots
          v-model="text"
          label="Code Coupon"
          counter
          maxlength="20"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="sell" />
          </template>

          <template v-slot:after v-if="$q.screen.width > 425">
            <q-btn
              unelevated
              :loading="loading"
              @click="onCoupon"
              class="full-height"
              icon="done"
              color="positive"
              label="Apply Coupon"
            ></q-btn>
          </template>

          <template v-slot:hint> I have a discount coupon </template>
        </q-input>
      </q-card-section>
      <q-separator v-if="!($q.screen.width > 425)"></q-separator>
      <q-card-actions class="q-pa-md" align="right" v-if="!($q.screen.width > 425)">
        <q-btn
          class="full-width"
          unelevated
          style="height: 46.28px; padding: 0px 20px"
          size="18px"
          icon="done"
          color="positive"
          label="Apply Coupon"
        ></q-btn>
      </q-card-actions>

      <!-- <q-separator></q-separator> -->
      <!-- <q-card-actions class="q-pa-md" align="right">
      <q-btn
        size="18px"
        class="rounded-borders-3"
        style="height:46.28px; padding: 0px 20px;"
        outline
        icon="refresh"
        color="primary"
        label="UPDATE CART"
      ></q-btn>
    </q-card-actions>
    <q-separator></q-separator> -->
    </q-card>
    <q-card flat bordered class="q-mt-lg">
      <q-card-actions align="right">
        <table>
          <tr>
            <td>Subtotal Biaya (diluar hotel)</td>
            <td class="text-h6 text-bold">
              {{ $currency(subTotalAnak + subTotalDewasa) }}
            </td>
          </tr>
          <tr>
            <td>Biaya Penginapan/Hotel</td>
            <td>{{ calculate?.total }}</td>
          </tr>
          <tr>
            <td>Coupon</td>
            <td>{{ calculate?.coupon }}</td>
          </tr>
          <!-- <tr>
          <td>Vat</td>
          <td>{{ calculate?.vat }}</td>
        </tr> -->
          <tr class="text-bold">
            <td>Grand Total</td>
            <td>{{ calculate?.grand }}</td>
          </tr>
        </table>
      </q-card-actions>
      <!-- <q-separator></q-separator>
    <q-card-actions class="q-pa-md" align="right">
      <q-btn
        size="18px"
        class="rounded-borders-3"
        style="height: 46.28px; padding: 0px 20px"
        dense
        icon="shopping_cart_checkout"
        color="primary"
        label="CHECKOUT"
      ></q-btn>
    </q-card-actions> -->
    </q-card>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";

import { useTourCartSelectedStore } from "stores/lagia-stores/tour/TourCartSelectedStore";

export default {
  emits: ["onCoupon"],
  data() {
    return {
      loading: false,
      text: null,
    };
  },
  // props: {
  //   calculate: {
  //     default: {
  //       total: 0,
  //       coupon: 0,
  //       vat: null,
  //       grand: 0,
  //     },
  //   },
  // },
  setup() {
    const _TourCartSelectedStore = useTourCartSelectedStore();
    const {
      selected,
      vat,
      coupon,
      item,
      calculate,
      subTotalAnak,
      subTotalDewasa,
    } = storeToRefs(_TourCartSelectedStore);
    return {
      calculate,
      subTotalAnak,
      subTotalDewasa,
    };
  },
  methods: {
    async onCoupon() {
      this.$q.notify({
        message: "Coupon Kosong",
        color: "negative",
        position: "top",
      });
      return;
      this.loading = true;
      const response = await $fetch("https://reqres.in/api/users?page=2", {
        method: "GET",
        // body: {
        // // My todo data
        // }
      });

      console.log(response);
      this.$emit("onCoupon", 10000);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: 16px;
}
</style>
