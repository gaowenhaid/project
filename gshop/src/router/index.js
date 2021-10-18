/*
 * @Date: 2021-10-18 15:25:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-18 16:50:36
 * @FilePath: \VueProject\gshop\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Search from '../pages/Search.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
Vue.use(VueRouter)
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