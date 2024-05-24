// import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from 'src/stores/auth/auth';

import businessEmpty from './business-empty';
import lagia from './lagia';

export default function (store, cookies, ssrContext) {
  console.log("conpas jtccm");
  const auth = useAuthStore(store)
  return [
    ...lagia(store, cookies, ssrContext),
    {
      path: '/',
      component: () => import('layouts/BusinessLayout.vue'),
      children: [
        ...businessEmpty(store, cookies, ssrContext),


        {
          path: "",
          name: "home",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Beranda',
          },
          component: () => import("pages/home/index.vue"),
          // beforeEnter: (to, from, next) => {
          //   if(!to.query?.category) {
          //     next({ query: { category: 'semua' } })
          //   } else {
          //     next()
          //   }
          // }
        },

        {
          path: "/walkthrough",
          name: "walkthrough",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'walkthrough',
          },
          component: () => import("pages/walkthrough/index.vue"),
        },










        // {
        //   path: "/LoginPage",
        //   name: "LoginPage",
        //   meta: {
        //     ssr: false,
        //     logged: false,
        //     role: '',
        //     title: 'LoginPage',
        //   }, component: () => import("pages/LoginPage.vue")
        // },
        // {
        //   path: "/ForgetPage",
        //   name: "ForgetPage",
        //   meta: {
        //     ssr: false,
        //     logged: false,
        //     role: '',
        //     title: 'ForgetPage',
        //   }, component: () => import("pages/ForgetPage.vue")
        // },
        // {
        //   path: "/ProfilePage",
        //   name: "ProfilePage",
        //   meta: {
        //     ssr: false,
        //     logged: false,
        //     role: '',
        //     title: 'ProfilePage',
        //   }, component: () => import("pages/ProfilePage.vue")
        // },
        // {
        //   path: "/password",
        //   name: "ProfilePasswordPage",
        //   meta: {
        //     ssr: false,
        //     logged: false,
        //     role: '',
        //     title: 'ProfilePasswordPage',
        //   }, component: () => import("pages/ProfilePasswordPage.vue")
        // },
        // {
        //   path: "/PencarianPage",
        //   name: "PencarianPage",
        //   meta: {
        //     ssr: false,
        //     logged: false,
        //     role: '',
        //     title: 'PencarianPage',
        //   }, component: () => import("pages/PencarianPage.vue")
        // },
        // {
        //   path: "/RequestPage",
        //   name: "RequestPage",
        //   meta: {
        //     ssr: false,
        //     logged: false,
        //     role: '',
        //     title: 'RequestPage',
        //   }, component: () => import("pages/RequestPage.vue")
        // },

        // {
        //   path: "/DetailVideo",
        //   name: "DetailVideo",
        //   meta: {
        //     ssr: false,
        //     logged: false,
        //     role: '',
        //     title: 'DetailVideo',
        //   }, component: () => import("pages/lists/DetailVideo.vue")
        // },
        // {
        //   path: "/DetailYoutube",
        //   name: "DetailYoutube",
        //   meta: {
        //     ssr: false,
        //     logged: false,
        //     role: '',
        //     title: 'DetailYoutube',
        //   }, component: () => import("pages/lists/DetailYoutube.vue")
        // },
        // {
        //   path: "/DetailImage",
        //   name: "DetailImage",
        //   meta: {
        //     ssr: false,
        //     logged: false,
        //     role: '',
        //     title: 'DetailImage',
        //   }, component: () => import("pages/lists/DetailImage.vue")
        // },
        // {
        //   path: "/DetailAudio",
        //   name: "DetailAudio",
        //   meta: {
        //     ssr: false,
        //     logged: false,
        //     role: '',
        //     title: 'DetailAudio',
        //   }, component: () => import("pages/lists/DetailAudio.vue")
        // },
        {
          path: "/komentar",
          name: "komentar",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komentar',
          }, component: () => import("pages/komentar/index.vue")
        },
        {
          path: "/komentar-semua/:id?",
          name: "komentar-semua",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Semua Komentar',
          }, component: () => import("pages/komentar-semua/index.vue")
        },
        {
          path: "/komentar-balasan/:post_id/:parent_id?",
          name: "komentar-balasan",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komentar Balasan',
          }, component: () => import("pages/komentar-balasan/index.vue")
        },
















        {
          path: "/video-list/:page",
          name: "video_list",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Video',
          }, component: () => import("pages/video/list/index.vue")
        },
        {
          path: "/video-komentar-semua/:id/:page",
          name: "video_komentar_semua",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komenter Video',
          }, component: () => import("pages/video/komentar-semua/index.vue")
        },
        {
          path: "/video-komentar-balasan/:id/:page",
          name: "video_komentar_balasan",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komentar Balasan',
          }, component: () => import("pages/video/komentar-balasan/index.vue"),
        },
        {
          path: "/video-create/:id?",
          name: "video_create",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'video-create',
          }, component: () => import("pages/video/create/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_biodata', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },


        {
          path: "/youtube-list/:page",
          name: "youtube_list",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Youtube',
          }, component: () => import("pages/youtube/list/index.vue")
        },
        {
          path: "/youtube-komentar-semua/:id/:page",
          name: "youtube_komentar_semua",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komentar Youtube',
          }, component: () => import("pages/youtube/komentar-semua/index.vue")
        },
        {
          path: "/youtube-komentar-balasan/:id/:page",
          name: "youtube_komentar_balasan",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komentar Balasan',
          }, component: () => import("pages/youtube/komentar-balasan/index.vue"),
        },
        {
          path: "/youtube-create",
          name: "youtube_create",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Youtube',
          }, component: () => import("pages/youtube/create/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_biodata', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },
        {
          path: "/youtube-create/:id",
          name: "youtube_edit",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Youtube',
          }, component: () => import("pages/youtube/create/edit.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_biodata', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },



        {
          path: "/audio-list/:page",
          name: "audio_list",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Audio',
          }, component: () => import("pages/audio/list/index.vue")
        },
        {
          path: "/audio-komentar-semua/:id/:page",
          name: "audio_komentar_semua",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komentar Audio',
          }, component: () => import("pages/audio/komentar-semua/index.vue")
        },
        {
          path: "/audio-komentar-balasan/:id/:page",
          name: "audio_komentar_balasan",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komentar Balasan',
          }, component: () => import("pages/audio/komentar-balasan/index.vue"),
        },
        {
          path: "/audio-create/:id?",
          name: "audio_create",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Audio',
          }, component: () => import("pages/audio/create/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_biodata', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },


        {
          path: "/image-list/:page",
          name: "image_list",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Image',
          }, component: () => import("pages/image/list/index.vue")
        },
        {
          path: "/image-komentar-semua/:id/:page",
          name: "image_komentar_semua",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komentar Image',
          }, component: () => import("pages/image/komentar-semua/index.vue")
        },
        {
          path: "/image-komentar-balasan/:id/:page",
          name: "image_komentar_balasan",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komentar Balasan',
          }, component: () => import("pages/image/komentar-balasan/index.vue"),
        },
        {
          path: "/image-create/:id?",
          name: "image_create",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Image',
          }, component: () => import("pages/image/create/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_biodata', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },

        {
          path: "/agenda-list/:page",
          name: "agenda_list",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Agenda',
          }, component: () => import("pages/agenda/list/index.vue")
        },
        {
          path: "/agenda-komentar-semua/:id/:page",
          name: "agenda_komentar_semua",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komentar Agenda',
          }, component: () => import("pages/agenda/komentar-semua/index.vue")
        },
        {
          path: "/agenda-komentar-balasan/:id/:page",
          name: "agenda_komentar_balasan",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Komentar Balasan',
          }, component: () => import("pages/agenda/komentar-balasan/index.vue"),
        },
        {
          path: "/agenda-create/:id?",
          name: "agenda_create",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Agenda',
          }, component: () => import("pages/agenda/create/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_biodata', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },



        {
          path: "/settings",
          name: "settings",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Settings',
          },
          component: () => import("pages/settings/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_profile', auth.payload?.logged)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },

        {
          path: "/forms",
          name: "form_accounts",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Accounts',
          },
          component: () => import("pages/forms/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_profile', auth.payload?.logged)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },

        {
          path: "/forms/accounts/profile",
          name: "form_accounts_profile",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Profile',
          },
          component: () => import("pages/forms/accounts/profile/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_profile', auth.payload?.logged)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },
        {
          path: "/forms/accounts/password",
          name: "form_accounts_password",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Password',
          }, component: () => import("pages/forms/accounts/password/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_password', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },
        {
          path: "/forms/accounts/biodata",
          name: "form_accounts_biodata",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Biodata',
          }, component: () => import("pages/forms/accounts/biodata/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_biodata', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },
        {
          path: "/forms/accounts/social",
          name: "form_accounts_social",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Social',
          }, component: () => import("pages/forms/accounts/social/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_social', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },
        {
          path: "/forms/accounts/avatar",
          name: "form_accounts_avatar",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Avatar',
          }, component: () => import("pages/forms/accounts/avatar/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_avatar', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },
        {
          path: "/forms/accounts/banner",
          name: "form_accounts_banner",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Banner',
          }, component: () => import("pages/forms/accounts/banner/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_banner', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },
        {
          path: "/forms/accounts/preview",
          name: "form_accounts_preview",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Preview',
          }, component: () => import("pages/forms/accounts/preview/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_preview', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },
        {
          path: "/forms/accounts/career",
          name: "form_accounts_career",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Career',
          }, component: () => import("pages/forms/accounts/career/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('form_accounts_career', store.state.value?.router)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },
        // {
        //   path: "/forms/accounts/agenda",
        //   name: "form_accounts_agenda",
        //   meta: {
        //               ssr: false,
        // logged: false,
        // role: '',
        //     title: 'form-accounts-agenda',
        //   }, component: () => import("pages/forms/accounts/agenda/index.vue")
        // },










        {
          path: "/auth/login",
          name: "auth_login",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Login',
          }, component: () => import("pages/auth/login/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('auth_login', store.state.value)
            if (!auth.payload?.logged) {
              next()
            } else {
              next({ name: 'form_accounts_profile' })
            }
          }
        },
        {
          path: "/auth/signup",
          name: "auth_signup",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Signup',
          }, component: () => import("pages/auth/signup/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('auth_signup', store.state.value)
            if (!auth.payload?.logged) {
              next()
            } else {
              next({ name: 'form_accounts_profile' })
            }
          }
        },
        {
          path: "/auth/forget",
          name: "auth_forget",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Forget Password',
          }, component: () => import("pages/auth/forget/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('auth_forget', store.state.value)
            if (!auth.payload?.logged) {
              next()
            } else {
              next({ name: 'form_accounts_profile' })
            }
          }
        },
        {
          path: "/auth/verified/:token",
          name: "auth_verified",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Email Verified',
          }, component: () => import("pages/auth/verified/index.vue")
        },
        {
          path: "/auth/redirect-password",
          name: "auth_redirect_password",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'auth-redirect-password',
          }, component: () => import("pages/auth/redirect-password/index.vue")
        },
        {
          path: "/auth/redirect-profile",
          name: "auth_redirect_profile",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Redirect Profile',
          }, component: () => import("pages/auth/redirect-profile/index.vue")
        },
        {
          path: "/auth/sent",
          name: "auth_sent",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Email Sent',
          }, component: () => import("pages/auth/sent/index.vue"),
          beforeEnter: (to, from, next) => {
            // console.log('auth_forget', store.state.value)
            if (!auth.payload?.logged) {
              if (!auth.form_forget?.note) {
                next({ name: 'auth_forget' })
              } else {
                next()
              }
            } else {
              next({
                name: 'profile',
                params: {
                  slug: auth.payload?.user.id
                }
              })
            }
          }
        },
        {
          path: "/auth/reset",
          name: "auth_reset",
          meta: {
            ssr: false,
            logged: true,
            role: '',
            title: 'Reset Password',
          }, component: () => import("pages/auth/reset/index.vue"),
          beforeEnter: (to, from, next) => {
            console.log('auth_forget', store.state.value)
            if (!auth.payload?.logged) {
              next({ name: 'auth_login' })
            } else {
              next()
            }
          }
        },

        {
          path: "/activity/:user_id",
          name: "activity",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Activity',
          }, component: () => import("pages/activity/index.vue"),
        },


















        {
          path: "/",
          name: "user_profile",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Profile',
          },
          component: () => import("pages/profile/index.vue"),
          // beforeEnter: (to, from, next) => {
          //   if(!to.slug) {
          //     next({ name: 'not_found' })
          //   } else {
          //     next()
          //   }
          // },
          children: [
            {
              path: 'profile/:slug',
              name: 'profile',
              meta: {
                ssr: false,
                logged: true,
                role: '',
                title: 'Profile',
              },
              component: () => import('pages/profile/pages/musisi.vue'),
              // beforeEnter: (to, from, next) => {
              //   console.log('profile', to.params.slug, auth.payload?.user.id)
              //   if (!auth.payload?.logged) {
              //     next({ name: 'auth_login' })
              //   } else {
              //     if(to.params.slug == auth.payload?.user.id) {
              //       next()
              //     } else {
              //       next({ name: 'profile_musisi', params: { slug: to.params.slug }})
              //     }
              //   }
              // }
            },
            {
              path: 'musisi/:slug',
              name: 'profile_musisi',
              meta: {
                ssr: true,
                logged: false,
                role: '',
                title: 'Profile',
              },
              component: () => import('pages/profile/pages/musisi.vue'),
            },
            // {
            //   path: 'profile/studio/:slug', name: 'profile_studio', component: () => import('pages/profile/pages/studio.vue'),
            // },
            // {
            //   path: 'profile/venue/:slug', name: 'profile_venue', component: () => import('pages/profile/pages/venue.vue'),
            // },
          ]
        },


        {
          path: "/liked/:user_id",
          name: "liked",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Disukai',
          },
          component: () => import("pages/liked/index.vue"),
        },
        {
          path: "/favorite/:user_id",
          name: "favorite",
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Favorite',
          },
          component: () => import("pages/favorite/index.vue"),
        },

        // {
        //   path: "/",
        //   meta: {
        //     ssr: false,
        //     logged: false,
        //     role: '',
        //     title: 'liked',
        //   },
        //   component: () => import("pages/liked/tab_router.vue"),
        //   children: [
        //     {
        //       path: 'liked/agenda/:user_id', name: 'liked_agenda', component: () => import('pages/liked/agenda/list/index.vue'),
        //     },
        //     {
        //       path: 'liked/video/:user_id', name: 'liked_video', component: () => import('pages/liked/video/list/index.vue'),
        //     },
        //     {
        //       path: 'liked/audio/:user_id', name: 'liked_audio', component: () => import('pages/liked/audio/list/index.vue'),
        //     },
        //     {
        //       path: 'liked/image/:user_id', name: 'liked_image', component: () => import('pages/liked/image/list/index.vue'),
        //     },
        //     {
        //       path: 'liked/youtube/:user_id', name: 'liked_youtube', component: () => import('pages/liked/youtube/list/index.vue'),
        //     },
        //   ]
        // },



        {
          path: "/account",
          name: "account",
          redirect: { name: 'account_profile' },
          meta: {
            ssr: false,
            logged: false,
            role: '',
            title: 'Account Page',
          }, component: () => import("pages/AccountPage.vue"),
          children: [
            { path: '', name: 'account_profile', component: () => import('pages/AccountProfilePage.vue') },
            { path: 'password', name: 'account_password', component: () => import('pages/AccountPasswordPage.vue') },
            { path: 'biodata', name: 'account_biodata', component: () => import('pages/AccountBiodataPage.vue') },
            { path: 'avatar', name: 'account_avatar', component: () => import('pages/AccountAvatarPage.vue') },
            { path: 'preview', name: 'account_preview', component: () => import('pages/AccountPreviewPage.vue') },

            { path: 'social', name: 'account_social', component: () => import('pages/AccountSocialPage.vue') },
            { path: 'banner', name: 'account_banner', component: () => import('pages/AccountBannerPage.vue') },
            { path: 'carier', name: 'account_carier', component: () => import('pages/AccountCarierPage.vue') },
            { path: 'playlist', name: 'account_playlist', component: () => import('pages/AccountPlaylistPage.vue') },
            { path: 'agenda', name: 'account_agenda', component: () => import('pages/AccountAgendaPage.vue') },
            { path: 'original', name: 'account_original', component: () => import('pages/AccountOriginalPage.vue') },
            { path: 'cover', name: 'account_cover', component: () => import('pages/AccountCoverPage.vue') },
            { path: 'rates', name: 'account_rates', component: () => import('pages/AccountRatesPage.vue') },
            { path: 'perform', name: 'account_perform', component: () => import('pages/AccountPerformPage.vue') },

            { path: 'bank', name: 'account_bank', component: () => import('pages/AccountBankPage.vue') },
            { path: 'wallet', name: 'account_wallet', component: () => import('pages/AccountWalletPage.vue') },
          ]
        },
      ],


    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      name: 'not_found',
      component: () => import('pages/ErrorNotFound.vue'),
    },
  ];
}

// export default routes;
