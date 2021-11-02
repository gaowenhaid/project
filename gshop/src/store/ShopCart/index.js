/*
 * @Date: 2021-11-02 19:05:57
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-02 20:50:51
 * @FilePath: \gshop\src\store\ShopCart\index.js
 */
import { getShopCart } from '@/api'
// 引入外部定义的 工具函数
import { userTemp } from '@/utils/temp_token'
const actions = {
    async getShopCartList({ commit }) {
        let { data, code } = await getShopCart()
        if (code === 200) {
            commit('GET_SHOPCART_LIST',data)
        }
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