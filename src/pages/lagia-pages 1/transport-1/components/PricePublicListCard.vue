<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-img style="height: 300px" :src="item?.image" :error-src="$defaultErrorImage">
        <q-badge
          :color="item?.ticketStatus == 'bisnis' ? 'pink' : 'positive'"
          class="q-mr-lg rounded-borders-2"
          style="margin-top: -17px"
          floating
          ><span class="text-title text-uppercase q-mt-md">{{
            item?.ticketStatus
          }}</span></q-badge
        >
        <template v-slot:error>
          <div class="absolute-full flex flex-center">Error encountered</div>
          <q-badge
            :color="item?.ticketStatus == 'bisnis' ? 'pink' : 'positive'"
            class="q-mr-lg rounded-borders-2"
            style="margin-top: -17px"
            floating
            ><span class="text-title text-uppercase q-mt-md">{{
              item?.ticketStatus
            }}</span></q-badge
          >
        </template>
      </q-img>
      <q-card-section>
        <!-- <div class="text-overline text-uppercase text-orange-9">{{ item?.category }}</div> -->

        <q-chip
          color="orange-9"
          text-color="white"
          icon="label"
          class="text-overline text-uppercase"
          >{{
            item?.category ? item?.category : item?.travelReservation?.category
          }}</q-chip
        >

        <div class="text-h6 q-mt-sm q-mb-xs">{{ item?.name }}</div>
        <q-item-label caption>{{ item?.createdAt }}</q-item-label>

        <div class="row text-white">
          <q-item-section class="bg-primary q-mt-lg col-auto rounded-borders-1 q-pa-md">
            <q-item-label class="text-white">Start From</q-item-label>
            <q-item-label class="text-h4">Rp. {{ item?.generalPrice }}</q-item-label>
          </q-item-section>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">uuid</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ item?.uuid }}</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">store id</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label >{{ item?.uuid }}</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">general price</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ item?.generalPrice }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">discount price</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>(hingga) {{ item?.discountPrice }}%</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">cashback price</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>(hingga) {{ item?.cashbackPrice }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">Jumlah Kursi</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ item?.seatCount }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">stok</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ item?.quantity }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">kategori</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{
                item?.category ? item?.category : item?.travelReservation?.category
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">Tiket Status</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>{{ item?.ticketStatus }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- <q-separator></q-separator> -->

      <q-card-section class="q-pa-none">
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section> Rute Perjalanan </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              {{ item?.route }}
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- <q-item-label header>Rute Perjalanan</q-item-label>
        <q-item class="col-12 q-pt-none">
          <q-item-section>
            <q-item-label
              >{{ item?.route }} </q-item-label
            >
          </q-item-section>
        </q-item> -->
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <q-btn-group spread outline>
          <q-btn
            @click="
              $emit('onBubbleEvent', { label: 'vendor', payload: item?.travelStore })
            "
            label="Vendor"
            icon="storefront"
          />
          <q-btn
            @click="
              $emit('onBubbleEvent', {
                label: 'buat reservasi',
                payload: item,
              })
            "
            label="buat Reservasi"
            icon="confirmation_number"
          />
          <!-- <q-btn label="Second" icon="visibility" /> -->
          <!-- <q-btn label="Second" icon="visibility" /> -->
        </q-btn-group>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-actions class="q-pa-none" align="center">
        <q-btn
          @click="
            $emit('onBubbleEvent', {
              label: 'detail',
              payload: item,
            })
          "
          flat
          color="primary"
          label="selengkapnya"
        />
      </q-card-actions>

      <!-- <q-separator></q-separator>

      <q-card-actions class="q-pa-md">
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
