<template>
  <div class="
    col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white flex flex-center
    scroll">
    <div class="row col-12 flex flex-center">
      <q-list bordered class="col-11 q-pt-xl">
        <div class="text-h4 text-center text-grey q-px-lg q-pb-lg">
          <img src="images/logo.png" >
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
