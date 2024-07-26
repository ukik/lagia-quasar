<template>
  <q-card-section class="q-pa-none">
    <q-btn-group spread unelevated>
      <q-btn
        square
        @click="
          $global.$emit('LagiaLayout', {
            label: 'konsultasi',
            slug: 'konsultasi',
            vendor: vendor,
            value: item,
            product: product,
          })
        "
        color="form"
        text-color="white"
        label="Tanyakan"
        icon="fa-brands fa-whatsapp"
      />
      <q-separator vertical></q-separator>
      <q-btn
        @click="
          $global.$emit('LagiaLayout', {
            label: 'addToCart',
            slug: slug,
            vendor: vendor,
            value: item,
            product: product,
          })
        "
        square
        color="form"
        text-color="white"
        label="Keranjang"
        icon="shopping_cart_checkout"
      />
    </q-btn-group>
  </q-card-section>
</template>

<script>
export default {
  props: ["item", "slug", "vendor", "product"],
};
</script>
