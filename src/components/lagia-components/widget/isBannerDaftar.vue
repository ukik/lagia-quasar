<template>
  <q-banner
    inline-actions
    v-if="!route_meta?.logged && getIsLogin"
    rounded
    class="bg-blue-7 text-white q-mb-lg"
  >
    Ayo jadi sahabat LAGIA, explore opportunity with us
    <template v-slot:action>
      <q-btn flat icon="login" label="login" :to="{
        name: '/login'
      }" />
    </template>
  </q-banner>
</template>
