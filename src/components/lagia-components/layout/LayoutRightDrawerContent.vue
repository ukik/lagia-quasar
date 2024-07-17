<template>
  <q-card flat id="RightDrawerContent">
    <q-card-actions align="center" class="q-mt-lg">
      <!-- <h3 class="full-width text-center q-mt-xl">CALL TO ACTION</h3> -->
      <q-avatar size="100px" class="q-mt-md q-mb-sm">
        <q-img :src="footer_about?.logo" :error-src="$defaultErrorImage"></q-img>
      </q-avatar>
    </q-card-actions>
    <q-card-section class="text-center">
      <!-- <div class="name-title">
        <h4>James Watson</h4>
      </div> -->
      <q-item-label class="text-body" v-html="footer_about?.tagline"> </q-item-label>
    </q-card-section>

    <q-card-actions class="q-pa-none" align="center">
      <q-btn
        target="_blank"
        :href="footer_contact?.instagram"
        icon="fa-brands fa-instagram"
        rounded
        color="primary"
        unelevated
        :dense="false"
        class="q-mr-xs"
      >
        <!-- <font-awesome :icon="['fab', 'fa-instagram']" /> -->
      </q-btn>
      <q-btn
        target="_blank"
        :href="footer_contact?.whatsapp"
        icon="fa-brands fa-whatsapp"
        rounded
        color="primary"
        unelevated
        :dense="false"
        class="q-mr-xs"
      >
        <!-- <font-awesome :icon="['fab', 'fa-whatsapp']" /> -->
      </q-btn>
      <q-btn
        target="_blank"
        :href="footer_contact?.facebook"
        icon="fa-brands fa-facebook-f"
        rounded
        color="primary"
        unelevated
        :dense="false"
        class="q-mr-xs"
      >
        <!-- <font-awesome :icon="['fab', 'fa-facebook-f']" /> -->
      </q-btn>
      <q-btn
        target="_blank"
        :href="footer_contact?.twitter"
        icon="fa-brands fa-x-twitter"
        rounded
        color="primary"
        unelevated
        :dense="false"
        class="q-mr-xs"
      >
        <!-- <font-awesome :icon="['fab', 'fa-x-twitter']" /> -->
      </q-btn>
      <q-btn
        target="_blank"
        :href="footer_contact?.tiktok"
        icon="fa-brands fa-tiktok"
        rounded
        color="primary"
        unelevated
        :dense="false"
      >
        <!-- <font-awesome :icon="['fab', 'fa-tiktok']" /> -->
      </q-btn>
    </q-card-actions>

    <q-card-actions align="center" class="q-mt-lg q-mb-md">
      <h3 class="full-width text-center">CONTACT US</h3>
      <q-item-label class="text-body q-px-lg text-center">
        Silahkan hubungi kami
        <!-- Jangan ragu untuk menghubungi kami! !! -->
      </q-item-label>
    </q-card-actions>

    <q-list bordered separator>
      <q-item :href="'mailto:' + footer_contact?.grid1Value" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="blue" text-color="white" icon="phone" />
        </q-item-section>

        <q-item-section
          ><q-item-label lines="1">{{
            footer_contact?.grid1Value
          }}</q-item-label></q-item-section
        >
      </q-item>
      <q-item :href="'tel:' + footer_contact?.grid2Value" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="blue" text-color="white" icon="email" />
        </q-item-section>

        <q-item-section
          ><q-item-label lines="1">{{
            footer_contact?.grid2Value
          }}</q-item-label></q-item-section
        >
      </q-item>
      <q-item @click="$onMap(footer_contact?.map)" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="blue" text-color="white" icon="location_on" />
        </q-item-section>

        <q-item-section
          ><q-item-label>{{ footer_contact?.grid3Value }}</q-item-label></q-item-section
        >
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useInitStore } from "stores/lagia-stores/page/InitStore";

const initStore = useInitStore();
const { footer_contact, footer_about } = storeToRefs(initStore); // have all reactive states here
</script>

<style scoped>
h3 {
  color: #3a78c9;
  font-size: 16px;
  font-weight: 500;
}

h4 {
  font-size: 18px;
  font-weight: 600;
}
</style>

<style>
#RightDrawerContent .q-item__label {
  line-height: 1.6 !important;
  /* margin: 0 0 15px; */
  word-wrap: break-word;
}
</style>
