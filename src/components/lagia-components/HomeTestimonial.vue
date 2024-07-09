<template>
  <div class="call-action-box bg-color-callback row justify-center">
    <div class="col-xl-6 col-lg-8 col-md-11 col-sm-12 col-12 text-center q-px-md">
      <h6 class="text-blue">CLIENT'S REVIEWS</h6>
      <h2>TRAVELLER'S TESTIMONIAL</h2>
      <p>
        Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
        Vestibulum cumque laudantium. Sit ornare mollitia tenetur, aptent.
      </p>
    </div>
  </div>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div class="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12">
      <!-- <div class="col"> -->
      <Carousel
        v-bind="settings"
        :breakpoints="breakpoints"
        :autoplay="3500"
        :wrap-around="true"
      >
        <Slide v-for="(item, index) in records" :key="index">
          <!-- <q-img :ratio="1" src="assets/images/img4.jpg" alt="" class="rounded-borders-2" /> -->
          <q-card flat bordered class="text-left rounded-borders-2 q-pa-md">
            <q-card-actions>
              <q-rating
                flat
                readonly
                v-model="item.rating"
                size="sm"
                :max="5"
                color="primary"
              ></q-rating>
            </q-card-actions>
            <q-card-actions>
              <q-item-label
                :style="$q.screen.width > 768 ? 'height:72px;' : 'height:auto;'"
                :lines="$q.screen.width > 768 ? 3 : 100"
                >{{ item?.description }}</q-item-label
              >
            </q-card-actions>
            <q-item>
              <q-item-section avatar>
                <q-avatar size="60px">
                  <q-img :src="item?.avatar" :error-src="$defaultUser" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">{{ item?.name }}</q-item-label>
                <q-item-label caption class="text-primary" lines="1">{{
                  item?.institusi
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </Slide>

        <template #addons> <Navigation /> <Pagination /> </template>
      </Carousel>
      <!-- </div> -->
    </div>
  </div>

  <div class="text-center full-width">
    <q-btn
      icon="face"
      size="18px"
      style="height: 50px"
      unelevated
      rounded
      class="rounded-borders-4"
      color="primary"
      label="VIEW ALL REVIEWS"
    />
  </div>
</template>

<script>
import { ref, defineProps } from "vue";
// import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: "Breakpoints",
  props: ["records"],
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: "start",
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      375: {
        itemsToShow: 1,
        snapAlign: "start",
      },
      425: {
        itemsToShow: 1,
        snapAlign: "start",
      },
      768: {
        itemsToShow: 2,
        snapAlign: "start",
      },
      1440: {
        itemsToShow: 3,
        snapAlign: "start",
      },
      1440: {
        itemsToShow: 3,
        snapAlign: "start",
      },
      2560: {
        itemsToShow: 3,
        snapAlign: "start",
      },
    },
  }),
  methods: {
    getSlideCount() {
      if (!this.records) return 0;
      return Math.ceil(this.records.length / 3);
    },
  },
};
</script>

<script setup>
const rating = ref(4);
</script>

<style scoped>
.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}

.card-box {
  min-height: 450px;
}

.text-box h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0px;
}

.call-action-box p {
  font-size: medium;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

.q-item__label {
  line-height: 1.6 !important;
}

.bg-color-callback {
  padding-top: 85px;
  padding-bottom: 50px;
}
.bg-light-grey {
  background-color: #f8f8f8;
}
</style>

<style scoped>
.carousel__slide {
  padding: 10px;
}
</style>
