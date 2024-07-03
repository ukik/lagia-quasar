<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-item class="rounded-borders-1 bg-grey-1" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img v-if="item?.badasoUser?.avatar" :src="item?.badasoUser?.avatar" />
            <img
              v-else
              :src="$defaultErrorImage"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ item?.badasoUser?.name }}</q-item-label>
          <q-item-label caption lines="2">
            {{ item?.badasoUser?.username }}
            <span v-if="$q.screen.width < 768">({{ item?.badasoUser?.createdAt }})</span>
          </q-item-label>
        </q-item-section>

        <!-- <q-badge floating class="q-pa-xs q-mr-md text-uppercase">
          {{ item?.ticketStatus }}
        </q-badge> -->
        <!-- <q-item-section v-if="$q.screen.width > 425" class="text-caption" side top>{{
          item?.badasoUser?.createdAt
        }}</q-item-section> -->
      </q-item>

      <q-separator></q-separator>

      <q-card-actions align="center" class="">
        <q-chip
          color="orange-9"
          text-color="white"
          class="text-overline text-uppercase"
          >{{ item?.category }}</q-chip
        >
        <q-chip color="form" text-color="white" class="text-overline text-uppercase">{{
          item?.ticketStatus
        }}</q-chip>
      </q-card-actions>

      <q-separator></q-separator>

      <q-banner
        flat
        v-if="!$stringToBoolean(item?.isReserved) && !item?.travelPrice"
        inline-actions
        class="text-white bg-red"
      >
        <template v-slot:avatar>
          <q-icon name="warning" color="white" />
        </template>
        Penawaran belum diterbitkan
      </q-banner>
      <q-banner
        flat
        v-if="!$stringToBoolean(item?.isReserved) && item?.travelPrice"
        inline-actions
        class="text-white bg-blue"
      >
        <template v-slot:avatar>
          <q-icon name="description" color="white" />
        </template>
        Penawaran sudah diterbitkan
        <!-- <template v-slot:action>
          <q-btn outline color="white" size="md" label="book now" />
        </template> -->
      </q-banner>
      <q-banner
        flat
        v-if="$stringToBoolean(item?.isReserved)"
        inline-actions
        class="text-white bg-green"
      >
        <template v-slot:avatar>
          <q-icon name="check_circle" color="white" />
        </template>
        Penawaran di booking
      </q-banner>

      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <!-- <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">id</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.id }}</q-item-label>
            </q-item-section>
          </q-item> -->
          <!-- <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">uuid</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.uuid }}</q-item-label>
            </q-item-section>
          </q-item> -->
          <!-- <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">customer Id</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.customerId }}</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">name Passanger</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.namePassanger }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">ktp Passanger</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.birthDate }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">category</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.category }}</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">min Budget</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.minBudget }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">max Budget</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.maxBudget }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">ticket Status</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.ticketStatus }}</q-item-label>
            </q-item-section>
          </q-item> -->
          <!-- <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">description</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.description }}</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">starting Date</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.startingDate }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">starting Time</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ $formatTime(item?.startingTime) }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">starting Location</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.startingLocation }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">arrival Location</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.arrivalLocation }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">starting Terminal</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.startingTerminal }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">arrival Terminal</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.arrivalTerminal }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">isReserved</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ item?.isReserved }}</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">created At</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ $formatDate(item?.createdAt) }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">updated At</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ $formatDate(item?.updatedAt) }}</q-item-label>
            </q-item-section>
          </q-item> -->
        </q-list>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-btn-group spread outline>
          <q-btn
            @click="
              !item?.travelPrice ? notif() :
              $emit('onBubbleEvent', { label: 'vendor', payload: item?.travelPrice?.travelStore })
            "
            label="vendor"
            icon="storefront"
          />
          <q-btn
            @click="
              !item?.travelPrice ? notif() :
              $emit('onBubbleEvent', {
                label: 'penawaran',
                payload: item?.travelPrice,
              })
            "
            label="penawaran"
            icon="local_offer"
          />
        </q-btn-group>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-actions class="q-pa-none" align="center">
        <q-btn @click="
              $emit('onBubbleEvent', {
                label: 'detail',
                payload: item,
              })
            " flat color="primary" label="selengkapnya" />
      </q-card-actions>

      <!-- <q-separator></q-separator> -->

      <!-- <q-card-actions class="q-pa-md">
        <q-btn
          outline
          icon="shopping_cart_checkout"
          color="primary"
          size="md"
          label="book now"
        />

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-body">
            {{ item?.description }}
          </q-card-section>
        </div>
      </q-slide-transition> -->
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["item"],
  setup() {
    return {
      expanded: ref(false),
    };
  },
  methods: {
    async filterImage(val) {
      let item = val?.travelPrice?.travelStore
      // console.log('filterImage',item)
      // // item.forEach(element => {
      // //   console.log('filterImage',element)
      // //   // element['image'] = JSON.parse(element['image'])
      // //   // element['travelStore']['image'] = JSON.parse(element['travelStore']['image'])
      // // });
      // item['image'] = await JSON.parse(item['image'])
      console.log('filterImage',item)
      return item
    },
    notif() {
      this.$q.notify({
        message: 'Belum ada penawaran',
        color: 'red'
      })
    }
  }
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
