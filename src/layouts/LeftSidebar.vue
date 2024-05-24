<template>
  <!-- {{ search_effect }} -->
  <q-item :to="goto({
      name: 'home'
    })"
    clickable
    v-ripple
    :active="route_name === 'home'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_home" size="32px" />
    </q-item-section>

    <q-item-section >Home</q-item-section>
  </q-item>

  <q-item :to="goto({
      name: 'search',
    })"
    clickable
    v-ripple
    :active="route_name === 'search'"
    @click="link = 'search'; is_search = !is_search;"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_search" size="30px" />
    </q-item-section>

    <q-item-section >Search</q-item-section>

    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>

  </q-item>

  <q-item :to="goto({
      name: 'reels',
    })"
    clickable
    v-ripple
    :active="route_name === 'reels'"
    @click="link = 'reels'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_music_video" size="30px" />
    </q-item-section>

    <q-item-section >Reels</q-item-section>
    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>

  </q-item>

  <q-item :to="goto({
      name: 'explore',
    })"
    clickable
    v-ripple
    :active="route_name === 'explore'"
    @click="link = 'explore'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_explore" size="30px" />
    </q-item-section>

    <q-item-section >Explore</q-item-section>

    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>
  </q-item>

  <q-item :to="goto({
      name: 'wikia',
    })"
    clickable
    v-ripple
    :active="route_name === 'wikia'"
    @click="link = 'wikia'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_article" size="30px" />
    </q-item-section>

    <q-item-section >Wikia</q-item-section>

    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>
  </q-item>


  <q-separator />

  <q-item :to="goto({
      name: 'marketplace',
    })"
    clickable
    v-ripple
    :active="route_name === 'marketplace'"
    @click="link = 'marketplace'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_shopping_cart" size="30px" />
    </q-item-section>

    <q-item-section >Marketplace</q-item-section>
    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>

  </q-item>

  <q-item :to="goto({
      name: 'venue',
    })"
    clickable
    v-ripple
    :active="route_name === 'venue'"
    @click="link = 'venue'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_storefront" size="30px" />
    </q-item-section>

    <q-item-section >Venue</q-item-section>

    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>

  </q-item>

  <q-item :to="goto({
      name: 'agenda',
    })"
    clickable
    v-ripple
    :active="route_name === 'agenda'"
    @click="link = 'agenda'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_calendar_today" size="30px" />
    </q-item-section>

    <q-item-section >Agenda</q-item-section>
    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>

  </q-item>


  <q-item :to="goto({
      name: 'community',
    })"
    clickable
    v-ripple
    :active="route_name === 'community'"
    @click="link = 'community'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_travel_explore" size="30px" />
    </q-item-section>

    <q-item-section >Community</q-item-section>
    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>

  </q-item>

  <q-item :to="goto({
      name: 'learning',
    })"
    clickable
    v-ripple
    :active="route_name === 'learning'"
    @click="link = 'learning'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_cast_for_education" size="30px" />
    </q-item-section>

    <q-item-section >Learning</q-item-section>

    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>

  </q-item>


  <q-item :to="goto({
      name: 'business',
    })"
    clickable
    v-ripple
    :active="route_name === 'business'"
    @click="link = 'business'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_business_center" size="30px" />
    </q-item-section>

    <q-item-section >Business</q-item-section>

    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>

  </q-item>



  <q-separator />

  <q-item v-if="is_logged" :to="goto({
      name: 'profile',
      params: {
        slug: auth_id
      }
    })"
    clickable
    v-ripple
    :active="route_name === 'profile'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light dropbtn"
  >
    <q-item-section avatar dense>
      <img @error="handleError" :src="img_checker(storeAuth?.user?.avatar)"  style="width:30px; border-radius:50px; object-fit: cover;">
      <!-- <q-icon name="o_account_circle" size="30px" /> -->
    </q-item-section>

    <q-item-section>Profile</q-item-section>

    <!-- <q-menu @show="is_show = true" @hide="is_show = false" :offset="[-55, -5]" anchor="bottom start" self="top left">
        <q-list style="min-width: 200px">
          <q-item clickable v-close-popup>
            <q-item-section>Settings</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="settings_backup_restore" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>My Activity</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="schedule" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Saved</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="o_bookmark_added" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Switch Appearance</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="o_invert_colors" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Report a problem</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="o_info" />
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup>
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-menu> -->
  </q-item>

  <!-- <div class="navbar full-width">
    <div class="dropdown full-width">
    <q-item
      clickable
      v-ripple
      :active="route_name === 'form_accounts_profile'"
      @click="link = 'form_accounts_profile'"
      active-class="my-menu-link text-weight-medium"
      class="my-title text-weight-light dropbtn"
    >
      <q-item-section avatar dense>
        <q-icon name="o_account_circle" size="30px" />
      </q-item-section>

      <q-item-section>Profile

        <q-menu
            anchor="top right"
            self="top left"
          >
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>anchor="top right"</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>self="top left"</q-item-section>
              </q-item>
            </q-list>
          </q-menu>

      </q-item-section>
    </q-item>
    <q-list style="margin-top:0px;" class="dropdown-content row">
      <q-btn  unelevated square icon="games" align="left"
        class="full-width" no-caps color="blue" label="Games"></q-btn>
      <q-separator class="full-width" color="white" />
      <q-btn  unelevated square icon="extension"
        align="left" class="full-width" no-caps color="blue" label="Puzzles"></q-btn>
      <q-separator class="full-width" color="white" />
      <q-btn  unelevated square icon="card_giftcard"
        align="left" class="full-width" no-caps color="blue" label="Greeting Cards"></q-btn>
    </q-list>
    </div>
  </div> -->

  <!-- <div class="navbar q-mr-sm">
    <div class="dropdown">
      <q-btn square icon="dashboard_customize" class="dropbtn" icon-right="arrow_drop_down" outline color="white"
        :label="$q.screen.xs ? '' : 'Produk'"></q-btn>
      <q-list style="margin-top:0px;" class="dropdown-content row">
        <q-btn  unelevated square icon="games" align="left"
          class="full-width" no-caps color="blue" label="Games"></q-btn>
        <q-separator class="full-width" color="white" />
        <q-btn  unelevated square icon="extension"
          align="left" class="full-width" no-caps color="blue" label="Puzzles"></q-btn>
        <q-separator class="full-width" color="white" />
        <q-btn  unelevated square icon="card_giftcard"
          align="left" class="full-width" no-caps color="blue" label="Greeting Cards"></q-btn>
      </q-list>
    </div>
  </div> -->


  <q-item :to="goto({
      name: 'message',
    })"
    clickable
    v-ripple
    :active="route_name === 'message'"
    @click="link = 'message'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_message" size="30px" />
    </q-item-section>

    <q-item-section >Message</q-item-section>

    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>

  </q-item>

  <q-item :to="goto({
      name: 'notification',
    })"
    clickable
    v-ripple
    :active="route_name === 'notification'"
    @click="link = 'notification'"
    active-class="my-menu-link text-weight-medium"
    class="my-title text-weight-light"
  >
    <q-item-section avatar dense>
      <q-icon name="o_notifications_active" size="30px" />
    </q-item-section>

    <q-item-section >Notifications</q-item-section>

    <q-item-section side>
      <q-badge floating class="q-mr-sm q-mt-sm" color="red" align="middle">Comming Soon</q-badge>
    </q-item-section>

  </q-item>

  <q-item
    clickable
    v-ripple
    class="my-title text-weight-light"
    :class="[ is_show_create ? 'text-weight-medium' : 'text-weight-light' ]"
  >
    <q-item-section avatar dense>
      <q-icon name="o_add_to_queue" size="30px" />
    </q-item-section>

    <q-item-section >Create</q-item-section>

    <q-menu @show="is_show_create = true" @hide="is_show_create = false" :offset="[-55, -5]" anchor="bottom start" self="top left">
      <q-list style="min-width: 200px">
        <q-item
          :to="goto({
            name: 'video_create'
          })"
          clickable v-close-popup>
          <q-item-section>Video</q-item-section>
          <q-item-section avatar>
            <q-icon color="grey" name="fa-solid fa-play" />
          </q-item-section>
        </q-item>
        <q-item
          :to="goto({
            name: 'audio_create'
          })"
          clickable v-close-popup>
          <q-item-section>Audio</q-item-section>
          <q-item-section avatar>
            <q-icon color="grey" name="fa-solid fa-music" />
          </q-item-section>
        </q-item>
        <q-item
          :to="goto({
            name: 'agenda_create'
          })"
          clickable v-close-popup>
          <q-item-section>Agenda</q-item-section>
          <q-item-section avatar>
            <q-icon color="grey" name="fa-regular fa-calendar" />
          </q-item-section>
        </q-item>
        <q-item
          :to="goto({
            name: 'image_create'
          })"
          clickable v-close-popup>
          <q-item-section>Image</q-item-section>
          <q-item-section avatar>
            <q-icon color="grey" name="fa-regular fa-image" />
          </q-item-section>
        </q-item>
        <q-item
          :to="goto({
            name: 'youtube_create'
          })"
          clickable v-close-popup>
          <q-item-section>Youtube</q-item-section>
          <q-item-section avatar>
            <q-icon color="grey" name="fa-brands fa-youtube" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>

  </q-item>


  <q-item style="border-top:1px solid rgba(0, 0, 0, 0.12);"
    clickable
    v-ripple
    class="my-title absolute-bottom bg-white"
    :class="[ is_show ? 'text-weight-medium' : 'text-weight-light' ]"
  >
    <q-item-section avatar dense>
      <q-icon name="menu" size="30px" />
    </q-item-section>

    <q-item-section >More
      <!-- <q-menu @show="is_show = true" @hide="is_show = false" :offset="[-55, -5]" anchor="top right" self="top left">
        <q-list style="min-width: 200px">
          <q-item clickable v-close-popup>
            <q-item-section>Settings</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="settings_backup_restore" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>My Activity</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="schedule" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Saved</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="o_bookmark_added" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Switch Appearance</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="o_invert_colors" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Report a problem</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="o_info" />
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup>
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-menu> -->

    </q-item-section>

    <q-menu @show="is_show = true" @hide="is_show = false" :offset="[-55, -5]">
        <q-list style="min-width: 200px">
          <q-item @click="underconstruction" clickable v-close-popup>
            <q-item-section>Settings</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="settings_backup_restore" />
            </q-item-section>
          </q-item>
          <q-item @click="underconstruction" clickable v-close-popup>
            <q-item-section>My Activity</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="schedule" />
            </q-item-section>
          </q-item>
          <q-item @click="underconstruction" clickable v-close-popup>
            <q-item-section>Saved</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="o_bookmark_added" />
            </q-item-section>
          </q-item>
          <q-item @click="underconstruction" clickable v-close-popup>
            <q-item-section>Switch Appearance</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="o_invert_colors" />
            </q-item-section>
          </q-item>
          <q-item @click="underconstruction" clickable v-close-popup>
            <q-item-section>Report a problem</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="o_info" />
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item v-if="is_logged" @click="logout" clickable v-close-popup>
            <q-item-section>Logout</q-item-section>
            <q-item-section avatar>
              <q-icon color="grey" name="o_logout" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>

  </q-item>

