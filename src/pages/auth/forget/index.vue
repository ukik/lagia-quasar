<template>
  <div class="
    col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12 bg-white flex flex-center
    scroll">
    <div class="row col-12 flex flex-center">
      <q-list bordered class="col-11 q-pt-xl">
        <div class="text-h6 text-center text-grey q-px-lg q-pb-lg">
          <q-icon size="90px" color="pink-4" name="https" />
        </div>
        <div class="text-h6 text-center text-dark q-px-lg ">
          Trouble logging in?
        </div>
        <div class="text-text text-center text-grey q-px-lg q-pb-lg">
          Enter your email and we'll send you a link to get back into your account.
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
