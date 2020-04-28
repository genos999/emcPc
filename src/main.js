import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'video.js/dist/video-js.css'
import 'video.js/dist/video.min.js'
import utils from './utils';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { vueBaberrage } from 'vue-baberrage'
import 'swiper/css/swiper.css'
import wxlogin from 'vue-wxlogin'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(vueBaberrage)
Vue.use(wxlogin)
// axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$axios=axios
// axios.defaults.baseURL = '/apis'
Vue.use(wxlogin)
Vue.config.productionTip = false
import Toastr from 'vue2-toastr'
Vue.use(Toastr)
Vue.prototype.$utils = utils;
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

