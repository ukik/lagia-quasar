<template>
  <q-list class="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white">
    <q-item :to="goto({
      name: 'video_create'
    })" clickable v-close-popup>
      <q-item-section>Formulir Video</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="fa-solid fa-play" />
      </q-item-section>
    </q-item>
    <q-item :to="goto({
        name: 'audio_create'
      })" clickable v-close-popup>
      <q-item-section>Formulir Audio</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="fa-solid fa-music" />
      </q-item-section>
    </q-item>
    <q-item :to="goto({
        name: 'agenda_create'
      })" clickable v-close-popup>
      <q-item-section>Formulir Agenda</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="fa-regular fa-calendar" />
      </q-item-section>
    </q-item>
    <q-item :to="goto({
        name: 'image_create'
      })" clickable v-close-popup>
      <q-item-section>Formulir Image</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="fa-regular fa-image" />
      </q-item-section>
    </q-item>
    <q-item :to="goto({
        name: 'youtube_create'
      })" clickable v-close-popup>
      <q-item-section>Formulir Youtube</q-item-section>
      <q-item-section avatar>
        <q-icon color="primary" name="fa-brands fa-youtube" />
      </q-item-section>
    </q-item>
  </q-list>
</template>
