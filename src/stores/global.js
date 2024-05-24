import { defineStore } from 'pinia';
import axios from 'axios'

export const useGlobalStore = defineStore('global-store', {
  state: () => ({
    tab_liked: '1',
    tab_favorite: '1',
    tab_home: '1',
  }),
  getters: {

  },
  actions: {

  },
});
