<template>
  <!-- <main> -->
  <!-- <InnerBanner :_title="$route?.meta?.title"></InnerBanner> -->

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12 q-px-md"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
      <!-- <div v-if="records.length <= 0 && loading" class="col-12 text-center">
        <q-spinner color="primary" size="3em" />
      </div>
      <div class="col-12" v-if="records.length <= 0 && !loading">
        <NoData></NoData>
      </div> -->

      <div v-for="(item, index) in items" class="col-xl-6 col-lg-6 col-sm-12 col-xs-12">
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
            <q-card-section class="q-py-sm">
              <q-item-label lines="1" class="text-h5">{{ item?.title }}</q-item-label>
              <q-item-label lines="1" class="text-body2">{{item?.message}}</q-item-label>
              <q-item-label lines="1" class="text-body2">

                <q-btn flat
                unelevated
                rounded
                dense
                class=""
                color="primary"
                label="selanjutnya"
              />
              </q-item-label>

            </q-card-section>
          </q-card-section>
          <!--  -->
        </q-card>
      </div>
    </div>
  </div>
  <!-- Call To Action -->
  <!-- <CallActionOffer></CallActionOffer>
  <CallAction></CallAction>
  <div class="call-action-box bg-color-callback bg-light-grey row justify-center">
    <div class="col-xl-6 col-lg-8 col-md-11 col-sm-12 col-12 text-center q-px-md">
      <h5>CALL TO ACTION</h5>
      <h2 class="q-py-lg">READY FOR UNFORGATABLE TRAVEL. REMEMBER US!</h2>
      <p>
        Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo, rutrum.
        Vestibulum cumque laudantium. Sit ornare mollitia tenetur, aptent.
      </p>
      <div class="q-mt-xl">
        <q-btn
          icon="phone"
          dense
          unelevated
          rounded
          class="q-py-md q-px-lg q-ma-sm rounded-borders-4"
          color="primary"
          label="Contact Us!"
        />
        <q-btn
          icon-right="chevron_right"
          dense
          unelevated
          rounded
          outline
          class="q-py-md q-px-lg q-ma-sm rounded-borders-4"
          color="primary"
          label="Learn More"
        />
      </div>
    </div>
  </div> -->
  <!-- </main> -->
</template>

<script async setup>
import { ref } from 'vue';

const items = ref([
  {
    title: 'Keranjang',
    message: 'menunggu proses pemesanan',
    icon: 'shopping_cart'
  },
  {
    title: 'Booking',
    message: 'menunggu proses pembayaran',
    icon: 'shopping_bag'
  },
  {
    title: 'Invoice',
    message: 'menunggu proses pelunasan',
    icon: 'receipt'
  },
  {
    title: 'Biodata',
    message: 'lengkapi data profile',
    icon: 'face'
  },
  {
    title: 'Konfigurasi',
    message: 'pengaturan akses akun',
    icon: 'settings'
  },
  {
    title: 'Alamat',
    message: 'lengkapi alamat booking',
    icon: 'home'
  },
])
</script>

<style scoped>
.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}

.card-box {
  min-height: 400px;
}

.text-box h3 {
  font-size: 22px;
  font-weight: 700;
}

.text-box {
  h3,
  p {
    color: white;
  }
}

.call-action-box p {
  font-size: medium;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

.q-item__label {
  /* margin-bottom: 25px; */
  /* color: white; */
  line-height: 1.6 !important;
}

.bg-color-callback {
  padding-top: 85px;
  padding-bottom: 85px;
}
.bg-light-grey {
  /* background-color: #f8f8f8; */
}
</style>
