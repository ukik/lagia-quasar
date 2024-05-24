import { boot } from 'quasar/wrappers'
import { defineAsyncComponent } from 'vue'


// import { RecycleScroller } from 'vue3-virtual-scroller'
// import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'

// import VueVirtualScroller from 'vue3-virtual-scroller'


// import 'src/components/list-item';
// import 'src/components/profile';
// import 'src/components/toolbar';
// import 'src/components/blank';
// import 'src/components/skeleton';
// import 'src/components/widgets';

import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export default boot(({ app, ssrContext, router, store }) => {

  app.component("SkeletonTwitch", () => import('src/components/skeleton/skeleton-twitch.vue'))
  app.component("SkeletonTwitter", () => import('src/components/skeleton/skeleton-twitter.vue'))

  app.component("BlankArtikel", () => import('src/components/blank/artikel.vue'))
  app.component("BlankCari", () => import('src/components/blank/cari.vue'))
  app.component("BlankFavorit", () => import('src/components/blank/favorit.vue'))
  app.component("BlankKomentar", () => import('src/components/blank/komentar.vue'))
  app.component("BlankProfil", () => import('src/components/blank/profil.vue'))
  app.component("BlankSuka", () => import('src/components/blank/suka.vue'))

  app.component("SpinnerOrbit", () => import('src/components/widgets/spinner_orbit.vue'))
  app.component("ActionbarMenu", () => import('src/components/widgets/Actionbar_Menu.vue'))

  app.component("Touch", () => import('src/components/Touch.vue'))

  app.use(VueVirtualScroller)


	// app.mixin({
	// 	data() {
	// 	    return {}
	// 	},
	// 	computed: {

	// 	},
	// 	methods: {
	// 	}
	// })

	// app.component('review',
	// 	defineAsyncComponent(() => import('src/components/review.vue'))
	// )

	// app.component('VirtualCollection',
	// 	defineAsyncComponent(() => import("vue-virtual-collection/src/VirtualCollection.vue"))
	// )

	// app.component('BadgeCartUnit',
	// 	defineAsyncComponent(() => import('src/components/widgets/badge_cart_unit.vue'))
	// )

  // app.component('RecycleScroller', RecycleScroller)
  // app.use(VueVirtualScroller)



})
