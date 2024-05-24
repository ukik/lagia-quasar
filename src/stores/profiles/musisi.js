import { defineStore } from 'pinia';
import axios from 'axios'
//import { useRouterStore } from 'src/stores/router-store'
import { Loading, Notify, Cookies, QSpinnerClock, Platform } from 'quasar'

import { host } from 'src/boot/common'

import { date } from 'quasar'
const timeStamp = Date.now()
const formattedString = '' //date.formatDate(timeStamp, 'YYYY-MM-DD')

function errorNotify(caption = 'something error happened') {
  Notify.create({
    message: 'Proses Gagal',
    caption: caption,
    color: 'negative',
    icon: 'highlight_off',
    position: 'top',
  })
}

function successNotify() {
  Notify.create({
    message: 'Success',
    // caption: 'something error happened',
    color: 'positive',
    icon: 'done',
    position: 'top',
  })
}

const user = {
  id: '',
  name: '',
  slug: '',
  email: '',
  phone: '',
  email_verified_at: '',
  role: '',
  avatar: '',
  gender: '',
  country: '',
  city: '',
  description: '',
  talent_status: null,
  talent_verifyed: null,
  created_at: '',
  updated_at: '',
  username: '',
  phone_verified_at: null,
  birth_place: '',
  birth_date: '',
  address: '',
  bio: '',
  preview: '',
  deleted_at: null,
  csrf: '',
  social: {
    id: '',
    user_id: '',
    created_at: '',
    updated_at: '',
    facebook: null,
    tiktok: null,
    youtube: null,
    twitter: null,
    instagram: null,
    pinterest: null,
    website: null
  },
  liked_total: {
    id: '',
    user_id: '',
    total: 0,
    created_at: '',
    updated_at: ''
  },
  shared_total: {
    id: '',
    user_id: '',
    total: 0,
    created_at: '',
    updated_at: ''
  },
  bookmarked_total: {
    id: '',
    user_id: '',
    total: 0,
    created_at: '',
    updated_at: ''
  },
  follow_total: {
    id: '',
    user_id: '',
    total: 0,
    created_at: '',
    updated_at: ''
  },
  followed_total: {
    id: '',
    user_id: '',
    total: 0,
    created_at: '',
    updated_at: ''
  },
  banner: [],
  career: {
    id: '',
    user_id: '',
    start_career: '',
    created_at: '',
    updated_at: '',
    collab: '',
    featuring: '',
    performance: '',
    group_tagged: [],
    skill_tagged: [],
    user_music_genre_tagged: [],
    vocal_tagged: [],
    voice_tagged: []
  },
  follow: null,
}

