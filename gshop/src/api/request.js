/*
 * @Date: 2021-10-19 16:37:02
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-19 19:00:27
 * @FilePath: \VueProject\gshop\src\api\request.js
 */
// 导入进度条的包
import nprogress from 'nprogress'

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
