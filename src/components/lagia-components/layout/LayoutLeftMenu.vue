<template>
  <div>
    <!-- {{ getAuth }} -->
    <!-- <q-list bordered class="rounded-borders"> -->
    <q-item
      :to="{
        name: '/lagia/index',
      }"
      :active="link === '/lagia/index'"
      active-class="text-primary"
      clickable
      v-ripple
    >
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>Beranda</q-item-section>
    </q-item>

    <q-item
      :to="{
        name: '/lagia/gallery',
      }"
      :active="link === '/lagia/gallery'"
      active-class="text-primary"
      clickable
      v-ripple
    >
      <q-item-section avatar>
        <q-icon name="images" />
      </q-item-section>
      <q-item-section>Gallery</q-item-section>
    </q-item>

    <q-item
      :to="{
        name: '/lagia/team',
      }"
      :active="link === '/lagia/team'"
      active-class="text-primary"
      clickable
      v-ripple
    >
      <q-item-section avatar>
        <q-icon name="groups" />
      </q-item-section>
      <q-item-section>Teamwork</q-item-section>
    </q-item>

    <q-item
      :to="{
        name: '/lagia/testimonial',
      }"
      :active="link === '/lagia/testimonial'"
      active-class="text-primary"
      clickable
      v-ripple
    >
      <q-item-section avatar>
        <q-icon name="forum" />
      </q-item-section>
      <q-item-section>Testimoni</q-item-section>
    </q-item>

    <q-expansion-item
      dense
      :content-inset-level="0.5"
      :expand-separator="false"
      icon=""
      label=""
      caption=""
    >
      <template v-slot:header>
        <q-item-section avatar style="height: 48px">
          <q-icon
            :class="[
              $route.name == '/tour/store-list' ? 'text-primary' : '',
              $route.name == '/tour/product-list' ? 'text-primary' : '',
              $route.name == '/tour/price-list' ? 'text-primary' : '',
            ]"
            name="explore"
          />
        </q-item-section>
        <q-item-section
          :class="[
            $route.name == '/tour/store-list' ? 'text-primary' : '',
            $route.name == '/tour/product-list' ? 'text-primary' : '',
            $route.name == '/tour/price-list' ? 'text-primary' : '',
          ]"
          style="height: 48px"
        >
          Tour
        </q-item-section>
      </template>

      <template v-for="(item, index) in tours">
        <q-item
          :to="{
            name: item?.name,
          }"
          :active="link === item?.name"
          active-class="text-primary"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="item?.icon" />
          </q-item-section>
          <q-item-section>{{ item?.label }}</q-item-section>
        </q-item>
      </template>
    </q-expansion-item>

    <q-expansion-item
      dense
      :content-inset-level="0.5"
      :expand-separator="false"
      icon=""
      label=""
      caption=""
    >
      <template v-slot:header>
        <q-item-section avatar style="height: 48px">
          <q-icon
            :class="[
              $route.name == '/transport/rental-list' ? 'text-primary' : '',
              $route.name == '/transport/vehicle-list' ? 'text-primary' : '',
              $route.name == '/transport/price-list' ? 'text-primary' : '',
            ]"
            name="car_rental"
          />
        </q-item-section>
        <q-item-section
          :class="[
            $route.name == '/transport/rental-list' ? 'text-primary' : '',
            $route.name == '/transport/vehicle-list' ? 'text-primary' : '',
            $route.name == '/transport/price-list' ? 'text-primary' : '',
          ]"
          style="height: 48px"
        >
          Rental
        </q-item-section>
      </template>

      <template v-for="(item, index) in transports">
        <q-item
          :to="{
            name: item?.name,
          }"
          :active="link === item?.name"
          active-class="text-primary"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="item?.icon" />
          </q-item-section>
          <q-item-section>{{ item?.label }}</q-item-section>
        </q-item>
      </template>
    </q-expansion-item>

    <q-expansion-item
      v-if="false"
      dense
      :content-inset-level="0.5"
      :expand-separator="false"
      icon=""
      label=""
      caption=""
    >
      <template v-slot:header>
        <q-item-section avatar style="height: 48px">
          <q-icon
            :class="[
              $route.name == '/souvenir/store-list' ? 'text-primary' : '',
              $route.name == '/souvenir/product-list' ? 'text-primary' : '',
              $route.name == '/souvenir/price-list' ? 'text-primary' : '',
            ]"
            name="local_mall"
          />
        </q-item-section>
        <q-item-section
          :class="[
            $route.name == '/souvenir/store-list' ? 'text-primary' : '',
            $route.name == '/souvenir/product-list' ? 'text-primary' : '',
            $route.name == '/souvenir/price-list' ? 'text-primary' : '',
          ]"
          style="height: 48px"
        >
          Souvenir
        </q-item-section>
      </template>

      <template v-for="(item, index) in souvenirs">
        <q-item
          :to="{
            name: item?.name,
          }"
          :active="link === item?.name"
          active-class="text-primary"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="item?.icon" />
          </q-item-section>
          <q-item-section>{{ item?.label }}</q-item-section>
        </q-item>
      </template>
    </q-expansion-item>

    <q-expansion-item
      dense
      :content-inset-level="0.5"
      :expand-separator="false"
      icon=""
      label=""
      caption=""
    >
      <template v-slot:header>
        <q-item-section avatar style="height: 48px">
          <q-icon
            :class="[
              $route.name == '/lodge/profile-list' ? 'text-primary' : '',
              $route.name == '/lodge/room-list' ? 'text-primary' : '',
              $route.name == '/lodge/price-list' ? 'text-primary' : '',
            ]"
            name="apartment"
          />
        </q-item-section>
        <q-item-section
          :class="[
            $route.name == '/lodge/profile-list' ? 'text-primary' : '',
            $route.name == '/lodge/room-list' ? 'text-primary' : '',
            $route.name == '/lodge/price-list' ? 'text-primary' : '',
          ]"
          style="height: 48px"
        >
          Hotel
        </q-item-section>
      </template>

      <template v-for="(item, index) in lodges">
        <q-item
          :to="{
            name: item?.name,
          }"
          :active="link === item?.name"
          active-class="text-primary"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="item?.icon" />
          </q-item-section>
          <q-item-section>{{ item?.label }}</q-item-section>
        </q-item>
      </template>
    </q-expansion-item>

    <q-expansion-item
      v-if="false"
      dense
      :content-inset-level="0.5"
      :expand-separator="false"
      icon=""
      label=""
      caption=""
    >
      <template v-slot:header>
        <q-item-section avatar style="height: 48px">
          <q-icon
            :class="[
              $route.name == '/culinary/store-list' ? 'text-primary' : '',
              $route.name == '/culinary/product-list' ? 'text-primary' : '',
              $route.name == '/culinary/price-list' ? 'text-primary' : '',
            ]"
            name="restaurant"
          />
        </q-item-section>
        <q-item-section
          :class="[
            $route.name == '/culinary/store-list' ? 'text-primary' : '',
            $route.name == '/culinary/product-list' ? 'text-primary' : '',
            $route.name == '/culinary/price-list' ? 'text-primary' : '',
          ]"
          style="height: 48px"
        >
          Kuliner
        </q-item-section>
      </template>

      <template v-for="(item, index) in culinarys">
        <q-item
          :to="{
            name: item?.name,
          }"
          :active="link === item?.name"
          active-class="text-primary"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="item?.icon" />
          </q-item-section>
          <q-item-section>{{ item?.label }}</q-item-section>
        </q-item>
      </template>
    </q-expansion-item>

    <q-expansion-item
      dense
      :content-inset-level="0.5"
      :expand-separator="false"
      icon=""
      label=""
      caption=""
    >
      <template v-slot:header>
        <q-item-section avatar style="height: 48px">
          <q-icon
            :class="[
              $route.name == '/talent/profile-list' ? 'text-primary' : '',
              $route.name == '/talent/skill-list' ? 'text-primary' : '',
              $route.name == '/talent/price-list' ? 'text-primary' : '',
            ]"
            name="face"
          />
        </q-item-section>
        <q-item-section
          :class="[
            $route.name == '/talent/profile-list' ? 'text-primary' : '',
            $route.name == '/talent/skill-list' ? 'text-primary' : '',
            $route.name == '/talent/price-list' ? 'text-primary' : '',
          ]"
          style="height: 48px"
        >
          Talent
        </q-item-section>
      </template>

      <template v-for="(item, index) in talents">
        <q-item
          :to="{
            name: item?.name,
          }"
          :active="link === item?.name"
          active-class="text-primary"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="item?.icon" />
          </q-item-section>
          <q-item-section>{{ item?.label }}</q-item-section>
        </q-item>
      </template>
    </q-expansion-item>

    <q-expansion-item
      dense
      :content-inset-level="0.5"
      :expand-separator="false"
      icon=""
      label=""
      caption=""
    >
      <template v-slot:header>
        <q-item-section avatar style="height: 48px">
          <q-icon
            :class="[
              $route.name == '/tourism/venue-list' ? 'text-primary' : '',
              $route.name == '/tourism/facilities-list' ? 'text-primary' : '',
              $route.name == '/tourism/price-list' ? 'text-primary' : '',
            ]"
            name="map"
          />
        </q-item-section>
        <q-item-section
          :class="[
            $route.name == '/tourism/venue-list' ? 'text-primary' : '',
            $route.name == '/tourism/facilities-list' ? 'text-primary' : '',
            $route.name == '/tourism/price-list' ? 'text-primary' : '',
          ]"
          style="height: 48px"
        >
          Wisata
        </q-item-section>
      </template>

      <template v-for="(item, index) in tourisms">
        <q-item
          :to="{
            name: item?.name,
          }"
          :active="link === item?.name"
          active-class="text-primary"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="item?.icon" />
          </q-item-section>
          <q-item-section>{{ item?.label }}</q-item-section>
        </q-item>
      </template>
    </q-expansion-item>

    <q-expansion-item
      dense
      :content-inset-level="0.5"
      :expand-separator="false"
      icon=""
      label=""
      caption=""
    >
      <template v-slot:header>
        <q-item-section avatar style="height: 48px">
          <q-icon
            :class="[
              getPagaActiveClass ? 'text-primary' : '',
              $route.name == '/info/privacy-policy' ? 'text-primary' : '',
              $route.name == '/info/terms-condition' ? 'text-primary' : '',
            ]"
            name="description"
          />
        </q-item-section>
        <q-item-section
          :class="[
            getPagaActiveClass ? 'text-primary' : '',
            $route.name == '/info/privacy-policy' ? 'text-primary' : '',
            $route.name == '/info/terms-condition' ? 'text-primary' : '',
          ]"
          style="height: 48px"
        >
          Halaman
        </q-item-section>
      </template>

      <template v-for="(item, index) in pages">
        <q-item
          :to="{
            name: item?.name,
          }"
          :active="link === item?.name"
          active-class="text-primary"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="item?.icon" />
          </q-item-section>
          <q-item-section>{{ item?.label }}</q-item-section>
        </q-item>
      </template>

      <q-item
        :to="{
          name: '/info/terms-condition',
          params: {
            slug: getInfoSyarat?.slug,
            id: getInfoSyarat?.id,
          },
        }"
        :active="link === '/info/terms-condition'"
        active-class="text-primary"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-icon name="info" />
        </q-item-section>
        <q-item-section>{{ getInfoSyarat?.title }}</q-item-section>
      </q-item>

      <q-item
        v-if="getInfoPrivasi?.slug"
        :to="{
          name: '/info/privacy-policy',
          params: {
            slug: getInfoPrivasi?.slug,
            id: getInfoPrivasi?.id,
          },
        }"
        :active="link === '/info/privacy-policy'"
        active-class="text-primary"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-icon name="info" />
        </q-item-section>
        <q-item-section>{{ getInfoPrivasi?.title }}</q-item-section>
      </q-item>
    </q-expansion-item>

    <q-item
      v-if="getAuth?.isLogin"
      clickable
      v-ripple
      @click="onLogout"
      active-class="my-menu-link"
    >
      <q-item-section avatar>
        <q-icon name="logout" />
      </q-item-section>

      <q-item-section>Logout</q-item-section>
    </q-item>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useInitStore } from "stores/lagia-stores/page/InitStore";

