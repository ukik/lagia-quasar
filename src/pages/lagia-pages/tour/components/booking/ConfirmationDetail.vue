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
}

tr:nth-child(even) {
  background-color: #dddddd;
}

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
  font-size: 28px;
  font-weight: 500;
}
</style>
<template>
  <h2>
    <!-- <q-avatar color="form"><span class="text-white text-bold">1</span></q-avatar>  -->
    HARGA PAX
  </h2>
  <table>
    <template v-for="(item, index) in getInvoice">
      <tr>
        <td style="max-width: 120px;">{{ item?.label }}</td>
        <td class="text-bold">{{ item?.value }}</td>
      </tr>
    </template>
  </table>
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
    ...mapState(useTourBookingDetailStore, ["record"]),
    ...mapState(useTourBookingDetailStore, [
      "getBookingItem",
      "subTotalAnak",
      "subTotalDewasa",
      "getInvoice",
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
    getInvoiceX() {
      // if(this.getBookingItem) return []
      const tourBookingItem = this.getBookingItem
      return
      return [
        {
          label: "",
          value: tourBookingItem?.getPrice,
        },
        {
          label: "",
          value: tourBookingItem?.getPriceChild,
        },
        {
          label: "",
          value: tourBookingItem?.getDiscount,
        },
        {
          label: "",
          value: tourBookingItem?.getCashback,
        },
        {
          label: "",
          value: tourBookingItem?.getTotalAmount,
        },
        {
          label: "",
          value: tourBookingItem?.getTotalAmountChild,
        },
        {
          label: "",
          value: tourBookingItem?.quantity,
        },
        {
          label: "",
          value: tourBookingItem?.getFinalAmount,
        },
        {
          label: "",
          value: tourBookingItem?.stock,
        },
        {
          label: "",
          value: tourBookingItem?.minParticipant,
        },
        {
          label: "",
          value: tourBookingItem?.dateStart,
        },
        {
          label: "",
          value: tourBookingItem?.participantAdult,
        },
        {
          label: "",
          value: tourBookingItem?.participantYoung,
        },
        {
          label: "",
          value: tourBookingItem?.hotel,
        },
      ];
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
