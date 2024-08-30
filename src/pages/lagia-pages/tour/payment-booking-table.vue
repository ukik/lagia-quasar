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
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <q-no-ssr class="col-12">
        <!-- :filter="filter" -->
        <q-table
          dense
          :filter="search"
          id="WidgetCart"
          style="height: 600px"
          flat
          bordered
          separator="cell"
          :table-header-class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
          class="my-sticky-header-table"
          title="Invoice"
          :rows="records"
          :columns="columns"
          row-key="transaction_id"
          selection="none"
          v-model:selected="selected"
          :hide-header="$q.screen.width < 768"
          v-model:pagination="pagination"
        >
          <!-- <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template> -->

          <template v-slot:top-right>
            <q-input dense debounce="500" v-model="search" placeholder="Filter" clearable>
              <template v-slot:append>
                <q-icon name="search" />
              </template>

              <template v-slot:after>
                <q-btn @click="onFetchCookies"
                  icon="autorenew"
                  color="primary"
                  text-color="white"
                  unelevated
                />
              </template>
            </q-input>
          </template>

          <template v-slot:item="props">
            <!-- :style="props.selected ? 'transform: scale(0.95);' : ''" -->
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            >
              <q-card
                bordered
                flat
                :class="
                  props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''
                "
              >
                <!-- <q-card-section>
                  <q-checkbox
                    dense
                    v-model="props.selected"
                    :label="props.selected ? 'Dipilih' : ''"
                  />
                </q-card-section> -->

                <!-- <q-img
                  v-if="props.row?.tourStore?.tourProduct"
                  @click="showMultiple(props.row.tourStore?.tourProduct.image, 0)"
                  key="image"
                  :src="props.row.tourStore?.tourProduct.image[0]"
                ></q-img> -->

                <q-separator />

                <q-list>
                  <!-- <isQItemLabelValue
                    label="Nama Produk"
                    :value="props?.row?.tourStore?.tourProduct?.name"
                  ></isQItemLabelValue>

                  <isQItemLabelValue
                    label="Nama Harga"
                    :value="props?.row?.tourBookingItem?.name"
                  ></isQItemLabelValue>

                  <isQItemLabelValue
                    label="Tanggal Berangkat"
                    :value="props?.row?.dateStart"
                  ></isQItemLabelValue>

                  <isQItemLabelValue
                    label="Peserta Dewasa"
                    :value="props?.row?.participantAdult"
                  ></isQItemLabelValue>

                  <isQItemLabelValue
                    label="Peserta Anak (2-6) Tahun"
                    :value="props?.row?.participantYoung"
                  ></isQItemLabelValue>

                  <isQItemLabelValue
                    label="Penginapan/Hotel"
                    :value="props?.row?.hotel"
                  ></isQItemLabelValue> -->
                </q-list>

                <q-separator></q-separator>

                <!-- <q-card-section>
                  <q-btn-group spread unelevated>
                    <q-btn
                      class="q-mt-sm"
                      size=""
                      unelevated
                      no-caps
                      square
                      @click=""
                      color="primary"
                      text-color="white"
                      icon="fa-solid fa-tag"
                    />
                    <q-btn
                      class="q-mt-sm"
                      size=""
                      unelevated
                      no-caps
                      square
                      @click=""
                      color="primary"
                      text-color="white"
                      icon="fa-solid fa-message"
                    />
                  </q-btn-group>
                </q-card-section> -->
              </q-card>
            </div>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="delete" :props="props">
                <q-btn-group unelevated rounded>
                  <q-btn :disable="!props.row?.product_id"  :to="{
                      name: '/tour/product-detail',
                      params: {
                        slug: props.row?.product_id,
                        slug_text: props.row?.product_slug,
                      }
                    }"  dense color="blue" class="q-pl-sm" icon="explore">
                    <q-tooltip :offset="[10, 10]" anchor="top middle" self="bottom middle">PRODUCT</q-tooltip>
                  </q-btn>
                  <q-separator vertical></q-separator>
                  <q-btn class="q-pr-sm"
                    dense
                    color="positive"
                    icon="request_quote"
                    :disable="!props.row?.transaction_id"  :to="{
                      name: '/tour/payment-detail',
                      params: {
                        slug: props.row?.transaction_id,
                      }
                    }"  >
                  <q-tooltip :offset="[10, 10]" anchor="top middle" self="bottom middle" >INVOICE</q-tooltip>
                  </q-btn>
                </q-btn-group>
              </q-td>
              <!-- <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td> -->
              <!-- "name": this.name, -->
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>

              <!-- "email": this.email, -->
              <q-td key="email" :props="props">
                {{ props.row.email }}
              </q-td>

              <!-- "phone": this.phone, -->
              <q-td key="phone" :props="props">
                {{ props.row.phone }}
              </q-td>

              <!-- "instance": this.instance, -->
              <q-td key="instance" :props="props">
                {{ props.row.instance }}
              </q-td>

              <!-- "city": this.city, -->
              <q-td key="city" :props="props">
                {{ props.row.city }}
              </q-td>

              <!-- "address": this.address, -->
              <q-td key="address" :props="props">
                {{ props.row.address }}
              </q-td>
              <!-- "date_start": this.date_start, -->
              <q-td key="date_start" :props="props">
                {{ props.row.date_start }}
              </q-td>
              <!-- "participant_adult": this.participant_adult, -->
              <q-td key="participant_adult" :props="props">
                {{ props.row.participant_adult }}
              </q-td>

              <!-- "participant_young": this.participant_young, -->
              <q-td key="participant_young" :props="props">
                {{ props.row.participant_young }}
              </q-td>

              <!-- "description": this.description, -->
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>

              <!-- "hotel": this.hotel,  -->
              <q-td key="hotel" :props="props">
                {{ props.row.hotel }}
              </q-td>

              <!-- "dibayar": this.dibayar, -->
              <q-td key="dibayar" :props="props">
                {{ props.row.dibayar }}
              </q-td>

              <!-- "dibayar_percent": this.dibayar_percent, -->
              <q-td key="dibayar_percent" :props="props">
                {{ props.row.dibayar_percent }}%
              </q-td>

              <!-- "room_qty": this.room_qty, -->
              <q-td key="room_qty" :props="props">
                {{ props.row.room_qty }}
              </q-td>

              <!-- "room_budget": this.room_budget, -->
              <q-td key="room_budget" :props="props">
                {{ $currency(props.row.room_budget) }}
              </q-td>


              <!-- "snap_token": element?.snapToken, -->
              <q-td key="snap_token" :props="props">
                {{ props.row.snap_token }}
              </q-td>

              <!-- "transaction_id": element?.orderId, -->
              <q-td key="transaction_id" :props="props">
                {{ props.row.transaction_id }}
              </q-td>
              <q-td key="gross_amount" :props="props">
                {{ props.row.gross_amount }}
              </q-td>

              <!-- <q-td key="name" :props="props">
                <q-item
                  class="q-pa-none"
                  clickable
                  v-ripple
                  :to="{
                    name: '/tour/product-detail',
                    params: {
                      slug: props.row.tourStore?.tourProduct?.id,
                      slug_text: props.row.tourStore?.tourProduct?.slug,
                    },
                  }"
                >
                  <q-item-section>
                    <q-item-label caption> Produk: </q-item-label>
                    <q-item-label>
                      {{ props.row.tourStore?.tourProduct?.name }}
                    </q-item-label>
                    <q-item-label caption> Label Harga: </q-item-label>
                    <q-item-label>
                      {{ props.row.tourBookingItem?.name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-td> -->
              <!-- <q-td key="date_start" :props="props">
                {{ props.row.tourBookingItem.dateStart }}
              </q-td>
              <q-td key="participant_adult" :props="props">
                {{ props.row.tourBookingItem.participantAdult }} orang
              </q-td>
              <q-td key="participant_young" :props="props">
                {{ props.row.tourBookingItem.participantYoung }} anak
              </q-td>
              <q-td class="text-capitalize" key="hotel" :props="props">
                {{ props.row.tourBookingItem.hotel }}
              </q-td> -->
            </q-tr>
          </template>

          <!-- <template v-slot:pagination="scope">
            <q-pagination
              :disable="loading"
              v-model="currentPage"
              :max="lastPage"
              :max-pages="6"
              :input="$q.screen.width < 768"
              direction-links
              outline
              color="blue"
              active-design="unelevated"
              active-color="primary"
              active-text-color="white"
            />
          </template> -->
        </q-table>
      </q-no-ssr>
    </div>
  </div>
</template>

<script async setup>
// import PriceListCard from "./components/booking/PriceListCard";
// import ProductCalculate from "./components/cart/ProductCalculate";
// import FormBookingCustomerData from "./components/cart/FormBookingCustomerData";
// import StoreDetailProductBody from "./components/detail/StoreDetailProductBody";
// import ProductPriceListCard from "./components/cart/ProductPriceListCard";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useTourBookingPaymentListStore } from "stores/lagia-stores/tour/TourBookingPaymentListStore";
// import { useTourCartSelectedStore } from "stores/lagia-stores/tour/TourCartSelectedStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
const store = useTourBookingPaymentListStore();
const { onFetch, onPaginate } = store; // have all reactive states here
const { records } = storeToRefs(store); // have all reactive states here

const selected = ref([]);

// const tourCartSelectedStore = useTourCartSelectedStore();
// const { onResetStateA } = tourCartSelectedStore;
// const {
//   selected,
//   vat,
//   coupon,
//   item,
//   calculate,

//   filter,

//   min_participant,

//   date_start,
//   participant_young,
//   participant_adult,
//   description,
//   hotel,
// } = storeToRefs(tourCartSelectedStore);

// defineOptions({
//   preFetch: preFetch(
//     ({
//       store,
//       currentRoute,
//       previousRoute,
//       redirect,
//       ssrContext,
//       urlPath,
//       publicPath,
//     }) => {
//       if (!currentRoute?.query?.page)
//         redirect({ name: currentRoute.name, query: { ...currentRoute.query, page: 1 } });

//       return useTourBookingPaymentListStore(store).onFetch({
//         currentPage: currentRoute?.query?.page,
//         query: currentRoute?.query,
//       });
//     }
//   ),
// });

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

const router = useRouter();

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 25,
  // rowsNumber: xx if getting data from a server
});
</script>

