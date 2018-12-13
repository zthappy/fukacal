import Vue from 'vue'
import App from './App.vue'

import cal from './index.js'

Vue.use(cal)

new Vue({
  el: '#app',
  render: h => h(App)
})
