/*
 * @Date: 2021-10-18 08:50:14
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-19 18:30:16
 * @FilePath: \VueProject\gshop\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

let a = new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
console.log('tag',a, '')