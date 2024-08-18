<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" square flat bordered>
      <q-img
        v-if="item?.tourProduct?.image && item?.tourProduct?.image.length > 0"
        loading="lazy"
        :ratio="1"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        :src="item?.tourProduct?.image[0]"
      >
        <div class="absolute-top-right bg-transparent">
          <q-btn
            size="16px"
            rounded
            dense
            color="white"
            text-color="primary"
            icon="fullscreen"
            @click="showMultiple(item?.tourProduct?.image, 0)"
          />
        </div>
        <!-- <q-badge
          :color="badgeCondition(item?.condition)"
          class="q-mr-lg rounded-borders-2"
          style="margin-top: -17px"
          floating
          ><span class="text-title text-uppercase q-mt-md">{{
            item?.condition
          }}</span></q-badge
        > -->
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Cannot load image
          </div>
        </template>
      </q-img>
      <q-img
        loading="lazy"
        :ratio="1"
        class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
        v-else
        :src="$defaultErrorImage"
      />

      <q-card-section>
        <!-- <DestinationRating
          :rating="item?.tourProduct?.ratingAvg?.avgRating"
        ></DestinationRating> -->
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

        <q-item
          dense
          clickable
          class="q-pa-none"
          :to="{
            name: '/tour/price-detail',
            params: {
              slug: item?.id,
              slug_text: item?.name,
            },
          }"
        >
          <q-item-section class="text-title q-mb-xs">
            <q-item-label style="height: 48px" lines="2">{{ item?.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label caption>{{ item?.createdAt }}</q-item-label>
      </q-card-section>

      <q-separator></q-separator>

      <!-- <q-card-section class="rowX q-col-gutter-md">
        <q-item >
          <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md col-12">
            <q-item-label class="text-white text-capitalize"
              >Harga Dewasa {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h5 text-white">{{
              $currency($finalPrice(item))
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item >
          <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md col-12">
            <q-item-label class="text-white text-capitalize"
              >Harga Anak (2-6 tahun) {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h5 text-white">{{
              $currency($finalPriceAnak(item))
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section> -->

      <q-item>
        <q-item-section>
          <q-item-label caption class="text-capitalize">Harga Dewasa</q-item-label>
          <q-item-label class="text-h5">{{ $currency($finalPrice(item)) }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator></q-separator>

      <q-item>
        <q-item-section>
          <q-item-label caption class="text-capitalize"
            >Harga Anak (2-6 tahun)</q-item-label
          >
          <q-item-label class="text-h5">{{
            $currency($finalPriceAnak(item))
          }}</q-item-label>
        </q-item-section>
      </q-item>

      <!-- <q-item >
          <q-item-section class="bg-primary col-auto rounded-borders-1 q-pa-md col-12">
            <q-item-label class="text-white text-capitalize"
              >Harga Anak (2-6 tahun) {{ item?.typePrice }}</q-item-label
            >
            <q-item-label class="text-h5 text-white">{{
              $currency($finalPriceAnak(item))
            }}</q-item-label>
          </q-item-section>
        </q-item> -->

      <q-separator></q-separator>

      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <isQItemLabelValue
            label="HPP Dewasa"
            :value="$currency(item?.generalPrice)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="HPP Anak (2-6 tahun)"
            :value="$currency(item?.generalPriceChild)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="Diskon"
            :value="$percent(item?.discountPrice)"
          ></isQItemLabelValue>
          <isQItemLabelValue
            label="Cashback"
            :value="$currency(item?.cashbackPrice)"
          ></isQItemLabelValue>
        </q-list>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section> Deskripsi </q-item-section>
          </template>
          <q-separator></q-separator>

          <q-card>
            <q-card-section>
              {{ item?.description }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>


      <q-separator></q-separator>
      <q-card-section class="row col-12 flex items-start q-pa-none">
        <q-list padding>
          <q-item v-if="$q.screen.width > 425">
            <q-item-section>
              <q-item-label caption>Kategori</q-item-label>
              <q-item-label lines="1">
                {{ item?.tourProduct.category }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-else
            clickable
            v-ripple
            :to="{
              name: '/tour/product-detail',
              params: {
                slug: item?.tourProduct.id,
                slug_text: item?.tourProduct.slug,
              },
            }"
          >
            <q-item-section>
              <q-item-label>
                {{ item?.tourProduct.name }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label caption>Durasi</q-item-label>
              <q-item-label>
                {{ item?.tourProduct.durasi }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label caption>Destinasi</q-item-label>
              <q-item-label>
                {{ item?.tourProduct.province }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>


      <q-separator></q-separator>

      <!-- <q-card-section class="q-pa-none">
        <q-btn-group spread outline>
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'detail',
                payload: item,
              })
            "
            label="detail"
            icon="visibility"
          />
          <q-btn
            @click="$emit('onBubbleEvent', { label: 'store', payload: item })"
            label="Store"
            icon="local_mall"
          />
        </q-btn-group>
      </q-card-section> -->

      <q-card-section class="q-pa-none">
        <q-btn-group spread unelevated>
          <!-- @click="
              $emit('onBubbleEvent', {
                label: 'detail',
                payload: item,
              })
            " -->
          <q-btn
            v-if="item?.tourProduct"
            :to="{
              name: '/tour/product-detail',
              params: {
                slug: item?.productId,
                slug_text: item?.tourProduct?.slug,
              },
            }"
            label="detail produk"
            icon="visibility"
          />
          <q-separator vertical></q-separator>
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'store',
                payload: item,
              })
            "
            label="detail vendor"
            icon="storefront"
          />

          <!-- <q-separator vertical></q-separator>
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'produk',
                payload: item,
              })
            "
            label="produk"
            icon="inventory"
          /> -->
        </q-btn-group>
      </q-card-section>

      <q-separator></q-separator>

      <!-- <q-card-actions align="center">
        <q-btn
          outline
          flat
          icon="shopping_cart_checkout"
          color="primary"
          size="md"
          label="Add To Cart"
        />
      </q-card-actions> -->

      <q-btn
        unelevated
        square
        class="full-width"
        style="border-radius: 0px"
        @click="
          $global.$emit('LagiaLayout', {
            label: 'konsultasi',
            slug: 'konsultasi',
            vendor: 'tourStore',
            value: item,
            product: 'tourProduct',
          })
        "
        color="positive"
        text-color="white"
        label="Tanya Admin"
        icon="fa-brands fa-whatsapp"
      />

      <!-- <isCartButton
        :item="item"
        slug="tour"
        vendor="tourStore"
        product="tourProduct"
      ></isCartButton> -->

      <!-- <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-body">
            {{ item?.description }}
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

    return {
      showMultiple,
      expanded: ref(false),
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
