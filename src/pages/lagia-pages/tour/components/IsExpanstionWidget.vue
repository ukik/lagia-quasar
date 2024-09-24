<template>
  <q-expansion-item default-opened
    dense
    :header-class="show ? 'bg-grey-2' : 'bg-white'"
    @show="show = true"
    @hide="show = false"
  >
    <template v-slot:header>
      <q-item-section class="q-py-sm"> Detail </q-item-section>
    </template>

    <q-separator></q-separator>

    <slot name="content"></slot>
  </q-expansion-item>
</template>

<script>
export default {
  // props: ["item"],
  data() {
    return {
      show: true,
    }
  }
};
</script>
