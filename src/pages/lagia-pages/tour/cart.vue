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
  <!-- PRICE -->
  <q-dialog
    full-width
    full-height
    :maximized="$q.screen.width <= 768"
    v-model="dialog_price"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
      <q-card-section class="q-py-none">
        <q-toolbar style="height: 50px" class="q-pa-none">
          <div class="text-h6">Preview Harga</div>
          <q-space></q-space>
          <q-btn dense flat icon="close" v-close-popup></q-btn>
        </q-toolbar>
      </q-card-section>

      <q-separator />

      <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
        <PriceListCard
          :item="dialog_price_selected?.tourPrice"
          :images="dialog_price_selected?.tourProduct?.image"
        ></PriceListCard>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    full-width
    full-height
    :maximized="$q.screen.width <= 768"
    v-model="dialog_product"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
      <q-card-section class="q-py-none">
        <q-toolbar style="height: 50px" class="q-pa-none">
          <div class="text-h6">Preview Product</div>
          <q-space></q-space>
          <q-btn dense flat icon="close" v-close-popup></q-btn>
        </q-toolbar>
      </q-card-section>

      <q-separator />

      <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
        <StoreDetailProductBody
          :_height="$q.screen.width > 425 ? '400px' : '400px'"
          :record="dialog_product_selected"
        ></StoreDetailProductBody>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- <q-btn label="dialog" @click="dialog_price = true"></q-btn> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <q-no-ssr class="col-12">
        <q-banner
          id="ANCHOR"
          inline-actions
          class="text-white bg-red q-mb-lg rounded-borders-2"
        >
          <template v-slot:avatar>
            <q-icon name="report_problem" color="white" />
          </template>
          Batas maksimal keranjang 200 produk
        </q-banner>

        <!-- :filter="filter" -->
        <q-table
          dense
          id="WidgetCart"
          :style="records?.length > 6 ? 'height: 750px' : ''"
          flat
          bordered
          :loading="loading"
          separator="cell"
          :table-header-class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
          class="my-sticky-header-table"
          title="Keranjang Produk"
          :rows="records"
          :columns="columns"
          row-key="id"
          selection="single"
          v-model:selected="selected"
          :hide-header="$q.screen.width < 768"
          v-model:pagination="pagination"
        >
          <!-- <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template> -->

          <template v-slot:top-right>
            <q-input dense debounce="500" v-model="filter" placeholder="Filter" clearable>
              <template v-slot:append>
                <q-icon name="search" />
              </template>

              <template v-slot:after>
                <q-btn
                  @click="onReset"
                  icon="autorenew"
                  round
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
                <q-card-section>
                  <q-checkbox
                    dense
                    v-model="props.selected"
                    :label="props.selected ? 'Dipilih' : ''"
                  />
                </q-card-section>

                <q-img
                  v-if="props.row?.tourProduct"
                  @click="showMultiple(props.row.tourProduct.image, 0)"
                  key="image"
                  :src="props.row.tourProduct.image[0]"
                ></q-img>

                <q-separator />

                <q-list>
                  <!-- <template v-for="col in props.cols.filter((col) => col.id !== 'desc')">
                <q-item v-if="col.field !== 'image'" :key="col.id">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template> -->

                  <isQItemLabelValue
                    label="Nama Produk"
                    :value="props?.row?.tourProduct?.name"
                  ></isQItemLabelValue>

                  <isQItemLabelValue
                    label="Nama Harga"
                    :value="props?.row?.tourPrice?.name"
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
                  ></isQItemLabelValue>
                </q-list>

                <q-separator></q-separator>

                <q-card-section>
                  <q-item class="q-pa-none">
                    <q-item-section>
                      <q-item-label caption>Total Harga (diluar hotel)</q-item-label>
                      <q-item-label class="text-h6">{{
                        $currency(
                          $finalPrice(props.row.tourPrice) +
                            $finalPriceAnak(props.row.tourPrice)
                        )
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>

                <q-separator></q-separator>

                <q-card-section>
                  <q-btn-group spread unelevated>
                    <q-btn
                      class="q-mt-sm"
                      size=""
                      unelevated
                      no-caps
                      square
                      @click="
                        dialog_price = true;
                        dialog_price_selected = props.row;
                      "
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
                      @click="
                        dialog_price = true;
                        dialog_price_selected = props.row;
                      "
                      color="primary"
                      text-color="white"
                      icon="fa-solid fa-message"
                    />
                    <!-- <q-separator vertical></q-separator> -->
                    <!-- <q-btn
                  size="lg"
                  no-caps
                  @click="$refs.form.onSubmit({ price_id: item?.id })"
                  square
                  color="primary"
                  text-color="white"
                  label="Booking Now"
                  icon="shopping_cart_checkout"
                /> -->
                  </q-btn-group>
                </q-card-section>

                <!-- <q-card-section class="row bg-white" key="quantity" :props="props">
              <q-btn
                size="18px"
                color="negative"
                round
                icon="remove"
                @click="props.row.quantity = Number(props.row.quantity) - 1"
              ></q-btn>

              <q-input
                type="number"
                outlined
                class="col q-mx-md"
                input-class="text-center text-big"
                v-model="props.row.quantity"
              ></q-input>

              <q-btn
                size="18px"
                color="primary"
                round
                icon="add"
                @click="props.row.quantity = Number(props.row.quantity) + 1"
              ></q-btn>
            </q-card-section> -->
              </q-card>
            </div>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td>
                <q-checkbox v-model="props.selected" color="primary" />
              </q-td>
              <!-- <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td> -->
              <q-td key="delete" :props="props">
                <q-btn-group unelevated>
                  <q-btn
                    @click="onDeletePopup(props.row.id, records.indexOf(props.row))"
                    dense
                    color="red"
                    icon="delete"
                  ></q-btn>
                  <q-separator vertical></q-separator>
                  <q-btn
                    dense
                    color="primary"
                    icon="visibility"
                    :to="{
                      name: '/tour/product-detail',
                      params: {
                        slug: props.row.tourProduct?.id,
                        slug_text: props.row.tourProduct?.slug,
                      },
                    }"
                  ></q-btn>
                </q-btn-group>
              </q-td>

              <q-td key="image" :props="props">
                <template v-if="props.row?.tourProduct">
                  <q-img
                    @click="showMultiple(props.row.tourProduct.image, 0)"
                    height="100px"
                    width="100px"
                    :src="props.row.tourProduct.image[0]"
                  ></q-img>
                </template>
                <template v-else>
                  <q-img
                    @click="showMultiple($defaultErrorImage, 0)"
                    loading="lazy"
                    :ratio="16 / 9"
                    class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                    height="100px"
                    width="100px"
                    :src="$defaultErrorImage"
                  />
                </template>
              </q-td>
              <q-td key="get_final_amount" :props="props">
                <div class="text-title full-width text-center">
                  {{
                    $currency(
                      Number($finalPriceAnak(props.row.tourPrice)) *
                        Number(props.row.participantYoung) +
                        Number($finalPrice(props.row.tourPrice)) *
                          Number(props.row.participantAdult)
                    )
                  }}
                </div>
                <div>
                  <q-btn-group rounded spread unelevated outline class="q-px-sm q-mt-sm">
                    <q-btn
                      @click="
                        dialog_price = true;
                        dialog_price_selected = props.row;
                      "
                      dense
                      size="sm"
                      label="price"
                      no-caps
                      unelevated
                      outline
                      color="brown"
                    />
                    <q-separator verticla></q-separator>
                    <q-btn
                      @click="
                        dialog_product = true;
                        dialog_product_selected = props.row?.tourProduct;
                      "
                      dense
                      size="sm"
                      label="product"
                      no-caps
                      unelevated
                      outline
                      color="brown"
                    />
                  </q-btn-group>

                  <!-- <q-btn
                size=""
                flat
                unelevated
                no-caps
                square
                @click="
                  dialog_price = true;
                  dialog_price_selected = props.row;
                "
                dense
                color="primary"
                icon="fa-solid fa-tag"
              />
              <q-btn
                size=""
                flat
                unelevated
                no-caps
                square
                @click="
                  dialog_price = true;
                  dialog_price_selected = props.row;
                "
                dense
                color="primary"
                icon="fa-solid fa-message"
              /> -->
                </div>
              </q-td>
              <q-td key="name" :props="props">
                <!--  -->

                <q-item
                  class="q-pa-none"
                  clickable
                  v-ripple
                  :to="{
                    name: '/tour/product-detail',
                    params: {
                      slug: props.row.tourProduct?.id,
                      slug_text: props.row.tourProduct?.slug,
                    },
                  }"
                >
                  <q-item-section>
                    <q-item-label caption> Produk: </q-item-label>
                    <q-item-label>
                      {{ props.row.tourProduct?.name }}
                    </q-item-label>
                    <q-item-label caption> Label Harga: </q-item-label>
                    <q-item-label>
                      {{ props.row.tourPrice?.name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-td>
              <q-td key="date_start" :props="props">
                {{ props.row.dateStart }}
              </q-td>
              <q-td key="participant_adult" :props="props">
                {{ props.row.participantAdult }}
              </q-td>
              <q-td key="participant_young" :props="props">
                {{ props.row.participantYoung }}
              </q-td>
              <q-td key="hotel" :props="props">
                {{ props.row.hotel }}
              </q-td>
            </q-tr>
          </template>

          <template v-slot:pagination="scope">
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
          </template>
        </q-table>

        <!-- <PriceListCard
      v-if="selected.length > 0"
      :item="selected[0]?.tourPrice"
      :images="selected[0]?.tourProduct?.image"
    ></PriceListCard> -->

        <ProductPriceListCard v-if="selected.length > 0" :item="selected[0]?.tourPrice">
          <template v-slot:carousel>
            <template v-if="selected.length > 0">
              <isImageSlideCarousel
                v-if="selected[0]?.tourProduct?.image"
                :height="$q.screen.width > 425 ? '400px' : '400px'"
                class="rounded-borders-2"
                :_gallery="selected[0]?.tourProduct?.image"
              ></isImageSlideCarousel>

              <q-img
                v-else
                loading="lazy"
                :ratio="16 / 9"
                class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                :src="$defaultErrorImage"
              />
            </template>
          </template>

          <template v-slot:title>
            <q-card-section slot="title">
              <q-item
                class="q-pa-none"
                clickable
                v-ripple
                :to="{
                  name: '/tour/product-detail',
                  params: {
                    slug: selected[0]?.tourProduct?.id,
                    slug_text: selected[0]?.tourProduct?.slug,
                  },
                }"
              >
                <q-item-section>
                  <q-item-label caption> Produk: </q-item-label>
                  <q-item-label class="text-h6 q-mb-sm">
                    {{ selected[0]?.tourProduct?.name }}
                  </q-item-label>
                  <q-item-label caption> Label Harga: </q-item-label>
                  <q-item-label>
                    {{ selected[0]?.tourPrice?.name }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </template>
        </ProductPriceListCard>

        <ProductCalculate class="q-mt-lg"></ProductCalculate>

        <div v-if="selected.length > 0" class="q-mt-lg q-py-none col-12">
          <FormBookingCustomerData></FormBookingCustomerData>

          <!-- <q-list bordered>
        <q-item>
          <q-item-section>
            <q-item-section class="text-h5 text-dark"> YOUR DETAILS </q-item-section>
          </q-item-section>
        </q-item>
        <q-separator />

        <q-card-section>
          <FormBookingCustomerData></FormBookingCustomerData>
        </q-card-section>
      </q-list> -->
        </div>

        <!-- <q-banner
      v-if="selected.length > 0"
      inline-actions
      class="text-white bg-red q-mt-lg rounded-borders-2"
    >
      <template v-slot:avatar>
        <q-icon name="report_problem" color="white" />
      </template>
      Batas maksimal keranjang 200 produk
    </q-banner> -->
      </q-no-ssr>
    </div>
  </div>
</template>

<script async setup>
import PriceListCard from "./components/cart/PriceListCard";
import ProductCalculate from "./components/cart/ProductCalculate";
import FormBookingCustomerData from "./components/cart/FormBookingCustomerData";
import StoreDetailProductBody from "./components/detail/StoreDetailProductBody";
import ProductPriceListCard from "./components/cart/ProductPriceListCard";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useTourCartListStore } from "stores/lagia-stores/tour/TourCartListStore";
import { useTourCartSelectedStore } from "stores/lagia-stores/tour/TourCartSelectedStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
const store = useTourCartListStore();
const { onFetch, onPaginate } = store; // have all reactive states here
const {
  errors,
  data,
  paginate,
  records,
  totalItem,
  page,
  orderField,
  orderDirection,
  isShowDataRecycle,
  search,
  lastPage,
  currentPage,
  perPage,

  loading,
  init,

  additional,
} = storeToRefs(store); // have all reactive states here

const tourCartSelectedStore = useTourCartSelectedStore();
const { onResetStateA } = tourCartSelectedStore;
const {
  selected,
  vat,
  coupon,
  item,
  calculate,

  filter,

  min_participant,

  date_start,
  participant_young,
  participant_adult,
  description,
  hotel,
} = storeToRefs(tourCartSelectedStore);

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

//       return useTourCartListStore(store).onFetch({
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
const watchPagination = async (params) => {
  console.log("watchPagination", params, filter);

  const val = params.value;
  const currentRoute = router.currentRoute.value;

  router.push({
    query: {
      ...currentRoute.redirectedFrom?.query,
      perPage: val.rowsPerPage,
      search: filter.value,
      orderField: val.sortBy,
      orderDirection: val.descending,
    },
  });
  await onPaginate({
    currentPage: currentPage.value,
    query: {
      ...currentRoute.redirectedFrom?.query,
      perPage: val.rowsPerPage,
      search: filter.value,
      orderField: val.sortBy,
      orderDirection: val.descending,
    },
  });
  if (currentPage.value > lastPage.value) currentPage.value = lastPage.value;
};
watch(() => pagination, watchPagination, {
  deep: true,
  // immediate: true,
});

const watchFilter = async (params) => {
  console.log("watchPagination", params, filter);

  const val = pagination.value;
  const currentRoute = router.currentRoute.value;

  router.push({
    query: {
      ...currentRoute.redirectedFrom?.query,
      perPage: val.rowsPerPage,
      search: filter.value,
      orderField: val.sortBy,
      orderDirection: val.descending,
    },
  });
  await onPaginate({
    currentPage: currentPage.value,
    query: {
      ...currentRoute.redirectedFrom?.query,
      perPage: val.rowsPerPage,
      search: filter.value,
      orderField: val.sortBy,
      orderDirection: val.descending,
    },
  });
  if (currentPage.value > lastPage.value) currentPage.value = lastPage.value;
};
watch(() => filter, watchFilter, {
  deep: true,
  // immediate: true,
});

const onCurrentPage = async (val) => {
  console.log("onCurrentPage", router.currentRoute.value);
  const currentRoute = router.currentRoute.value;

  // KARENA CHILDREN & REDIRECT

  router.push({ query: { ...currentRoute.redirectedFrom?.query, page: val.value } });
  onPaginate({ currentPage: val.value, query: currentRoute?.redirectedFrom?.query });
};
watch(() => currentPage, onCurrentPage, {
  deep: true,
  immediate: true,
});

const watchSelected = async (val) => {
  console.log("watchSelected", val.value);
  min_participant.value = val.value[0]?.tourPrice?.minParticipant;
  date_start.value = val.value[0]?.dateStart;
  participant_adult.value = val.value[0]?.participantAdult;
  participant_young.value = val.value[0]?.participantYoung;
  description.value = val.value[0]?.description;
  hotel.value = val.value[0]?.hotel;

  console.log(
    date_start.value,
    participant_adult.value,
    participant_young.value,
    description.value,
    hotel.value
  );

  // if (val.value?.length > 0) {
  // } else {
  //   onResetStateA();
  // }
};
watch(() => selected, watchSelected, {
  deep: true,
  // immediate: true,
});

async function onReset() {
  const val = pagination.value;
  currentPage.value = 1;

  filter.value = "";
  pagination.value = {
    sortBy: "desc",
    descending: false,
    page: 1,
    rowsPerPage: 25,
    // rowsNumber: xx if getting data from a server
  };

  onPaginate({
    currentPage: 1,
    query: {
      perPage: 25,
      search: "",
      orderField: val.sortBy,
      orderDirection: val.descending,
    },
  });
}

const dialog_price = ref(false);
const dialog_product = ref(false);
const dialog_price_selected = ref(null);
const dialog_product_selected = ref(null);
</script>

<script>
import { ref } from "vue";
import { mapActions, mapWritableState } from "pinia";
import { useTourCartSelectedStore } from "stores/lagia-stores/tour/TourCartSelectedStore";
import { useTourCartListStore } from "stores/lagia-stores/tour/TourCartListStore";

const columns = [
  // {
  //   name: "calories",
  //   align: "center",
  //   label: "Calories",
  //   field: "calories",
  //   sortable: true,
  // },
  // { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  // { name: "carbs", label: "Carbs (g)", field: "carbs" },
  // { name: "protein", label: "Protein (g)", field: "protein" },
  // { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  // {
  //   name: "id",
  //   label: "ID",
  //   field: "id",
  //   sortable: true,
  //   align: "left",
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  {
    name: "delete",
    align: "center",
    label: "Hapus",
    field: "delete",
  },
  {
    name: "image",
    label: "Gambar",
    field: "image",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "get_final_amount",
    label: "Total Biaya (diluar hotel)",
    field: "get_final_amount",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "name",
    label: "Nama Harga",
    field: "name",
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
    label: "Peserta Dewasa",
    field: "participant_adult",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "participant_young",
    label: "Peserta Anak (2-6 tahun)",
    field: "participant_young",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "hotel",
    label: "Penginapan/Hotel",
    field: "hotel",
    sortable: true,
    align: "left",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },

  // {
  //   name: "quantity",
  //   label: "Qty",
  //   field: "name",
  //   align: "left",
  //   // sortable: true,
  //   // sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  // {
  //   name: "sub_total",
  //   label: "Sub Total",
  //   field: "sub_total",
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
  computed: {
    // ...mapWritableState(useTourCartListStore, ["records"]),
  },
  methods: {
    ...mapActions(useTourCartSelectedStore, ["onRemove", "onSelectedRemove"]),
    ...mapActions(useTourCartListStore, ["onRecordRemove"]),

    async onDeletePopup(id, index = null) {
      const vm = this;

      vm.$swal
        .fire({
          title: "Apa anda yakin?",
          text: "Hapus data ini dari keranjang",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, hapus saja!",
          cancelButtonText: "Tidak, cancel!",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            vm.$q.loading.show();

            const remove = await vm.onRemove([id]);

            vm.$q.loading.hide();

            if (remove) {
              vm.$swal.fire({
                title: "Deleted!",
                text: "Data berhasil dihapus  :)",
                icon: "success",
                showConfirmButton: true,
                confirmButtonText: "Tutup",
                timer: 1500,
              });

              await vm.onRecordRemove(id);
              await vm.onSelectedRemove(id);
            }
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === vm.$swal.DismissReason.cancel
          ) {
            vm.$swal.fire({
              title: "Cancelled",
              text: "Data batal dihapus :)",
              icon: "error",
              showConfirmButton: true,
              confirmButtonText: "Tutup",
              timer: 1500,
            });
          }
        });
    },
  },
  mounted() {
    this.$q.dark.set(false);
  },
};
</script>

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
