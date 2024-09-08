<template>
  <!-- Call To Action -->

  <div class="call-action-box bg-color-callback row justify-center">
    <div
      class="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12 text-left row justify-center items-center q-col-gutter-xl"
    >
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
        <q-card class="rounded-borders-3" flat bordered>
          <q-card-section class="q-py-xl">
            <q-card-section class="text-center col-3">
              <div class="counter-no text-bold">
                {{ current_satisfiedCustomer }}
                <!-- <sup
                  ><span class="text-h6">{{ records?.satisfiedCustomer }}+</span></sup
                > -->
              </div>
              <div class="counter-desc text-primary">SATISFIED CUSTOMER</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
        <q-card class="rounded-borders-3" flat bordered>
          <q-card-section class="q-py-xl">
            <q-card-section class="text-center col-3">
              <h2 class="counter-no text-bold">
                {{ current_activePartner }}
                <!-- <sup
                  ><span class="text-h6">{{ records?.activePartner }}+</span></sup
                > -->
              </h2>
              <div class="counter-desc text-primary">ACTIVE PARTNERS</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
        <q-card class="rounded-borders-3" flat bordered>
          <q-card-section class="q-py-xl">
            <q-card-section class="text-center col-3">
              <h2 class="counter-no text-bold">
                {{ current_tourDestination }}
                <!-- <sup
                  ><span class="text-h6">{{ records?.tourDestination }}+</span></sup
                > -->
              </h2>
              <div class="counter-desc text-primary">TOUR DESTINATION</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
        <q-card class="rounded-borders-3" flat bordered>
          <q-card-section class="q-py-xl">
            <q-card-section class="text-center col-3">
              <h2 class="counter-no text-bold">
                {{ current_travelGruide }}
                <!-- <sup
                  ><span class="text-h6">{{ records?.travelGruide }}+</span></sup
                > -->
              </h2>
              <div class="counter-desc text-primary">TRAVEL GUIDES</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["records"],
  data() {
    return {
      current_satisfiedCustomer: 0,
      current_activePartner: 0,
      current_tourDestination: 0,
      current_travelGruide: 0,

      interval_satisfiedCustomer: null,
      interval_activePartner: null,
      interval_tourDestination: null,
      interval_travelGruide: null,
    };
  },
  mounted() {
    clearInterval(this.interval_satisfiedCustomer);
    this.interval_satisfiedCustomer = setInterval(() => {
      this.current_satisfiedCustomer++;
      if (this.current_satisfiedCustomer >= this.records?.satisfiedCustomer)
        clearInterval(this.interval_satisfiedCustomer);
    }, 10);

    clearInterval(this.interval_activePartner);
    this.interval_activePartner = setInterval(() => {
      this.current_activePartner++;
      if (this.current_activePartner >= this.records?.activePartner)
        clearInterval(this.interval_activePartner);
    }, 10);

    clearInterval(this.interval_tourDestination);
    this.interval_tourDestination = setInterval(() => {
      this.current_tourDestination++;
      if (this.current_tourDestination >= this.records?.tourDestination)
        clearInterval(this.interval_tourDestination);
    }, 10);

    clearInterval(this.interval_travelGruide);
    this.interval_travelGruide = setInterval(() => {
      this.current_travelGruide++;
      if (this.current_travelGruide >= this.records?.travelGruide)
        clearInterval(this.interval_travelGruide);
    }, 10);
  },
  watch: {
    "$route.name": function (val) {},
  },
};
</script>

<style scoped>
.counter-no {
  font-family: "Montserrat", sans-serif;
  font-size: xxx-large;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 10px;
}



.call-action-box p {
  font-size: medium;
}

.counter-wrap .counter-desc {
  color: #3a78c9;
  display: block;
  font-size: 15px;
  text-transform: uppercase;
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
  /* padding-bottom: 85px; */
}

.image-mobile-radius {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
