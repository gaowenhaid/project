/*
 * @Date: 2021-10-20 16:09:50
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-20 18:00:53
 * @FilePath: \VueProject\gshop\src\store\Home\index.js
 */
import {getDataList} from '@/api'
const actions = {
    async getList({commit}){
        let result = await getDataList()
        console.log('tag',result.data, '')
        try {
            commit("GET_DATA_LIST",result.data)
        } catch (error) {
            console.log(error, '')    
        }
        
        
    }
}
const mutations = {
    GET_DATA_LIST(state,value){
        state.categoryList = value
    }
}
const getters = {}
const state = {
    categoryList:[]
}

export default {
    actions, mutations,
    getters, state
}