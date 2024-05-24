<template>
  <div class="
    col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white flex flex-center row
    scroll">
    <div class="row col-12 flex flex-center">
      <q-list bordered class="col-11">
        <div class="text-h6 text-center text-dark q-px-lg q-pt-xl">
          Create A Strong Password
        </div>
        <div class="text-text text-center text-grey q-px-lg q-pb-lg">
          Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!$@%).
        </div>
        <Container ref="container" />
      </q-list>
    </div>
  </div>

</template>

<script>
import Container from "./container.vue"

export default {
  components:{
    Container,
  },
}
</script>
