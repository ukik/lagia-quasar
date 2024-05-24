export const user_list = {
  id: '',
  name: '',
  slug: '',
  email: '',
  phone: null,
  email_verified_at: '',
  two_factor_secret: null,
  two_factor_recovery_codes: null,
  two_factor_confirmed_at: null,
  role: '',
  avatar: '',
  gender: '',
  country: '',
  city: '',
  description: '',
  talent_status: '',
  talent_verifyed: null,
  created_at: '',
  updated_at: '',
  follow: null,
}

export const comment_list = {
  id: '',
  post_id: '',
  user_id: '',
  parent_id: '',
  replied_id: '',
  comment: '',
  diblokir: '',
  created_at: '',
  updated_at: '',
  pressed: false,
  lines: 0,
  user: {
    id: null,
    name: "",
    role: "",
    avatar: null,
    follow: null,
  },
  replied: {
    id: null,
    name: "",
    role: "",
    avatar: null
  }
}
