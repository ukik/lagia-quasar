<template>
  <!-- <div> -->
  <!-- <q-btn
      label="Reset"
      push
      color="white"
      text-color="primary"
      @click="reset"
      class="q-mb-md"
    /> -->
  <!-- <q-banner inline-actions rounded class="bg-blue-7 text-white q-mb-lg">
    Ayo jadi sahabat LAGIA biar sering dapatkan promo menarik
    <template v-slot:action>
      <q-btn flat icon="login" label="DAFTAR" />
    </template>
  </q-banner> -->
  <q-stepper
    id="StepperOrder"
    flat
    bordered
    v-model="step"
    header-nav
    ref="stepper"
    color="primary"
    done-color="blue"
    active-color="positive"
    inactive-color="pink"
    animated
    :vertical="$q.screen.width <= 768"
  >
    <q-step
      :name="1"
      title="PRODUK"
      icon="settings"
      prefix="1"
      :done="step > 1"
      :header-nav="step > 1"
    >
      <NavButton
        class="q-pt-none q-pb-lg"
        @onBubbleEvent="
          done1 = true;
          step = 2;
          $emit('setCookies');
        "
      />

      <slot name="step1"></slot>

      <NavButton
        class="q-pb-none"
        @onBubbleEvent="
          done1 = true;
          step = 2;
          $emit('setCookies');
        "
      />
    </q-step>

    <q-step
      :name="2"
      title="BIAYA"
      caption=""
      prefix="2"
      icon="create_new_folder"
      :done="step > 2"
      :header-nav="step > 2"
    >
      <NavBackButton
        class="q-pt-none q-pb-lg"
        @onBubbleEvent="
          done2 = true;
          step = 3;
          $emit('setCookies');
        "
        @onBubbleEventBack="
          step = 1;
          $emit('setCookies');
        "
      >
      </NavBackButton>

      <slot name="step2"></slot>

      <NavBackButton
        class="q-pb-none"
        @onBubbleEvent="
          done2 = true;
          step = 3;
          $emit('setCookies');
        "
        @onBubbleEventBack="
          step = 1;
          $emit('setCookies');
        "
      >
      </NavBackButton>
    </q-step>

    <q-step
      :name="3"
      title="PELANGGAN"
      icon="add_comment"
      prefix="3"
      :done="step > 3"
      :header-nav="step > 3"
    >
      <NavBackButton
        class="q-pt-none q-pb-lg"
        @onBubbleEvent="
          done3 = true;
          step = 4;
          $emit('setCookies');
        "
        @onBubbleEventBack="
          step = 2;
          $emit('setCookies');
        "
      >
      </NavBackButton>

      <slot name="step3"></slot>

      <NavBackButton
        class="q-pb-none"
        @onBubbleEvent="
          done3 = true;
          step = 4;
          $emit('setCookies');
        "
        @onBubbleEventBack="
          step = 2;
          $emit('setCookies');
        "
      >
      </NavBackButton>
    </q-step>

    <q-step
      :name="4"
      title="TANGGAL"
      icon="add_comment"
      prefix="4"
      :done="step > 4"
      :header-nav="step > 4"
    >
      <NavBackButton
        class="q-pt-none q-pb-lg"
        @onBubbleEvent="
          done4 = true;
          step = 5;
          $emit('setCookies');
        "
        @onBubbleEventBack="
          step = 3;
          $emit('setCookies');
        "
      >
      </NavBackButton>

      <slot name="step4"></slot>

      <NavBackButton
        class="q-pb-none"
        @onBubbleEvent="
          done4 = true;
          step = 5;
          $emit('setCookies');
        "
        @onBubbleEventBack="
          step = 3;
          $emit('setCookies');
        "
      >
      </NavBackButton>
    </q-step>

    <q-step
      :name="5"
      title="RINGKASAN"
      icon="add_comment"
      prefix="5"
      :done="step > 5"
      :header-nav="step > 5"
    >
      <!-- <NavBackButton
        class="q-pt-none q-pb-lg"
        @onBubbleEvent="
          done5 = true;
          step = 6;
        "
        @onBubbleEventBack="step = 4"
      >
      </NavBackButton> -->

      <div class="q-mb-lg">
        <q-btn
          class="q-mr-sm"
          outline
          @click="
            step = 4;
            $emit('setCookies');
          "
          icon-right="arrow_back"
          unelevated
        />
        <q-btn
          @click="
            () => {
              if (getFormCheck) {
                done5 = true;
                step = 6;
                $emit('setCookies');
              } else {
                onBubbleEventRangkuman();
              }
            }
          "
          :color="getFormCheck ? 'primary' : 'red'"
          label="Lanjut"
          icon-right="arrow_forward"
          unelevated
        />
      </div>

      <!-- <q-banner v-if="!getFormCheck" inline-actions rounded class="bg-orange-1 q-mb-lg">
        Pastikan data wajib sudah diisi lengkap
      </q-banner> -->
      <slot name="step5"></slot>

      <div class="q-mt-lg">
        <q-btn
          class="q-mr-sm"
          outline
          @click="
            step = 4;
            $emit('setCookies');
          "
          icon-right="arrow_back"
          unelevated
        />
        <q-btn
          @click="
            () => {
              if (getFormCheck) {
                done5 = true;
                step = 6;
                $emit('setCookies');
              } else {
                onBubbleEventRangkuman();
              }
            }
          "
          :color="getFormCheck ? 'primary' : 'red'"
          label="Lanjut"
          icon-right="arrow_forward"
          unelevated
        />
      </div>
    </q-step>

    <q-step
      :name="6"
      title="CHECKOUT"
      icon="add_comment"
      prefix="6"
      :done="step > 6"
      :header-nav="step > 6"
    >
      <!-- <div class="q-mb-lg">
        <q-btn
          class="q-mr-sm"
          outline
          @click="
            step = 5;
            $emit('setCookies');
          "
          icon-right="arrow_back"
          unelevated
        />
      </div> -->
      <q-card-actions class="q-pa-none q-mb-lg" align="between">
        <q-btn
          class="q-mr-sm"
          outline
          @click="
            step = 5;
            $emit('setCookies');
          "
          icon-right="arrow_back"
          unelevated
        />
        <!-- <q-btn
          @click="
            $emit('setCookies');
            onCheckout();
          "
          color="primary"
          label="CHECKOUT"
          icon-right="shopping_cart"
          unelevated
        /> -->
      </q-card-actions>

      <slot name="step6"></slot>

      <q-card-actions class="q-pa-none q-mt-lg" align="between">
        <q-btn
          class="q-mr-sm"
          outline
          @click="
            step = 5;
            $emit('setCookies');
          "
          icon-right="arrow_back"
          unelevated
        />
        <q-btn
          @click="
            $emit('setCookies');
            gotoSubmit();
          "
          :color="getFormCheck ? 'positive' : 'red'"
          label="CHECKOUT"
          icon-right="shopping_cart"
          unelevated
        />
      </q-card-actions>
    </q-step>
  </q-stepper>
  <!-- </div> -->
