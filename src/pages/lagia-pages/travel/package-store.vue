<template>
  <!-- <main> -->
  <InnerBanner :_title="$route?.meta?.title"></InnerBanner>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <div v-for="(item, index) in records" class="col-12">
        <q-card flat class="rounded-borders-2">
          <q-card-section :horizontal="$q.screen.width > 768" class="row q-pa-none">
            <q-img
              loading="lazy"
              :ratio="16 / 9"
              class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
              :src="item?.image[0]"
            >
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-negative text-white">
                  Cannot load image {{ item?.image[0] }}
                </div>
              </template>
            </q-img>

            <q-card-section class="bg-grey-2 row col flex items-start">
              <div class="text-box q-mt-lg full-width q-px-sm col-12">
                <h3>{{ item?.name }}</h3>
                <q-item dense>
                  <q-item-section>
                    <q-item-label lines="1">location</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">{{ item?.location }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense>
                  <q-item-section>
                    <q-item-label lines="1">address:</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">{{ item?.address }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense>
                  <q-item-section>
                    <q-item-label lines="1">codepos:</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">{{ item?.codepos }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense>
                  <q-item-section>
                    <q-item-label lines="1">city: </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">{{ item?.city }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense>
                  <q-item-section>
                    <q-item-label lines="1">country:</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label lines="1">{{ item?.country }}</q-item-label>
                  </q-item-section>
                </q-item>
                <!-- <q-item dense>
                  <q-item-section>
                    <q-item-label caption lines="1">policy:</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption lines="1">{{ item?.policy }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense>
                  <q-item-section>
                    <q-item-label caption lines="1">description:</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption lines="1">{{ item?.description }}</q-item-label>
                  </q-item-section>
                </q-item> -->

                <!-- <q-item-label caption lines="1">address: {{ item?.address }}</q-item-label>
                <q-item-label caption lines="1">codepos: {{ item?.codepos }}</q-item-label>
                <q-item-label caption lines="1">city: {{ item?.city }}</q-item-label>
                <q-item-label caption lines="1">country: {{ item?.country }}</q-item-label>
                <q-item-label caption lines="1">policy: {{ item?.policy }}</q-item-label>
                <q-item-label caption lines="1">description: {{ item?.description }}</q-item-label> -->
              </div>

              <div class="col-12 q-mt-md" v-if="item?.category">
                <template
                  v-for="(category, category_index) in item?.category?.split(',')"
                >
                  <q-chip
                    color="blue-5"
                    text-color="white"
                    icon="label"
                    class="text-capitalize"
                    >{{ category }}</q-chip
                  >
                </template>

                <!-- <q-chip outline color="orange" icon="schedule"> 7D/6N</q-chip>
                <q-chip outline color="pink" icon="group">pax: 10</q-chip>
                <q-chip outline color="green" icon="location_on">Malaysia</q-chip> -->
              </div>
            </q-card-section>

            <q-card-section
              class="bg-light-blue-8 col-xl-4 col-lg-4 col-md-4 col-sm-5 col-12 row flex flex-center text-white q-pt-lg"
            >
              <q-badge
                color="pink"
                class="q-mr-lg rounded-borders-2"
                style="margin-top: -10px"
                floating
                ><span class="text-title q-ma-sm">Vendor</span></q-badge
              >

              <q-rating
                v-if="item?.travelRatingAvg?.AvgRating"
                readonly
                v-model="item.travelRatingAvg.AvgRating"
                size="sm"
                :max="5"
                color="white"
              ></q-rating>

              <q-rating
                v-else
                readonly
                v-model="ratingZero"
                size="sm"
                :max="5"
                color="white"
              ></q-rating>

              <div class="text-body text-center q-mx-sm">review (34)</div>
              <div class="package-price col-12 text-center row">
                <h6 class="col-12">
                  {{ item?.travelPricesCount }}
                  <small class="text-weight-light">item</small>
                </h6>
                <small class="col-12 text-center">/ price available</small>
              </div>

              <div class="row col-12 justify-center">
                <q-btn
                  unelevated
                  outline
                  rounded
                  dense
                  class="q-px-lg q-py-sm q-mb-sm q-mt-md rounded-borders-3 text-weight-light"
                  color="white"
                  label="Price List"
                />
                <div class="col-1"></div>
                <q-btn
                  unelevated
                  outline
                  rounded
                  dense
                  class="q-px-lg q-py-sm q-mb-sm q-mt-md rounded-borders-3 text-weight-light"
                  color="white"
                  label="Visit Profile"
                />
              </div>
            </q-card-section>
          </q-card-section>

          <!-- <q-card-action>
              <q-item-label class="text-black text-center" lines="3">{{ item?.subtitle }}</q-item-label>
            </q-card-action> -->
        </q-card>
      </div>
      <q-pagination
        :disable="loading"
        class="q-mt-lg"
        size="lg"
        v-model="currentPage"
        :max="lastPage"
        :max-pages="6"
        :input="$q.screen.size < 425"
        direction-links
        outline
        color="blue"
        active-design="unelevated"
        active-color="primary"
        active-text-color="white"
      />
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
// preFetch: preFetch(async ({ store, currentRoute }) => {
//   const mystore = useYoutubeListStore(store);
//   await mystore.request({
//     page: currentRoute.params.page
//   });
// }),
import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";

import { useTravelStoresStore } from "stores/lagia-stores/travel/TravelStoresStore";
const store = useTravelStoresStore();
const { onFetch } = store; // have all reactive states here
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
} = storeToRefs(store); // have all reactive states here

onFetch();

const onCurrentPage = async (val) => {
  console.log("onCurrentPage", val);
  onFetch();
};
watch(() => currentPage, onCurrentPage, {
  deep: true,
  immediate: true,
});

const ratingZero = 0;

const content = {
  title: "TOUR PACKAGES",
  cards: [
    {
      id: "1",
      rating: 4,
      icon: "hotel",
      title: "BEST HOTELS",
      image: "assets/images/img4.jpg",
      subtitle:
        "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
    },
    {
      id: "1",
      rating: 4,
      icon: "flight_takeoff",
      title: "TRAVEL INSURANCE",
      image: "assets/images/img28.jpg",
      subtitle:
        "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
    },
    {
      id: "1",
      rating: 4,
      icon: "store_mall_directory",
      title: "ACCESSIBILITY",
      image: "assets/images/img12.jpg",
      subtitle:
        "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
    },
    {
      id: "1",
      rating: 4,
      icon: "sticky_note_2",
      title: "ONLINE BOOKING",
      image: "assets/images/img13.jpg",
      subtitle:
        "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
    },
    {
      id: "1",
      rating: 4,
      icon: "directions_bus",
      title: "BEST TOUR",
      image: "assets/images/img17.jpg",
      subtitle:
        "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
    },
    {
      id: "1",
      rating: 4,
      icon: "support_agent",
      title: "FAST SUPPORT",
      image: "assets/images/img10.jpg",
      subtitle:
        "Donec temporibus consectetuer, repudiandae integer pellentesque aliquet justo at sequi, atque quasi.",
    },
  ],
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
