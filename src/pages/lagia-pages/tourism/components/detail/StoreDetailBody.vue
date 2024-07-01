<template>
  <!-- DESCRIPTION -->
  <isModalDescription ref="isModal"></isModalDescription>

  <div class="">
    <h3 class="q-mb-xs">{{ record?.name }}</h3>
    <div class="text-caption q-mb-md">Dibuat: {{ record?.createdAt }}</div>

    <q-rating
      v-if="record?.ratingAvg?.avgRating"
      readonly
      v-model="record.ratingAvg.avgRating"
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
          <img v-if="record?.badasoUser?.avatar" :src="record?.badasoUser?.avatar" />
          <img
            v-else
            src="http://localhost:8000/storage/photos/shares/default-user.png"
          />
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

    <isImageSlideCarousel
      height="400px"
      class="rounded-borders-2 q-mt-lg"
      :_gallery="record?.image"
    ></isImageSlideCarousel>

    <div class="col-12 q-my-md" v-if="record?.category">
      <template v-for="(category, category_index) in getSplit(record?.category)">
        <q-chip color="blue-5" text-color="white" icon="label" class="text-capitalize">{{
          category
        }}</q-chip>
      </template>
    </div>

    <q-list
      padding
      class="q-mt-lg rounded-borders-1 bg-grey-2 row col flex items-start text-capitalize"
    >
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="id"
        :value="record?.id"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="uuid"
        :value="record?.uuid"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="dayOpen"
        :value="record?.dayOpen"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="dayClose"
        :value="record?.dayClose"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="timeOpen"
        :value="record?.timeOpen"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="timeClose"
        :value="record?.timeClose"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="name"
        :value="record?.name"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="email"
        :value="record?.email"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="phone"
        :value="record?.phone"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="codepos"
        :value="record?.codepos"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="city"
        :value="record?.city"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="country"
        :value="record?.country"
      ></isQItemLabelSimpleValue>
    </q-list>
    <q-list
      padding
      class="q-mt-lg rounded-borders-1 bg-grey-2 row col flex items-start text-capitalize"
    >
      <isQItemLabelSimpleValue
        :dense="false"
        @onBubbleEvent="
          $refs.isModal.onOpen({
            dialog_value: true,
            dialog_payload: { value: record?.address, label: 'address' },
          })
        "
        :clickable="true"
        label="address"
        value="Detail"
        textcolor="text-primary"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        @onBubbleEvent="
          $refs.isModal.onOpen({
            dialog_value: true,
            dialog_payload: { value: record?.location, label: 'location' },
          })
        "
        :clickable="true"
        label="location"
        value="Detail"
        textcolor="text-primary"
      ></isQItemLabelSimpleValue>
      <!-- <isQItemLabelSimpleValue
        :dense="false"
        @onBubbleEvent="
          $refs.isModal.onOpen({
            dialog_value: true,
            dialog_payload: { value: record?.policy, label: 'policy' },
          })
        "
        :clickable="true"
        label="policy"
        value="Detail"
        textcolor="text-primary"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        @onBubbleEvent="
          $refs.isModal.onOpen({
            dialog_value: true,
            dialog_payload: { value: record?.description, label: 'description' },
          })
        "
        :clickable="true"
        label="description"
        value="Detail"
        textcolor="text-primary"
      ></isQItemLabelSimpleValue> -->
    </q-list>

    <h6 class="q-mt-lg q-mb-sm">POLICY</h6>
    <div v-html="record?.policy"></div>

    <h6 class="q-mt-lg q-mb-sm">DESCRIPTION</h6>
    <div v-html="record?.description"></div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
// import StoreDetailRelatedImageSlideCarousel from "./StoreDetailRelatedImageSlideCarousel";

const ratingZero = 0;

function getSplit(item) {
  if (!item) return [];
  try {
    return JSON.parse(item);
  } catch (error) {
    return [];
  }
}
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
