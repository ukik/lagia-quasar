// import { mapState, mapWritableState, mapActions } from 'pinia'
import { Cookies } from 'quasar'
import { host } from 'src/boot/common'
import axios from 'axios'

import { useAgendaListStore } from 'src/stores/agenda/list.js'
import { useVideoListStore } from 'src/stores/video/list.js'
import { useImageListStore } from 'src/stores/image/list.js'
import { useYoutubeListStore } from 'src/stores/youtube/list.js'
import { useAudioListStore } from 'src/stores/audio/list.js'

import { useAgendaListStore as createAgendaListStore } from 'src/stores/agenda/create.js'
import { useVideoListStore as createVideoListStore } from 'src/stores/video/create.js'
import { useImageListStore as createImageListStore } from 'src/stores/image/create.js'
import { useYoutubeListStore as createYoutubeListStore } from 'src/stores/youtube/create.js'
import { useAudioListStore as createAudioListStore } from 'src/stores/audio/create.js'


import { useProfileStore } from 'src/stores/profiles/musisi'

import { useFormStore as avatarStore } from 'src/stores/forms/accounts/avatar.js'
import { useFormStore as bannerStore } from 'src/stores/forms/accounts/banner.js'
import { useFormStore as biodataStore} from 'src/stores/forms/accounts/biodata.js'
import { useFormStore as careerStore} from 'src/stores/forms/accounts/career.js'
import { useFormStore as passwordStore} from 'src/stores/forms/accounts/password.js'
import { useFormStore as previewStore} from 'src/stores/forms/accounts/preview.js'
import { useFormStore as profileStore} from 'src/stores/forms/accounts/profile.js'
import { useFormStore as socialStore } from 'src/stores/forms/accounts/social.js'

import { useAuthStore } from 'src/stores/auth/auth.js'
import { useHomeStore } from 'src/stores/home.js'

const is_cookie_secure = {
  secure: process.env.PROD ? true : false,
  path: '/' // wajib
}

export const onRequestPrefetch = async function (store, currentRoute, ssrContext) {

  const mystore = useAuthStore(store);

  // console.log('mystore', mystore.get_user)

  const cookies = process.env.SERVER
  ? Cookies.parseSSR(ssrContext)
  : Cookies // otherwise we're on client

  const page = !currentRoute.params?.page ? 1 : currentRoute.params.page
  const id = !currentRoute.params?.id ? '' : currentRoute.params.id

  switch (currentRoute.name) {
    case "home":
      return  await useHomeStore(store).request(mystore.get_user?.id);
      break;

    case "form_accounts_profile":
      return  await profileStore(store).form_edit();
      break;
    case "form_accounts_password":
      return  await passwordStore(store).form_edit();
      break;
    case "form_accounts_biodata":
      return  await biodataStore(store).form_edit();
      break;
    case "form_accounts_social":
      return  await socialStore(store).form_edit();
      break;
    case "form_accounts_avatar":
      return  await avatarStore(store).form_edit();
      break;
    case "form_accounts_banner":
      return  await bannerStore(store).form_edit();
      break;
    case "form_accounts_preview":
      return  await previewStore(store).form_edit();
      break;
    case "form_accounts_career":
      return  await careerStore(store).form_edit();
      break;

    case "auth_redirect_password":
    case "auth_redirect_profile":
      const auth_redirect = await mystore.redirect({
        token: currentRoute.query.token
      });

      cookies.set('imajora_cookie', mystore.payload.token, is_cookie_secure)
      return auth_redirect
      break;

    case "profile":
    case "profile_musisi":
      return  await useProfileStore(store).init({
        slug: currentRoute.params.slug
      });
      break;


    // VIDEO
    case "video_list":
      return  await useVideoListStore(store).request({
        page: page
      });
      break;
    case "video_komentar_semua":
      return  await useVideoListStore(store).komentar_semua({
        id: id,
        page: page,
      });
      break;
    case "video_komentar_balasan":
      return  await useVideoListStore(store).komentar_balasan({
        id: id,
        page: page,
      });
      break;
    case "video_create":
      return  await createVideoListStore(store).form_edit({
        id: id
      })
      break;

    // IMAGE
    case "image_list":
      return  await useImageListStore(store).request({
        page: page
      });
      break;
    case "image_komentar_semua":
      return  await useImageListStore(store).komentar_semua({
        id: id,
        page: page,
      });
      break;
    case "image_komentar_balasan":
      return  await useImageListStore(store).komentar_balasan({
        id: id,
        page: page,
      });
      break;
    case "image_create":
      return  await createImageListStore(store).form_edit({
        id: id
      })
      break;

    // AGENDA
    case "agenda_list":
      return  await useAgendaListStore(store).request({
        page: page
      });
      break;
    case "agenda_komentar_semua":
      return  await useAgendaListStore(store).komentar_semua({
        id: id,
        page: page,
      });
      break;
    case "agenda_komentar_balasan":
      return  await useAgendaListStore(store).komentar_balasan({
        id: id,
        page: page,
      });
      break;
    case "agenda_create":
      return  await createAgendaListStore(store).form_edit({
        id: id
      })
      break;

    // YOUTUBE
    case "youtube_list":
      return  await useYoutubeListStore(store).request({
        page: page
      });
      break;
    case "youtube_komentar_semua":
      return  await useYoutubeListStore(store).komentar_semua({
        id: id,
        page: page,
      });
      break;
    case "youtube_komentar_balasan":
      return  await useYoutubeListStore(store).komentar_balasan({
        id: id,
        page: page,
      });
      break;
    case "youtube_create":
      return  await createYoutubeListStore(store).form_edit({
        id: id
      })
      break;

    // AUDIO
    case "audio_list":
      return  await useAudioListStore(store).request({
        page: page
      });
      break;
    case "audio_komentar_semua":
      return  await useAudioListStore(store).komentar_semua({
        id: id,
        page: page,
      });
      break;
    case "audio_komentar_balasan":
      return  await useAudioListStore(store).komentar_balasan({
        id: id,
        page: page,
      });
      break;
    case "audio_create":
      return  await createAudioListStore(store).form_edit({
        id: id
      })
      break;
  }

};
