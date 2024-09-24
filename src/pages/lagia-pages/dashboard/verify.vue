<template>
  <div class="row flex flex-center">
    <div class="col-xl-4 col-lg-6 col-md-7 col-sm-11 col-11 q-pb-xl">
      <isBackButtonPage></isBackButtonPage>

      <FormVerify v-if="!getIsLogin || !getAuthUser?.emailVerifiedAt" class="q-pb-xl" />

      <q-list v-else-if="getAuthUser?.emailVerifiedAt" flat style="height: 400px" class="flex flex-center" bordered>
        <q-card class="text-center" flat>
          <q-avatar size="100px">
            <img src="assets/flaticon/verified.png" />
          </q-avatar>
          <div class="full-width q-mt-md">Akun anda sudah terverifikasi</div>
          <div class="full-width text-h6">Terimakasih</div>
          <div class="full-width q-mt-lg">
            <q-btn
              :to="{
                name: '/lagia/dashboard',
              }"
              outline
              flat
              icon="arrow_back"
              label="kembali"
            />
          </div>
        </q-card>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import FormVerify from "src/components/lagia-components/auth/FormVerify.vue";
</script>
<style scoped>
h2 {
  font-size: 40px;
  font-weight: 800;
}
</style>
