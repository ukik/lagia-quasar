<template>
  <q-dialog
    persistent
    v-model="prompt"
    full-width
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-layout
      :style="$q.screen.width > 768 ? 'width: 750px !important' : ''"
      view="hHh lpR fFf"
      container
      class="bg-white text-dark"
    >
      <q-page-container>
        <!-- <q-page> -->
        <q-card flat>
          <!-- <q-card-section>
            <div class="text-h6">Konsultasi</div>
          </q-card-section> -->
          <q-card-section class="q-py-none">
            <q-toolbar style="height: 50px" class="q-pa-none">
              <div class="text-h6 text-dark">Konsultasi</div>
              <q-space></q-space>
              <q-btn dense flat icon="close" v-close-popup></q-btn>
            </q-toolbar>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-list v-if="item && vendor" bordered class="q-mb-lg">
              <q-item>
                <q-item-section v-if="vendor" top thumbnail class="">
                  <img
                    class="full-height q-ml-sm"
                    v-if="item[vendor]?.image"
                    :src="item[vendor]?.image[0]"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label v-if="product" lines="1">{{
                    item[product]?.name
                  }}</q-item-label>
                  <q-item-label caption lines="1">{{ item?.name }}</q-item-label>
                  <q-item-label class="text-h6">{{
                    $currency($finalPrice(item))
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <form
              id="form-career-component"
              @submit.prevent.stop="onSubmit"
              class="q-col-gutter-md row q-col-gutter-y-lg"
            >
              <div class="col-12">
                <q-input
                  counter
                  maxlength="100"
                  bg-color="white"
                  rounded
                  outlined
                  color="primary"
                  ref="nameRef"
                  v-model="name"
                  placeholder="Nama Anda *"
                  lazy-rules
                  :rules="[(val) => !!val || '']"
                  bottom-slots
                >
                  <template v-slot:prepend>
                    <q-icon name="person" color="primary" />
                  </template>
                  <template v-slot:error>
                    <div class="text-white">Nama tidak boleh kosong</div>
                  </template>
                  <template v-slot:hint>
                    <span class="text-white">Nama wajib diisi *</span>
                  </template>
                </q-input>
              </div>

              <div class="col-12">
                <q-input
                  counter
                  maxlength="100"
                  bg-color="white"
                  rounded
                  outlined
                  color="primary"
                  ref="emailRef"
                  v-model="email"
                  placeholder="Email Anda *"
                  lazy-rules
                  :rules="[(val) => !!val || '']"
                  bottom-slots
                >
                  <template v-slot:prepend>
                    <q-icon name="email" color="primary" />
                  </template>
                  <template v-slot:error>
                    <div class="text-white">Email tidak boleh kosong</div>
                  </template>
                  <template v-slot:hint>
                    <span class="text-white">Email wajib diisi *</span>
                  </template>
                </q-input>
              </div>

              <div class="col-12">
                <q-input
                  input-style="min-height: 250px"
                  type="textarea"
                  counter
                  maxlength="250"
                  bg-color="white"
                  rounded
                  outlined
                  color="primary"
                  ref="questionRef"
                  v-model="question"
                  placeholder="Pertanyaan Anda *"
                  lazy-rules
                  :rules="[(val) => !!val || '']"
                  bottom-slots
                >
                  <template v-slot:prepend>
                    <q-icon name="help" color="primary" />
                  </template>
                  <template v-slot:error>
                    <div class="text-white">Pertanyaan tidak boleh kosong</div>
                  </template>
                  <template v-slot:hint>
                    <span class="text-white">Pertanyaan wajib diisi *</span>
                  </template>
                </q-input>
              </div>
            </form>
          </q-card-section>
        </q-card>
        <!-- </q-page> -->
      </q-page-container>

      <q-footer class="bg-white">
        <q-separator />
        <q-card-actions align="between" class="text-primary">
          <q-btn flat label="Batal" v-close-popup />
          <q-btn @click="onSubmit" flat label="Kirim" icon-right="send" />
        </q-card-actions>
      </q-footer>
    </q-layout>
  </q-dialog>
</template>

<script>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useKonsultasiStore } from "stores/lagia-stores/widget/KonsultasiStore";

export default {
  setup() {
    const store = useKonsultasiStore();
    const { prompt, name, email, question } = storeToRefs(store); // have all reactive states here

    return {
      prompt,
      name,
      email,
      question,
    };
  },
  data() {
    return {
      item: null,
      slug: null,
      vendor: null,
      product: null,
    };
  },
  methods: {
    onOpen(val = null) {
      console.log("onOpen konsultasi", val);
      this.prompt = true;
      this.item = val?.value;
      this.slug = val?.slug;
      this.vendor = val?.vendor;
      this.product = val?.product;
    },
    async onSubmit() {
      // if (this.item && this.vendor) {
      //   const host =
      //     window.location.protocol +
      //     "//" +
      //     window.location.host +
      //     "/#/" +
      //     this.slug +
      //     "/price-detail/" +
      //     this.item[this.vendor]?.id +
      //     "/" +
      //     this.item[this.vendor]?.name;
      //   alert(host);
      // }

      this.$refs.nameRef.validate();
      this.$refs.emailRef.validate();
      this.$refs.questionRef.validate();

      if (
        this.$refs.nameRef.hasError ||
        this.$refs.emailRef.hasError ||
        this.$refs.questionRef.hasError
      ) {
        this.$q.notify({
          color: "negative",
          message: "Lengkapi formulir",
        });
      } else {
        if (!this.item && !this.vendor) {
          await this.$onKonsultasi(this.name, this.email, this.question);
        } else {
          // const host =
          //   this.$getHost() +
          //   this.slug +
          //   "/price-detail/" +
          //   this.item[this.vendor]?.id +
          //   "/" +
          //   this.item[this.vendor]?.name;

          const host = window.location.href?.replace("/#/", "/");

          await this.$onKonsultasiProduk(this.name, this.email, this.question, host);
        }

        this.$q.notify({
          icon: "done",
          color: "positive",
          message: "Submitted",
        });
        this.question = "";
      }
    },
  },
};
</script>
