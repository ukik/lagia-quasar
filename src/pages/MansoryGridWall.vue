<template>
<div>
  <q-card class="q-pa-md" id="container" style="height:500px;">
    <!-- <q-no-ssr> -->
      <MasonryWall :scroll-container="true" :items="items" :ssr-columns="1" :column-width="300" :gap="16" >
        <template #default="{ item, index }">
          <!--  :style="{ height: `${index * 100}px` }" -->
          <q-list bordered>
            <div>{{ item.title }}</div>
            <span>{{ item.description.substring(Math.round(Math.random()*100)) }}</span>
          </q-list>
        </template>
      </MasonryWall>
    <!-- </q-no-ssr> -->
  </q-card>
</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      isShow:true,
    }
  },
  mounted() {
    this.isShow = false;
  },
  computed: {
    items() {
      let elems = [];
      for (let i = 1; i <= 100; i++) {
        elems.push({
          id: i,
          title: `Item ${i}`,
          description: `paulcollett/vue-masonry-css - GitHubhttps://github.com › paulcollett › vue-masonry-css
vue-masonry-css Is a Vue Component with a simple interface to order items into the desired columns at specified breakpoints. With minimal CSS this leads to ...
paulcollett/vue-masonry-css - GitHubhttps://github.com › paulcollett › vue-masonry-css
vue-masonry-css Is a Vue Component with a simple interface to order items into the desired columns at specified breakpoints. With minimal CSS this leads to ...paulcollett/vue-masonry-css - GitHubhttps://github.com › paulcollett › vue-masonry-css
vue-masonry-css Is a Vue Component with a simple interface to order items into the desired columns at specified breakpoints. With minimal CSS this leads to ...paulcollett/vue-masonry-css - GitHubhttps://github.com › paulcollett › vue-masonry-css
vue-masonry-css Is a Vue Component with a simple interface to order items into the desired columns at specified breakpoints. With minimal CSS this leads to ...paulcollett/vue-masonry-css -
`,
        });
      }
      return elems;
    },
  }
})
</script>

<style scoped>
.scroller {
  height: 100%;
}
</style>
