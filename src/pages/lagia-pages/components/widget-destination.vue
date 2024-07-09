<template>
  <div class="call-action-box bg-color-callback row justify-center">
    <div class="col-xl-6 col-lg-8 col-md-11 col-sm-12 col-12 text-center q-px-md">
      <h6 class="text-blue">UNCOVER PLACE</h6>
      <h2>POPULAR DESTINATION</h2>
      <p>
        Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
        Vestibulum cumque laudantium. Sit ornare mollitia tenetur, aptent.
      </p>
    </div>
  </div>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div
        v-for="(item, index) in records"
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
      >
        <q-card flat class="rounded-borders-2">
          <q-img
            loading="lazy"
            :ratio="16 / 9"
            class="card-box"
            :src="item?.image[0]"
            :error-src="$defaultErrorImage"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center text-white">
                Cannot load image
              </div>
            </template>

            <div class="absolute-full bg-transparent flex justify-center items-end">
              <q-card
                flat
                class="text-box text-left text-dark q-mt-lg full-width rounded-borders-2"
              >
                <q-card-section>
                  <DestinationRating :rating="item?.rating"></DestinationRating>

                  <q-btn
                    dense
                    size="md"
                    color="primary"
                    class="text-weight-light"
                    flat
                    :label="item?.countVenue + ' DESTINASI'"
                  ></q-btn>
                  <q-item-label class="text-h5" lines="1">{{ item?.city }}</q-item-label>
                  <q-item-label caption class="text-capitalize" lines="3"
                    >{{ item?.name }}
                  </q-item-label>
                </q-card-section>
              </q-card>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>


    <div class="text-center full-width top-margin-1">
      <q-btn
        icon-right="arrow_forward"
        size="18px"
        style="height: 50px"
        unelevated
        rounded
        class="rounded-borders-4"
        color="primary"
        label="selengkapnya"
      />
    </div>
  </div>

  <!-- </main> -->
</template>

<script>
export default {
  props: ["records"],
};
</script>

<script async setup>
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

function getSplit(item) {
  if (!item) return [];
  try {
    return item.split(",");
  } catch (error) {
    return item;
  }
}
</script>

<style scoped>
.content-page-section {
  /* padding-bottom: 80px; */
}

.content-page-section p {
  margin-bottom: 25px;
}

.card-box {
  min-height: 500px;
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
  /* background-color: #f8f8f8; */
}
</style>
