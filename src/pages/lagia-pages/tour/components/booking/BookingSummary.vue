<template>
  <q-card flat bordered class="booking-section rounded-borders-2 bg-grey-1">

    <q-card-actions align="center">
      <q-chip
        id="summary-title"
        class="rounded-borders-2 full-width row justify-center"
        rounded
        label="REKENING BANK"
        color="form"
        text-color="white"
        size="lg"
      ></q-chip>
    </q-card-actions>

    <q-separator></q-separator>

    <q-list separator bordered padding class="text-center q-ma-md bg-white">
      <q-item>
        <q-item-section>
          <q-item-label class="text-bold" lines="1">MANDIRI</q-item-label>
          <!-- <q-item-label class="" lines="1">MANDIRI</q-item-label> -->
          <q-item-label class="text-h5" lines="2">
          123456 4564 5555
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-bold" lines="1">BCA</q-item-label>
          <!-- <q-item-label class="" lines="1">BCA</q-item-label> -->
          <q-item-label class="text-h5" lines="2">
          123456 4564 5555
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-bold" lines="1">BRI</q-item-label>
          <!-- <q-item-label class="" lines="1">BRI</q-item-label> -->
          <q-item-label class="text-h5" lines="2">
          123456 4564 5555
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-bold" lines="1">BTN</q-item-label>
          <!-- <q-item-label class="" lines="1">BTN</q-item-label> -->
          <q-item-label class="text-h5" lines="2">
          123456 4564 5555
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator></q-separator>

    <q-card-actions align="center">
      <q-item-label class="text-h5" lines="1">PT. ANANDI</q-item-label>
    </q-card-actions>
  </q-card>
</template>

<style>
#summary-title .ellipsis {
  width: 100%;
  text-align: center;
}
</style>
