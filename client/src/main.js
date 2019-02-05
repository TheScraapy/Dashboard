import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'
import Vuetify from 'vuetify'
import VueWidgets from 'vue-widgets'
import {sync} from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import 'vue-widgets/dist/styles/vue-widgets.css'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueWidgets)

sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
