<template>
  <div class="call-action-box bg-color-callback row justify-center">
    <div class="col-xl-6 col-lg-8 col-md-11 col-sm-12 col-12 text-center q-px-md">
      <h6 class="text-blue">BEST PRICE OFFER</h6>
      <h2>LAGIA HOTEL</h2>
      <p>
        Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
        Vestibulum cumque laudantium. Sit ornare mollitia tenetur, aptent.
      </p>
    </div>
  </div>

  <q-no-ssr>
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

    <!-- ROOMS -->
    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="lodge_rooms"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">List Kamar</div>
            <q-space></q-space>
            <!-- <q-btn dense flat icon="list" @click="rental_vehicle_modal = true"></q-btn> -->
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <LodgeRoomsDialog :item="record"></LodgeRoomsDialog>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- FASILITAS -->
    <q-dialog
      full-width
      v-model="lodge_facility"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6">Fasilitas Umum</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <q-list bordered class="row">
            <isQItemLabelValueIcon
              label="Sport"
              icon="fa-solid fa-baseball"
              :value="record?.lodgeFacility?.facilitySport"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="Service"
              icon="fa-solid fa-hand-holding-hand"
              :value="record?.lodgeFacility?.facilityService"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="Public"
              icon="fa-solid fa-user-group"
              :value="record?.lodgeFacility?.facilityPublic"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="Kid & Pet"
              icon="fa-solid fa-paw"
              :value="record?.lodgeFacility?.facilityKidPet"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="In Room"
              icon="fa-solid fa-door-closed"
              :value="record?.lodgeFacility?.facilityInRoom"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="General"
              icon="fa-solid fa-house-user"
              :value="record?.lodgeFacility?.facilityGeneral"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="Connectivity"
              icon="fa-solid fa-hand-point-up"
              :value="record?.lodgeFacility?.facilityConnectivity"
            ></isQItemLabelValueIcon>
            <isQItemLabelValueIcon
              label="Business"
              icon="fa-solid fa-briefcase"
              :value="record?.lodgeFacility?.facilityBusiness"
            ></isQItemLabelValueIcon>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      full-width
      full-height
      :maximized="$q.screen.width <= 768"
      v-model="modal_detail"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :style="$q.screen.width > 768 ? 'width: 750px !important' : ''">
        <q-card-section class="q-py-none">
          <q-toolbar style="height: 50px" class="q-pa-none">
            <div class="text-h6 text-capitalize">Detail Hotel</div>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup></q-btn>
          </q-toolbar>
        </q-card-section>

        <q-separator />

        <q-card-section style="height: calc(99.5% - 50px)" class="scroll">
          <ProfileDialogCard :item="record"></ProfileDialogCard>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-no-ssr>

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
        <q-card flat bordered class="rounded-borders-2">
          <q-card-section :horizontal="$q.screen.width > 768" class="row q-pa-none">
            <q-img
              v-if="item?.image && item?.image.length > 0"
              loading="lazy"
              :ratio="16 / 9"
              class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
              :src="item?.image[0]"
            >
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

              <template v-slot:error>
                <div class="absolute-full flex flex-center text-white">
                  Cannot load image
                </div>
              </template>
            </q-img>
            <q-img
              loading="lazy"
              :ratio="16 / 9"
              class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
              v-else
              :src="$defaultUser"
            />

            <q-card-section class="bg-grey-2 row col flex items-start">
              <div class="text-box full-width q-px-sm col-12 text-capitalize">
                <q-item
                  dense
                  clickable
                  class="q-pa-none"
                  :to="{
                    name: '/profile/room-list',
                    query: {
                      vendor: item?.id,
                    },
                  }"
                >
                  <q-item-section class="text-h6">
                    <q-item-label>{{ item?.name }}</q-item-label>
                  </q-item-section>
                </q-item>

                <isQItemLabelSimpleValue
                  label="rating"
                  :value="item?.rating"
                ></isQItemLabelSimpleValue>

                <isQItemLabelSimpleValue
                  label="kamar"
                  :value="item?.rooms + ' unit'"
                ></isQItemLabelSimpleValue>

                <isQItemLabelSimpleValue
                  @onBubbleEvent="
                    dialog_value = true;
                    dialog_payload = { value: item?.address, label: 'address' };
                  "
                  :clickable="true"
                  label="address"
                  value="Detail"
                  textcolor="text-primary"
                ></isQItemLabelSimpleValue>

                <isQItemLabelSimpleValue
                  @onBubbleEvent="
                    dialog_value = true;
                    dialog_payload = { value: item?.location, label: 'location' };
                  "
                  :clickable="true"
                  label="location"
                  value="Detail"
                  textcolor="text-primary"
                ></isQItemLabelSimpleValue>

                <q-item dense>
                  <q-item-section>
                    <q-item-label>types</q-item-label>
                    <q-item-label class="">
                      <template v-for="(val, index) in getCategory(item?.types)">
                        <q-chip color="blue" class="q-ml-none" text-color="white">{{
                          val
                        }}</q-chip>
                      </template>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <isAvailable :item="item?.isAvailable"></isAvailable>
              </div>
            </q-card-section>

            <q-card-section
              class="bg-cyan-8 col-xl-4 col-lg-4 col-md-4 col-sm-5 col-12 row flex flex-center text-white q-pt-lg"
            >
              <q-rating
                v-if="item?.ratingAvg?.avgRating"
                readonly
                v-model="item.ratingAvg.avgRating"
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

              <div v-if="false" class="full-width text-body text-center q-mx-sm">
                Review (34)
              </div>
              <div class="package-price col-12 text-center row q-mt-md">
                <h6 class="col-12">
                  {{ item?.lodgeRoomsCount }}
                  <small class="text-weight-light"> Kamar</small>
                </h6>
                <small class="col-12 text-center text-caption">( Tipe Ready )</small>
              </div>

              <div class="row col-12 justify-center">
                <q-btn-group outline rounded class="">
                  <q-btn
                    @click="
                      modal_detail = true;
                      record = item;
                    "
                    outline
                    class="text-weight-normal"
                    color="form"
                    text-color="white"
                    label="Detail"
                  />
                  <q-separator vertical></q-separator>
                  <q-btn
                    @click="
                      lodge_facility = true;
                      record = item;
                    "
                    outline
                    class="text-weight-normal"
                    color="form"
                    text-color="white"
                    label="Fasilitas"
                  />
                  <q-separator vertical></q-separator>
                  <q-btn
                    @click="
                      lodge_rooms = true;
                      record = item;
                    "
                    outline
                    class="text-weight-normal"
                    color="form"
                    text-color="white"
                    label="Kamar"
                  />
                </q-btn-group>
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="text-center full-width top-margin-1">
      <q-btn
        icon-right="arrow_forward"
        size="18px"
        style="height: 50px"
        unelevated
        rounded
        class="rounded-borders-4"
        color="primary"
        label="selengkapnya"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["records"],
};
</script>

