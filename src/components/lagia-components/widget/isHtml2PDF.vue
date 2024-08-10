<template>
  <!-- <q-dialog v-model="dialog" transition-show="scale" transition-hide="scale">
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Persistent</div>
      </q-card-section>

      <q-card-section class="q-pt-none"> -->
  <vue3-html2pdf
    :show-layout="false"
    :float-layout="true"
    :enable-download="true"
    :preview-modal="true"
    :paginate-elements-by-height="1400"
    filename="hee hee"
    :pdf-quality="2"
    :manual-pagination="false"
    pdf-format="a4"
    pdf-orientation="landscape"
    pdf-content-width="800px"
    @progress="onProgress($event)"
    @hasStartedGeneration="hasStartedGeneration()"
    @hasGenerated="hasGenerated($event)"
    ref="html2Pdf"
  >
    <section slot="pdf-content">
      ssssssssssss
      <!-- PDF Content Here -->
    </section>
  </vue3-html2pdf>
  <!-- </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog> -->
</template>

<script>
import Vue3Html2pdf from "vue3-html2pdf";

export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    onOpen() {
      this.dialog = true;
    },
    onGenerate() {
      this.$refs.html2Pdf.generatePdf();
    },
    onProgress(event) {
      console.log("onProgress", event);
    },
    hasStartedGeneration() {
      console.log("hasStartedGeneration");
    },
    hasGenerated(event) {
      console.log("hasGenerated", event);
    },
  },
  components: {
    Vue3Html2pdf,
  },
};
</script>
