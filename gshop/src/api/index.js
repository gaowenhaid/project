/*
 * @Date: 2021-10-19 16:47:43
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-26 21:19:19
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

// 获取首页轮播的接口数据方法
export const getContainerList = ()=>{
        // 这里的 request 代表了 axios
  return request({
    url:'/mock/banner',
    method:'GET',
  })
}

// 获取 floor 组件的数据
export const getFloor = ()=>{
  return request({
    url:'/mock/floor',
    method:'GET',
  })
}