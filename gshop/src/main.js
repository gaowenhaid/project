/*
 * @Date: 2021-10-18 08:50:14
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-30 18:27:14
 * @FilePath: \gshop\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 因为外部有许多组件都会用到 swiper 的样式,所以我们只需要在 入口文件引入一次 css 样式就行
import 'swiper/css/swiper.css'
// 引入相关的 mock 代码,来保证他能够执行一次
import '@/mock/serve';

// 测试模拟的数据是否能够返回
// import {getContainerList} from '@/api'
// let data = getContainerList()
// data.then((res)=>{
//   console.log(res);
// })

// 全局注册 typeNav组件,因为有很多组件都需要使用typeNav 这个组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
Vue.config.productionTip = false
// 全局注册,第一个参数 (组件的名字name属性), 第二个参数 组件引入的时候起的名字
Vue.component(TypeNav.name,TypeNav)
// 全局注册轮播图的组件
Vue.component(Carousel.name,Carousel)

Vue.component(Pagination.name,Pagination)
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  router,
  store,
}).$mount('#app')
