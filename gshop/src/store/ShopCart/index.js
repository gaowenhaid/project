/*
 * @Date: 2021-11-02 19:05:57
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-04 18:17:15
 * @FilePath: \gshop\src\store\ShopCart\index.js
 */
import { getShopCart , getDeleteShop ,getChangeCheck } from '@/api'
// 引入外部定义的 工具函数
import { userTemp } from '@/utils/temp_token'
const actions = {
    // 获取购物车数据的请求函数
    async getShopCartList({ commit }) {
        let { data, code } = await getShopCart()
        if (code === 200) {
            commit('GET_SHOPCART_LIST',data)
        }
    },

    // 删除购物车单条数据的函数
    async deleteShop({commit},skuId) {
        let {code}= await getDeleteShop(skuId);
        if(code === 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('删除失败'))
        }
    },

    // 修改是否选中(切记,这里传递的数据,与 接口写入的数据的 顺序一定要保持一致)
    async changeCheck({commit},{skuId,isChecked}){
        let result = await getChangeCheck(skuId,isChecked)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faille'))
        }
    },

    // 全选按钮的回调函数
    changeAllCheck({getters,dispatch},isChecked){
        let arr = [];
        // 我们现在购物车有 三个商品 所以我们需要发送三次请求
        // 这时候我们就需要拿到 miniStore 中的购物车列表的数据来进行遍历的操作,
        getters.ShopCartList.cartInfoList.forEach(item => {
            // 然后我们在这里发送请求,因为每一次调用发送请求都会返回一个 成功或者失败的 promise 
            //   所以我们 用一个变量把每一次的返回值保存下来
            let promise = dispatch('changeCheck',{skuId:item.skuId,isChecked})
            // 然后将他推进一个数组当中去
            arr.push(promise);
        })

        //因为外部的调用也需要等一个返回值 所以我们这里也需要返回一个 promise 对象
        // 所以我们使用 .all 方法,这个方法需要一个数组来作为参数,数组中都是 promise 对象
        //   如果数组中的 promise 对象都是成功的话,他返回的也是一个成功的 promise 对象,如果有
        //     一个失败的话,他就会返回一个失败的 promise 对象
        return Promise.all(arr);
    },

    // 删除全部选中的回调函数
    deleteAllCheckShop({getters,dispatch}){
        let arr = [];
        getters.ShopCartList.cartInfoList.forEach(item => {
            if(item.isChecked === 1){
               let promise = dispatch('deleteShop',item.skuId)
               arr.push(promise);
            }
        })
        return Promise.all(arr);
    }
}

const mutations = {
    GET_SHOPCART_LIST(state,value) {
        state.ShopCartList = value
    }
}

const getters = {
    ShopCartList: state => state.ShopCartList[0] || {}
}

const state = {
    // 在程序刚一执行的时候,就在 vuex 中存进去一个用户唯一 id 
    userTempId: userTemp(),
    ShopCartList:[]
}

export default {
    actions,
    mutations,
    getters,
    state
}