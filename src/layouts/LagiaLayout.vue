<script setup>
import { storeToRefs } from "pinia";

import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
// import type { EssentialLinkProps } from "@/components/EssentialLink.vue";

import { useRoute, useRouter } from "vue-router";

import { useInitStore } from "stores/lagia-stores/page/InitStore";

import { useAuthStore } from "stores/lagia-stores/auth/AuthStore";

import Konsultasi from "./components/konsultasi.vue";
import DialogAddToCart from "./components/DialogAddToCart.vue";
import DialogAuth from "./components/DialogAuth.vue";

const initStore = useInitStore();
const { footer_contact, getInfoPrivasi, getInfoSyarat } = storeToRefs(initStore); // have all reactive states here

const store = useAuthStore();
const {
  // fetchLoginAuth,
  fetchInitAuth,
} = store; // have all reactive states here
const { auth } = storeToRefs(store); // have all reactive states here
// await fetchInitAuth() // pindah ke plugins
// await fetchLoginAuth() // DIRECTLY

const route = useRoute();
const router = useRouter();
// const page = ref<any>({})

const fetchPage = async () => {
  console.log("route name", route.name);
  // console.log("route", route);
  // const { data } = await axios.get(
  //     `/api/${route.params.locale}/pages/${route.params.slug}`,
  //     {
  //         params: {
  //             include: 'sections,documents,courses',
  //         },
  //     }
  // )

  // page.value = data.data
};
watch(() => route, fetchPage, {
  deep: true,
  immediate: true,
});

const $q = useQuasar();

const tab = ref("1");
const watchTab = async (val) => {
  return;
  console.log("onTabWatch", val);
  switch (val) {
    case "1":
      router.push({
        name: "/lagia/index",
      });
      break;
    case "2":
      router.push({
        name: "/lagia/gallery",
      });
      break;
    case "3":
      router.push({
        name: "/lagia/testimonial",
      });
      break;
    case "4":
      router.push("/lagia/index");
      break;
    case "5":
      router.push("/lagia/index");
      break;
    case "6":
      router.push("/lagia/index");
      break;
  }
};
watch(() => tab.value, watchTab, {
  deep: true,
  // immediate: true,
});

const behavior = ref("default");
const leftDrawerVisible = ref(false);
// patter Watch wajib seperti dibawah ini
watch(
  () => $q.screen,
  (newValue, oldValue) => {
    if ($q.screen.width > 1024) {
      nextTick(() => {
        // wajib pakai nextTick biar q-page-container tidak freeze UI (tidak bisa scroll)
        leftDrawerMini.value = true; // aslinya true
        leftDrawerOpen.value = false; // default CLOSE

        behavior.value = "default";
      });
    } else {
      nextTick(() => {
        // wajib pakai nextTick biar q-page-container tidak freeze UI (tidak bisa scroll)
        leftDrawerMini.value = false;
        leftDrawerOpen.value = false;

        behavior.value = "mobile";
      });
    }
    leftDrawerVisible.value = true;
  },
  {
    deep: true,
  }
);

onMounted(async () => {
  // await fetchInitAuth()
  // const token = useCookie("XSRF-TOKEN");
  // await fetchLoginAuth();
  useInitStore().onFetch();

  if ($q.screen.width > 1024) {
    leftDrawerMini.value = true; // aslinya true
    leftDrawerOpen.value = false; // default CLOSE
  } else {
    leftDrawerMini.value = false;
    leftDrawerOpen.value = false;
  }
  leftDrawerVisible.value = true;
});

const leftDrawerOpen = ref(false);
const leftDrawerMini = ref(true);

const rightDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  return;
  if ($q.screen.width > 1024) {
    leftDrawerMini.value = !leftDrawerMini.value;
    // leftDrawerOpen.value = !leftDrawerOpen.value;
    // layoutKey.value = Math.random();
  } else {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }
}

const scrollY = ref(0);

const scroll_triggered = ref("bg-top");
function scrollHandler(info) {
  // console.log("scrollHandler", info?.position);
  scroll_triggered.value = info.position >= 30 ? "bg-down" : "bg-top";

  scrollY.value = info.position;
}

// const layoutKey = ref(Math.random());
function onMouseOver() {
  console.log("onMouseOver");
  // if ($q.screen.width > 1024) {
  //   leftDrawerMini.value = false;
  // }
}

function onMouseLeave() {
  console.log("onMouseLeave");
  // if ($q.screen.width > 1024) {
  //   leftDrawerMini.value = true;
  // }
}
</script>

