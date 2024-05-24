<template>
  <q-list class="row bg-white col-12">
    <q-item class="col-12 q-px-sm" v-if="item.user">
      <q-item-section avatar>
        <q-avatar>
          <img @error="handleError" :src="img_checker(item.user?.avatar)"  style="border-radius:50px; object-fit: cover;">
        </q-avatar>
        <router-link :to="goto({ name:'profile_musisi', params: { slug: item?.user?.id } })" class="absolute-full"></router-link>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="2">{{ item.user?.name }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label caption lines="1">
          <q-chip v-if="item?.user?.id != auth_id" :disable="loading_follow" clickable @click="onFollow(); authCheck(); gotoLogin();" class="q-ma-none" :color="!item.user?.follow ? 'positive' : 'primary'"
            size="11px" text-color="white" icon="check">
            {{ !item.user?.follow ? 'Mengikuti' : 'Berhenti Mengikuti' }}
          </q-chip>
        </q-item-label>
      </q-item-section>
    </q-item>

  </q-list>
</template>

<script>

import { user_list, comment_list } from "src/models/video.js"
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useListStore } from 'src/stores/activity/follow-list.js'

export default {
  props: {
    index: {
      default: null
    },
    item: {
      default: () => ({
        id: '',
        user_id: '',
        file: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: '',
        created_at: '',
        updated_at: '',
        liked_total: null,
        visited_total: null,
        shared_total: null,
        commented_total: null,
        bookmarked_total: null,
        liked: null,
        visited: null,
        shared: null,
        commented: null,
        bookmarked: null,
        follow: null,
        comments: [], // comment_list,
        user: user_list,
      })
    }
  },
  computed: {
    ...mapState(useListStore, {

      loading_follow: 'loading_follow',
      loading_liked: 'loading_liked',
      loading_bookmarked: 'loading_bookmarked',
      loading_comment: 'loading_comment',
      loading_delete: 'loading_delete',
      loading_delete_comment: 'loading_delete_comment',
      loading: 'loading',
    }),
  },
  data() {
    return {
      collapsible: false,
    }
  },
  methods: {
    ...mapActions(useListStore, [
      'follow',
      'liked',
      'bookmarked',
      'comment',
      'delete',
      'delete_comment',
    ]),
    onFollow() {
      this.follow({
        index: this.index,
        user_id: this.item?.user_id,
      })
    },


  },
}
</script>
