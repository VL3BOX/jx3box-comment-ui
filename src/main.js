import Vue from 'vue'
import './plugins/element.js'
Vue.config.productionTip = false

import App from './App.vue'

new Vue({
  render: h => h(App),
}).$mount('#app')
