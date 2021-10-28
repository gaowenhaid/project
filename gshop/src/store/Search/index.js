/*
 * @Date: 2021-10-20 16:09:46
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-28 16:09:20
 * @FilePath: \VueProject\gshop\src\store\Search\index.js
 */
import { getSearchList } from '@/api'
const actions = {
    // 获取搜索页面的数据的函数
    async searchList({ commit },data) {
        try {
            let result = await getSearchList(data)
            if (result.code === 200) {
                commit('SEARCH_LIST', result.data)
            }
        } catch (error) {
            console.log(error, '')
        }

    }
}
const mutations = {
    SEARCH_LIST(state, value) {
        state.searchList = value
    }
}
const getters = {
    // 获取 商品展示的数据
    goodsList(state){
        return state.searchList.goodsList
    }


}
const state = {
    searchList: []
}

export default {
    actions, mutations,
    getters, state
}