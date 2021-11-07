/*
 * @Date: 2021-10-31 17:53:57
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-07 22:36:09
 * @FilePath: \VueProject\gshop\src\router\routers.js
 */
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Trade from '@/pages/Trade' 
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
// import Demo from '@/pages/Demo'
export default [
    {
        path: '/home',
        component: Home,
        name: 'home',
        meta: { show: true }
    },
    {
        // params传递参数，使用占位符
        // path:'/search/:keyWord',

        // query传递参数
        path: '/search/:keyword?',
        name: 'search',
        component: Search,
        meta: { show: true },
        // 布尔类型传递 props 参数
        // props:true
        // 对象形式传递 props 传递固定参数
        // props:{keyWord:"2asdas",a:1,b:2}

        // 函数形式传递 props 参数
        props(route) {
            return { ...route.query, ...route.params }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/',
        redirect: "/home"
    },
    {
        path: '/detail/:skuId',
        name: 'detail',
        meta: { show: true },
        component: Detail,
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        name: 'addcartsuccess',
        meta: { show: true },
    },
    {
        path:'/shopcart',
        component: ShopCart,
        meta: { show: true },
        name: 'shopcart'
    },
    {
        path:'/trade',
        component: Trade,
        meta: { show: true },
        name: 'trade'
    },
    {
        path:'/pay',
        component: Pay,
        meta: { show: true },
        name: 'pay'
    },
    {
        path:'/paysuccess',
        component: PaySuccess,
        meta: { show: true },
        name: 'paysuccess'
    }
]