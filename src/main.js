import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import store from './store'
import api from '@/services/api'
import helpers from '@/services/helpers'
import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
Vue.config.productionTip = false
Vue.prototype.$api = api

const plugin = {
  install(Vue, options) {
    Vue.prototype.$helpers = helpers
  }
}
new Vue({
  vuetify,
  router,
  store,
  plugin,
  render: h => h(App)
}).$mount('#app')
