<template>
  <div class="list-container">
    <VirtualList :data="dataSource">
      <template v-slot="{ item, index }">
        <div class="item-container">
          <div class="cell cell-index">{{ index + 1 }}</div>
          <div class="cell">{{ item.name }}</div>
          <div class="cell">{{ item.email }}</div>
          <div class="cell">{{ item.address }}</div>
        </div>

        <q-item class="q-pa-none q-ma-none" v-if="index == dataSource.length - 1" :key="index + 'A'" dense>
          <q-infinite-scroll class="full-width" :debounce="500" ref="infiniteScroll" @load="onLoad" :offset="250">
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-item>

      </template>
    </VirtualList>
  </div>
</template>

<script>

import { faker } from '@faker-js/faker';

function uuid() {
  let d = Date.now();
  if (
    typeof performance != "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function mock(length = 1000) {
  return Array.from({ length }, () => {
    return {
      id: uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.country(),
      img: faker.image.imageUrl()
    };
  });
}

import { VirtualList } from 'vue3-virtual-list';
// import { mock } from './utils';

export default {
  data() {
    return {
      dataSource: mock(50),
    };
  },
  components: {
    VirtualList,
  },
  methods: {
    async onLoad(index, done) {
      setTimeout(() => {
        this.dataSource = [
          ...this.dataSource,
          ...mock(50),
        ]
        done()
      }, 1000);
      return
      if (!this.get_next_page_url) {
        done(true)
        return
      }

      const request = await this.request_more();
      if (!request) {
        done(true) //= stop infinite-scroll
      }

      if (!this.get_next_page_url) {
        done(true) //= stop infinite-scroll
      } else {
        done()
      }

    }
  }
};
</script>

<style>
.list-container {
  width: 800px;
  height: 600px;
  border: 2px solid #4caf50;
  margin: 0 auto;
}

.item-container {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
</style>
