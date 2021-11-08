/*
 * @Date: 2021-10-18 08:50:14
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-09 00:00:17
 * @FilePath: \VueProject\gshop\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/plugins/validate'

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

// 引入所有的请求函数(并将他们挂载到 vm 上,来保证所有的组件都可以获取到 这些函数)
import * as API from '@/api'

// 全局注册 typeNav组件,因为有很多组件都需要使用typeNav 这个组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
////////////////////////////////////////////////////////////// 
// 用来引入 饿了么 ui 的区域
// 第一步 安装: npm i element-ui
// 第二部: 引入
// 引入组件库(第一种引入方式,全部引入)
// import ElementUI from 'element-ui';
// 引入样式
// import 'element-ui/lib/theme-chalk/index.css';
// // 因为是个插件,所以我们需要 use 一下
// Vue.use(ElementUI)


// 按需引入
// 第一步 安装 npm i element-ui
// 第二部 安装 npm install babel-plugin-component -D
// 第三步 将 .babelrc 修改
// 第四部 重启项目
// 第四部 按需引入
import { MessageBox ,Message} from 'element-ui';
// // 第五步 注册为全局组件(就可以使用了)
// Vue.component(Button.name, Button)
// // 这是有些组件特有的提示方法,将他们注册在 vue 的原型上,以供我们后期直接使用,
// // 想使用 饿了么ui 的话,可以直接在官网上直接看文档
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
// Vue.prototype.$notify = Notification;




// ///////////////////////////////////////////////////////////
// 使用图片懒加载
import VueLazyload from 'vue-lazyload';
import huge from '@/assets/images/1.jpg'
Vue.use(VueLazyload, {
  loading: huge,
})









////////////////////////////////////////////////////////////// 


Vue.config.productionTip = false
// 全局注册,第一个参数 (组件的名字name属性), 第二个参数 组件引入的时候起的名字
Vue.component(TypeNav.name,TypeNav)
// 全局注册轮播图的组件
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this,
    // 将所有的请求函数挂载到 vm 上
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
