<template>
  <div class="row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section class="custom q-pa-none">
        <q-list class="row flex items-start text-caption text-dark">
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">id</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.id }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">uuid</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.uuid }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">customer Id</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.customerId }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">name Passanger</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.namePassanger }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">ktp Passanger</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.birthDate }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">category</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.category }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">min Budget</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.minBudget }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">max Budget</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.maxBudget }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">ticket Status</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.ticketStatus }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">description</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.description }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">starting Date</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.startingDate }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">starting Time</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.startingTime }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">starting Location</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.startingLocation }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">arrival Location</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.arrivalLocation }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">starting Terminal</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.startingTerminal }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">arrival Terminal</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.arrivalTerminal }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">isReserved</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.isReserved }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">created At</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.createdAt }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-12">
            <q-item-section>
              <q-item-label class="text-capitalize">updated At</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label lines="1">{{ record?.updatedAt }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: ["record"],
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