import { useAuthStore } from "src/stores/lagia-stores/auth/AuthStore";

export default {
  data() {
    return {
      link: "",
      tours: [
        {
          label: "Vendor Tour",
          name: "/tour/store-list",
          icon: "storefront",
        },
        {
          label: "Paket Tour",
          name: "/tour/product-list",
          icon: "drive_eta",
        },
        {
          label: "Harga Tour",
          name: "/tour/price-list",
          icon: "add_shopping_cart",
        },
      ],

      transports: [
        {
          label: "Vendor Rental",
          name: "/transport/rental-list",
          icon: "storefront",
        },
        {
          label: "Armada Rental",
          name: "/transport/vehicle-list",
          icon: "drive_eta",
        },
        {
          label: "Harga Rental",
          name: "/transport/price-list",
          icon: "add_shopping_cart",
        },
      ],
      souvenirs: [
        {
          label: "Vendor Souvenir",
          name: "/souvenir/store-list",
          icon: "storefront",
        },
        {
          label: "Produk Souvenir",
          name: "/souvenir/product-list",
          icon: "inventory",
        },
        {
          label: "Harga Souvenir",
          name: "/souvenir/price-list",
          icon: "add_shopping_cart",
        },
      ],

      lodges: [
        {
          label: "Vendor Hotel",
          name: "/lodge/profile-list",
          icon: "storefront",
        },
        {
          label: "Kamar Hotel",
          name: "/lodge/room-list",
          icon: "meeting_room",
        },
        {
          label: "Harga Hotel",
          name: "/lodge/price-list",
          icon: "add_shopping_cart",
        },
      ],

      culinarys: [
        {
          label: "Vendor Kuliner",
          name: "/culinary/store-list",
          icon: "storefront",
        },
        {
          label: "Produk Kuliner",
          name: "/culinary/product-list",
          icon: "fastfood",
        },
        {
          label: "Harga Kuliner",
          name: "/culinary/price-list",
          icon: "add_shopping_cart",
        },
      ],

      talents: [
        {
          label: "Profile Talent",
          name: "/talent/profile-list",
          icon: "storefront",
        },
        {
          label: "Skill Talent",
          name: "/talent/skill-list",
          icon: "person",
        },
        {
          label: "Harga Talent",
          name: "/talent/price-list",
          icon: "add_shopping_cart",
        },
      ],

      tourisms: [
        {
          label: "Vendor Wisata",
          name: "/tourism/venue-list",
          icon: "storefront",
        },
        {
          label: "Wahana Wisata",
          name: "/tourism/facilities-list",
          icon: "person",
        },
        {
          label: "Harga Wisata",
          name: "/tourism/price-list",
          icon: "add_shopping_cart",
        },
      ],

      pages: [
        {
          label: "Tentang",
          name: "/lagia/about",
          icon: "info",
        },
        {
          label: "Kontak",
          name: "/lagia/contact-us",
          icon: "info",
        },
        {
          label: "Layanan",
          name: "/lagia/service",
          icon: "info",
        },
        {
          label: "Karir",
          name: "/lagia/career",
          icon: "info",
        },
        {
          label: "Gallery",
          name: "/lagia/gallery",
          icon: "info",
        },
        // {
        //   label: "Destinasi",
        //   name: "/lagia/destination",
        //   icon: "info",
        // },
        // {
        //   label: "Testimoni",
        //   name: "/lagia/testimonial",
        //   icon: "info",
        // },
        {
          label: "Faq",
          name: "/lagia/faq",
          icon: "info",
        },
      ],
    };
  },
  computed: {
    getPagaActiveClass() {
      this.pages.forEach((element) => {
        if (this.$route.name == element?.name) return true;
        else false;
      });
    },
  },
  methods: {
    async goLogout() {
      const resp = await this.onLogout();
      console.log("goLogout", resp?.data?.isLogin);
      if (resp?.data?.isLogin) this.$router.push({ name: "/login" });
    },
  },
  setup() {
    const initStore = useInitStore();
    const { getInfoPrivasi, getInfoSyarat } = storeToRefs(initStore); // have all reactive states here

    const store = useAuthStore();
    const { onLogout } = store;
    const { getAuth } = storeToRefs(store);

    return {
      getInfoPrivasi,
      getInfoSyarat,
      onLogout,
      // form_login,
      // auth,
      // loading,
      getAuth,
    };
  },
  watch: {
    "$route.name": function (val) {
      this.link = val;
    },
    // getInfoPrivasi(val) {
    //   if (val) {
    //     this.pages.push({
    //       name: "/info/single-page",
    //       params: {
    //         slug: val?.slug,
    //         id: val?.id,
    //       },
    //     });
    //   }
    // },
    // getInfoSyarat(val) {
    //   if (val) {
    //     this.pages.push({
    //       name: "/info/single-page",
    //       params: {
    //         slug: val?.slug,
    //         id: val?.id,
    //       },
    //     });
    //   }
    // },
  },
  mounted() {
    this.link = this.$route.name;
  },
};
</script>
