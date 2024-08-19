<template>
  <q-card-section :horizontal="$q.screen.width > 768" class="row q-pa-none">
    <isModalDescription ref="isModal"></isModalDescription>


    <q-img
      v-if="item?.image && item?.image.length > 0"
      loading="lazy"
      :ratio="16 / 9"
      class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
      :src="item?.image[0]"
      :error-src="$defaultErrorImage"
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

      <q-item-label class="absolute-bottom text-center" header>VENDOR</q-item-label>

      <template v-slot:error>
        <div class="absolute-full flex flex-center text-white">Cannot load image</div>
      </template>
    </q-img>
    <q-img
      loading="lazy"
      :ratio="16 / 9"
      class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
      v-else
      :src="$defaultErrorImage"
    >
      <q-item-label class="absolute-bottom text-center" header>VENDOR</q-item-label>
    </q-img>
    <q-card flat class="full-width">
      <q-card-section class="q-pa-none row">
        <q-item
          v-ripple
          clickable
          class="col-auto"
          :to="{
            name: '/tour/store-detail',
            params: {
              slug: item?.id,
              slug_text: item?.name,
            },
          }"
        >
          <q-item-section class="text-h6">
            <q-item-label>{{ item?.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="q-px-none">
        <!-- <div class="text-box full-width q-px-sm col-12 text-capitalize"> -->

        <isQItemLabelSimpleValue
          label="Email"
          :value="item?.email"
        ></isQItemLabelSimpleValue>
        <isQItemLabelSimpleValue
          label="Telepon"
          :value="item?.phone"
        ></isQItemLabelSimpleValue>

        <isQItemLabelSimpleValue
          label="Kodepos"
          :value="item?.codepos"
        ></isQItemLabelSimpleValue>
        <isQItemLabelSimpleValue
          label="Kota"
          :value="item?.city"
        ></isQItemLabelSimpleValue>
        <isQItemLabelSimpleValue
          label="Provinsi"
          :value="item?.province"
        ></isQItemLabelSimpleValue>
        <isQItemLabelSimpleValue
          label="Negara"
          :value="item?.country"
        ></isQItemLabelSimpleValue>

        <isQItemLabelSimpleValue
          v-if="item?.address"
          @onBubbleEvent="
            $refs.isModal.onOpen({
              dialog_value: true,
              dialog_payload: { value: item?.address, label: 'Alamat' },
            })
          "
          :clickable="true"
          label="Alamat"
          value="Detail"
          textcolor="text-primary"
        ></isQItemLabelSimpleValue>

        <isQItemLabelSimpleValue
          v-if="item?.policy"
          @onBubbleEvent="
            $refs.isModal.onOpen({
              dialog_value: true,
              dialog_payload: { value: item?.policy, label: 'Kebijakan' },
            })
          "
          :clickable="true"
          label="Kebijakan"
          value="Detail"
          textcolor="text-primary"
        ></isQItemLabelSimpleValue>

        <isQItemLabelSimpleValue
          v-if="item?.description"
          @onBubbleEvent="
            $refs.isModal.onOpen({
              dialog_value: true,
              dialog_payload: { value: item?.description, label: 'Deskripsi' },
            })
          "
          :clickable="true"
          label="Deskripsi"
          value="Detail"
          textcolor="text-primary"
        ></isQItemLabelSimpleValue>

        <isQItemLabelSimpleValue
          @onBubbleEvent="
            $refs.isModal.onOpen({
              dialog_value: true,
              dialog_payload: { value: item?.location, label: 'Lokasi' },
            })
          "
          :clickable="true"
          label="Lokasi"
          value="Detail"
          textcolor="text-primary"
        ></isQItemLabelSimpleValue>
      </q-card-section>
    </q-card>
  </q-card-section>
</template>

<script>
export default {
  props: ["item"],
};
</script>
