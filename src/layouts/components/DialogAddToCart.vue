<template>
  <q-dialog
    v-model="prompt"
    full-width
    full-height
    :maximized="$q.screen.width <= 768"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-layout
      :style="$q.screen.width > 768 ? 'width: 750px !important' : ''"
      view="hHh lpR fFf"
      container
      class="bg-white text-dark"
    >
      <!-- <q-header class="bg-white text-dark">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-primary">Kuantitas</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>
      </q-header> -->

      <q-footer class="bg-white text-dark">
        <q-separator></q-separator>
        <q-card-section class="row">
          <!-- <form
            class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 row"
            :class="[slug == 'tour' ? 'col-sm' : '']"
            id="form-add-to-cart"
            @submit.prevent.stop="onSubmit"
          >
            <q-input
              v-if="slug == 'tour'"
              class="col-6"
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
                    <q-date v-model="date_start">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              v-if="slug !== 'tour'"
              :class="[slug == 'tour' ? 'q-ml-sm' : '']"
              class="col"
              dense
              mask="###"
              type="number"
              bg-color="white"
              outlined
              color="primary"
              ref="quantityRef"
              v-model="quantity"
              input-class="text-center text-h6"
              placeholder="0"
              lazy-rules
              :rules="[(val) => !!val || '', (val) => val > 0 || '']"
            >
              <template v-slot:before>
                <q-btn
                  style="width: 40px; height: 40px"
                  @click="onRemove"
                  icon="remove"
                  color="pink"
                  unelevated
                  rounded
                ></q-btn>
              </template>

              <template v-slot:after>
                <q-btn
                  style="width: 40px; height: 40px"
                  @click="onAdd"
                  icon="add"
                  color="positive"
                  unelevated
                  rounded
                ></q-btn>
              </template>
            </q-input>
          </form> -->

          <!-- <q-space v-if="$q.screen.width > 425"></q-space> -->

          <!-- class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 col-12" -->
          <div
            class="col-12"
            :class="[$q.screen.width > 425 ? 'text-right' : 'text-center ']"
          >
            <q-btn
              @click="onSubmit"
              style="height: 40px"
              class="full-width"
              unelevated
              icon-right="shopping_cart_checkout"
              color="primary"
              size="md"
              no-caps
            >
              <span v-if="slug == 'lodge'" class="text-h6 q-mr-sm">{{
                $currency(getPriceCartLodge)
              }}</span>
              <span v-else-if="slug == 'lodge'" class="text-h6 q-mr-sm">{{
                $currency(getPriceCart)
              }}</span>
            </q-btn>
          </div>
        </q-card-section>
      </q-footer>

      <q-page-container>
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-dark">Keranjang</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>
        <q-separator></q-separator>
        <!-- <q-page> -->
        <PriceListCard
          v-if="item"
          @onBubbleEvent="onBubbleEvent"
          :vendor="vendor"
          :product="product"
          :item="item"
        ></PriceListCard>

        <q-separator></q-separator>
        <q-card-section>
          <!-- <form
            v-if="slug !== 'tour'"
            class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 row"
            :class="[slug == 'tour' ? 'col-sm' : '']"
            id="form-add-to-cart"
            @submit.prevent.stop="onSubmit"
          >
            <q-input
              v-if="slug == 'tour'"
              class="col-12"
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
                    <q-date v-model="date_start">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              v-if="slug !== 'tour'"
              :class="[slug == 'tour' ? 'q-ml-sm' : '']"
              class="col"
              dense
              mask="###"
              type="number"
              bg-color="white"
              outlined
              color="primary"
              ref="quantityRef"
              v-model="quantity"
              input-class="text-center text-h6"
              placeholder="0"
              lazy-rules
              :rules="[(val) => !!val || '', (val) => val > 0 || '']"
            >
              <template v-slot:before>
                <q-btn
                  style="width: 40px; height: 40px"
                  @click="onRemove"
                  icon="remove"
                  color="pink"
                  unelevated
                  rounded
                ></q-btn>
              </template>

              <template v-slot:after>
                <q-btn
                  style="width: 40px; height: 40px"
                  @click="onAdd"
                  icon="add"
                  color="positive"
                  unelevated
                  rounded
                ></q-btn>
              </template>
            </q-input>
          </form> -->

          <FormTour
            @onBubbleEventSuccess="prompt = false"
            ref="FormTour"
            v-if="slug == 'tour'"
          ></FormTour>
          <FormLodge
            @onBubbleEventSuccess="prompt = false"
            ref="FormLodge"
            v-if="slug == 'lodge'"
          ></FormLodge>
        </q-card-section>
        <!-- </q-page> -->
      </q-page-container>
    </q-layout>

    <!-- <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
      <q-card-section>
        <div class="text-h6">Konsultasi</div>
      </q-card-section>

      <q-separator />

    </q-card> -->
  </q-dialog>
</template>

<script>
import { storeToRefs } from "pinia";

import { useAddToCartStore } from "stores/lagia-stores/widget/AddToCartStore";

import PriceListCard from "./PriceListCard";

import FormTour from "./FormTour.vue";
import FormLodge from "./FormLodge.vue";

export default {
  components: {
    PriceListCard,
    FormTour,
    FormLodge,
  },
  data() {
    return {
      item: null,
      slug: null,
      vendor: null,
      product: null,
    };
  },
  // props: ["item"],
  setup() {
    const store = useAddToCartStore();
    const {
      prompt,
      quantity,
      date_start,
      date_checkin,
      participant_young,
      participant_adult,
    } = storeToRefs(store); // have all reactive states here
    const { onAdd, onRemove, onAddToCart } = store;

    return {
      onAddToCart,
      onAdd,
      onRemove,
      prompt,
      quantity,
      date_start,
      date_checkin,
      participant_young,
      participant_adult,
    };
  },
  computed: {
    getPriceCart() {
      if (!this.item) return 0;
      return Math.round(this.$finalPrice(this.item) * this.quantity);
    },
    getPriceCartLodge() {
      if (!this.item) return 0;
      if (!this.date_checkin) return 0;

      return Math.round(
        this.$finalPrice(this.item) *
          this.date_checkin.length *
          Number(this.participant_adult)
      );
    },
  },
  methods: {
    onBubbleEvent() {},
    onOpen(val) {
      this.prompt = true;
      this.item = val?.value;
      this.slug = val?.slug;
      this.vendor = val?.vendor;
      this.product = val?.product;
    },
    async onSubmit() {
      const vm = this;

      if (vm.slug == "tour")
        return this.$refs.FormTour?.onSubmit({
          price_id: vm.item?.id,
          slug: vm.slug,
        });

      if (vm.slug == "lodge")
        return this.$refs.FormLodge?.onSubmit({
          price_id: vm.item?.id,
          slug: vm.slug,
        });

      return;
      if (vm.quantity <= 0)
        return vm.$q.notify({
          color: "negative",
          message: "Quantity minimal 1",
          position: "top",
        });

      vm.$refs?.quantityRef?.validate();
      vm.$refs?.dateRef?.validate();

      if (vm.$refs?.quantityRef?.hasError) {
        vm.$q.notify({
          color: "negative",
          message: "Quantity minimal 1",
          position: "top",
        });
      } else if (vm.$refs?.dateRef?.hasError) {
        vm.$q.notify({
          color: "negative",
          message: "Tanggal berangkat wajib",
          position: "top",
        });
      } else {
        const resp = await vm.onAddToCart({
          price_id: vm.item?.id,
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
#form-add-to-cart .q-field__bottom {
  display: none;
}
#form-add-to-cart .q-field--with-bottom {
  padding-bottom: 0px;
}
</style>
