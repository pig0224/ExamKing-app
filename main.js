import Vue from 'vue'
import App from './App'
import store from '@/store'

Vue.config.productionTip = false
App.mpType = 'app'

import uView from './plugins/uview-ui';
Vue.use(uView);

Vue.prototype.$utils = require("@/utils")
Vue.prototype.$api = require("@/api")
Vue.prototype.$store = store

const app = new Vue({
  store,
  ...App
})
app.$mount()





