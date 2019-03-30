// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import { Button, Upload, Dialog } from 'element-ui'
Vue.use(Button)
Vue.use(Upload)
Vue.use(Dialog)

import VueParticles from 'vue-particles'    
Vue.use(VueParticles)


//公共组件
import baseHeader from './components/BaseHeader'
Vue.component('base-header', baseHeader)

import commentArea from './components/CommentArea'
Vue.component('comment-area', commentArea)

import rightDialog from './components/RightDialog'
Vue.component('right-dialog', rightDialog)

import loadingImage from './components/LoadingImage'
Vue.component('loading-image', loadingImage)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
