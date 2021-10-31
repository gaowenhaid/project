/*
 * @Date: 2021-10-18 15:25:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-31 18:26:20
 * @FilePath: \gshop\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './routers'
Vue.use(VueRouter)

// 保留原来的 push 方法
let originPush = VueRouter.prototype.push;
// 保留原来的 replace 方法
let originReplace = VueRouter.prototype.replace;

// 修改 push 方法
VueRouter.prototype.push = function push(location, resolve, reject) {
    if (resolve && reject) originPush.call(this, location, resolve, reject)
    else originPush.call(this, location, () => { }, () => { })
}


// 修改 replace 方法
VueRouter.prototype.replace = function replace(location, resolve, reject) {
    console.log('tag', location, '')
    if (resolve && reject) originReplace.call(this, location, resolve, reject)
    else originReplace.call(this, location, () => { }, () => { })
}

export default new VueRouter({
    routes,
    scrollBehavior() {
        // return 期望滚动到哪个的位置   }
        return { y: 0 }
    }
})