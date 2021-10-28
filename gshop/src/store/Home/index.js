/*
 * @Date: 2021-10-20 16:09:50
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-28 16:10:06
 * @FilePath: \VueProject\gshop\src\store\Home\index.js
 */
import { getDataList, getContainerList, getFloor } from '@/api'
const actions = {
    // 三级列表的请求数据的方法
    async getList({ commit }) {
        let result = await getDataList()
        try {
            commit("GET_DATA_LIST", result.data)
        } catch (error) {
            console.log(error, '')
        }
    },
    // 首页轮播的请求
    async getContainerList({ commit }) {
        let { data } = await getContainerList();
        commit("Get_Container_List", data)
    },
    // floor 组件的请求
    async getFloorList({ commit }) {
        let { data } = await getFloor();
        commit("GET_FLOOR_LIST", data)
    }

}
const mutations = {
    // 三级列表的请求数据的方法
    GET_DATA_LIST(state, value) {
        state.categoryList = value
    },
    // 首页轮播的请求
    Get_Container_List(state, value) {
        state.containerList = value
    },
    // floor 组件的请求
    GET_FLOOR_LIST(state, value) {
        state.floorList = value
    }

}
const getters = {}
const state = {
    // 三级菜单
    categoryList: [],
    // 首页轮播的图
    containerList: [],
    // floor的数据
    floorList:[]
}

export default {
    actions, mutations,
    getters, state
}