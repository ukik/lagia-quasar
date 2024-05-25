<script setup>
import { storeToRefs } from "pinia";

import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";
// import type { EssentialLinkProps } from "@/components/EssentialLink.vue";

import { useRoute } from "vue-router";

import { useAuthStore } from "stores/lagia-stores/auth/AuthStore";
const store = useAuthStore();
const { fetchLoginAuth, fetchInitAuth } = store; // have all reactive states here
const { auth } = storeToRefs(store); // have all reactive states here
// await fetchInitAuth() // pindah ke plugins
// await fetchLoginAuth() // DIRECTLY

const route = useRoute();
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
        leftDrawerOpen.value = true;

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
  await fetchLoginAuth();
  console.log("layout/default.vue onMounted", auth, Cookies.getAll());

  if ($q.screen.width > 1024) {
    leftDrawerMini.value = true; // aslinya true
    leftDrawerOpen.value = true;
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

const scroll_triggered = ref("bg-top");
function scrollHandler(info) {
  // console.log("scrollHandler", info?.position);
  scroll_triggered.value = info.position >= 30 ? "bg-down" : "bg-top";
}

// const layoutKey = ref(Math.random());
function onMouseOver() {
  console.log("onMouseOver");
  if ($q.screen.width > 1024) {
    leftDrawerMini.value = false;
  }
}

function onMouseLeave() {
  console.log("onMouseLeave");
  if ($q.screen.width > 1024) {
    leftDrawerMini.value = true;
  }
}
</script>

<
<script>
export default {
  methods: {
    hideNav() {
      switch (this.$route.name) {
        case "dashboard-login":
        case "dashboard-register":
        case "/register":
          return false;
        default:
          return true;
      }
    },
  },
};
</script>

<template>
  <q-layout view="lHr LpR lfr" @scroll="scrollHandler">
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
        <q-toolbar v-if="hideNav()" class="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title> Travel & Tour </q-toolbar-title>
          <img
            style="height: 48px"
            v-if="$q.screen.width > 768 && scroll_triggered === 'bg-top'"
            src="assets/images/site-logo.png"
          />
          <q-space
            v-if="$q.screen.width > 768 && scroll_triggered === 'bg-top'"
          ></q-space>

          <LayoutHeaderMenu
            v-if="$q.screen.width > 768 && scroll_triggered === 'bg-down'"
          ></LayoutHeaderMenu>

          <q-btn
            flat
            size="lg"
            round
            icon="support_agent"
            aria-label="Menu"
            @click="rightDrawerOpen = !rightDrawerOpen"
          />
        </q-toolbar>

        <q-toolbar v-else class="bg-primary text-white">
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>

          <q-toolbar-title>DASHBOARD</q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>
    </q-no-ssr>

    <q-drawer
      :width="280"
      v-show="leftDrawerVisible"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave"
      v-model="leftDrawerOpen"
      behavior="mobile"
      :show-if-above="false"
      side="left"
      bordered
    >
      <q-no-ssr>
        <q-list>
          <q-item-label header> Essential Links </q-item-label>
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
      :style="
        $q.screen.width > 768 && hideNav() ? 'margin-top: -60px' : 'margin-top: 0px'
      "
    >
      <q-page>
        <q-card-section
          v-if="hideNav()"
          id="thing_to_stick"
          class="absolute-top bg-redX q-py-none row justify-center"
          :style="$q.screen.width > 768 ? 'z-index: 9; margin-top: 60px;' : 'z-index: 9; margin-top: 10px;'"
        >
          <q-toolbar class="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12" style="padding-left: 0px;">
            <!-- <q-toolbar-title> Travel & Tour </q-toolbar-title> -->

            <LayoutHeaderMenu
              v-if="$q.screen.width > 768 && scroll_triggered === 'bg-down'"
            ></LayoutHeaderMenu>

            <q-item class="q-pa-none" dense clickable v-ripple>
              <q-item-section avatar>
                <q-avatar size="xl" color="primary" text-color="white" icon="phone" />
              </q-item-section>

              <q-item-section class="text-white">
                <q-item-label class="text-white" caption
                  >For Further Inquires :</q-item-label
                >
                <q-item-label>+01 (977) 2599 12</q-item-label>
              </q-item-section>
            </q-item>
            <q-space></q-space>
            <LayoutHeaderMenu v-if="$q.screen.width > 768"></LayoutHeaderMenu>
            <q-space></q-space>
            <q-btn
              style="height: 46px"
              dense
              unelevated
              rounded
              class="q-px-lg rounded-borders-4 shadow-1"
              color="form"
              label="Konsultasi"
            />
          </q-toolbar>
        </q-card-section>
        <!-- <router-view ></router-view> -->

        <router-view v-if="route_meta.ssr" v-slot="{ Component }">
          <component :is="Component" :key="$route.name"> </component>
        </router-view>
        <q-no-ssr v-else>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" :key="$route.name"> </component>
            </keep-alive>
          </router-view>
        </q-no-ssr>

        <q-no-ssr>
          <LayoutFooter v-if="hideNav()"></LayoutFooter>
        </q-no-ssr>
      </q-page>
    </q-page-container>

    <q-footer>
      <div class="bottom-footer text-center text-uppercase">
        Copyright © 2022 Traveler. All rights reserved.
      </div>
    </q-footer>
  </q-layout>
</template>

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
