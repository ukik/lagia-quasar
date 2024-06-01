<template>
  <!-- <div class="content-page-section row justify-center"> -->
  <div class="">
    <!-- <q-img
      class="rounded-borders-2 q-mb-lg"
      src="assets/images/img16.jpg"
      :ratio="$q.screen.width > 425 ? 16 / 9 : 1"
    /> -->
    <h3 class="q-mb-xs">{{ record?.name }}</h3>
    <div class="text-caption q-mb-md">Dibuat: {{ record?.createdAt }}</div>

    <q-rating
      v-if="record?.travelRatingAvg?.avgRating"
      readonly
      v-model="record.travelRatingAvg.avgRating"
      size="sm"
      :max="5"
      color="red"
    ></q-rating>

    <q-rating
      v-else
      readonly
      v-model="ratingZero"
      size="sm"
      :max="5"
      color="grey"
    ></q-rating>

    <q-item class="rounded-borders-1 bg-grey-2 q-mt-lg" clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img v-if="record?.badasoUser?.avatar" :src="record?.badasoUser?.avatar">
          <img v-else src="http://localhost:8000/storage/photos/shares/default-user.png">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-bold" lines="1">{{
          record?.badasoUser?.name
        }}</q-item-label>
        <q-item-label caption lines="2">
          <!-- <span class="text-weight-bold">Janet</span> -->
          {{ record?.badasoUser?.username }}
          <span v-if="$q.screen.width < 768">({{ record?.badasoUser?.createdAt }})</span>
        </q-item-label>
      </q-item-section>

      <q-item-section v-if="$q.screen.width > 425" class="text-caption" side top>{{
        record?.badasoUser?.createdAt
      }}</q-item-section>
    </q-item>

    <RelatedImageSlideCarousel
      class="rounded-borders-2 q-my-lg"
      :_gallery="record?.image"
    ></RelatedImageSlideCarousel>

    <div class="col-12 q-my-md" v-if="record?.category">
      <template v-for="(category, category_index) in record?.category?.split(',')">
        <q-chip color="blue-5" text-color="white" icon="label" class="text-capitalize">{{
          category
        }}</q-chip>
      </template>
    </div>

    <q-list class="rounded-borders-1 bg-grey-2 row col flex items-start text-capitalize">
      <q-item class="col-12">
        <q-item-section>
          <q-item-label lines="1">location</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1"
            ><a href="#">{{ record?.location }}</a></q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item class="col-12">
        <q-item-section>
          <q-item-label lines="1">address</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.address }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list
      class="q-mt-lg rounded-borders-1 bg-grey-2 row col flex items-start text-capitalize"
    >
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">uuid</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.uuid }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">codepos</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.codepos }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">city</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.city }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">country</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.country }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">telepon</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.phone }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        <q-item-section>
          <q-item-label lines="1">email</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label lines="1">{{ record?.email }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <h6 class="q-mt-lg q-mb-sm">POLICY</h6>
    <div v-html="record?.policy"></div>

    <h6 class="q-mt-lg q-mb-sm">DESCRIPTION</h6>
    <div v-html="record?.description"></div>

    <!-- <q-card
      v-if="contents?.include"
      flat
      bordered
      class="rounded-borders-2 bg-grey-1 q-mt-lg"
    >
      <q-card-section>
        <h3 class="q-ma-lg font-weight-normal">INCLUDE :</h3>
        <div v-html="contents?.include"></div>
      </q-card-section>
    </q-card>

    <q-card
      v-if="contents?.exclude"
      flat
      bordered
      class="rounded-borders-2 bg-grey-1 q-mt-lg"
    >
      <q-card-section>
        <h3 class="q-ma-lg font-weight-normal">EXCLUDE :</h3>
        <div v-html="contents?.exclude"></div>
      </q-card-section>
    </q-card> -->

    <!-- <h3 class="q-my-lg q-pt-sm">PRICE LIST</h3> -->
    <!-- <div class="page-content-1">
      Malesuada incidunt excepturi proident quo eros? Id interdum praesent magnis, eius
      cumque? Integer aptent officiis recusandae habitasse iure, quisque culpa!
    </div> -->

    <StoreDetailPriceList :items="record?.travelPricePublics"></StoreDetailPriceList>

    <div class="page-content-2 q-mt-xl">
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
  <!-- </div> -->
</template>

<script setup>
import { ref, defineProps } from "vue";
import RelatedImageSlideCarousel from "./RelatedImageSlideCarousel";
import StoreDetailPriceList from "./StoreDetailPriceList";

const ratingZero = 0

const contents = {
  overview: `<p>
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
          </p>`,
  include: `<ul>
          <li><i class="fas fa-check"></i>Specialized bilingual guide</li>
          <li><i class="fas fa-times"></i>Guide Service Fee</li>
          <li><i class="fas fa-check"></i>Private Transport</li>
          <li><i class="fas fa-times"></i>Room Service Fees</li>
          <li><i class="fas fa-check"></i>Entrance Fees</li>
          <li><i class="fas fa-times"></i>Driver Service Fee</li>
          <li><i class="fas fa-check"></i>Breakfast And Lunch Box</li>
          <li><i class="fas fa-times"></i>Any Private Expenses</li>
        </ul>`,
  exclude: `<ul>
          <li><i class="fas fa-check"></i>Specialized bilingual guide</li>
          <li><i class="fas fa-times"></i>Guide Service Fee</li>
          <li><i class="fas fa-check"></i>Private Transport</li>
          <li><i class="fas fa-times"></i>Room Service Fees</li>
          <li><i class="fas fa-check"></i>Entrance Fees</li>
          <li><i class="fas fa-times"></i>Driver Service Fee</li>
          <li><i class="fas fa-check"></i>Breakfast And Lunch Box</li>
          <li><i class="fas fa-times"></i>Any Private Expenses</li>
        </ul>`,
};
</script>
<script>
export default {
  props: ["record"],
};
</script>

<style scoped>
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
