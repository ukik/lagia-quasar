<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <q-no-ssr>
    <!-- DESCRIPTION -->
    <q-dialog v-model="dialog_value">
      <q-card style="min-width: 400px">
        <q-toolbar>
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

    <!-- SKILL -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="talent_skills"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">Skill List</div>
            <q-space></q-space>
            <!-- <q-btn dense flat icon="list" @click="rental_vehicle_modal = true"></q-btn> -->
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px - 60px)" class="scroll">
          <TalentSkillDialog :item="record"></TalentSkillDialog>
        </q-card-section>

        <q-separator />
        <q-card-section style="height: 60px"> </q-card-section>
      </q-card>
    </q-dialog>

    <!-- PRICE -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="talent_prices"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">Price List</div>
            <q-space></q-space>
            <!-- <q-btn dense flat icon="list" @click="rental_vehicle_modal = true"></q-btn> -->
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px - 60px)" class="scroll">
          <TalentPriceDialog :item="record"></TalentPriceDialog>
        </q-card-section>

        <q-separator />
        <q-card-section style="height: 60px"> </q-card-section>
      </q-card>
    </q-dialog>

    <!-- SELENGKAPNYA -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="dialog_selengkapnya"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Profile</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <!-- <div class="row flex flex-center">
            <q-btn-group
              spread
              outline
              unelevated
              rounded
              class="bg-white q-mb-md col-xl-8 col-lg-8 col-md-8 col-sm-8 col-auto"
            >
              <q-btn
                @click="talent_skills = true"
                unelevated
                color="cyan"
                :label="$q.screen.width > 425 ? 'skill list' : ''"
                icon="emoji_events"
              >
              </q-btn>

              <q-btn
                @click="talent_prices = true"
                unelevated
                color="teal"
                :label="$q.screen.width > 425 ? 'price list' : ''"
                icon="add_shopping_cart"
              >
              </q-btn>
            </q-btn-group>
          </div> -->

          <ProfileDialogCard :item="record"></ProfileDialogCard>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-no-ssr>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div class="col-12" v-if="records.length <= 0 && !loading">
        <NoData></NoData>
      </div>
      <div
        v-else
        v-for="(item, index) in records"
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
      >
        <q-card bordered flat class="rounded-borders-2">
          <q-img
            loading="lazy"
            :error-src="$defaultErrorImage"
            :ratio="16 / 9"
            class="card-box"
            :src="item?.image[0]"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center text-white">
                Cannot load image
              </div>
            </template>

            <div class="absolute-full bg-transparent flex justify-center items-end">
              <q-card
                bordered
                flat
                class="text-box text-center text-dark q-mt-lg full-width rounded-borders-2"
              >
                <q-card-section>
                  <q-btn-group outline rounded unelevated class="q-mx-xl bg-white">
                    <q-btn
                      outline
                      color="primary"
                      bg-color="white"
                      size="16px"
                      dense
                      class="q-px-md"
                      ><i class="text-h6 fa-brands fa-instagram"></i
                    ></q-btn>
                    <q-btn
                      outline
                      color="primary"
                      bg-color="white"
                      size="16px"
                      dense
                      class="q-px-md"
                      ><i class="text-h6 fa-brands fa-whatsapp"></i
                    ></q-btn>
                    <q-btn
                      outline
                      color="primary"
                      bg-color="white"
                      size="16px"
                      dense
                      class="q-px-md"
                      ><i class="text-h6 fa-brands fa-facebook-f"></i
                    ></q-btn>
                    <q-btn
                      outline
                      color="primary"
                      bg-color="white"
                      size="16px"
                      dense
                      class="q-px-md"
                      ><i class="text-h6 fa-brands fa-x-twitter"></i
                    ></q-btn>
                    <q-btn
                      outline
                      color="primary"
                      bg-color="white"
                      size="16px"
                      dense
                      class="q-px-md"
                      ><i class="text-h6 fa-brands fa-tiktok"></i
                    ></q-btn>
                  </q-btn-group>
                </q-card-section>
                <q-separator />
                <q-card-section class="bg-white">
                  <h3>{{ item?.name }}</h3>
                  <q-btn
                    @click="
                      talent_skills = true;
                      record = item;
                    "
                    size="lg"
                    color="primary"
                    class="text-weight-light"
                    flat
                    dense
                    :label="item?.talentSkillsCount + ' skill'"
                  ></q-btn>
                  <!-- <q-item-label style="min-height: 48px" lines="2"
                    >{{ item?.description }} Melakukan Perbaikan & Mengembangkan Secara
                    Terus Menerus Terhadap Sumber Daya Manusia & Manajemen Sistem Menuju
                    Terbentuknya Budaya Organisasi, Guna Meningkatkan Benefit &
                    Produktivitas</q-item-label
                  > -->
                  <br />
                  <q-rating
                    v-if="item?.ratingAvg?.avgRating"
                    readonly
                    v-model="item.ratingAvg.avgRating"
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
                  ></q-rating>
                </q-card-section>

                <!-- <q-separator></q-separator> -->

                <q-card-section class="row">
                  <!-- <q-btn
                    @click="
                      dialog_selengkapnya = true;
                      record = item;
                    "
                    flat
                    color="primary"
                    size="md"
                    label="selengkapnya"
                  /> -->
                  <div class="row col-12 justify-center">
                    <q-btn-group spread unelevated rounded class="bg-primary">
                      <q-btn
                        @click="
                          dialog_selengkapnya = true;
                          record = item;
                        "
                        class="text-weight-normal"
                        text-color="white"
                        label="Detail"
                      />
                      <q-separator color="white" vertical></q-separator>
                      <q-btn
                        @click="
                          talent_skills = true;
                          record = item;
                        "
                        class="text-weight-normal"
                        text-color="white"
                        label="Skill"
                      />
                      <q-separator color="white" vertical></q-separator>
                      <q-btn
                        @click="
                          talent_prices = true;
                          record = item;
                        "
                        class="text-weight-normal"
                        text-color="white"
                        label="Harga"
                      />
                    </q-btn-group>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="absolute-top-right bg-transparent">
              <q-btn
                size="16px"
                rounded
                dense
                color="white"
                text-color="primary"
                icon="fullscreen"
                @click="showMultiple(item?.image, 0)"
              />
            </div>

            <div class="absolute-top-left bg-transparent">
              <isAvailableChip :item="item?.isAvailable"></isAvailableChip>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
  </div>
  <!-- Call To Action -->
  <div class="call-action-box bg-color-callback bg-light-grey row justify-center">
    <div class="col-xl-6 col-lg-8 col-md-11 col-sm-12 col-12 text-center q-px-md">
      <h5>CALL TO ACTION</h5>
      <h2 class="q-py-lg">READY FOR UNFORGATABLE TRAVEL. REMEMBER US!</h2>
      <p>
        Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
        Vestibulum cumque laudantium. Sit ornare mollitia tenetur, aptent.
      </p>
      <div class="q-mt-xl">
        <q-btn
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
          color="primary"
          label="Learn More"
        />
      </div>
    </div>
  </div>

  <!-- </main> -->
