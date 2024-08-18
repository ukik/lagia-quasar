<template>
  <div>
    <q-btn
      label="Reset"
      push
      color="white"
      text-color="primary"
      @click="reset"
      class="q-mb-md"
    />

    <q-stepper
      id="StepperOrder"
      flat
      bordered
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      done-color="pink"
      active-color="deep-orange"
      inactive-color="secondary"
      animated
    >
      <q-step
        :name="1"
        title="Vendor"
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
          "
        />

        <slot name="step1"></slot>

        <NavButton
          class="q-pb-none"
          @onBubbleEvent="
            done1 = true;
            step = 2;
          "
        />
      </q-step>

      <q-step
        :name="2"
        title="Produk"
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
          "
          @onBubbleEventBack="step = 1"
        >
        </NavBackButton>

        <slot name="step2"></slot>

        <NavBackButton
          class="q-pb-none"
          @onBubbleEvent="
            done2 = true;
            step = 3;
          "
          @onBubbleEventBack="step = 1"
        >
        </NavBackButton>
      </q-step>

      <q-step
        :name="3"
        title="Biaya"
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
          "
          @onBubbleEventBack="step = 2"
        >
        </NavBackButton>

        <slot name="step3"></slot>

        <NavBackButton
          class="q-pb-none"
          @onBubbleEvent="
            done3 = true;
            step = 4;
          "
          @onBubbleEventBack="step = 2"
        >
        </NavBackButton>
      </q-step>

      <q-step
        :name="4"
        title="Pelanggan"
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
          "
          @onBubbleEventBack="step = 3"
        >
        </NavBackButton>

        <slot name="step4"></slot>

        <NavBackButton
          class="q-pb-none"
          @onBubbleEvent="
            done4 = true;
            step = 5;
          "
          @onBubbleEventBack="step = 3"
        >
        </NavBackButton>


      </q-step>



      <q-step
        :name="5"
        title="Tanggal"
        icon="add_comment"
        prefix="5"
        :done="step > 5"
        :header-nav="step > 5"
      >
      <NavBackButton
          class="q-pt-none q-pb-lg"
          @onBubbleEvent="
            done5 = true;
            step = 6;
          "
          @onBubbleEventBack="step = 4"
        >
        </NavBackButton>

        <slot name="step5"></slot>

        <NavBackButton
          class="q-pb-none"
          @onBubbleEvent="
            done5 = true;
            step = 6;
          "
          @onBubbleEventBack="step = 4"
        >
        </NavBackButton>


      </q-step>



      <q-step
        :name="6"
        title="Rangkuman"
        icon="add_comment"
        prefix="6"
        :done="step > 6"
        :header-nav="step > 6"
      >
      <NavBackButton
          class="q-pt-none q-pb-lg"
          @onBubbleEvent="
            done6 = true;
            step = 7;
          "
          @onBubbleEventBack="step = 5"
        >
        </NavBackButton>

        <slot name="step6"></slot>

        <NavBackButton
          class="q-pb-none"
          @onBubbleEvent="
          done6 = true;
            step = 7;
          "
          @onBubbleEventBack="step = 5"
        >
        </NavBackButton>


      </q-step>


      <!-- <q-step
        :name="5"
        title="Biaya"
        icon="add_comment"
        prefix="5"
        :done="step > 5"
        :header-nav="step > 5"
      >
        <slot name="step4"></slot>

        <q-stepper-navigation>
          <q-btn color="primary" @click="done3 = true" label="Finish" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step> -->
    </q-stepper>
  </div>
</template>

<script>
import { ref } from "vue";

import NavButton from "./NavButton.vue";
import NavBackButton from "./NavBackButton.vue";

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
  emits:['onBubbleEvent'],
  watch: {
    step(val) {
      this.$emit('onBubbleEvent', val)
    }
  }
};
</script>

<style>
@media only screen and (max-width: 425px) {
  #StepperOrder .q-stepper__step-inner {
    padding: 14px;
  }
}
</style>
