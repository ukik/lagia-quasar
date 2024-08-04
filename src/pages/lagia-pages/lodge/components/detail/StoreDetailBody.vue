<template>
  <!-- DESCRIPTION -->
  <isModalDescription ref="isModal"></isModalDescription>

  <div class="" id="LodgeStoreDetailBody">
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
          <img v-else :src="$defaultUser" />
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
      :thumbnails="true"
      height="500px"
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
        label="name"
        :value="record?.name"
      ></isQItemLabelSimpleValue>

      <isQItemLabelSimpleValue
        v-if="record?.email"
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="email"
        :value="record?.email"
      ></isQItemLabelSimpleValue>

      <isQItemLabelSimpleValue
        v-if="record?.phone"
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
        label="rating"
        :value="record?.rating"
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
        label="provinsi"
        :value="record?.province"
      ></isQItemLabelSimpleValue>

      <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="country"
        :value="record?.country"
      ></isQItemLabelSimpleValue>

      <!-- <isQItemLabelSimpleValue
        :dense="false"
        col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
        label="rooms"
        :value="record?.rooms"
      ></isQItemLabelSimpleValue> -->
    </q-list>

    <q-list bordered class="q-mt-lg rounded-borders-1 bg-white text-capitalize">
      <q-card-section class="q-pa-none" :horizontal="$q.screen.width > 425">
        <isQItemLabelSimpleValue
          :dense="false"
          col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
          label="checkinTime"
          :value="record?.checkinTime"
        ></isQItemLabelSimpleValue>
        <q-separator vertical></q-separator>
        <isQItemLabelSimpleValue
          :dense="false"
          col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
          label="checkoutTime"
          :value="record?.checkoutTime"
        ></isQItemLabelSimpleValue>
      </q-card-section>
    </q-list>

    <q-list bordered class="q-mt-lg rounded-borders-1 bg-white text-capitalize">
      <isQItemLabelSimpleValue
        v-if="$q.screen.width > 1024"
        :dense="false"
        col="col-12"
        label="Address"
        :value="record?.address"
      ></isQItemLabelSimpleValue>
      <q-item v-else>
        <q-item-section>
          <q-item-label class="text-capitalize text-bold">Address</q-item-label>
          <q-item-label>{{ record?.address }} </q-item-label>
        </q-item-section>
      </q-item>

      <isQItemLabelSimpleValue
        v-if="$q.screen.width > 1024"
        :dense="false"
        col="col-12"
        label="types"
        :value="record?.types"
      ></isQItemLabelSimpleValue>
      <q-item v-else>
        <q-item-section>
          <q-item-label class="text-capitalize text-bold">types</q-item-label>
          <q-item-label>{{ record?.types }} </q-item-label>
        </q-item-section>
      </q-item>

      <isQItemLabelSimpleValue
        v-if="$q.screen.width > 1024"
        :dense="false"
        col="col-12"
        label="services"
        :value="record?.services"
      ></isQItemLabelSimpleValue>
      <q-item v-else>
        <q-item-section>
          <q-item-label class="text-capitalize text-bold">services</q-item-label>
          <q-item-label>{{ record?.services }} </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list
      padding
      class="q-mt-lg rounded-borders-1 bg-grey-2 row col flex items-start text-capitalize"
    >
      <isQItemLabelSimpleValue
        :dense="false"
        label="shuttleToAirportPrice"
        :value="$currency(record?.shuttleToAirportPrice)"
      ></isQItemLabelSimpleValue>

      <isQItemLabelSimpleValue
        :dense="false"
        label="additionalBreakfastPrice"
        :value="$currency(record?.additionalBreakfastPrice)"
      ></isQItemLabelSimpleValue>

      <isQItemLabelSimpleValue
        :dense="false"
        label="lateCheckoutPrice"
        :value="$currency(record?.lateCheckoutPrice)"
      ></isQItemLabelSimpleValue>
    </q-list>

    <q-list
      v-if="false"
      padding
      class="q-mt-lg rounded-borders-1 bg-grey-2 row col flex items-start text-capitalize"
    >
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

      <isQItemLabelSimpleValue
        :dense="false"
        @onBubbleEvent="
          $refs.isModal.onOpen({
            dialog_value: true,
            dialog_payload: { value: record?.types, label: 'types' },
          })
        "
        :clickable="true"
        label="types"
        value="Detail"
        textcolor="text-primary"
      ></isQItemLabelSimpleValue>
      <isQItemLabelSimpleValue
        :dense="false"
        @onBubbleEvent="
          $refs.isModal.onOpen({
            dialog_value: true,
            dialog_payload: { value: record?.services, label: 'services' },
          })
        "
        :clickable="true"
        label="services"
        value="Detail"
        textcolor="text-primary"
      ></isQItemLabelSimpleValue>
    </q-list>

    <!-- <h6 class="q-mt-lg q-mb-sm">LOKASI</h6> -->
    <q-card class="q-mt-lg" id="LodgeStoreDetailBody_LOCATION" flat bordered>
      <q-card-actions align="left">
        <h6 class="">LOKASI</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section>
        <div v-html="record?.location"></div>
      </q-card-section>
    </q-card>

    <!-- <h6 class="q-mt-lg q-mb-sm">POLICY</h6> -->
    <q-card class="q-mt-lg" id="LodgeStoreDetailBody_POLICY" flat bordered>
      <q-card-actions align="left">
        <h6 class="">POLICY</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section>
        <div v-html="record?.policy"></div>
      </q-card-section>
    </q-card>

    <!-- <h6 class="q-mt-lg q-mb-sm">POLICY TAMBAHAN</h6> -->
    <q-card class="q-mt-lg" id="LodgeStoreDetailBody_ADDITIONAL_POLICY" flat bordered>
      <q-card-actions align="left">
        <h6 class="">POLICY TAMBAHAN</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section>
        <div v-html="record?.additionalPolicy"></div>
      </q-card-section>
    </q-card>

    <!-- <h6 class="q-mt-lg q-mb-sm">DESCRIPTION</h6> -->
    <q-card class="q-mt-lg" id="LodgeStoreDetailBody_DESCRIPTION" flat bordered>
      <q-card-actions align="left">
        <h6 class="">DESCRIPTION</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section>
        <div v-html="record?.description"></div>
      </q-card-section>
    </q-card>

    <!-- <h6 class="q-mt-lg q-mb-sm">FACILITY</h6> -->
    <q-card class="q-mt-lg" id="LodgeStoreDetailBody_FACILITY" flat bordered>
      <q-card-actions align="left">
        <h6 class="">FACILITY</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section>
        <div v-html="record?.facility"></div>
      </q-card-section>
    </q-card>

    <!-- <h6 class="q-mt-lg q-mb-sm">PERTANYAAN</h6> -->
    <q-card class="q-mt-lg" id="LodgeStoreDetailBody_QUESTION" flat bordered>
      <q-card-actions align="left">
        <h6 class="">PERTANYAAN</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section>
        <div v-html="record?.faq"></div>
      </q-card-section>
    </q-card>

    <!-- <h6 class="q-mt-lg q-mb-sm">DISCLAIMER</h6> -->
    <q-card class="q-mt-lg" flat bordered id="LodgeStoreDetailBody_DISCLAIMER">
      <q-card-actions align="left">
        <h6 class="">DISCLAIMER</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section>
        <div v-html="record?.disclaimer"></div>
      </q-card-section>
    </q-card>
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
  mounted() {
    var el1 = document.querySelector("#LodgeStoreDetailBody_POLICY");
    el1.innerHTML = el1.innerHTML.replace(/&nbsp;/g, "");

    var el2 = document.querySelector("#LodgeStoreDetailBody_LOCATION");
    el2.innerHTML = el2.innerHTML.replace(/&nbsp;/g, "");
  },
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