</template>

<script>
import { defineComponent } from 'vue'

import { mapState, mapWritableState, mapActions } from 'pinia'
import { useAuthStore } from 'src/stores/auth/auth.js'

export default defineComponent({
  name: 'EssentialLink',
  data() {
    return {
      link: '',
      is_show: false,
      is_show_create: false,
      is_search: false,
    }
  },
  computed: {
    search_effect() {
      if(this.is_mobile_size) return false
      return !this.is_search
    }
  },
  methods: {
    ...mapActions(useAuthStore, {
      sendVerifyEmail: 'sendVerifyEmail',
      logout: 'logout',
    })
  }
})
</script>

<style scoped lang="css">
.my-menu-link {
  /* color: #F2C037; */
  color: black;
}
.my-title {
  font-size: 16px;
  height: 55px;
}

.navbar {
  overflow: hidden;
  /* background-color: #333; */
}

.navbar a {
  float: left;
  /* font-size: 16px; */
  color: white;
  /* text-align: center; */
  /* padding: 14px 16px; */
  text-decoration: none;
}

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  /* font-size: 16px; */
  border: none;
  outline: none;
  /* color: white; */
  /* padding: 14px 16px; */
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.navbar a:hover,
.dropdown:hover .dropbtn {
  /* background-color: red; */
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: black;
  /* min-width: 160px; */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
