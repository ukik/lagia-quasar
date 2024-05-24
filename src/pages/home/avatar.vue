<template>
  <div :style="width">
    <q-avatar v-ripple :size="size">
      <router-link :to="goto({
          name: 'profile_musisi',
          params: {
            slug: user?.id
          }
        })">

        <!-- <q-img ref="foto_profile" loading="lazy" :src="imageSync(user?.avatar)"
          :style="`border-radius:50px; object-fit: cover; width:${size}; height:${size};`">
          <template v-slot:error>
            <img :src="default_avatar" />
          </template>
        </q-img> -->
        <img ref="foto_profile" loading="lazy" :src="imageSync(user?.avatar)" @error="handleError"
          :style="`border-radius:50px; object-fit: cover; width:${size}; height:${size};`" />

          <!-- <img @error="handleError" :src="img_checker(item.user?.avatar)"  style="border-radius:50px; object-fit: cover;">           -->
      </router-link>
    </q-avatar>
    <q-item class="q-pa-none q-px-xs" :class="[ is_ipad_size ? '' : 'q-pr-md' ]" dense>
      <q-item-section :style="width" class="text-black text-caption text-center">
        <q-item-label lines="1" caption>{{ user.name }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      default: null
    },
    width: {
      default: 'width:85px;'
    },
    size: {
      default: '75px'
    },
  },
}
</script>