<style lang="scss">
.css-4rbku5 h2 {
  // margin: 20px 0px !important;
}

.css-1dbjc4n {
  // padding: 0px !important;
}

#LodgeStoreDetailBody_LOCATION .css-1dbjc4n.r-13awgt0.r-16pcm1t {
  margin-top: 10px !important;
}

@media only screen and (max-width: 768px) {
  #LodgeStoreDetailBody_LOCATION .css-1dbjc4n.r-13awgt0.r-18u37iz.r-16pcm1t {
    display: block !important;
  }
}

.css-1dbjc4n h2,
#LodgeStoreDetailBody_DESCRIPTION h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
}

.css-1dbjc4n h3,
#LodgeStoreDetailBody_DESCRIPTION h3 {
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
}

.css-1dbjc4n h4,
#LodgeStoreDetailBody_DESCRIPTION h4 {
  display: block;
  margin-block-start: 1.33em;
  margin-block-end: 1.33em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
}

#LodgeStoreDetailBody_DISCLAIMER #section-seo-links {
  padding: 0px !important;
  padding-bottom: 20px !important;
}

#LodgeStoreDetailBody_DISCLAIMER div div {
  padding: 0px !important;
}

#LodgeStoreDetailBody_DISCLAIMER .css-1dbjc4n:last-child .css-901oao:last-child {
  padding: 10px !important;
}

#LodgeStoreDetailBody h6 {
  color: #223645;
  font-family: "Montserrat", sans-serif;
  margin: 10px;
}

#LodgeStoreDetailBody_QUESTION .r-13qz1uu {
  width: 100% !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important;
  // box-shadow: rgba(3, 18, 26, 0.2) 0px 1px 2px;
  box-shadow: rgba(3, 18, 26, 0.2) 0px 0px 0px !important;
}

#LodgeStoreDetailBody_QUESTION .r-14qw7yl {
  height: auto !important;
  padding-bottom: 10px !important;
}

#LodgeStoreDetailBody_POLICY div .r-9aw3ui:first-child {
  margin: 10px 0px 15px 0px !important;
}

#LodgeStoreDetailBody_FACILITY ul {
  list-style-type: circle !important;
}

#LodgeStoreDetailBody_FACILITY ul li::marker {
}

#LodgeStoreDetailBody_DISCLAIMER .r-1udbk01 {
  flex-grow: 1;
  // width: 33% !important;
  flex: 33% !important;
}

@media only screen and (max-width: 425px) {
  #LodgeStoreDetailBody_DISCLAIMER .r-1udbk01 {
    flex-grow: 1;
    // width: 33% !important;
    flex: 100% !important;
  }
}
</style>
