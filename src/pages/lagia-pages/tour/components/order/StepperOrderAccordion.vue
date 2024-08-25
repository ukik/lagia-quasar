<template>
  <q-list id="StepperOrderAccordion" bordered class="rounded-borders">
    <q-expansion-item disable v-if="current == 1" default-opened expand-separator>
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">1</q-avatar>
        </q-item-section>

        <q-item-section id="StepperOrderAccordion_PRODUK"> PRODUK </q-item-section>
      </template>

      <q-card>
        <q-separator />

        <q-card-section><slot name="step1"></slot></q-card-section>
        <q-separator></q-separator>
        <q-card-actions class="q-pa-md" align="right">
          <q-btn
            @click="
              onPageTwo();
              $emit('setCookies');
            "
            :color="getFormCheck ? 'positive' : 'red'"
            label="Lanjut"
            icon-right="arrow_forward"
            unelevated
          />
        </q-card-actions>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      disable
      expand-icon-toggle
      default-opened
      v-if="current == 2"
      expand-separator
    >
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">2</q-avatar>
        </q-item-section>

        <q-item-section id="StepperOrderAccordion_FORMULIR"> FORMULIR </q-item-section>
      </template>

      <q-card>
        <q-separator />

        <q-card-section><slot name="step2"></slot></q-card-section>
        <q-separator></q-separator>
        <q-card-actions class="q-pa-md" align="between">
          <q-btn
            class="q-mr-sm"
            outline
            @click="onPageOne"
            icon-right="arrow_back"
            unelevated
          />
          <q-btn
            @click="
              CheckoutVerify();
              $emit('setCookies');
            "
            :color="getFormCheck ? 'positive' : 'red'"
            label="Lanjut"
            icon-right="arrow_forward"
            unelevated
          />
        </q-card-actions>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      disable
      expand-icon-toggle
      default-opened
      v-if="current == 3 && getFormCheck"
      expand-separator
    >
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">3</q-avatar>
        </q-item-section>

        <q-item-section id="StepperOrderAccordion_CHECKOUT"> CHECKOUT </q-item-section>
      </template>

      <q-card>
        <q-separator />

        <q-card-section><slot name="step3"></slot></q-card-section>
        <q-separator></q-separator>
        <q-card-actions class="q-pa-md" align="between">
          <q-btn
            class="q-mr-sm"
            outline
            @click="onPageTwo"
            icon-right="arrow_back"
            unelevated
          />
          <q-btn
            @click="
              $emit('setCookies');
              onCheckout()
            "
            color="primary"
            label="CHECKOUT"
            icon-right="shopping_cart"
            unelevated
          />
        </q-card-actions>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
import { mapActions, mapState } from "pinia";

import { useTourOrderDetailStore } from "stores/lagia-stores/tour/TourOrderDetailStore";

export default {
  // props: ["scrollY"],
  data() {
    return {
      current: 1,
    };
  },
  computed: {
    ...mapState(useTourOrderDetailStore, ["getFormCheck", "dibayar_nominal"]),
  },
  emits: ["setCookies"],
  methods: {
    ...mapActions(useTourOrderDetailStore, ["onCheckoutVerify","onCheckout"]),
    async onPageOne() {
      this.current = 1;
      this.onScrollUp("#StepperOrderAccordion");
    },
    async onPageTwo() {
      this.current = 2;
      this.onScrollUp("#StepperOrderAccordion");
    },
    async CheckoutVerify() {
      this.onCheckoutVerify();
      if (!this.getFormCheck) return;
      this.current = 3;

      this.onScrollUp("#StepperOrderAccordion");
    },
    onScrollUp(el) {
      setTimeout(() => {

        // VERSION 1
        // document.querySelector(el).scrollIntoView({
        //   behavior: 'smooth'
        // });


        const ANCHOR = document.querySelector(el);
        console.log('ANCHOR')
        this.$scrollToElement(ANCHOR);
      }, 500);
    },
  },
};
</script>

<style>
#StepperOrderAccordion .disabled,
[disabled] {
  opacity: 1 !important;
}
</style>
