<template>
  <div class="col-12 row">
    <q-item class="col-12 q-px-none">
      <q-item-section avatar>
        <q-avatar>
          <img @error="handleError" :src="imageSync(item.user?.avatar)" >
        </q-avatar>
        <router-link :to="goto({ name:'profile_musisi', params: { slug: item?.user?.id } })" class="absolute-full"></router-link>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{ item.user?.name }}</q-item-label>
        <q-item-label caption lines="1">
          <q-chip v-if="item?.user?.id != auth_id" :disable="loading_komentar_balasan_follow" clickable @click="onFollow(); authCheck(); gotoLogin();" class="q-ma-none" :color="!item.user.follow ? 'positive' : 'primary'"
            size="11px" text-color="white" icon="check">
            {{ !item.user.follow ? 'Mengikuti' : 'Berhenti Mengikuti' }}
          </q-chip>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
      </q-item-section>
      <q-btn v-if="item.user?.id == auth_id" :disable="loading_komentar_balasan_delete" :loading="loading_komentar_balasan_delete" dense style="height:30px;" flat round icon="more_vert" color="dark">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item :to="goto({ name:'video_create', params: { id: item?.id } })" clickable v-close-popup>
              <q-item-section avatar><q-icon name="edit"></q-icon></q-item-section>
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item @click="onDeletePost(); authCheck(); gotoLogin();" clickable v-close-popup>
              <q-item-section avatar><q-icon name="delete"></q-icon></q-item-section>
              <q-item-section>Delete</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item>
    <q-item v-touch-hold.mouse="onHold" class="col-12 q-px-none q-pr-md" :class="[ item.pressed ? 'bg-red' : '']">
      <q-item-section avatar>
        <q-avatar>

        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-caption" lines="1"></q-item-label>
        <q-item-label class="text-caption">
          <ReplayChip :reply="item" />
          <span>{{ item.comment }}</span>

          <!-- OPSI 1 -->
          <!-- <q-menu v-if="item.user?.id == auth_id"
          :touch-position="!loading_komentar_balasan_delete"
          :context-menu="!loading_komentar_balasan_delete"
          >
            <q-list style="min-width: 100px">
              <q-item @click="onDeleteComment({
                index,
                post_id: item.id
              }); authCheck(); gotoLogin();" clickable v-close-popup>
                <q-item-section avatar><q-icon name="delete"></q-icon></q-item-section>
                <q-item-section>Delete</q-item-section>
              </q-item>
            </q-list>
          </q-menu> -->
        </q-item-label>
      </q-item-section>
    </q-item>


  </div>
</template>

<script>

import { user_list, comment_list } from "src/models/video.js"
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useVideoListStore } from 'src/stores/video/list.js'

export default {
  props: {
    index: {
      default: null
    },
    item: {
      default: () => (comment_list)
    }
  },
  computed: {
    ...mapState(useVideoListStore, {
      loading_komentar_balasan_follow: 'loading_komentar_balasan_follow',
      loading_komentar_balasan_delete: 'loading_komentar_balasan_delete',
    }),
    lines() {
      return this.collapsible ? 0 : 3
    }
  },
  data() {
    return {
      reply: null,
      collapsible: false,
    }
  },
  methods: {
    ...mapActions(useVideoListStore, [
      'komentar_balasan_follow',
      'komentar_balasan_delete',
    ]),
    onFollow() {
      this.komentar_balasan_follow({
        index: this.index,
        user_id: this.item?.user_id,
      })
    },
    onDeletePost(value) {
      this.komentar_balasan_delete({
        index: this.index,
        id: this.item.id,
      })
    },
    onHold() {
      // switch (this.item.comments[index].pressed) {
      //   case 0:
      //     this.item.comments[index].pressed = true
      //     break;
      //   default:
      //     this.item.comments[index].pressed = false
      //     break;
      // }
      console.log('on hold')
    },

  }
}
</script>
