<template>
  <div class="row justify-center">
    <q-no-ssr>
      <!-- DETAIL -->
      <q-dialog
        full-width
        :maximized="$q.screen.width <= 768"
        v-model="dialog_detail"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
          <q-card-section class="q-py-none bg-primary text-white">
            <q-toolbar style="height: 50px" class="q-pa-none">
              <div class="text-h6 text-capitalize">Detail Skill</div>
              <q-space></q-space>
              <q-btn dense flat icon="close" v-close-popup></q-btn>
            </q-toolbar>
          </q-card-section>

          <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
            <q-list bordered class="row">
              <isQItemLabelSimpleValue
                class="col-6"
                label="uuid"
                :value="record?.talentSkill?.uuid"
              ></isQItemLabelSimpleValue>
              <isQItemLabelSimpleValue
                class="col-6"
                label="skill"
                :value="record?.talentSkill?.name"
              ></isQItemLabelSimpleValue>
              <isQItemLabelSimpleValue
                class="col-6"
                label="category"
                :value="record?.talentSkill?.category"
              ></isQItemLabelSimpleValue>
              <isQItemLabelSimpleValue
                class="col-6"
                label="category lainnya"
                :value="record?.talentSkill?.others"
              ></isQItemLabelSimpleValue>
              <isQItemLabelSimpleValue
                class="col-6"
                label="Sejak"
                :value="$formatDate(record?.talentSkill?.yearExp)"
              ></isQItemLabelSimpleValue>

              <isQItemLabelSimpleValue
                @onBubbleEvent="
                  dialog_value = true;
                  dialog_payload = {
                    value: item?.talentSkill?.description,
                    label: 'description',
                  };
                "
                :clickable="true"
                label="description"
                :value="item?.talentSkill?.description"
                textcolor="text-primary"
              ></isQItemLabelSimpleValue>
              <isQItemLabelSimpleValue
                @onBubbleEvent="
                  dialog_value = true;
                  dialog_payload = { value: item?.talentSkill?.policy, label: 'policy' };
                "
                :clickable="true"
                label="policy"
                :value="item?.talentSkill?.policy"
                textcolor="text-primary"
              ></isQItemLabelSimpleValue>

              <isAvailable :item="record?.talentSkill?.isAvailable"></isAvailable>
            </q-list>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- PROFILE -->
      <q-dialog
        full-width
        full-height
        :maximized="$q.screen.width <= 768"
        v-model="dialog_profile"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
          <q-card-section class="q-py-none bg-primary text-white">
            <q-toolbar style="height: 50px" class="q-pa-none">
              <div class="text-h6 text-capitalize">Detail Price</div>
              <q-space></q-space>
              <q-btn dense flat icon="close" v-close-popup></q-btn>
            </q-toolbar>
          </q-card-section>

          <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
            <ProfileDialogCard :item="record"></ProfileDialogCard>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="dialog_value">
        <q-card style="min-width: 400px">
          <q-toolbar>
            <!-- <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
            </q-avatar> -->

            <q-toolbar-title
              ><span class="text-capitalize">{{
                dialog_payload?.label
              }}</span></q-toolbar-title
            >

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>

          <q-separator></q-separator>

          <q-card-section>
            {{ dialog_payload?.value }}
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-no-ssr>

    <SkeletonTwitch class="col-12" v-if="!init && loading"></SkeletonTwitch>

    <NoData v-if="isMounted && records.length <= 0 && !loading"></NoData>

    <div
      v-if="init && !loading"
      class="row justify-start col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div
        v-for="(item, index) in records"
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
      >
        <TalentPriceDialogCard
          @onBubbleEvent="onBubbleEvent"
          :item="item"
        ></TalentPriceDialogCard>
      </div>
      <!-- <div class="col-12 flex justify-center">
        <q-pagination
          v-if="records.length > 0"
          :disable="loading"
          class="q-mt-lg"
          size="lg"
          v-model="currentPage"
          :max="lastPage"
          :max-pages="6"
          :input="$q.screen.width < 768"
          direction-links
          outline
          color="blue"
          active-design="unelevated"
          active-color="primary"
          active-text-color="white"
        />
      </div> -->
    </div>
  </div>

  <q-page-sticky position="bottom" :offset="$q.screen.width > 768 ? [0, 35] : [0, 10]">
    <q-pagination
      v-if="records.length > 0"
      :disable="loading"
      class="q-mt-lg"
      size="lg"
      v-model="currentPage"
      :max="lastPage"
      :max-pages="6"
      :input="$q.screen.width < 768"
      direction-links
      outline
      color="blue"
      active-design="unelevated"
      active-color="primary"
      active-text-color="white"
    />
  </q-page-sticky>

  <!-- </main> -->
</template>

<script async setup>
// preFetch: preFetch(async ({ store, currentRoute }) => {
//   const mystore = useYoutubeListStore(store);
//   await mystore.request({
//     page: currentRoute.params.page
//   });
// }),
import TalentPriceDialogCard from "./TalentPriceDialogCard";
import ProfileDialogCard from "./ProfileDialogCard";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useTalentPriceListStore } from "stores/lagia-stores/talent/TalentPriceListStore";
import { useRouter } from "vue-router";
const store = useTalentPriceListStore();
const { onFetch, onPaginate } = store; // have all reactive states here
const {
  errors,
  data,
  paginate,
  records,
  totalItem,
  page,
  orderField,
  orderDirection,
  isShowDataRecycle,
  search,
  lastPage,
  currentPage,
  perPage,

  loading,
  init,
} = storeToRefs(store); // have all reactive states here

defineOptions({
  preFetch: preFetch(
    ({
      store,
      currentRoute,
      previousRoute,
      redirect,
      ssrContext,
      urlPath,
      publicPath,
    }) => {
      return useTalentPriceListStore(store).onFetch({
        currentPage: currentRoute?.query?.page,
      });
    }
  ),
});

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

const props = defineProps(["item"]);

const router = useRouter();

const onCurrentPage = async (val) => {
  console.log("onCurrentPage", val, currentPage.value, props.item);
  // router.push({ query: { page: val.value } })
  onPaginate({ currentPage: currentPage.value, profileId: props.item?.profileId });
};
watch(() => currentPage, onCurrentPage, {
  deep: true,
  // immediate: true,
});

const isMounted = ref(false);

onMounted(async () => {
  console.log("Props", props.item?.profileId);
  init.value = false;
  await onPaginate({ currentPage: 1, profileId: props.item?.profileId });
  isMounted.value = true;
});

const ratingZero = 0.00;

function getSplit(item) {
  if (!item?.category) return [];
  return item?.category.split(",");
}

const dialog_payload = ref(null);
const dialog_value = ref(false);

const dialog_detail = ref(false);
const dialog_profile = ref(false);
const record = ref(null);

function onBubbleEvent(val) {
  record.value = val?.value;
  if (val?.label == "detail") dialog_detail.value = true;
  if (val?.label == "profile") dialog_profile.value = true;
}
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
