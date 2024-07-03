<template>
  <q-no-ssr>
    <q-dialog v-model="dialog_value">
      <q-card style="min-width: 400px">
        <q-toolbar>
          <!-- <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
            </q-avatar> -->

          <q-toolbar-title
            ><span class="text-capitalize">{{
              dialog_payload?.label
            }}</span></q-toolbar-title
          >

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-separator></q-separator>

        <q-card-section>
          {{ dialog_payload?.value }}
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-no-ssr>
</template>

<script>
export default {
  data() {
    return {
      dialog_value: false,
      dialog_payload: null,
    };
  },
  methods: {
    onOpen(val) {
      this.dialog_value = val?.dialog_value;
      this.dialog_payload = val?.dialog_payload;
    },
  },
};
</script>
