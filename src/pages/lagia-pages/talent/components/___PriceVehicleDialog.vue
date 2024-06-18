<template>
  <q-card square flat bordered>
    <q-card-section class="row q-pa-none">
      <q-img
        v-if="item?.image && item?.image.length > 0"
        loading="lazy"
        :ratio="16 / 9"
        class="col-12"
        :src="item?.image[0]"
      >
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Cannot load image
          </div>
        </template>
      </q-img>
      <q-img loading="lazy" :ratio="16 / 9" class="col-12" v-else :src="$defaultUser" />

      <q-card-section class="bg-grey-2 row col flex items-start">
        <div class="text-box full-width q-px-sm col-12 text-capitalize">
          <h3>{{ item?.model }}</h3>
          <q-item dense>
            <q-item-section>
              <q-item-label lines="1">uuid</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.uuid }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item dense>
              <q-item-section>
                <q-item-label lines="1">model</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label lines="1">{{ item?.model }}</q-item-label>
              </q-item-section>
            </q-item> -->
          <q-item dense>
            <q-item-section>
              <q-item-label lines="1">brand</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.brand }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section>
              <q-item-label lines="1">category </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1"
                ><q-chip text-color="white" color="pink">{{
                  item?.category
                }}</q-chip></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section>
              <q-item-label lines="1">bahan bakar</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.fuelType }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section>
              <q-item-label lines="1">color</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.color }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section>
              <q-item-label lines="1">stnk</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.codeStnk }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section>
              <q-item-label lines="1">slot kursi</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1"
                >{{ item?.slotPassanger }}
                <q-icon style="margin-top: -3px" size="18px" name="person"></q-icon
              ></q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>

      <q-card-section class="bg-cyan-8 col-4 row flex flex-center text-white q-pt-lg">
        <q-rating
          v-if="item?.ratingAvg?.avgRating"
          readonly
          v-model="item.ratingAvg.avgRating"
          size="sm"
          :max="5"
          color="white"
        ></q-rating>

        <q-rating
          v-else
          readonly
          v-model="ratingZero"
          size="sm"
          :max="5"
          color="white"
        ></q-rating>

        <div v-if="false" class="full-width text-body text-center q-mx-sm">
          Review (34)
        </div>
        <div class="package-price col-12 text-center row q-mt-md">
          <h6 class="col-12">
            {{ item?.slotPassanger }}
            <small class="text-weight-light">seat</small>
          </h6>
          <small class="col-12 text-center">( maximum slot )</small>
        </div>

        <div class="row col-12 justify-center">
          <!-- <q-btn
              unelevated
              outline
              rounded
              dense
              class="q-px-lg q-py-sm q-mb-sm q-mt-md rounded-borders-3 text-weight-light"
              color="white"
              label="Price List"
            />
            <div class="col-1"></div> -->
          <q-btn
            @click="showMultiple(item?.image, 0)"
            unelevated
            outline
            rounded
            dense
            class="q-px-lg q-py-sm q-mb-sm q-mt-md rounded-borders-3 text-weight-light"
            color="white"
            label="Visit Detail"
          />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script async setup>
import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useRouter } from "vue-router";

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

const { item } = defineProps(["item"]);

const router = useRouter();

const isMounted = ref(false);

onMounted(async () => {
  init.value = false;
  await onPaginate({ currentPage: 1, rentalId: props.item?.id });
  isMounted.value = true;
});

const ratingZero = 4.5;
</script>
<style scoped>
.package-price {
  h6 {
    color: white;
    font-size: 40px;
    font-weight: 800;
    display: block;
  }
  small {
    margin-top: -15px;
  }
}

.text-box h3 {
  font-size: 22px;
  font-weight: 700;
}

.call-action-box p {
  font-size: medium;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

.q-item__label {
  /* margin-bottom: 25px; */
  /* color: white; */
  line-height: 1.6 !important;
}

.bg-color-callback {
  padding-top: 85px;
  padding-bottom: 85px;
}
.bg-light-grey {
  background-color: #f8f8f8;
}
</style>
