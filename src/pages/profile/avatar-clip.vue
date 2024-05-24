<template>

  <div class="row flex-center q-mb-lg">
    <q-avatar size="98px" @click="$emit('onLightBox', {
              index: 0,
              images: user.avatar
            })" style="width: 170px; height: 170px; ">
      <img ref="foto_profile" loading="lazy" :src="imageSync(user.avatar)" @error="handleError"
        style="border-radius:50px; object-fit: cover;">
    </q-avatar>
  </div>
</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useProfileStore } from 'src/stores/profiles/musisi'

export default {
  computed: {
    ...mapState(useProfileStore, {
      user: 'user',
    }),
  },
}
</script>
