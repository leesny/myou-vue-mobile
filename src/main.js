// Polyfills for IE Support
import 'babel-polyfill'
import 'event-source-polyfill'

// Packages
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})

/* eslint-disable no-new */
window.SWAPP = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
