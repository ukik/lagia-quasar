<template>
  <q-dialog v-model="prompt" persistent>
    <q-card :style="$q.screen.width < 425 ? 'width: 350px' : 'width: 450px'">
      <q-card-section>
        <div class="text-h6">Konsultasi</div>
      </q-card-section>

      <q-separator />
      <q-card-section>
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

      <q-separator />

      <q-card-actions align="between" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn @click="onSubmit" flat label="Send" icon-right="send" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { storeToRefs } from "pinia";

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
  methods: {
    onOpen() {
      this.prompt = true;
    },
    async onSubmit() {
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
        await this.$onKonsultasi(this.name, this.question, this.email);
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
