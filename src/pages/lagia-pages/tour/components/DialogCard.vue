<template>
  <isModalDescription ref="isModal"></isModalDescription>

  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img
        v-if="item?.tourStore?.image && item?.tourStore?.image.length > 0"
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        :src="item?.tourStore?.image[0]"
        :error-src="$defaultErrorImage"
      >
        <div class="absolute-top-right bg-transparent">
          <q-btn
            size="16px"
            rounded
            dense
            color="white"
            text-color="primary"
            icon="fullscreen"
            @click="showMultiple(item?.tourStore?.image, 0)"
          />
        </div>

        <template v-slot:error>
          <div class="absolute-full flex flex-center text-white">Cannot load image</div>
        </template>
      </q-img>
      <q-img
        loading="lazy"
        :ratio="16 / 9"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        v-else
        :src="$defaultErrorImage"
      />
      <!-- <q-img
        loading="lazy"
        style="height: 300px"
        v-if="!item?.tourStore?.image"
        :src="$defaultUser"
      />
      <ImageSlideCarousel
        v-else
        :_gallery="item?.tourStore?.image"
      ></ImageSlideCarousel> -->

      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-pink">{{ item?.tourStore?.category }}</div> -->
        <!-- <template v-for="(val, index) in item?.tourStore?.category"> -->
        <!-- <q-chip
          color="blue"
          text-color="white"
          class="text-overline text-uppercase q-ml-none"
          >{{ item?.tourStore?.category }}</q-chip
        > -->
        <!-- </template> -->

        <div class="text-h6">{{ item?.tourStore?.name }}</div>
        <q-item-label caption>{{ item?.tourStore?.createdAt }}</q-item-label>

        <!-- <q-rating
          v-if="item?.tourStore?.ratingAvg?.avgRating"
          readonly
          v-model="item.tourStore.ratingAvg.avgRating"
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
          color="red"
        ></q-rating> -->
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <!-- <isQItemLabelSimpleValueNoDense
            label="UUID"
            :value="item?.tourStore?.uuid"
          ></isQItemLabelSimpleValueNoDense> -->
          <isQItemLabelSimpleValueNoDense
            label="Nama"
            :value="item?.tourStore?.name"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="Email"
            :value="item?.tourStore?.email"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="Telepon"
            :value="item?.tourStore?.phone"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="Kodepos"
            :value="item?.tourStore?.codepos"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="Kota"
            :value="item?.tourStore?.city"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="Provinsi"
            :value="item?.tourStore?.province"
          ></isQItemLabelSimpleValueNoDense>
          <isQItemLabelSimpleValueNoDense
            label="Negara"
            :value="item?.tourStore?.country"
          ></isQItemLabelSimpleValueNoDense>

          <!-- <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: { value: item?.tourStore?.address, label: 'address' },
              })
            "
            :clickable="true"
            label="address"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>

          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: { value: item?.tourStore?.policy, label: 'policy' },
              })
            "
            :clickable="true"
            label="policy"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense>

          <isQItemLabelSimpleValueNoDense
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: {
                  value: item?.tourStore?.description,
                  label: 'description',
                },
              })
            "
            :clickable="true"
            label="description"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValueNoDense> -->

          <isAvailable :item="item?.tourStore?.isAvailable"></isAvailable>
        </q-list>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-item class="col-12">
          <q-item-section>
            <q-item-label caption>Alamat</q-item-label>
            <q-item-label>{{ item?.tourStore?.address }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="col-12" v-if="item?.tourStore?.description">
          <q-item-section>
            <q-item-label caption>Deskripsi</q-item-label>
            <q-item-label>{{ item?.tourStore?.description }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item class="col-12" v-if="item?.tourStore?.policy">
          <q-item-section caption>
            <q-item-label>Kebijakan</q-item-label>
            <q-item-label>{{ item?.tourStore?.policy }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <!-- <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Address </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ item?.tourStore?.address }}
            </q-card-section>
          </q-card>
          <q-separator></q-separator>
        </q-expansion-item>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Policy </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ item?.tourStore?.policy }}
            </q-card-section>
          </q-card>
          <q-separator></q-separator>
        </q-expansion-item>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section> Description </q-item-section>
          </template>
          <q-card>
            <q-card-section class="q-pt-xs">
              {{ item?.tourStore?.description }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section> -->

      <!-- <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-btn-group spread outline>
          <q-btn
            @click="
              $emit('onBubbleEvent', { label: 'vendor', payload: item?.tourStore?.transportRental })
            "
            label="Vendor"
            icon="storefront"
          />
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'vehicle',
                payload: item?.tourStore?.transportVehicle,
              })
            "
            label="Kendaraan"
            icon="directions_car"
          />
        </q-btn-group>
      </q-card-section> -->

      <!-- <q-separator></q-separator>

      <q-card-actions align="center">
        <q-btn
          outline
          flat
          icon="shopping_cart_checkout"
          color="primary"
          size="md"
          label="Add To Cart"
        />
      </q-card-actions> -->

      <!-- <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-body">
            {{ item?.tourStore?.description }}
          </q-card-section>
        </div>
      </q-slide-transition> -->
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
// import isQItemLabelValue from "./isQItemLabelValue";
// import ImageSlideCarousel from "./ImageSlideCarousel";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  props: ["item"],
  components: {
    // isQItemLabelValue,
    // ImageSlideCarousel,
  },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    // const dialog_payload = ref(null);
    // const dialog_value = ref(false);

    return {
      showMultiple,
      expanded: ref(false),
      ratingZero: 0.0,

      // dialog_payload,
      // dialog_value,
    };
  },
  methods: {
    badgeCondition(condition) {
      switch (condition) {
        case "public":
          return "pink";
        case "partner":
          return "positive";
        case "private":
          return "primary";
      }
    },
    getCategory(item) {
      if (!item?.tourStore?.category) return [];
      return item?.tourStore?.category.split(",");
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 100%
</style>

<style lang="css">
.custom .q-item__label {
  /* margin-bottom: 25px; */
  /* color: white; */
  line-height: 1.6 !important;
  font-size: 14px;
}
</style>
