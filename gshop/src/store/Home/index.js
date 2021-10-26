/*
 * @Date: 2021-10-20 16:09:50
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-25 22:21:07
 * @FilePath: \VueProject\gshop\src\store\Home\index.js
 */
import { getDataList, getContainerList } from '@/api'
const actions = {
    async getList({ commit }) {
        let result = await getDataList()
        try {
            commit("GET_DATA_LIST", result.data)
        } catch (error) {
            console.log(error, '')
        }
    },
    async getContainerList({ commit }) {
        let { data } = await getContainerList();
        console.log('tag', data, '')
        commit("Get_Container_List",data)
    }

}
const mutations = {
    GET_DATA_LIST(state, value) {
        state.categoryList = value
    },
    Get_Container_List(state, value) {
        state.containerList = value
    }
}
const getters = {}
const state = {
    categoryList: [],
    containerList:[]
}

export default {
    actions, mutations,
    getters, state
}