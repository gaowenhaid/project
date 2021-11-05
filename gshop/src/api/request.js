/*
 * @Date: 2021-10-19 16:37:02
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-05 19:54:06
 * @FilePath: \VueProject\gshop\src\api\request.js
 */
// 导入进度条的包
import nprogress from 'nprogress'
// 导入 uuid 的npm 包,用来为用户添加唯一的标识
// import { v4 as uuidv4 } from 'uuid';

// 定义一个函数 用来判断和创建一个 用户唯一标识(这是最简单的一种定义方式,但是我们一般都不这样写)
// function userTemp() {
//     // 创建一个变量 读取出 本地存储仓是否有 USERINFO 这个参数
//     let userInfo = localStorage.getItem('USERINFO')

//     // 如果没有的话(第一次进来肯定没有)
//     if (!userInfo) {

//         // 没有的话,就为其创建一个 唯一标识(使用 uuid)
//         userInfo = uuidv4();

//         // 然后在本地存储仓里将 我们创建好的 唯一标识 存储进去
//         localStorage.setItem('USERINFO', JSON.stringify(userInfo))
//     }
// // 然后将唯一 id  返回回去
//     return userInfo
// }

// 第二种写法(常用的写法,存在 vuex 中)
// 引入大仓库
import store from '@/store'



// 这里放的是 二次封装过后的 axios
import axios from 'axios';
// 创建一个 axios 的实例化对象
let request = axios.create({
    // 这个可以在 url前边添加任意的参数
    baseURL: '',
    // 设置超时时间
    timeout: 5000,
})

// 调用请求拦截器 在发送请求前就可以检测到
request.interceptors.request.use((config) => {
    nprogress.start()

    // 在请求头中 设置一个 userTempId 字段,用来将参数携带给服务器
    // 这个 userTempId  是和 后端人员商量好的字段,如果你的后端人员定义的是别的字段,那么你设置并携带的就应该是定义的那个字段
    // config.headers.userTempId = userTemp()

    // 第二种写法
    // 如果当前大仓库的shopcart小仓库中的userTempId 有内容的话 
    if(store.state.shopcart.userTempId){
        // 就在在请求头中 添加上 vuex 中的id 属性值
        config.headers.userTempId = store.state.shopcart.userTempId
    }

    // 在请求头中携带 token 获取用户的详细信息
    // 如果当前仓库中的 token 有值的话
    if(store.state.user.token){
    // 就将值携带在 请求头中
        config.headers.token = store.state.user.token
    }
    return config
})

// 调用响应拦截器
request.interceptors.response.use(response => {
    // 如果响应成功 就返回 响应体中的 data 数据
    nprogress.done();
    return response.data;
}, error => {
    // 如果响应失败,就返回一个失败状态的 promise 
    return Promise.reject(error);
});


// 将 二次封装好的 axios 暴露出去
export default request;
