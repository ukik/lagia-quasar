import { defineStore } from 'pinia';

export const useGlobalEasyLightbox = defineStore('GlobalEasyLightbox', {
  id: 'GlobalEasyLightbox',

  state: () => ({
    visible: false,
    index: 0,
    imgs: [],
  }),

  getters: {
    getVisible: state => state.visible,
    getIndex: state => state.index,
    getImgs: state => state.imgs,
  },

  actions: {
    onShow() {
      this.visible = true;
    },
    showMultiple(images, index) {
      console.log("showMultiple", images, index);
      this.imgs = images;
      // or
      // imgsRef.value = [
      //   { title: 'test img', src: 'http://via.placeholder.com/350x150' },
      //   'http://via.placeholder.com/350x150'
      // ]
      this.index = index; // index of imgList
      this.onShow();
    },
    showImage (index = 0) {
      this.index = index; // index of imgList
      this.onShow();
    },
    onHide () {
      this.visible = false
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalEasyLightbox, import.meta.hot));
}