</template>

<script async setup>
// preFetch: preFetch(async ({ store, currentRoute }) => {
//   const mystore = useYoutubeListStore(store);
//   await mystore.request({
//     page: currentRoute.params.page
//   });
// }),

import ProfileDialogCard from "./components/ProfileDialogCard";
import TalentPriceDialog from "./components/TalentPriceDialog";
import TalentSkillDialog from "./components/TalentSkillDialog";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";
import { useTalentProfileListStore } from "stores/lagia-stores/talent/TalentProfileListStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
const store = useTalentProfileListStore();
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
      if (!currentRoute?.query?.page)
        redirect({ name: currentRoute.name, query: { page: 1 } });

      return useTalentProfileListStore(store).onFetch({
        currentPage: currentRoute?.query?.page,
      });
    }
  ),
});

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

const router = useRouter();

const onCurrentPage = async (val) => {
  console.log("onCurrentPage", val);
  router.push({ query: { page: val.value } });
  onPaginate({ currentPage: val.value });
};
watch(() => currentPage, onCurrentPage, {
  deep: true,
  // immediate: true,
});

const ratingZero = 0.0;

const dialog_selengkapnya = ref(false);
const record = ref(null);

const talent_prices = ref(false);
const talent_skills = ref(false);

const dialog_payload = ref(null);
const dialog_value = ref(false);

function closeDialog() {
  dialog_selengkapnya.value = false;
  record.value = null;
  talent_prices.value = false;
  talent_skills.value = false;
  dialog_payload.value = null;
  dialog_value.value = false;
}

onBeforeRouteLeave((to, from, next) => {
  closeDialog();
  return next();
});
</script>

<script>
export default {
  // beforeRouteEnter(to, from, next) {
  //   // called before the route that renders this component is confirmed.
  //   // does NOT have access to `this` component instance,
  //   // because it has not been created yet when this guard is called!
  // },
};
</script>

<style scoped>
.content-page-section {
  padding-bottom: 80px;
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
  padding-bottom: 85px;
}
.bg-light-grey {
  background-color: #f8f8f8;
}
</style>
