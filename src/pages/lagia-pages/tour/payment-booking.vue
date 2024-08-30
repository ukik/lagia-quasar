<style scoped>
.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

/* p {
  line-height: 1.6;
  margin: 0 0 15px;
  word-wrap: break-word;
} */

h3 {
  font-size: 22px;
  font-weight: 700;
}
</style>

<template>
  <!-- <q-btn label="dialog" @click="dialog_price = true"></q-btn> -->
  <!-- <InnerBanner :_title="$route?.meta?.title"></InnerBanner> -->

  <!-- ***Inner Banner html end here*** -->
  <div id="PaymentBookingPage" class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12 q-px-md"
    >
      <q-no-ssr class="col-12">
        <q-banner inline-actions rounded class="bg-orange-1 q-mb-lg">
          Data riwayat dibawah ini mengambil dari cookies browser, karena Anda tidak login
          <!-- <template v-slot:action>
            <q-btn flat icon="login" label="login" />
          </template> -->
        </q-banner>

        <q-card flat bordered>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey-3"
            active-color="white"
            indicator-color="white"
            align="left"

          >
            <q-tab class="bg-form" name="tour" label="TOUR" />
            <q-tab class="bg-form" name="rental" label="RENTAL" />
            <q-tab class="bg-form" name="hotel" label="HOTEL" />
            <q-tab class="bg-form" name="talent" label="TALENT" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="tour">
              <q-list>
                <TableTourBooking title="INVOICE TOUR" />
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="rental">
              <q-list>
                <TableTourBooking title="INVOICE RENTAL" />
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="hotel">
              <q-list>
                <TableTourBooking title="INVOICE HOTEL" />
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="talent">
              <q-list>
                <TableTourBooking title="INVOICE TALENT" />
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-no-ssr>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapWritableState } from "pinia";
// import { useTourBookingPaymentListStore } from "stores/lagia-stores/tour/TourBookingPaymentListStore";
import TableTourBooking from "./components/payment/TableTourBooking"

export default {
  data() {
    return {
      tab: "tour",
    };
  },
  components: {
    TableTourBooking
  },
  computed: {
    // ...mapWritableState(useTourBookingPaymentListStore, ["records"]),
  },
  methods: {
    // ...mapActions(useTourCartSelectedStore, ["onRemove", "onSelectedRemove"]),
    // ...mapActions(useTourBookingPaymentListStore, ["onFetchCookies"]),
  },
  mounted() {
    this.$q.dark.set(false);
  },
};
</script>

<style>
#PaymentBookingPage
.q-table--dense .q-table th:first-child,
#PaymentBookingPage
.q-table--dense .q-table td:first-child {
    padding-left: 8px;
}
</style>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s

.my-sticky-header-table
  /* height or max-height is important */
  // min-height: 500px
  // height: 1000px

  // .q-table__top,
  // .q-table__bottom,
  // thead tr:first-child th
    /* bg color is important for th; just specify one */
    // color: white
    // background-color: #3A78C9

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 0px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
