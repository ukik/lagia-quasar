<template>
  <q-dialog
    v-model="prompt"
    full-width
    :maximized="$q.screen.width <= 768"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <!-- <q-layout
      :style="$q.screen.width > 768 ? 'width: 750px !important' : ''"
      view="hHh lpR fFf"
      container
      class="bg-white text-dark"
    >
      <q-page-container> -->
    <q-card flat
      class="bg-transparent"
      :style="$q.screen.width > 768 ? 'width: 750px !important' : ''"
    >
      <q-card-section style="height: calc(99.5% - 50px)" class="scroll flex flex-center">
        <!-- <q-card-section class="q-py-none">
        <q-toolbar style="height: 50px" class="q-pa-none">
          <div class="text-h6 text-dark">Login</div>
          <q-space></q-space>
          <q-btn dense flat icon="close" v-close-popup></q-btn>
        </q-toolbar>
      </q-card-section>
      <q-separator></q-separator> -->

        <FormForgotPassword v-if="current == 'forgot'">
          <template v-slot:bottom>
            <q-card-section>
              <div class="col-12 row items-center justify-center text-white">
                <div class="text-left">Don't have an account?</div>
                <q-btn
                  flat
                  @click="current = 'register'"
                  capitalize
                  outline
                  color="white"
                  size="16px"
                  class="rounded-borders-4"
                  label="Register"
                ></q-btn>
              </div>

              <div class="col-12 row items-center justify-center text-white">
                <div class="text-left">Do you have an account?</div>
                <q-btn
                  capitalize
                  flat
                  @click="current = 'login'"
                  outline
                  color="white"
                  size="16px"
                  class="rounded-borders-4"
                  label="Login"
                ></q-btn>
              </div>
            </q-card-section>
          </template>
        </FormForgotPassword>
        <FormLogin @onBubbleEventLogged="prompt = false" v-if="current == 'login'">
          <template v-slot:bottom>
            <q-card-section>
              <div class="col-12 row items-center justify-center text-white">
                <div class="text-left">Don't have an account?</div>
                <q-btn
                  flat
                  @click="current = 'register'"
                  capitalize
                  outline
                  color="white"
                  size="16px"
                  class="rounded-borders-4"
                  label="Register"
                ></q-btn>
              </div>

              <div class="col-12 row items-center justify-center text-white">
                <div class="text-left">I forget password!</div>
                <q-btn
                  flat
                  @click="current = 'forgot'"
                  capitalize
                  outline
                  color="white"
                  size="16px"
                  class="rounded-borders-4"
                  label="Ask password"
                ></q-btn>
              </div>
            </q-card-section>
          </template>
        </FormLogin>
        <FormRegister
          @onBubbleEventLogged="prompt = false"
          class="q-py-none"
          v-if="current == 'register'"
        >
          <template v-slot:bottom>
            <q-card-section>
              <div class="col-12 row items-center justify-center text-white">
                <div class="text-left">Do you have an account?</div>
                <q-btn
                  capitalize
                  flat
                  @click="current = 'login'"
                  outline
                  color="white"
                  size="16px"
                  class="rounded-borders-4"
                  label="Login"
                ></q-btn>
              </div>

              <div class="col-12 row items-center justify-center text-white">
                <div class="text-left">I forget password!</div>
                <q-btn
                  flat
                  @click="current = 'forgot'"
                  capitalize
                  outline
                  color="white"
                  size="16px"
                  class="rounded-borders-4"
                  label="Ask password"
                ></q-btn>
              </div>
            </q-card-section>
          </template>
        </FormRegister>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn v-close-popup rounded label="close" icon="close" color="pink"></q-btn>
      </q-card-actions>
    </q-card>
    <!-- </q-page-container>
    </q-layout> -->
  </q-dialog>
</template>

<script>
import { storeToRefs } from "pinia";

import { useDialogAuth } from "stores/lagia-stores/widget/DialogAuth";

export default {
  data() {
    return {
      item: null,
      slug: "",
      current: "login",
    };
  },
  // props: ["item"],
  setup() {
    const store = useDialogAuth();
    const { prompt, quantity } = storeToRefs(store); // have all reactive states here
    const { onAdd, onRemove, onAddToCart } = store;

    return {
      onAddToCart,
      onAdd,
      onRemove,
      prompt,
      quantity,
    };
  },
  computed: {
    getPriceCart() {
      if (!this.item) return 0;
      return Math.round(this.$finalPrice(this.item) * this.quantity);
    },
  },
  methods: {
    onBubbleEvent() {},
    onOpen(val) {
      this.prompt = true;
      this.item = val?.value;
      this.slug = val?.slug;
    },
    async onSubmit() {
      this.$refs.quantityRef.validate();

      if (this.$refs.quantityRef.hasError) {
        this.$q.notify({
          color: "negative",
          message: "Quantity minimal 1",
          position: "top",
        });
      } else {
        const resp = await this.onAddToCart({
          price_id: this.item?.productId,
          slug: this.slug,
        });
        console.log("DialogAddToCart resp", resp);
        // await this.$onKonsultasi(this.name, this.question, this.email);
        // this.$q.notify({
        //   icon: "done",
        //   color: "positive",
        //   message: "Submitted",
        //   position: "top",
        // });
        // this.question = "";
      }
    },
  },
};
</script>

<style>
#form-add-to-cart .q-field__bottom {
  display: none;
}
#form-add-to-cart .q-field--with-bottom {
  padding-bottom: 0px;
}
</style>
