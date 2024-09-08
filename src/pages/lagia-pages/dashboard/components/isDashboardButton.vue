<template>
<div class="col-xl-6 col-lg-6 col-sm-12 col-xs-12">
  <q-card flat bordered class="rounded-borders-2 text-dark">
    <q-card-section horizontal class="q-pa-none">
      <q-avatar
        size="120px"
        font-size="50px"
        color="blue"
        text-color="white"
        :icon="item?.icon"
      />

      <q-separator vertical></q-separator>
      <q-card-section class="q-py-sm ">
      <q-item class="q-px-none">
        <q-item-section >
        <q-item-label lines="1" class="text-h5">{{ item?.title }}</q-item-label>
        <q-item-label lines="1" class="text-body2">{{ item?.message }}</q-item-label>
        <q-item-label lines="1" class="text-body2">
          <q-btn
            flat
            v-if="item?.link"
            :to="{
              name: item?.link,
            }"
            unelevated
            rounded
            dense
            class=""
            color="primary"
            label="Selanjutnya"
          />

          <q-btn
            flat
            v-else
            unelevated
            rounded
            dense
            class=""
            color="negative"
            label="Belum Ada"
          />
        </q-item-label>
        </q-item-section>
        </q-item>
      </q-card-section>
    </q-card-section>
    <!--  -->
  </q-card>
</div>
</template>

<script>
export default {
  props:['item']
}
</script>
