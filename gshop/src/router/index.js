/*
 * @Date: 2021-10-18 15:25:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-19 11:23:02
 * @FilePath: \VueProject\gshop\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Register from '../pages/Register'
import Login from '../pages/Login'
Vue.use(VueRouter)

// 保留原来的 push 方法
let originPush = VueRouter.prototype.push;
// 保留原来的 replace 方法
let originReplace = VueRouter.prototype.replace;

// 修改 push 方法
VueRouter.prototype.push = function push(location,resolve,reject) {
    console.log('tag', location,'')
    if (resolve && reject) originPush.call(this, location,resolve,reject)
    else originPush.call(this,location,()=>{},()=>{})
}


// 修改 replace 方法
VueRouter.prototype.replace = function replace(location,resolve,reject) {
    console.log('tag', location,'')
    if (resolve && reject) originReplace.call(this, location,resolve,reject)
    else originReplace.call(this,location,()=>{},()=>{})
}

export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home,
            name:'home',
            meta:{show:true}
        },
        {   
            // params传递参数，使用占位符
            // path:'/search/:keyWord',

            // query传递参数
            path:'/search/:keyWord',
            name:'search',
            component:Search,
            meta:{show:true},
            // 布尔类型传递 props 参数
            // props:true
            // 对象形式传递 props 传递固定参数
            // props:{keyWord:"2asdas",a:1,b:2}

            // 函数形式传递 props 参数
            props(route){
                return {...route.params,...route.query}
            }
        },
        {
            path:'/login',
            name:'login',
            component:Login,
            meta:{show:false}
        },
        {
            path:'/register',
            name:'register',
            component:Register,
            meta:{show:false}
        },
        {
            path:'/',
            redirect:"/home"
        }
    ]
});