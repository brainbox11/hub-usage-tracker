import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import Routes from './routes'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.prototype.$axios = axios
Vue.prototype.$baseUrl = ''

const router = new VueRouter({
  routes: Routes,
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
      // return { x: 0, y: 0 }
    } else {
      return { x: 0, y: 0 }
    }
  }
});

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  router: router
}).$mount('#app')