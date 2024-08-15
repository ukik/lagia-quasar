<template>
  <div>

    <q-card flat bordered class="q-mt-lg">
      <q-card-actions align="right">
        <table>
          <tr>
            <td>Sub Total Biaya (diluar hotel)</td>
            <td class="text-h6">
              {{ $currency(getTotalNonHotel) }}
            </td>
          </tr>
          <tr>
            <td>Jenis Hotel</td>
            <td class="text-capitalize">{{ getBookingItem?.hotel }}</td>
          </tr>
          <tr>
            <td>Biaya Hotel (Harga Min.)</td>
            <td>{{ $currency(getHotelPrice?.minPrice) }}</td>
          </tr>
          <tr>
            <td>Biaya Hotel (Harga Max.)</td>
            <td>{{ $currency(getHotelPrice?.maxPrice) }}</td>
          </tr>
          <tr>
            <td>Coupon</td>
            <td>{{ $currency(record?.coupon) }}</td>
          </tr>
          <!-- <tr>
          <td>Vat</td>
          <td>{{ calculate?.vat }}</td>
        </tr> -->
          <!-- <tr class="text-bold">
            <td>Grand Total</td>
            <td>{{ calculate?.grand }}</td>
          </tr>
          <tr class="text-bold">
            <td>Grand Total</td>
            <td>{{ calculate?.grand }}</td>
          </tr> -->
          <tr class="text-bold">
            <td>Grand Total + Hotel Harga Minimal</td>
            <td class="text-positive">
              {{ $currency(Number(getTotalNonHotel) + Number(getHotelPrice?.minPrice)) }}
            </td>
          </tr>
          <tr class="text-bold">
            <td>Grand Total + Hotel Harga Maksimal</td>
            <td class="text-orange">
              {{ $currency(Number(getTotalNonHotel) + Number(getHotelPrice?.maxPrice)) }}
            </td>
          </tr>
          <tr class="text-bold">
            <td>Grand Total + Hotel Harga Rata-rata</td>
            <td class="text-primary">
              {{ $currency(getGrandAvg) }}
            </td>
          </tr>
          <tr class="text-bold">
            <td>DP Final 30% dari Grand Total Rata-rata</td>
            <td>
              <span class="text-h6">{{ $currency(getDPAvg) }}</span>
            </td>
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
import { mapState, storeToRefs } from "pinia";

import { useTourBookingDetailStore } from "stores/lagia-stores/tour/TourBookingDetailStore";

export default {
  emits: ["onCoupon"],
  data() {
    return {
      loading: false,
      text: null,
    };
  },
  computed: {
    ...mapState(useTourBookingDetailStore, [
      'record',
      // "selected",
      // "item",

      // "min_participant",
      // "date_start",
      // "participant_adult",
      // "participant_young",
      // "description",
      "hotel",

      // "calculate",
    ]),
    ...mapState(useTourBookingDetailStore, [
      'getBookingItem',
      "subTotalAnak",
      "subTotalDewasa",

      "getHotelPrice",
    ]),
    getTotalNonHotel() {
      return Number(this.subTotalAnak) + Number(this.subTotalDewasa);
    },
    getGrandAvg() {
      return (
        Number(this.subTotalAnak) +
        Number(this.subTotalDewasa) +
        (Number(this.getHotelPrice?.minPrice) + Number(this.getHotelPrice?.maxPrice)) / 2
      );
    },
    getDPAvg() {
      return this.getGrandAvg - (this.getGrandAvg * 30) / 100;
    },
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
