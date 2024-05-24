<template>
    <q-carousel v-model="slide" transition-prev="jump-right" transition-next="jump-left" swipeable animated
      control-color="white" navigation padding arrows height="400px"
      class="bg-primary text-white shadow-0 rounded-bordersX">
      <template  v-for="(item, index) in lorem">

        <q-carousel-slide :name="item.id" class="column no-wrap flex-center">
          <q-icon v-if="index > 0" :name="item.icon" size="75px" />
          <div class="q-mt-md text-center" style="font-size:18px;">
            {{ item.desc }}
          </div>
        </q-carousel-slide>

      </template>
    </q-carousel>

</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      slide: ref('0'),
      lorem: [
        {
          id: '0',
          icon: '',
          desc: 'Yuk join!!! Bangun karir musik kamu, ikuti agenda musik, nimbrung komunitas musisi, ekosistem musik & entertainment',
        },
        {
          id: '1',
          icon: 'live_tv',
          desc: 'Learning, kamu bisa belajar musik mulai dari zero sampai mahir bareng mentor-mentor berpengalaman dengan berbagai genre',
        },
        {
          id: '2',
          icon: 'layers',
          desc: 'Wikia, ada banya sumber belajar musik otentik bisa kamu dapatkan disini mulai dari notasi, dinamika, harmoni, ritme, dan banyak lagi',
        },
        {
          id: '3',
          icon: 'face_6',
          desc: 'Community, tempat ngumpulnya para musisi dari penjuru negeri untuk berkolaborasi, tukar pikiran, dan refreshing bersama',
        },
        {
          id: '4',
          icon: 'style',
          desc: 'Karir, mulai rintis karir musikmu tanpa perlu ragu-ragu karena semua orang memiliki visi dan misi yang sama',
        },
        {
          id: '5',
          icon: 'business_center',
          desc: 'Bisnis, industri musik memiliki potensi ekonomi yang tidak terbatas dan lintas industri, kita ingin industri musik bisa maju bersama',
        },

      ]
    }
  }
}
</script>

