<template>
  <isModalDescription ref="isModal"></isModalDescription>
  <q-card
    flat
    bordered
    :square="$q.screen.width <= 1024"
    :class="[$q.screen.width > 768 ? 'rounded-borders-2' : '']"
  >
    <q-card-section :horizontal="$q.screen.width > 768" class="row q-pa-none">
      <q-card-section class="bg-grey-2 row col flex items-start">
        <div class="text-box full-width q-px-sm col-12 text-capitalize">
          <q-item
            dense
            clickable
            class="q-pa-none"
            :to="{
              name: '/talent/price-list',
              query: {
                product: item?.id,
              },
            }"
          >
            <q-item-section class="text-h6">
              <q-item-label>{{ item?.name }}</q-item-label>
            </q-item-section>
          </q-item>

          <isQItemLabelSimpleValue
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: { value: item?.description, label: 'description' },
              })
            "
            :clickable="true"
            label="description"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValue>

          <isQItemLabelSimpleValue
            @onBubbleEvent="
              $refs.isModal.onOpen({
                dialog_value: true,
                dialog_payload: { value: item?.policy, label: 'policy' },
              })
            "
            :clickable="true"
            label="policy"
            value="Detail"
            textcolor="text-primary"
          ></isQItemLabelSimpleValue>

          <!-- <q-item dense>
            <q-item-section avatar>
              <q-item-label>category</q-item-label>
            </q-item-section>
            <q-item-section class="text-right">
              <q-item-label class="">
                <template v-for="(val, index) in getSplit(item?.category)">
                  <q-chip class="q-ml-none" color="blue" text-color="white">{{
                    val
                  }}</q-chip>
                </template>
              </q-item-label>
            </q-item-section>
          </q-item> -->

          <isQItemLabelSimpleValue
            label="category"
            :value="item?.category"
          ></isQItemLabelSimpleValue>

          <isQItemLabelSimpleValue
            label="Lainnya"
            :value="item?.others"
          ></isQItemLabelSimpleValue>

          <isQItemLabelSimpleValue
            label="sejak"
            :value="$formatDate(item?.yearExp)"
          ></isQItemLabelSimpleValue>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";
// import QItemLabelValue from "./QItemLabelValue";
// import ImageSlideCarousel from "./ImageSlideCarousel";
import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

export default {
  props: ["item"],
  components: {
    // QItemLabelValue,
    // ImageSlideCarousel,
  },
  // computed: {
  //   record() {
  //     return this.item;
  //   },
  // },
  setup() {
    const lightbox = useGlobalEasyLightbox();
    const { showMultiple } = lightbox;

    const dialog_payload = ref(null);
    const dialog_value = ref(false);

    return {
      showMultiple,
      expanded: ref(false),
      ratingZero: 0.0,

      dialog_payload,
      dialog_value,
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
    getSplit(item) {
      if (!item) return [];
      try {
        return item.split(",");
      } catch (error) {
        return item;
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