<script>
export default {
  computed: {
    hideNav() {
      switch (this.$route.name) {
        case "dashboard-login":
        case "dashboard-register":
        case "/register":
        case "/login":
        case "/forgot-password":
        case "/reset-password":
        case "/verify":
          //
          // case "/lagia/index":
          // case "/lagia/cart":
          // case "/lagia/cart/tour":
          // case "/tour/product-detail":
          // case "/tour/product-order":

          return false;
        default:
          return true;
      }
    },
    hideNavBottomBanner() {
      switch (this.$route.name) {
        case "dashboard-login":
        case "dashboard-register":
        case "/register":
        case "/login":
        case "/forgot-password":
        case "/reset-password":
        case "/verify":
        //
        case "/lagia/index":
        case "/lagia/cart":
        case "/lagia/cart/tour":
        case "/tour/cart":
        case "/tour/booking":
        case "/tour/product-detail":
        case "/tour/product-order":
          return false;
        default:
          return true;
      }
    },
    hideNavBottomBannerCallToAction() {
      switch (this.$route.name) {
        case "dashboard-login":
        case "dashboard-register":
        case "/register":
        case "/login":
        case "/forgot-password":
        case "/reset-password":
        case "/verify":
        //
        case "/lagia/index":
        case "/tour/product-detail":
        case "/tour/product-order":
          // case "/lagia/cart":
          // case "/lagia/cart/tour":
          return false;
        default:
          return true;
      }
    },
  },
  mounted() {
    // how to use
    const vm = this;
    this.$global.$on("LagiaLayout", function (val) {
      switch (val?.label) {
        case "addToCart":
          vm.$refs?.addToCart?.onOpen(val);
          console.log("LagiaLayout addToCart", val);
          return;
        case "konsultasi":
          vm.$refs?.konsultasi?.onOpen(val);
          console.log("LagiaLayout konsultasi", val);
          return;
        case "dialogAuth":
          vm.$refs?.dialogAuth?.onOpen(val);
          console.log("LagiaLayout dialogAuth", val);
          return;
      }
    });
    // $global.$once('nama-event', 'arg1 value', 'arg2 value', 'arg3 value');
    // $global.$off('nama-event', 'arg1 value', 'arg2 value', 'arg3 value');
    // $global.$emit('nama-event', 'arg1 value', 'arg2 value', 'arg3 value');
  },
  // "$route.name": function (val) {
  //   switch (val) {
  //     case "/lagia/index":
  //       this.tab = "1";
  //       break;
  //     case "/lagia/gallery":
  //       this.tab = "2";
  //       break;
  //       router.push({
  //         name: "/lagia/gallery",
  //       });
  //       break;
  //     case "3":
  //       router.push({
  //         name: "/lagia/testimonial",
  //       });
  //       break;
  //     case "4":
  //       router.push("/lagia/index");
  //       break;
  //     case "5":
  //       router.push("/lagia/index");
  //       break;
  //     case "6":
  //       router.push("/lagia/index");
  //       break;
  //   }
  // },
};
</script>

