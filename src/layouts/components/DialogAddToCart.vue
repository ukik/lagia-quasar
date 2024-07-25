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
      <q-header class="bg-white text-dark">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-primary">Kuantitas</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>
      </q-header>

      <q-footer class="bg-white text-dark">
        <q-separator></q-separator>
        <q-card-section class="row">
          <form
            class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12"
            id="form-add-to-cart"
            @submit.prevent.stop="onSubmit"
          >
            <q-input
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
          </form>

          <q-space v-if="$q.screen.width > 425"></q-space>

          <div
            class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 col-12"
            :class="[$q.screen.width > 425 ? 'text-right' : 'text-center q-mt-sm']"
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
              <span class="text-h6 q-mr-sm">{{ $currency(getPriceCart) }}</span>
            </q-btn>
          </div>
        </q-card-section>
        <!-- <q-card-actions align="between" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn @click="onSubmit" flat label="Send" icon-right="send" />
        </q-card-actions> -->
      </q-footer>

      <q-page-container>
        <q-page>
          <PriceListCard
            v-if="item"
            @onBubbleEvent="onBubbleEvent"
            :item="item"
          ></PriceListCard>
        </q-page>
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

export default {
  components: {
    PriceListCard,
  },
  data() {
    return {
      item: null,
      key: "",
    };
  },
  // props: ["item"],
  setup() {
    const store = useAddToCartStore();
    const { prompt, quantity } = storeToRefs(store); // have all reactive states here
    const { onAdd, onRemove, onAddToCart } = store;

    return {
      onAddToCart,
      onAdd,
      onRemove,
      prompt,
      quantity,
    };
  },
  computed: {
    getPriceCart() {
      if (!this.item) return 0;
      return Math.round(this.$finalPrice(this.item) * this.quantity);
    },
  },
  methods: {
    onBubbleEvent() {},
    onOpen(val) {
      this.prompt = true;
      this.item = val?.value;
      this.key = val?.key;
    },
    async onSubmit() {
      this.$refs.quantityRef.validate();

      if (this.$refs.quantityRef.hasError) {
        this.$q.notify({
          color: "negative",
          message: "Lengkapi formulir",
          position: "top",
        });
      } else {
        const resp = await this.onAddToCart({
          price_id: this.item?.productId,
          key: this.key,
        });
        console.log("DialogAddToCart resp", resp);
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
