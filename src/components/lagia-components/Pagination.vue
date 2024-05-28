<template>
  <q-pagination
    v-model="current"
    :max="5"
    direction-links
    outline
    color="orange"
    active-design="unelevated"
    active-color="brown"
    active-text-color="orange"
  />
</template>

<script>
import { ref } from 'vue'

// paginate: [5, 10, 25, 50, 75, 100],
// records: [],
// totalItem: 0,
// page: 1,
// orderField: "",
// orderDirection: "",
// isShowDataRecycle: false,
// search:'', // filter & search itu sama
// lastPage: 0,
// currentPage: 1,
// perPage: 25,  // perPage & rowPerPage itu sama


export default {
  setup () {
    return {
      current: ref(3)
    }
  },
  props: ['currentPage','lastPage','']
}
</script>

