<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <q-no-ssr>
    <!-- TALENT SKILL -->
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

    <!-- TALENT PRICE -->
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
        <!-- <q-card-section class="q-py-none bg-primary text-white">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Price</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section> -->

        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Price</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <TalentPriceDialogDetailCard :item="record"></TalentPriceDialogDetailCard>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- PROFILE -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="talent_profile"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <!-- <q-card-section class="q-py-none bg-primary text-white">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Profile Talent</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section> -->

        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Profile Talent</div>
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
      <div
        v-for="(item, index) in records"
        class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
      >
        <PriceListCard @onBubbleEvent="onBubbleEvent" :item="item"></PriceListCard>
      </div>
      <div class="col-12 flex justify-center">
        <q-pagination
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
      </div>
    </div>
  </div>
  <!-- Call To Action -->
  <CallActionOffer></CallActionOffer>
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
import PriceListCard from "./components/PriceListCard";
import ProfileDialogCard from "./components/ProfileDialogCard";
import TalentPriceDialogDetailCard from "./components/TalentPriceDialogDetailCard";
import TalentSkillDialog from "./components/TalentSkillDialog";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
import { preFetch } from "quasar/wrappers";

import { useTalentPriceListStore } from "stores/lagia-stores/talent/TalentPriceListStore";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import TalentPriceDialog from "./components/TalentPriceDialog.vue";
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
      if (!currentRoute?.query?.page)
        redirect({ name: currentRoute.name, query: { page: 1 } });

      return useTalentPriceListStore(store).onFetch({
        currentPage: currentRoute?.query?.page,
      });
    }
  ),
});

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

const record = ref(null);

const dialog_selengkapnya = ref(false);

const talent_profile = ref(false);
const talent_prices = ref(false);
const talent_skills = ref(false);

// const dialog_payload = ref(null);
// const dialog_value = ref(false);

function onBubbleEvent(value) {
  record.value = value?.payload;
  if (value?.label == "profile") talent_profile.value = true;
  if (value?.label == "detail") dialog_selengkapnya.value = true;
  if (value?.label == "skill") talent_skills.value = true;
}

function closeDialog() {
  dialog_selengkapnya.value = false;
  talent_profile.value = false;
  talent_prices.value = false;
  talent_skills.value = false;
}

onBeforeRouteLeave((to, from, next) => {
  closeDialog();
  return next();

  let dialog = false;
  if (dialog_selengkapnya.value) dialog = true;
  if (talent_profile.value) dialog = true;
  if (talent_prices.value) dialog = true;
  if (talent_skills.value) dialog = true;

  if (dialog) {
    console.log("dialog", dialog, from);
    const text = "Do you really want to leave? you have unsaved changes!";
    if (confirm(text) == true) {
      console.log('"You pressed OK!"');
      dialog_selengkapnya.value = false;
      talent_profile.value = false;
      talent_prices.value = false;
      talent_skills.value = false;
      next();
    } else {
      console.log('"You canceled!"');
      next(from.fullPath);
    }

    // next({ path: from.path, query: from.query });
  } else {
    console.log("dialog", dialog);
    next();
  }

  // return;
  // const text = "Do you really want to leave? you have unsaved changes!";
  // if (confirm(text) == true) {
  //   console.log('"You pressed OK!"');
  //   this.dialog_selengkapnya = false;
  //   this.talent_profile = false;
  //   this.talent_prices = false;
  //   this.talent_skills = false;
  //   next();
  // } else {
  //   console.log('"You canceled!"');
  //   next(from.fullPath);
  // }

  // if(!isEqual(store.getters['product/getProduct'], initialState)) {
  //   Swal.fire(/*...*/)
  //     .then(() => {
  //       next()
  //     })
  // } else {
  //   next()
  // }
});
</script>

<
<script>
export default {
  // beforeRouteLeave(to, from, next) {
  //   // called when the route that renders this component is about to
  //   // be navigated away from.
  //   // has access to `this` component instance.
  //   console.log("beforeRouteLeave FROM", from.fullPath);

  //   // window.confirm("Do you really want to leave? you have unsaved changes!");

  //   // if (this.dialog_selengkapnya) return (this.dialog_selengkapnya = false);
  //   // if (this.talent_profile) return (this.talent_profile = false);
  //   // if (this.talent_prices) return (this.talent_prices = false);
  //   // if (this.talent_skills) return (this.talent_skills = false);

  //   if (
  //     !this.dialog_selengkapnya &&
  //     !this.talent_profile &&
  //     !this.talent_prices &&
  //     !this.talent_skills
  //   ) {
  //     console.log(
  //       this.dialog_selengkapnya,
  //       this.talent_profile,
  //       this.talent_prices,
  //       this.talent_skills
  //     );
  //     return next(from.fullPath);
  //   } else {
  //     alert(2);
  //     return next();
  //   }
  //   return;
  //   const text = "Do you really want to leave? you have unsaved changes!";
  //   if (confirm(text) == true) {
  //     console.log('"You pressed OK!"');
  //     this.dialog_selengkapnya = false;
  //     this.talent_profile = false;
  //     this.talent_prices = false;
  //     this.talent_skills = false;
  //     next();
  //   } else {
  //     console.log('"You canceled!"');
  //     next(from.fullPath);
  //   }
  // },
  mounted() {
    // window.addEventListener(
    //   "popstate",
    //   function (event) {
    //     // The popstate event is fired each time when the current history entry changes.
    //     var r = confirm("You pressed a Back button! Are you sure?!");
    //     if (r == true) {
    //       // Call Back button programmatically as per user confirmation.
    //       history.back();
    //       // Uncomment below line to redirect to the previous page instead.
    //       // window.location = document.referrer // Note: IE11 is not supporting this.
    //     } else {
    //       // Stay on the current page.
    //       history.pushState(null, null, window.location.pathname);
    //     }
    //     history.pushState(null, null, window.location.pathname);
    //   },
    //   false
    // );
  },
};
</script>

<style scoped>
.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}

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
