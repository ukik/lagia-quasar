<template>
  <form class="row q-col-gutter-md" @submit.prevent.stop="onSubmit">
    <!-- {{ additional?.provinceOptions }} -->
    <!-- name:'', -->
    <div class="col-12 q-mb-none">
      <q-card-actions class="q-pa-none" align="between">
      <q-btn :loading="loading"
        icon="refresh"
        unelevated
        color="form"
        label="reset"
        @click="onReset"
      ></q-btn>

        <div>

          <q-btn color="primary" outline no-caps disable :label="`Ditemukan: ${totalItem} Item`"></q-btn>
        </div>
      <!-- <q-separator class="full-width q-mt-md"></q-separator> -->
    </q-card-actions>
    </div>

    <div class="col-12" v-if="false">
      <q-input

        :loading="loading"
        :disable="loading"
        clearable
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="nameRef"
        v-model="name"
        placeholder="Ketik pencarian"
        hint="Kata kunci"
      >
        <!-- <template v-slot:prepend>
          <q-icon name="fa-solid fa-child-reaching" />
        </template> -->
        <template v-slot:after>
          <q-btn
            @click="onSubmit"
            :loading="loading"
            :disable="loading"
            unelevated
            color="form"
            class="full-height"
            icon="search"
          />
        </template>
      </q-input>
    </div>

    <!-- category:'', -->
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
      <q-select
        :loading="loading"
        :disable="loading"
        :debounce="300"
        clearable
        map-options
        emit-value
        option-label="label"
        option-value="value"
        :options="additional?.categoryOptions"
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="categoryRef"
        v-model="category"
        placeholder="Kategori"
        hint="Kategori"
      >
      </q-select>
    </div>
    <!-- durasi:'', -->
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
      <q-select
        :loading="loading"
        :disable="loading"
        :debounce="300"
        clearable
        map-options
        emit-value
        option-label="label"
        option-value="value"
        :options="additional?.durasiOptions"
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="durasiRef"
        v-model="durasi"
        placeholder="Durasi"
        hint="Durasi"
      >
      </q-select>
    </div>
    <!-- level:'', -->
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
      <q-select
        :loading="loading"
        :disable="loading"
        :debounce="300"
        clearable
        map-options
        emit-value
        option-label="label"
        option-value="value"
        :options="additional?.levelOptions"
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="levelRef"
        v-model="level"
        placeholder="Level Petualangan"
        hint="Level Petualangan"
      >
      </q-select>
    </div>

    <!-- country :'', -->
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
      <q-select
        :loading="loading"
        :disable="loading"
        :debounce="300"
        clearable
        map-options
        emit-value
        option-label="label"
        option-value="value"
        :options="additional?.countryOptions"
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="countryRef"
        v-model="country"
        placeholder="Negara"
        hint="Negara"
      >
      </q-select>
    </div>

    <!-- province:'', -->
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
      <q-select
        :loading="loading"
        :disable="loading"
        :debounce="300"
        clearable
        map-options
        emit-value
        option-label="label"
        option-value="value"
        :options="additional?.provinceOptions"
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="provinceRef"
        v-model="province"
        placeholder="Provinsi"
        hint="Provinsi"
      >
      </q-select>
    </div>
    <!-- city:'', -->
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
      <q-select
        :loading="loading"
        :disable="loading"
        :debounce="300"
        clearable
        map-options
        emit-value
        option-label="label"
        option-value="value"
        :options="additional?.cityOptions"
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="cityRef"
        v-model="city"
        placeholder="Kota"
        hint="Kota"
      >
      </q-select>
    </div>

    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
      <q-input
        :loading="loading"
        :disable="loading"
        :debounce="500"
        clearable
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="priceMinRef"
        v-model="price_min"
        placeholder=""
        hint="Harga Minimal"
      >
      </q-input>
    </div>

    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
      <q-input
        :loading="loading"
        :disable="loading"
        :debounce="500"
        clearable
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="priceMaxRef"
        v-model="price_max"
        placeholder=""
        hint="Harga Maksimal"
      >
      </q-input>
    </div>

    <!-- <div class="col-12">
      <q-input
        type="textarea"
        clearable
        dense
        bg-color="white"
        outlined
        color="primary"
        ref="descRef"
        v-model="description"
        placeholder="Permintaan Khusus"
        hint="Permintaan Khusus"
        error-message="Permintaan Khusus"
      >
        <template v-slot:prepend>
          <q-icon name="description" />
        </template>
      </q-input>
    </div> -->
  </form>
</template>

<script>
import { storeToRefs, mapState, mapWritableState } from "pinia";

import { useTourProductListStore } from "src/stores/lagia-stores/tour/TourProductListStore";

// import { useInitStore } from "src/stores/lagia-stores/page/InitStore";

import { Cookies, date } from "quasar";

export default {
  computed: {
    // ...mapState(useInitStore, ["page_hotel_level_price"]),
    ...mapState(useTourProductListStore, ["additional", "loading","totalItem"]),
    ...mapWritableState(useTourProductListStore, [
      "name",
      "category",
      "durasi",
      "level",
      "province",
      "city",
      "country",
      "price_min",
      "price_max",

      "is_loadmore",
    ]),
  },
  watch: {
    name(val) {
      this.onSubmit();
    },
    category(val) {
      this.onSubmit();
    },
    durasi(val) {
      this.onSubmit();
    },
    level(val) {
      this.onSubmit();
    },
    province(val) {
      this.onSubmit();
    },
    city(val) {
      this.onSubmit();
    },
    country(val) {
      this.onSubmit();
    },
    price_min(val) {
      this.onSubmit();
    },
    price_max(val) {
      this.onSubmit();
    },
  },
  methods: {
    // minPrice(val) {
    //   const vm = this;
    //   if(!vm.price_min) return
    //   if(!vm.price_max) return
    //   if(!vm.price_max <= 0) return
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       const stat = val > Number(vm.price_max);
    //       console.log('minPrice', stat)
    //       if (stat) {
    //         vm.price_min = 0
    //         reject('Maksimal Rp.'+vm.price_max);
    //       }

    //       resolve(true);
    //     }, 0);
    //   });
    // },
    // maxPrice(val) {
    //   const vm = this;
    //   if(!vm.price_max) return
    //   if(!vm.price_min) return
    //   if(!vm.price_min <= 0) return
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       const stat = val < Number(vm.price_min);
    //       console.log('maxPrice', stat)
    //       if (stat) {
    //         vm.price_max = 0
    //         reject('Minimal Rp.'+vm.price_min);
    //       }

    //       resolve(true);
    //     }, 0);
    //   });
    // },
    async onSubmit() {
      this.is_loadmore = false;

      const currentRoute = this.$route;
      this.$router.push({
        query: {
          ...currentRoute.query,
          page: 1,
          name: this.name,
          category: this.category,
          durasi: this.durasi,
          level: this.level,
          province: this.province,
          city: this.city,
          country: this.country,
          price_min: this.price_min,
          price_max: this.price_max,
        },
      });
    },
    onReset() {
      this.name = "";
      this.category = "";
      this.durasi = "";
      this.level = "";
      this.province = "";
      this.city = "";
      this.country = "";
      this.price_min = "";
      this.price_max = "";

      this.onSubmit();
    },
  },
};
</script>

<style>
#FormTour .q-field--with-bottom {
  /* padding-bottom: 0px; */
}
</style>
