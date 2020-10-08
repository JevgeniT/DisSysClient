import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import store from './store'
import api from '@/services/api'
import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
