<template>

  <div class="">



    <h3 class="q-mb-xs">{{ record?.name }}</h3>
    <div class="text-caption q-mb-md">Dibuat: {{ record?.createdAt }}</div>

    <q-rating
      v-if="record?.travelRatingAvg?.avgRating"
      readonly
      v-model="record.travelRatingAvg.avgRating"
      size="sm"
      :max="5"
      color="red"
    ></q-rating>

    <q-rating
      v-else
      readonly
      v-model="ratingZero"
      size="sm"
      :max="5"
      color="grey"
    ></q-rating>

    <q-item class="rounded-borders-1 bg-grey-2 q-mt-lg" clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img v-if="record?.badasoUser?.avatar" :src="record?.badasoUser?.avatar">
          <img v-else src="http://localhost:8000/storage/photos/shares/default-user.png">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-bold" lines="1">{{
          record?.badasoUser?.name
        }}</q-item-label>
        <q-item-label caption lines="2">
          <!-- <span class="text-weight-bold">Janet</span> -->
          {{ record?.badasoUser?.username }}
          <span v-if="$q.screen.width < 768">({{ record?.badasoUser?.createdAt }})</span>
        </q-item-label>
      </q-item-section>

      <q-item-section v-if="$q.screen.width > 425" class="text-caption" side top>{{
        record?.badasoUser?.createdAt
      }}</q-item-section>
    </q-item>

    <RentalImageSlideCarousel
      class="rounded-borders-2"
      :_gallery="record?.image"
    ></RentalImageSlideCarousel>

    <div class="col-12 q-my-md" v-if="record?.category">
      <template v-for="(category, category_index) in record?.category?.split(',')">
        <q-chip color="blue-5" text-color="white" icon="label" class="text-capitalize">{{
          category
        }}</q-chip>
      </template>
    </div>

    <q-list class="rounded-borders-1 bg-grey-2 row col flex items-start text-capitalize">
      <q-item class="col-12">
        <q-item-section>
          <q-item-label lines="1">location</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1"
            ><a href="#">{{ record?.location }}</a></q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item class="col-12">
        <q-item-section>
          <q-item-label lines="1">address</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.address }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list
      class="q-mt-lg rounded-borders-1 bg-grey-2 row col flex items-start text-capitalize"
    >
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">uuid</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.uuid }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">codepos</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.codepos }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">city</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.city }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">country</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.country }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">telepon</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.phone }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">email</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.email }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <h6 class="q-mt-lg q-mb-sm">POLICY</h6>
    <div v-html="record?.policy"></div>

    <h6 class="q-mt-lg q-mb-sm">DESCRIPTION</h6>
    <div v-html="record?.description"></div>



  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import RentalImageSlideCarousel from "./RentalImageSlideCarousel";

const ratingZero = 0
</script>
<script>
export default {
  props: ["record"],
};
</script>

<style scoped>
h2 {
  font-size: 40px;
  font-weight: 800;
}

/* p {
  line-height: 1.6;
  margin: 0 0 15px;
  word-wrap: break-word;
} */

h3 {
  font-size: 22px;
  font-weight: 700;
}
</style>
