<template>
  <!-- Call To Action -->
  <div class="call-action-box bg-color-callback bg-form text-white row justify-center">
    <div class="col-xl-6 col-lg-8 col-md-11 col-sm-12 col-12 text-center q-px-md">
      <h5 class="text-white">{{ records?.title }}</h5>
      <h2 class="q-pa-lg text-white">{{ records?.headline }}</h2>
      <p>
        {{ records?.subtitle }}
      </p>
      <div class="q-mt-xl">
        <q-btn
          text-color="primary"
          icon="phone"
          dense
          unelevated
          rounded
          class="q-py-md q-px-lg q-ma-sm rounded-borders-4"
          color="white"
          label="Contact Us!"
        />
        <q-btn
          icon-right="chevron_right"
          dense
          unelevated
          rounded
          outline
          class="q-py-md q-px-lg q-ma-sm rounded-borders-4"
          color="white"
          label="Learn More"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["records"],
};
</script>

<style scoped>
.call-action-box p {
  font-size: medium;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

.q-item__label {
  line-height: 1.6 !important;
}

.bg-color-callback {
  padding-top: 85px;
  padding-bottom: 85px;
}
</style>
