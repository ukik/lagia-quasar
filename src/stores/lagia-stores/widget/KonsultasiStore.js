import { defineStore } from 'pinia';

// no need to import defineStore and acceptHMRUpdate
export const useKonsultasiStore = defineStore('KonsultasiStore', {
  id: 'KonsultasiStore',

  state: () => ({
    prompt: false,
    name: "",
    email: "",
    question: "",
  }),

  getters: {
    // getRecord: state => state.record,
  },

  actions: {
    onOpen() {
      this.prompt = true
    }
  }
});
