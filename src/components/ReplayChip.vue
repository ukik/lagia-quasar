<template>
  <span v-if="reply?.replied">
    Reply to @{{ reply?.user?.name }}:
  </span>
  <!-- <q-chip size="12px" class="q-mx-none"
    color="red" text-color="white">
    <q-avatar>
      <img @error="handleError" :src="imageSync(reply?.user?.avatar)" :placeholder-src="default_avatar">
    </q-avatar>
    <div class="ellipsis">
      @{{ reply?.user?.name }}
    </div>
  </q-chip> -->
</template>

<script>
export default {
  props: ['reply']
}
</script>
