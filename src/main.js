// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import { Button, Upload, Dialog } from 'element-ui'
Vue.use(Button)
Vue.use(Upload)
Vue.use(Dialog)

import VueParticles from 'vue-particles'    
Vue.use(VueParticles)

import baseHeader from './components/BaseHeader'
Vue.component('base-header', baseHeader);

import commentArea from './components/CommentArea'
Vue.component('comment-area', commentArea);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
