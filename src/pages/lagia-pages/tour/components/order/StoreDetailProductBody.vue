<template>
  <!-- DESCRIPTION -->
  <isModalDescription ref="isModal"></isModalDescription>

  <div id="StoreDetailProductBody_TOUR" class="">
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

    <q-item v-if="false" class="rounded-borders-1 bg-grey-2 q-mt-lg" clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img
            v-if="record?.tourStore?.badasoUser?.avatar"
            :src="record?.tourStore?.badasoUser?.avatar"
          />
          <img v-else :src="$defaultUser" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-bold" lines="1">{{
          record?.tourStore?.badasoUser?.name
        }}</q-item-label>
        <q-item-label caption lines="2">
          {{ record?.tourStore?.badasoUser?.username }}
          <span v-if="$q.screen.width < 768"
            >({{ record?.tourStore?.badasoUser?.createdAt }})</span
          >
        </q-item-label>
      </q-item-section>

      <q-item-section v-if="$q.screen.width > 425" class="text-caption" side top>{{
        record?.tourStore?.badasoUser?.createdAt
      }}</q-item-section>
    </q-item>

    <isImageSlideCarousel
      :height="height"
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

    <q-card class="q-mt-lg" flat bordered>
      <q-card-actions align="left">
        <h6 class="">INFO</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section class="q-pa-none bg-grey-1 row">
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
          col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 text-capitalize"
          label="Durasi"
          :value="record?.durasi"
        ></isQItemLabelSimpleValue>
        <isQItemLabelSimpleValue
          :dense="false"
          col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 text-capitalize"
          label="Kategori"
          :value="record?.category"
        ></isQItemLabelSimpleValue>
        <isQItemLabelSimpleValue
          :dense="false"
          col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 text-capitalize"
          label="Adventure Level"
          :value="record?.level"
        >
          <template v-slot:right>
            <q-item-section class="q-px-none text-right">
              <q-item-label lines="1">
                <q-rating
                  flat
                  v-if="record?.level"
                  readonly
                  v-model="record.level"
                  size="sm"
                  :max="5"
                  color="red"
                ></q-rating>

                <q-rating
                  v-else
                  flat
                  readonly
                  v-model="ratingZero"
                  size="sm"
                  :max="5"
                  color="grey"
                ></q-rating>
              </q-item-label>
            </q-item-section>
          </template>
        </isQItemLabelSimpleValue>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-lg" flat bordered>
      <q-card-actions align="left">
        <h6 class="">DESTINASI</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section class="q-pa-none bg-grey-1 row">
        <q-item class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 text-capitalize">
          <q-item-section>
            <q-item-label caption>Kota</q-item-label>
            <q-item-label v-if="record?.city">{{ record?.city }}</q-item-label>
            <q-item-label v-else>___</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 text-capitalize">
          <q-item-section>
            <q-item-label caption>Provinsi</q-item-label>
            <q-item-label v-if="record?.province">{{ record?.province }}</q-item-label>
            <q-item-label v-else>___</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 text-capitalize">
          <q-item-section>
            <q-item-label caption>Negara</q-item-label>
            <q-item-label v-if="record?.country">{{ record?.country }}</q-item-label>
            <q-item-label v-else>___</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <isQItemLabelSimpleValue
          :dense="false"
          col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 text-capitalize"
          label="Kota"
          :value="record?.city"
        ></isQItemLabelSimpleValue>
        <isQItemLabelSimpleValue
          :dense="false"
          col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 text-capitalize"
          label="Provinsi"
          :value="record?.province"
        ></isQItemLabelSimpleValue>
        <isQItemLabelSimpleValue
          :dense="false"
          col="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 text-capitalize"
          label="Negara"
          :value="record?.country"
        ></isQItemLabelSimpleValue> -->
      </q-card-section>
    </q-card>

    <q-tabs
      v-model="tab"
      inline-label
      :breakpoint="0"
      align="justify"
      class="bg-primary text-grey-3 q-mt-lg"
      indicator-color=""
      active-color="white"
    >
      <q-tab name="DESCRIPTION" label="DESCRIPTION" />
      <q-tab name="ITINERARY" label="ITINERARY" />
      <q-tab name="FACILITY" label="FACILITY" />
    </q-tabs>

    <q-card
      v-show="tab == 'DESCRIPTION'"
      id="LodgeStoreDetailBody_DESCRIPTION"
      flat
      bordered
    >
      <q-card-actions align="left">
        <h6 class="">DESCRIPTION</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section>
        <div v-html="record?.description"></div>
      </q-card-section>
    </q-card>

    <q-card v-show="tab == 'ITINERARY'" id="LodgeStoreDetailBody_ITINERARY" flat bordered>
      <q-card-actions align="left">
        <h6 class="">ITINERARY</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section>
        <div v-html="record?.itinerary"></div>
      </q-card-section>
    </q-card>

    <q-card v-show="tab == 'FACILITY'" id="LodgeStoreDetailBody_FACILITY" flat bordered>
      <q-card-actions align="left">
        <h6 class="">FACILITY</h6>
      </q-card-actions>
      <q-separator></q-separator>
      <q-card-section>
        <div v-html="record?.facility"></div>
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
  props: ["record", "_height"],
  data() {
    return {
      height: null,
      tab: "DESCRIPTION",
    };
  },
  watch: {
    "$q.screen.width": function (val) {
      this.getCarousel();
    },
  },
  mounted() {
    this.getCarousel();
  },
  methods: {
    getCarousel() {
      if (!this._height) {
        this.height = this.$q.screen.width > 425 ? "500px" : "350px";
        return;
      }
      this.height = this._height;
    },
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

h6 {
  margin: 10px;
}

h3 {
  font-size: 22px;
  font-weight: 700;
}
</style>

<style>
#StoreDetailProductBody_TOUR ul {
  list-style-type: circle !important;
}
</style>
