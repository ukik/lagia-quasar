<template>
  <div class="call-action-box bg-color-callback row justify-center">
    <div class="col-xl-6 col-lg-8 col-md-11 col-sm-12 col-12 text-center q-px-md">
      <h6 class="text-blue">PHOTO GALLERY</h6>
      <h2>PHOTO'S FROM TRAVELLERS</h2>
      <p>
        Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
        Vestibulum cumque laudantium. Sit ornare mollitia tenetur, aptent.
      </p>
    </div>
  </div>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12 q-px-md"
      :class="[$q.screen.width > 425 ? '' : '', $q.screen.width > 768 ? '' : '']"
    >
      <q-card flat class="col-12 q-pa-none">
        <div class="container">
          <template v-for="(item, i) in records">
            <div class="card">
              <q-img
                @click="showMultiple(records, i)"
                class="rounded-borders-2"
                :src="item"
                :error-src="$defaultUser"
              />
            </div>
          </template>
        </div>
      </q-card>
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

<style scoped>
.container {
  list-style: none;
  column-gap: 10px;
  padding: 0;
  column-count: 1;
}
.card {
  width: 100%;
  height: auto;
  padding: 0;
  padding-bottom: 10px;
  margin: 0;
  box-sizing: border-box;
  /* border: 10px solid #ffffff00; */
  break-inside: avoid;
}

@media (min-width: 320px) and (max-width: 759.5px) {
  .container {
    column-count: 1;
  }
  /* .card {
    border-left: 2px solid #ffffff00;
    border-right: 2px solid #ffffff00;
    border-top: 5px solid #ffffff00;
    border-bottom: 5px solid #ffffff00;
  } */
}
@media (min-width: 760px) and (max-width: 979.5px) {
  .container {
    column-count: 2;
  }
}
@media (min-width: 980px) and (max-width: 1023.5px) {
  .container {
    column-count: 3;
  }
}
@media (min-width: 1024px) {
  .container {
    column-count: 3;
  }
}
</style>

<style scoped>
.content-page-section {
  /* padding-bottom: 80px; */
}

.content-page-section p {
  margin-bottom: 25px;
}

.card-box {
  min-height: 500px;
}

.text-box h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0px;
}

.call-action-box p {
  font-size: medium;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

.q-item__label {
  line-height: 1.6 !important;
}

.bg-color-callback {
  padding-top: 85px;
  padding-bottom: 50px;
}
.bg-light-grey {
  /* background-color: #f8f8f8; */
}
</style>