</template>

<script>
import { ref } from "vue";

import NavButton from "./NavButton.vue";
import NavBackButton from "./NavBackButton.vue";

import { useTourOrderDetailStore } from "src/stores/lagia-stores/tour/TourOrderDetailStore";
import { mapState, mapActions } from "pinia";

export default {
  setup() {
    const step = ref(1);
    const done1 = ref(false);
    const done2 = ref(false);
    const done3 = ref(false);
    const done4 = ref(false);
    const done5 = ref(false);
    const done6 = ref(false);

    return {
      step,
      done1,
      done2,
      done3,
      done4,
      done5,
      done6,

      reset() {
        done1.value = false;
        done2.value = false;
        done3.value = false;
        done4.value = false;
        done5.value = false;
        done6.value = false;
        step.value = 1;
      },
    };
  },
  components: {
    NavButton,
    NavBackButton,
  },
  computed: {
    ...mapState(useTourOrderDetailStore, ["getFormCheck"]),
  },
  emits: ["onBubbleEvent", "onBubbleEventRangkuman", "setCookies"],
  watch: {
    step(val) {
      this.$emit("onBubbleEvent", val);
    },
  },
  methods: {
    ...mapActions(useTourOrderDetailStore, ["onCheckoutVerify", "onCheckout"]),
    onBubbleEventRangkuman() {
      this.$emit("onBubbleEventRangkuman");
    },
    async gotoSubmit() {
      await this.onCheckoutVerify();
      const resp = await this.onCheckout();
      return;
      if (!resp) return;
      const cookies_name =
        "TOUR-" + this.$route.params?.slug + "-" + this.$route.params?.slug_text; //window.location.href

      if (!this.$q.cookies.has(cookies_name)) return;
      this.$q.cookies.remove(cookies_name);
    },
  },
};
</script>

<style>
@media only screen and (max-width: 425px) {
  #StepperOrder .q-stepper__step-inner {
    /* padding: 14px; */
  }
}
</style>
