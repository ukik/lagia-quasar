<template>
  <InnerBanner _title="Single Page"></InnerBanner>

  <!-- ***Inner Banner html end here*** -->
  <div class="content-page-section row justify-center">
    <div
      class="row justify-center col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
      :class="[
        $q.screen.width > 425 ? 'q-col-gutter-lg' : 'q-col-gutter-y-xl q-col-gutter-x-lg',
        $q.screen.width > 768 ? 'q-col-gutter-lg' : '',
      ]"
    >
    <isBackButtonPage></isBackButtonPage>

      <div class="col-12">
        <q-img
          class="rounded-borders-2 q-mb-lg"
          src="assets/images/img16.jpg"
          :ratio="16 / 9"
        />
      </div>
      <h2 class="q-mb-lg">Let's build the better world together</h2>
      <div class="page-content-1" v-html="content"></div>

      <div class="col-12 q-mb-xl">
        <h3>Placerat quaerat curae reiciendis commodi. X</h3>

        <div class="row col-gutters q-col-gutter-sm q-mb-lg">
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <q-img
              :ratio="1"
              src="assets/images/img4.jpg"
              alt=""
              class="rounded-borders-2"
            />
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <q-img
              :ratio="1"
              src="assets/images/img5.jpg"
              alt=""
              class="rounded-borders-2"
            />
          </div>
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <q-img
              :ratio="1"
              src="assets/images/img6.jpg"
              alt=""
              class="rounded-borders-2"
            />
          </div>
        </div>

        <q-banner
          dense
          :class="[$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2']"
          class="rounded-borders-2"
        >
          <template v-slot:avatar>
            <q-icon size="xl" name="format_quote" color="black" />
          </template>
          <h6 class="q-my-lg q-pr-md">
            Sagittis perferendis? Leo nobis irure egestas excepturi ipsam nascetur
            elementum, montes. Torquent, soluta, ac nihil.
          </h6>
        </q-banner>
      </div>
    </div>
  </div>
</template>

<script setup>
const content = `<p>
            Assumenda mattis condimentum morbi ipsam felis orci, urna placeat blandit
            dictum amet? Leo magni magna sint erat tenetur! Parturient. Explicabo,
            hendrerit distinctio fugit excepteur consectetur diamlorem? Possimus magnis
            wisi officiis impedit egestas, curabitur tempor eiusmod fugiat, posuere elit
            consectetur non dicta adipisicing corporis rerum hymenaeos nam! Dolores
            expedita massa, bibendum? Vulputate porta odit, pretium quos sequi? Ipsum
            possimus nesciunt tempora! Harum voluptas commodo laoreet vestibulum. Integer
            earum dolorem fusce pretium, sociis aliquid? Dicta illo dolor molestias
            posuere minima iure bibendum? Nec, condimentum laboriosam vulputate venenatis
            euismod commodo justo, minima voluptatem, nulla ex aliqua unde sollicitudin
            pellentesque! Labore mus? Vivamus earum.
          </p>
          <p>
            Architecto reprehenderit veniam curae, auctor donec, sapiente! Mus. Vero.
            Molestiae natus dictumst, deleniti. Consequuntur odit vulputate aliquet mi,
            sociis litora eaque dolore optio venenatis quos dolore provident mollis,
            mollis fringilla accusamus sequi cumque pellentesque porttitor tincidunt odit
            eros do omnis? Voluptas ex ex aliqua auctor habitant! Lobortis, urna.
            Consequat libero interdum! Cillum! Phasellus autem, temporibus potenti. Sunt
            architecto sit maecenas! Scelerisque integer incidunt perspiciatis ridiculus
            nostrud aliquam optio nec quam, non assumenda, iusto iure? Quibusdam rem,
            doloribus, augue, saepe mi vehicula parturient aliquam eiusmod. Eveniet, quos
            luctus bibendum saepe ab! Asperiores est sem diamlorem maiores velit!
            Habitasse sint ex perferendis.
          </p>
          <ul>
            <li>
              Purus sequi accusamus? Nibh aut perspiciatis, lorem lorem perspiciatis.
            </li>
            <li>Dictum? Posuere cumque sed illum facilisis leo illum facilisis.</li>
            <li>
              Neque officiis feugiat praesentium qui, aliqua hic commodo praesentium.
            </li>
            <li>
              Asperiores irure class lobortis veritatis, alias sem lobortis veritatis.
            </li>
            <li>Ipsum eros quaerat deserunt proin porttitor, fugit ultrices.</li>
            <li>
              Volutpat, justo mollit ullamco sagittis duis enim labore, ullamcorper dicta
            </li>
          </ul>
          <p>
            Sequi sociis leo, interdum eos ipsa pharetra, unde fringilla erat vulputate
            litora nisl adipisicing primis consectetuer erat aliqua reprehenderit unde
            accusamus earum sollicitudin voluptatum wisi vulputate deleniti, accusamus,
            animi rutrum. Labore et! Odit, nunc nostra, excepturi dui netus, euismod
            pariatur? Proin vivamus diamlorem natoque reprehenderit vivamus diamlorem
            natpo.
          </p>`;
</script>

<style scoped>
.content-page-section {
  padding-bottom: 80px;
}

.content-page-section p {
  margin-bottom: 25px;
}

h2 {
  font-size: 40px;
  font-weight: 800;
}

/* p {
  line-height: 1.6;
  margin: 0 0 15px;
  word-wrap: break-word;
} */

h3 {
  font-size: 22px;
  font-weight: 700;
}
</style>
