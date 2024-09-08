<template>
  <div class="row flex flex-center">
    <div class="col-xl-4 col-lg-6 col-md-7 col-sm-11 col-11 q-pb-xl">
      <FormVerifyUpdateEmail class="q-pb-xl" />
    </div>
  </div>
</template>

<script setup>
import FormVerifyUpdateEmail from './components/FormVerifyUpdateEmail.vue';

// import { useCustomerStore } from "stores/lagia-stores/page/CustomerStore";
// import { useAuthStore } from 'src/stores/lagia-stores/auth/AuthStore';

// import { storeToRefs } from "pinia";
// import { useQuasar, Cookies } from "quasar";
// import { ref, nextTick, watch, onMounted } from "vue";
// import { preFetch } from "quasar/wrappers";

// defineOptions({
//   preFetch: preFetch(
//     ({
//       store,
//       currentRoute,
//       previousRoute,
//       redirect,
//       ssrContext,
//       urlPath,
//       publicPath,
//     }) => {
//       const auth = useAuthStore(store).getAuthUser
//       console.log("running preFetch XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", auth);
//       return useCustomerStore(store).onFetch(auth?.id);
//     }
//   ),
// });

// const $store = useCustomerStore();
// const {
//   dataType,
//   record,
//   isMaintenance,

//   loading,
// } = storeToRefs($store); // have all reactive states here

</script>

<style scoped>
h2 {
  font-size: 40px;
  font-weight: 800;
}
</style>
