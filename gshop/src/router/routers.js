/*
 * @Date: 2021-10-31 17:53:57
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-09 00:27:42
 * @FilePath: \VueProject\gshop\src\router\routers.js
 */
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Trade from '@/pages/Trade' 
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path: '/home',
        // 路由懒加载
        component: () => import('@/pages/Home'),
        name: 'home',
        meta: { show: true }
    },
    {
        // params传递参数，使用占位符
        // path:'/search/:keyWord',

        // query传递参数
        path: '/search/:keyword?',
        name: 'search',
        component: () => import('@/pages/Search'),
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
        component: () => import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/Register'),
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
        component: () => import('@/pages/Detail'),
    },
    {
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        name: 'addcartsuccess',
        meta: { show: true },
    },
    {
        path:'/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { show: true },
        name: 'shopcart'
    },
    {
        path:'/trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        name: 'trade',
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 如果 跳到 当前路径的不是来自购物车组件的话, 就使用 next(false)
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        name: 'pay',
        beforeEnter: (to, from, next) => {
            // ...
            if(from.path === '/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true },
        name: 'paysuccess'
    },
    {
        path:'/center',
        component: () => import('@/pages/Center'),
        name:'center',
        meta: { show: true },
        children:[
            {
                path:'myorder',
                component: () => import('@/pages/Center/myOrder'),
            },
            {
                path:'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            },
            // 页面重定向到 我的订单
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    
]