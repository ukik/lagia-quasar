<template>
  <div class="call-action-box bg-color-callback bg-light-grey row justify-center">
    <div
      class="text-center q-px-md row justify-center row justify-start col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
    >
      <h5 class="col-12">{{ item?.setup?.title }}</h5>
      <h2 class="q-py-lg col-12">{{ item?.setup?.subtitle }}</h2>
      <p class="col-xl-9 col-lg-9 col-md-9 col-sm-11 col-12">
        {{ item?.setup?.headline }}
      </p>

      <div class="q-mt-xl col-12 row justify-center q-col-gutter-lg">
        <template v-for="(item, index) in item?.benefit">
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <q-card flat bordered class="rounded-borders-3">
              <q-card-section>
                <div class="full-width text-center q-mt-md">
                  <q-avatar
                    size="80px"
                    font-size="45px"
                    color="primary"
                    text-color="white"
                    :icon="item?.icon"
                  />
                </div>
                <div class="text-box text-center q-my-lg full-width q-px-sm">
                  <h3>{{ item?.title }}</h3>
                  <q-item-label lines="4">{{ item?.description }}</q-item-label>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
const { item } = defineProps(["item"]);
</script>

<style scoped>
.text-box h3 {
  font-size: 22px;
  font-weight: 700;
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
  padding-bottom: 85px;
}
.bg-light-grey {
  background-color: #f8f8f8;
}
</style>
