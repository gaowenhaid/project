/*
 * @Date: 2021-10-19 16:47:43
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-19 17:09:15
 * @FilePath: \VueProject\gshop\src\api\index.js
 */
// 这里放的就是 将来所有的接口调用,每一个都封装成一个函数,方便统一管理

// 先导入我们自己二次封装好的 axios
import request from './request'

//  将这个接口作为一个函数来暴露出去
export const getDataList = ()=>{
// 这里将请求到的结果返回
  return request({
    //  配置 url
      url:'/api/product/getBaseCategoryList',
    // 配置请求方法
      method:'GET',
  })
}