<script async setup>
import ProfileDialogCard from "./components/ProfileDialogCard";
import LodgeRoomsDialog from "./components/LodgeRoomsDialog";

import { storeToRefs } from "pinia";
import { useQuasar, Cookies } from "quasar";
import { ref, nextTick, watch, onMounted } from "vue";

import { useGlobalEasyLightbox } from "src/stores/lagia-stores/GlobalEasyLightbox";

import { useRouter, onBeforeRouteLeave } from "vue-router";

const lightbox = useGlobalEasyLightbox();
const { showMultiple } = lightbox;

const ratingZero = 0.0;

const record = ref(null);

const modal_detail = ref(false);
const lodge_rooms = ref(false);
const lodge_facility = ref(false);

const dialog_payload = ref(null);
const dialog_value = ref(false);

function closeDialog() {
  record.value = null;

  modal_detail.value = false;
  lodge_rooms.value = false;
  lodge_facility.value = false;

  dialog_payload.value = null;
  dialog_value.value = false;
}

onBeforeRouteLeave((to, from, next) => {
  closeDialog();
  return next();
});

function getCategory(item) {
  if (!item) return [];
  try {
    return item.split(",");
  } catch (error) {
    return item;
  }
}
</script>

<style scoped>
.content-page-section {
  /* padding-bottom: 80px; */
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
  padding-bottom: 50px;
}
.bg-light-grey {
  background-color: #f8f8f8;
}
</style>
