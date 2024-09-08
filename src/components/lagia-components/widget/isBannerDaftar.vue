<template>
  <!-- v-if="!route_meta?.logged && !getIsLogin" -->
  <q-banner v-if="!getIsLogin"
    inline-actions

    class="bg-blue-7 text-white q-mb-lg"
  >
    Login sekarang, ayo jadi sahabat LAGIA, explore opportunity with us
    <template v-if="route_name !== '/login'" v-slot:action>
      <q-btn flat icon="login" label="login" :to="{
        name: '/login'
      }" />
    </template>
  </q-banner>
</template>