export const useProfileStore = defineStore('profiles-musisi', {
  state: () => ({
    user: user,
    loading: false,
    loading_create: false,
    loading_follow: false,
    tab: '1',

    profile_detail: {
      type: '',
      popup: false,
      post_id: null,
      title: '',
      index: '',
    },

  }),
  getters: {
    get_user: (state) => state.user,
  },
  actions: {
    onProfileDetail(val) {
      this.profile_detail = val
    },


    async init(payload = null) {

      if (this.loading) return

      // if(!payload.id) return
      // const { parent_id } = route.getParams // gak support preFetch

      this.loading = true

      const results = await axios.get(`api/profile/musisi/show/${payload?.slug}`)
        .catch(err => {
          errorNotify()
          return null
        })

      this.loading = false

      // console.log(results)

      if (!results) return
      if (!results.data.payload.user) return

      let user = results.data.payload.user
      if(!user.social) {
        user.social = {
          id: '',
          user_id: '',
          created_at: '',
          updated_at: '',
          facebook: null,
          tiktok: null,
          youtube: null,
          twitter: null,
          instagram: null,
          pinterest: null,
          website: null
        }
      }
      if(!user.follow_total) {
        user.follow_total = {
          id: '',
          user_id: '',
          total: 0,
          created_at: '',
          updated_at: ''
        }
      }
      if(!user.followed_total) {
        user.followed_total = {
          id: '',
          user_id: '',
          total: 0,
          created_at: '',
          updated_at: ''
        }
      }
      if(!user.liked_total) {
        user.liked_total = {
          id: '',
          user_id: '',
          total: 0,
          created_at: '',
          updated_at: ''
        }
      }
      if(!user.shared_total) {
        user.shared_total = {
          id: '',
          user_id: '',
          total: 0,
          created_at: '',
          updated_at: ''
        }
      }
      if(!user.bookmarked_total) {
        user.bookmarked_total = {
          id: '',
          user_id: '',
          total: 0,
          created_at: '',
          updated_at: ''
        }
      }
      if(!user.career) {
        user.career = {
          id: '',
          user_id: '',
          start_career: '',
          created_at: '',
          updated_at: '',
          collab: '',
          featuring: '',
          performance: '',
          group_tagged: [],
          skill_tagged: [],
          user_music_genre_tagged: [],
          vocal_tagged: [],
          voice_tagged: []
        }
      }
      this.user = user


    },


    async follow (payload = null) {
      if(this.loading_follow) return

      this.loading_follow = true

      const results = await axios({
        method: 'post',
        url: `api/profile/musisi/follow/${payload.user_id}`,
      })
      .catch(err => {
        errorNotify()
        return null
      })

      this.loading_follow = false

      if(!results) return

      let user = results.data.payload.check
      if(!user.social) {
        user.social = {
          id: '',
          user_id: '',
          created_at: '',
          updated_at: '',
          facebook: null,
          tiktok: null,
          youtube: null,
          twitter: null,
          instagram: null,
          pinterest: null,
          website: null
        }
      }
      if(!user.follow_total) {
        user.follow_total = {
          id: '',
          user_id: '',
          total: 0,
          created_at: '',
          updated_at: ''
        }
      }
      if(!user.followed_total) {
        user.followed_total = {
          id: '',
          user_id: '',
          total: 0,
          created_at: '',
          updated_at: ''
        }
      }
      if(!user.liked_total) {
        user.liked_total = {
          id: '',
          user_id: '',
          total: 0,
          created_at: '',
          updated_at: ''
        }
      }
      if(!user.shared_total) {
        user.shared_total = {
          id: '',
          user_id: '',
          total: 0,
          created_at: '',
          updated_at: ''
        }
      }
      if(!user.bookmarked_total) {
        user.bookmarked_total = {
          id: '',
          user_id: '',
          total: 0,
          created_at: '',
          updated_at: ''
        }
      }
      if(!user.career) {
        user.career = {
          id: '',
          user_id: '',
          start_career: '',
          created_at: '',
          updated_at: '',
          collab: '',
          featuring: '',
          performance: '',
          group_tagged: [],
          skill_tagged: [],
          user_music_genre_tagged: [],
          vocal_tagged: [],
          voice_tagged: []
        }
      }
      this.user = user



      return
      // const user = this.user

      if(user.id == results.data.payload.check.user_id) {
        switch (results.data.payload.status) {
          case 'add':
            this.user.follow = true
            break;
          case 'remove':
            this.user.follow = false
            break;
        }
      }

      // const content = this.reply.data

      // for (let i = 0; i < content.length; i++) {
      //   const element = content[i];
      //   if(element.user_id == results.data.payload.check.user_id) {
      //     if(results.data.payload.status == 'add') {
      //       element.user.follow = true
      //     }
      //     if(results.data.payload.status == 'remove') {
      //       element.user.follow = false
      //     }
      //   }
      // }
    },



    // async form_create(payload = null) {

    //   if (this.loading_create) return

    //   let formData = new FormData();
    //   // formData.append('user', this.user)
    //   formData.append('id', !this.user.id ? '' : this.user.id)
    //   formData.append('birth_place', !this.user.birth_place ? '' : this.user.birth_place)
    //   formData.append('birth_date', !this.user.birth_date ? '' : this.user.birth_date)
    //   formData.append('address', !this.user.address ? '' : this.user.address)
    //   formData.append('bio', !this.user.bio ? '' : this.user.bio)

    //   this.loading_create = true

    //   const results = await axios({
    //     method: 'post',
    //     url: `api/accounts/biodata/create`,
    //     data: formData
    //   })
    //     .catch(err => {
    //       console.log(err.response.data?.meta?.message)
    //       try {
    //         errorNotify(Object.values(err.response.data?.meta?.message))
    //       } catch (error) {
    //         errorNotify()
    //       }
    //       return null
    //     })

    //   this.loading_create = false

    //   if (!results) return

    //   successNotify()

    //   this.router.replace({
    //     name: 'form_accounts_biodata',
    //     params: {
    //       id: results.data.payload?.user.id
    //     }
    //   })

    //   // return results.data.payload?.content
    // },

  },
});