<template>
  <q-layout
    :view="$q.screen.width > 768 ? 'lHr LpR lfr' : 'lHr LpR lFr'"
    @scroll="scrollHandler"
  >
    <q-no-ssr>
      <q-header
        unlevated
        class="row justify-center"
        :class="[$q.screen.width > 768 ? scroll_triggered : '']"
        :style="
          $q.screen.width > 768
            ? scroll_triggered === 'bg-top'
              ? 'border-bottom: solid 1px #ffffff4a;'
              : 'border-bottom: solid 1px #ffffff4a;'
            : ''
        "
      >
        <q-toolbar v-if="hideNav" class="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title class="row">
            <q-item class="col-auto" dense :to="{ name: '/lagia/index' }">
              <q-item-label>
                <img style="height: 30px" src="/assets/lagia/white-logo.png" />
              </q-item-label>
            </q-item>
          </q-toolbar-title>

          <q-space
            v-if="$q.screen.width > 768 && scroll_triggered === 'bg-top'"
          ></q-space>

          <LayoutHeaderMenu
            :scroll_triggered="scroll_triggered"
            v-if="$q.screen.width > 768 && scroll_triggered === 'bg-down'"
          ></LayoutHeaderMenu>

          <q-btn
            flat
            size="17px"
            round
            icon="support_agent"
            aria-label="Menu"
            @click="rightDrawerOpen = !rightDrawerOpen"
          />
        </q-toolbar>

        <q-toolbar v-else class="bg-primary text-white">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title class="row">
            <q-item class="col-auto" dense :to="{ name: '/lagia/index' }">
              <q-item-label>
                <img style="height: 30px" src="/assets/lagia/white-logo.png" />
              </q-item-label>
            </q-item>
          </q-toolbar-title>

          <LayoutHeaderMenu v-if="$q.screen.width > 768"></LayoutHeaderMenu>

          <q-btn
            flat
            size="17px"
            round
            icon="support_agent"
            aria-label="Menu"
            @click="rightDrawerOpen = !rightDrawerOpen"
          />
        </q-toolbar>
      </q-header>
    </q-no-ssr>

    <!-- v-show="leftDrawerVisible"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave"
      :show-if-above="false" -->
    <q-drawer
      persistent
      :width="280"
      v-model="leftDrawerOpen"
      behavior="mobile"
      side="left"
      bordered
    >
      <q-no-ssr>
        <q-list>
          <q-item-label header>
            <img style="height: 50px" src="/assets/lagia/color-logo.png" />
          </q-item-label>

          <LayoutLeftMenu></LayoutLeftMenu>
        </q-list>
      </q-no-ssr>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      behavior="mobile"
      :show-if-above="false"
      side="right"
      bordered
    >
      <q-no-ssr>
        <LayoutRightDrawerContent></LayoutRightDrawerContent>
        <q-btn
          class="absolute-top-left q-ma-sm"
          flat
          dense
          round
          icon="close"
          aria-label="Menu"
          @click="rightDrawerOpen = false"
        />
      </q-no-ssr>
    </q-drawer>

    <q-page-container
      :style="$q.screen.width > 768 && hideNav ? 'margin-top: -60px' : 'margin-top: 0px'"
    >
      <q-page>
        <q-no-ssr>
          <GlobalEasyLightbox></GlobalEasyLightbox>
          <Konsultasi ref="konsultasi"></Konsultasi>
          <DialogAddToCart ref="addToCart"></DialogAddToCart>
          <DialogAuth ref="dialogAuth"></DialogAuth>
        </q-no-ssr>

        <q-card-section
          v-if="hideNav"
          id="thing_to_stick"
          class="absolute-top bg-redX q-py-none row justify-center"
          :style="
            $q.screen.width > 768
              ? 'z-index: 9; margin-top: 60px;'
              : 'z-index: 9; margin-top: 10px;'
          "
        >
          <q-toolbar
            class="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
            style="padding-left: 0px; padding-right: 0px"
          >
            <!-- <q-toolbar-title> Travel & Tour </q-toolbar-title> -->

            <!-- <LayoutHeaderMenu
              v-if="$q.screen.width > 768 && scroll_triggered === 'bg-down'"
            ></LayoutHeaderMenu> -->

            <q-item
              :href="'tel:' + footer_contact?.grid2Value"
              class="q-pa-none"
              dense
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar size="xl" color="primary" text-color="white" icon="phone" />
              </q-item-section>

              <q-item-section class="text-white" style="margin-top: 5px">
                <q-item-label class="text-white" caption
                  >RESERVASI & BANTUAN</q-item-label
                >
                <q-item-label class="text-h5">{{
                  footer_contact?.grid2Value
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-space></q-space>

            <LayoutHeaderMenu v-if="$q.screen.width > 768"></LayoutHeaderMenu>

            <q-space></q-space>

            <q-no-ssr>
              <q-btn
                v-if="$q.screen.width > 425"
                @click="$refs.konsultasi?.onOpen()"
                style="height: 46px"
                dense
                icon="fa-brands fa-whatsapp"
                unelevated
                rounded
                class="q-px-lg rounded-borders-4 shadow-1"
                color="positive"
                label="Konsultasi"
              />
              <q-btn
                v-else
                @click="$refs.konsultasi?.onOpen()"
                icon="fa-brands fa-whatsapp"
                unelevated
                round
                size="md"
                class="shadow-1"
                color="positive"
              />
            </q-no-ssr>
          </q-toolbar>
        </q-card-section>
        <!-- <router-view ></router-view> -->
        <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

        <div v-if="!route_meta?.logged && getIsLogin" class="content-page-section row justify-center">
          <div
            class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12 q-px-md"
          >
            <div class="col-12">
              <isBannerDaftar></isBannerDaftar>
            </div>
          </div>
        </div>

        <router-view v-if="route_meta.ssr" v-slot="{ Component }">
          <component :is="Component" :key="$route.name">
          </component>
        </router-view>

        <q-no-ssr v-else>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" :key="$route.name">
              </component>
            </keep-alive>
          </router-view>
        </q-no-ssr>

        <!-- <CallActionPromo v-if="$route.name !== '/lagia/index'"></CallActionPromo>
        <CallAction v-if="$route.name !== '/lagia/index'"></CallAction>
        <CallActionOffer v-if="$route.name !== '/lagia/index'"></CallActionOffer> -->

        <!-- <CallActionPromo v-if="hideNavBottomBanner"></CallActionPromo>
        <CallAction v-if="hideNavBottomBannerCallToAction"></CallAction>
        <CallActionOffer v-if="hideNavBottomBanner"></CallActionOffer> -->

        <q-no-ssr
          v-if="$q.screen.width > 425"
          :style="$q.screen.width > 425 ? 'padding-bottom:35px;' : 'padding-bottom:80px;'"
        >
          <LayoutFooter></LayoutFooter>
        </q-no-ssr>

        <q-page-sticky
          v-if="scrollY >= 100"
          id="floatHelp"
          position="bottom-left"
          :offset="[10, 10]"
        >
          <q-fab
            padding="10px"
            vertical-actions-align="left"
            icon="live_help"
            direction="up"
            color="pink"
          >
            <q-fab-action
              unevelated
              @click="$refs.konsultasi?.onOpen()"
              square
              color="positive"
              icon="fa-brands fa-whatsapp"
              label="Konsultasi"
            />
            <q-fab-action
              @click="$onTelp('tel:' + footer_contact?.grid2Value)"
              unevelated
              square
              color="form"
              icon="phone"
              label="Bantuan"
            />
          </q-fab>
        </q-page-sticky>

        <q-page-scroller
          id="backTop"
          position="bottom-right"
          :scroll-offset="150"
          :offset="[10, 10]"
        >
          <q-btn icon="arrow_upward" round color="primary" />
        </q-page-scroller>
      </q-page>
    </q-page-container>

    <q-footer>
      <div v-if="$q.screen.width > 768" class="bottom-footer text-center text-uppercase">
        Copyright © {{ $year }} Lagia. All rights reserved.
      </div>
      <q-tabs
        v-else
        v-model="tab"
        inline-label
        outside-arrows
        mobile-arrows
        class="bg-primary text-white shadow-2"
      >
        <q-route-tab
          :to="{
            name: '/lagia/index',
          }"
          name="1"
          icon="home"
        />
        <q-route-tab
          :to="{
            name: '/transport/rental-list',
            query: {
              page: 1,
            },
          }"
          name="2"
          icon="car_rental"
        />
        <q-route-tab
          :to="{
            name: '/lodge/profile-list',
            query: {
              page: 1,
            },
          }"
          name="3"
          icon="apartment"
        />

        <q-route-tab
          :to="{
            name: '/tourism/venue-list',
            query: {
              page: 1,
            },
          }"
          name="4"
          icon="map"
        />
        <q-route-tab
          :to="{
            name: '/souvenir/store-list',
            query: {
              page: 1,
            },
          }"
          name="5"
          icon="local_mall"
        />

        <q-route-tab
          :to="{
            name: '/culinary/store-list',
            query: {
              page: 1,
            },
          }"
          name="6"
          icon="restaurant"
        />
        <q-route-tab
          :to="{
            name: '/talent/profile-list',
            query: {
              page: 1,
            },
          }"
          name="7"
          icon="face"
        />

        <!-- <q-tab name="6" icon="people" /> -->
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<style>
#backTop .q-page-sticky {
  z-index: 99 !important;
}
#floatHelp,
.floatHelp {
  z-index: 99 !important;
}

#floatHelp .q-fab--form-rounded {
  border-radius: 50px;
}
</style>

<style scoped>
.bg-top {
  background-color: #3a78c900;
  -webkit-transition: background-color 150ms linear;
  -ms-transition: background-color 150ms linear;
  transition: background-color 150ms linear;
}

.bg-down {
  background-color: #1976d2;
  -webkit-transition: background-color 150ms linear;
  -ms-transition: background-color 150ms linear;
  transition: background-color 150ms linear;
}

#thing_to_stick {
  /* position: fixed; */
  top: 0;
}

.bottom-footer {
  background-color: #223645;
  padding: 20px 0;
}
</style>
