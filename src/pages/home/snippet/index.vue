<template>

    <q-list style="max-width: 350px">

      <q-item clickable  v-ripple>
        <q-item-section avatar>
          <q-avatar size="65px">
            <img  @error="handleError" :src="imageSync(storeAuth?.user?.avatar)" >
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ storeAuth.user?.slug }}</q-item-label>
          <q-item-label caption lines="1">
            <!-- <span class="text-weight-bold">Janet</span> -->
            {{ storeAuth.user?.name }}
          </q-item-label>
        </q-item-section>

        <!-- <q-item-section side>
          <q-item-label caption lines="1">
            <q-chip :disable="loading_follow" clickable @click="onFollow(); authCheck(); gotoLogin();" class="q-ma-none" :color="!item?.user.follow ? 'positive' : 'primary'"
              size="11px" text-color="white" icon="check">
              {{ !item?.user.follow ? 'Mengikuti' : 'Berhenti Mengikuti' }}
            </q-chip>
          </q-item-label>
        </q-item-section> -->
      </q-item>

      <q-item-label header>Suggested for you:</q-item-label>

      <q-item v-for="(item, index) in suggested" clickable v-ripple>
        <Card :index="index" :item="item"/>
      </q-item>

      <!-- <q-separator /> -->

      <q-item>
        <q-item-section>
          <q-item-label>
            <q-chip @click="underconstruction" clickable unelevated size="12px">About</q-chip>
            <q-chip @click="underconstruction" clickable unelevated size="12px">Help</q-chip>
            <q-chip @click="underconstruction" clickable unelevated size="12px">Press</q-chip>
            <q-chip @click="underconstruction" clickable unelevated size="12px">API</q-chip>
            <q-chip @click="underconstruction" clickable unelevated size="12px">Jobs</q-chip>
            <q-chip @click="underconstruction" clickable unelevated size="12px">Privacy</q-chip>
            <q-chip @click="underconstruction" clickable unelevated size="12px">Terms</q-chip>
            <q-chip @click="underconstruction" clickable unelevated size="12px">Locations</q-chip>
            <q-chip @click="underconstruction" clickable unelevated size="12px">Language</q-chip>
            <q-chip @click="underconstruction" clickable unelevated size="12px">Imajora Verified</q-chip>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label caption>
            © 2023 IMAJORA FROM YUVORIA
          </q-item-label>
        </q-item-section>
      </q-item>



    </q-list>

</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useHomeStore } from 'src/stores/home.js'

import Card from "./card.vue"

export default {
  computed: {
    ...mapState(useHomeStore, {
      suggested: 'suggested',
    }),
  },
  components: {
    Card
  }
}
</script>
