/*
 * @Date: 2021-10-18 08:50:14
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-18 15:34:50
 * @FilePath: \VueProject\gshop\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
