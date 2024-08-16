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
      <q-step :name="1" title="Vendor" icon="settings" prefix="1" :done="step > 1">
        <!-- For each ad campaign that you create, you can control how much you're willing to
        spend on clicks and conversions, which networks and geographical locations you want
        your ads to show on, and more. -->
        <slot name="step1"></slot>

        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                done1 = true;
                step = 2;
              }
            "
            color="primary"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Produk"
        caption=""
        prefix="2"
        icon="create_new_folder"
        :done="step > 2"
      >
        <!-- An ad group contains one or more ads which target a shared set of keywords. -->
        <slot name="step2"></slot>

        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                done2 = true;
                step = 3;
              }
            "
            color="primary"
            label="Continue"
          />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Biaya" icon="add_comment" prefix="3" :done="step > 3">
        <!-- Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues. -->

        <slot name="step3"></slot>

        <q-stepper-navigation>
          <q-btn color="primary" @click="done3 = true" label="Finish" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const step = ref(1);
    const done1 = ref(false);
    const done2 = ref(false);
    const done3 = ref(false);

    return {
      step,
      done1,
      done2,
      done3,

      reset() {
        done1.value = false;
        done2.value = false;
        done3.value = false;
        step.value = 1;
      },
    };
  },
};
</script>

<style>
@media only screen and (max-width: 425px) {
  #StepperOrder .q-stepper__step-inner {
    padding: 14px;
  }
}
</style>
