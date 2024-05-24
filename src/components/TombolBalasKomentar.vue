<template>
  <!-- <q-item @click="reply = value" class="col-auto q-px-none q-mx-md" clickable dense>
    <q-item-section>
      <q-item-label caption lines="1">Balas</q-item-label>
    </q-item-section>
  </q-item>
  <q-item :to="{
      name: 'video_komentar_balasan',
      params: {
        id: item?.id,
        page: 1,
      }
    }" class="col-auto q-px-none" clickable dense>
    <q-item-section>
      <q-item-label caption lines="1">Lihat komentar</q-item-label>
    </q-item-section>
  </q-item> -->
  <q-item @click="onBalas" class="col-auto q-px-none q-mx-md" clickable dense>
    <q-item-section>
      <q-item-label caption lines="1">Balas</q-item-label>
    </q-item-section>
  </q-item>
  <q-item :to="{
      name: name,
      params: {
        id: id,
        page: 1,
      }
    }" class="col-auto q-px-none" clickable dense>
    <q-item-section>
      <q-item-label caption lines="1">Lihat komentar</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: [
    'name', //'video_komentar_balasan'
    'id',
  ],
  emits:['onBubbleEventReply'],
  methods: {
    onBalas() {
      this.$emit('onBubbleEventReply')
    }
  }
}
</script>
