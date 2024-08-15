<template>
  <div>

    <q-card flat bordered class="q-mt-lg">
      <q-card-actions align="right">
        <table>
          <tr>
            <td>Sub Total Biaya (diluar hotel)</td>
            <td class="text-h6 text-bold">
              {{ $currency(getTotalNonHotel) }}
            </td>
          </tr>
          <tr>
            <td>Jenis Hotel</td>
            <td class="text-capitalize">{{ hotel }}</td>
          </tr>
          <tr>
            <td>Biaya Hotel (Harga Min.)</td>
            <td>{{ $currency(getHotelPrice?.minPrice) }}</td>
          </tr>
          <tr>
            <td>Biaya Hotel (Harga Max.)</td>
            <td>{{ $currency(getHotelPrice?.maxPrice) }}</td>
          </tr>

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

    </q-card>
  </div>
</template>

<script>
import { mapState, storeToRefs } from "pinia";

import { useTourCartSelectedStore } from "stores/lagia-stores/tour/TourCartSelectedStore";

export default {

  data() {
    return {
      loading: false,
      text: null,
    };
  },
  computed: {
    ...mapState(useTourCartSelectedStore, [
      "selected",
      "item",

      "min_participant",
      "date_start",
      "participant_adult",
      "participant_young",
      "description",
      "hotel",

    ]),
    ...mapState(useTourCartSelectedStore, [
      "subTotalAnak",
      "subTotalDewasa",
      "getHotelPrice",
    ]),

    getSelectedTourPrice: state => {
      if (state.selected.length > 0) return state.selected[0]?.tourPrice
      return []
    },
    subTotalAnak: state => {
      if (state.selected.length <= 0) return 0
      return state.participant_young * finalPriceAnak(state.selected[0]?.tourPrice);
    },
    subTotalDewasa: state => {
      if (state.selected.length <= 0) return 0
      return state.participant_adult * finalPrice(state.selected[0]?.tourPrice);
    },
    getHotelPrice: state => {
      const store = useInitStore()
      const { page_hotel_level_price } = (store)
      if (page_hotel_level_price && state.hotel !== 'Pilih Hotel') {
        let temp = {};
        for (let i = 0; i < page_hotel_level_price.length; i++) {
          try {
            if (state.hotel.toLowerCase() === page_hotel_level_price[i]["label"].toLowerCase()) {
              temp = page_hotel_level_price[i];
            }
          } catch (e) {}
        }
        return temp;
      }
    },



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