<script>
import { ref } from "vue";
import { mapActions, mapWritableState } from "pinia";
// import { useTourCartSelectedStore } from "stores/lagia-stores/tour/TourCartSelectedStore";
import { useTourBookingPaymentListStore } from "stores/lagia-stores/tour/TourBookingPaymentListStore";

const columns = [
  {
    name: "delete",
    align: "center",
    label: "Menu",
    field: "delete",
  },
  // {
  //   name: "id",
  //   label: "ID",
  //   field: "id",
  //   sortable: true,
  //   align: "left",
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },

  {
    name: "name",
    label: "Nama",
    field: "name",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "email",
    label: "Email",
    field: "email",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "phone",
    label: "Telepon",
    field: "phone",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "instance",
    label: "Instansi",
    field: "instance",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "city",
    label: "Kota Berangkat",
    field: "city",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "date_start",
    label: "Tanggal Berangkat",
    field: "date_start",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "participant_adult",
    label: "Pesarta Dewasa",
    field: "participant_adult",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "participant_young",
    label: "Peserta Anak (2-6 thn)",
    field: "participant_young",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  // {
  //   name: "description",
  //   label: "Catatan Khusus",
  //   field: "description",
  //   sortable: true,
  //   align: "left",
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  {
    name: "hotel",
    label: "Hotel",
    field: "hotel",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "dibayar",
    label: "Tipe Dibayar",
    field: "dibayar",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "dibayar_percent",
    label: "Persentase Dibayar (%)",
    field: "dibayar_percent",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "room_qty",
    label: "Jumlah Kamar",
    field: "room_qty",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "room_budget",
    label: "Budget (Per Kamar)",
    field: "room_budget",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },


  // {
  //   name: "address",
  //   label: "Alamat",
  //   field: "address",
  //   sortable: true,
  //   align: "left",
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  // snap_token
  {
    name: "snap_token",
    label: "Token",
    field: "snap_token",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  // transaction_time
  // {
  //   name: "transaction_time",
  //   label: "Waktu Transaksi",
  //   field: "transaction_time",
  //   sortable: true,
  //   align: "left",
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  // transaction_status
  // {
  //   name: "transaction_status",
  //   label: "Status Transaksi",
  //   field: "transaction_status",
  //   sortable: true,
  //   align: "left",
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  // transaction_id
  {
    name: "transaction_id",
    label: "ID Transaksi",
    field: "transaction_id",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  // status_message
  // {
  //   name: "status_message",
  //   label: "Status Pesan",
  //   field: "status_message",
  //   sortable: true,
  //   align: "left",
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  // status_code
  // {
  //   name: "status_code",
  //   label: "Status Code",
  //   field: "status_code",
  //   sortable: true,
  //   align: "left",
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  // payment_type
  // {
  //   name: "payment_type",
  //   label: "Tipe Pembayaran",
  //   field: "payment_type",
  //   sortable: true,
  //   align: "left",
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  // gross_amount
  {
    name: "gross_amount",
    label: "Tagihan Invoice",
    field: "gross_amount",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  // fraud_status
  // {
  //   name: "fraud_status",
  //   label: "Fraud Status",
  //   field: "fraud_status",
  //   sortable: true,
  //   align: "left",
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
];

// const store = useTourCartSelectedStore();

export default {
  emits: ["onCoupon"],
  setup() {
    return {
      columns,
    };
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    // ...mapWritableState(useTourBookingPaymentListStore, ["records"]),
  },
  methods: {
    // ...mapActions(useTourCartSelectedStore, ["onRemove", "onSelectedRemove"]),
    ...mapActions(useTourBookingPaymentListStore, ["onFetchCookies"]),
  },
  mounted() {
    this.onFetchCookies();
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
