<template>
  <!-- Call To Action -->
  <q-carousel
    :height="$q.screen.width > 768 ? 'calc(100vh)' : 'calc(100vh - 50px)'"
    class="bg-dark"
    infinite
    swipeable
    animated
    transition-prev="slide-right"
    transition-next="slide-left"
    navigation
    arrows
    v-model="slide"
  >
    <template v-for="(item, index) in records">
      <q-carousel-slide
        :name="item?.id"
        :img-src="item?.image"
        :error-src="$defaultErrorImage"
      >
        <div class="absolute-full dimmed"></div>
        <div class="absolute-full dimmed"></div>
        <div class="absolute-full row flex-center">
          <div
            class="row flex flex-center text-center col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12"
          >
            <div class="comming-soon-content col-12 q-mt-xl text-white">
              <div class="text-h5">{{ item?.title }}</div>
              <h2 class="q-my-lg text-white">{{ item?.headline }}</h2>
              <q-item-label lines="3">
                <p>
                  {{ item?.subtitle }}
                </p>
              </q-item-label>
            </div>

            <div class="q-mt-xl col-12">
              <q-btn
                :href="$onCall()"
                icon="phone"
                dense
                unelevated
                rounded
                class="q-py-md q-px-lg q-ma-sm rounded-borders-4"
                color="primary"
                label="Contact Us!"
              />
              <q-btn
                icon-right="chevron_right"
                dense
                unelevated
                rounded
                outline
                class="q-py-md q-px-lg q-ma-sm rounded-borders-4"
                color="white"
                label="Learn More"
              />
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </template>
  </q-carousel>

  <!-- </main> -->
</template>

<script>
export default {
  props: ["records"],
  data() {
    return {
      slide: 1,
    };
  },
};
</script>

<style scoped>
.call-action-box p {
  font-size: medium;
}

h2 {
  /* font-size: 40px; */
  font-weight: 800;
}

.bg-color-callback {
  padding-top: 85px;
  padding-bottom: 85px;
}
.bg-light-grey {
  background-color: #f8f8f8;
}

.comming-soon-content {
  /* margin-top: 80px; */
  /* margin-bottom: 50px; */
  text-align: center;
}
.comming-soon-content h2 {
  font-size: 60px;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 30px;
}

@media screen and (max-width: 575px) {
  .comming-soon-content h2 {
    font-size: 30px;
  }
}
</style>
