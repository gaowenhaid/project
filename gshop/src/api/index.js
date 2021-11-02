/*
 * @Date: 2021-10-19 16:47:43
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-02 19:03:43
 * @FilePath: \gshop\src\api\index.js
 */
// 这里放的就是 将来所有的接口调用,每一个都封装成一个函数,方便统一管理

// 先导入我们自己二次封装好的 axios
import request from './request'

//  将这个接口作为一个函数来暴露出去
export const getDataList = () => {
  // 这里将请求到的结果返回
  return request({
    //  配置 url
    url: '/api/product/getBaseCategoryList',
    // 配置请求方法
    method: 'GET',
  })
}

// 获取首页轮播的接口数据方法
export const getContainerList = () => {
  // 这里的 request 代表了 axios
  return request({
    url: '/mock/banner',
    method: 'GET',
  })
}

// 获取 floor 组件的数据
export const getFloor = () => {
  return request({
    url: '/mock/floor',
    method: 'GET',
  })
}

// 获取搜索页面的 数据
// 需要携带的参数
// {
// "category1Id": "61",                   一级联动的 id
// "category2Id": "61",                   二级联动的 id
//   "category3Id": "61",                   三级联动的 id
//   "categoryName": "手机",                点击的内容
//   "keyword": "小米",                     点击搜索按钮,传递的关键字
//   "order": "1:desc",                     排序(升序还是降序)
//   "pageNo": 1,                           显示当前在第几页
//   "pageSize": 10,                        一页展示多少条数据
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],     平台属性参数的选择
//   "trademark": "4:小米"                       品牌的选择
// }

// 由于发送的是 post 请求,需要携带参数,所以我们需要在外部传递一个参数
export const getSearchList = (data) => {
  return request({
    url: '/api/list',
    method: 'POST',
    data
  })
}


// 请求 商品详情页的数据的函数
export const getDetailData = (skuId) => {
  return request({
    url: `/api/item/${skuId}`,
    method: 'GET',
  })
}

// 请求 添加到购物车或者是更新购物车内容的函数
export const getShopCarOrUpdate = (skuId,skuNum) => {
  return request({
    url:`/api/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })
}

// 获取购物车的数据
export const getShopCart = () => {
  return request({
    url:'/api/cart/cartList',
    method: 'GET'
  })
}