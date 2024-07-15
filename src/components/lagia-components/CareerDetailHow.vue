<template>
  <q-card flat bordered :ratio="1" style="height: 350px" class="rounded-borders-2">
    <q-card-actions class="bg-grey-4" align="center">
      <q-chip
        dense
        color="white"
        size="18px"
        class="rounded-borders-4 q-pa-lg q-my-sm"
        label="ETALASE VENDOR"
      ></q-chip>
    </q-card-actions>
    <q-separator></q-separator>
    <div class="bg-transparent">
      <q-list separator>
        <template v-for="i in etalase">
          <q-item :to="i?.route" dense style="min-height: 42px" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="chevron_right" />
            </q-item-section>
            <q-item-section lines="1">{{ i?.label }}</q-item-section>
          </q-item>
        </template>
      </q-list>
    </div>
  </q-card>
</template>

<script setup>
import { ref, defineProps } from "vue";
const { item } = defineProps(["item"]);
const etalase = [
  {
    label: "Rental",
    route: "/transport/rental-list",
  },
  {
    label: "Hotel",
    route: "/lodge/profile-list",
  },
  {
    label: "Kuliner",
    route: "/culinary/store-list",
  },
  {
    label: "Souvenir",
    route: "/souvenir/store-list",
  },
  {
    label: "Wisata",
    route: "/tourism/profile-list",
  },
  {
    label: "Talent",
    route: "/talent/profile-list",
  },
];
</script>
