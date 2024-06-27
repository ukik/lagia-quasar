<template>
  <q-item v-if="false" class="col-12" dense>
    <q-item-section>
      <q-item-label>Available</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label lines="1"
        ><q-chip
          class="q-mx-none"
          :color="getText ? 'positive' : 'negative'"
          text-color="white"
          >{{ getText ? "Ada" : "Tidak Ada" }}</q-chip
        ></q-item-label
      >
    </q-item-section>
  </q-item>
</template>

<
<script>
export default {
  props: ["item"],
  computed: {
    getText() {
      switch (this.item) {
        case 1:
        case "1":
        case "true":
        case true:
          return true;
        case null:
        case "":
        case 0:
        case "0":
        case "false":
        case false:
          return false;
      }
    },
  },
};
</script>
