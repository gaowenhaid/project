/*
 * @Date: 2021-10-18 15:25:36
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-05 21:59:40
 * @FilePath: \VueProject\gshop\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './routers'
import store from '@/store'
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

const router = new VueRouter({
  routes,
  scrollBehavior() {
    // return 期望滚动到哪个的位置   }
    return { y: 0 }
  }
})
// 在路由跳转之前执行(导航守卫: 前置守卫)
router.beforeEach(async (to, from, next) => {
  // to 这个参数表示了 你从哪一个路由跳过来的 
  // from 这个参数表示了 你需要跳到哪个路由去
  //  next() 是一个函数,这个函数 有两种写法
  //  第一种写法直接写 next() 函数 代表了随便写,想跳哪跳哪
  //  第二种写法是里边传递一个参数,参数为路由的路径,代表只能跳转到该指定的路径 next('path')
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  // 如果有 token 的话,就证明现在已经登录了
  if (token) {
    // 用户已经登录,但是用户还是要去 登录页面
    if (to.path == '/login') {
      // 我们就强制让他回 home 组件
      next('/home')
    } else {
      // 用户已经登录,去的不是 login 页面,去的是别的正常的页面
      // 这时候我们就需要判断一下,当前是否有用户的详细信息
      if (name) {
        // 如果有 用户的详细信息的话 就让他直接跳转
        next()
      } else {
        try {
          // 如果没有的话就发送请求获取一下用户的数据
          await store.dispatch("getUserInfo")
          // 获取完用户信息以后再进行跳转
          next();
        } catch (error) {
        // 如果用户登录了,但是获取不到数据的话就证明有可能是 token 过期了,或者是用户退出了 
        // 所以这时候我们需要,先把过期的 token 和 本地的 token 使用 退出登录的那个方法,先都清空了
        // 然后让他跳转到 登录页面,重新登录就行了
          store.dispatch('logOut')
          next('/login')
        }
      }
    }
  } else {
    // 走这里的话,就证明当前用户没有登录,在进行路由跳转,因为我们设置了临时身份
    //  所以我们直接让他爱跳哪跳哪都可以
    // console.log('去哪都行')
    next()
  }
})


export default router;