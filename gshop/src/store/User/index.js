/*
 * @Date: 2021-11-04 19:05:06
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-04 20:59:13
 * @FilePath: \gshop\src\store\User\index.js
 */
import {getCode,finishRegister,getLogin} from '@/api'
const actions = {
    // 获取验证码
    async getCode({commit},iphone){
        let result = await getCode(iphone)
        if (result.code == 200){
            commit('GET_CODE',result.data)
        }else{
            return Promise.reject(result.message)
        }
        
    },
    // 用户注册
    async didRegister({commit},{phone,password,code}){
        let result = await finishRegister(phone, password,code)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(result.message)
        }
    },
    // 用户登录
    async login({commit},{phone, password}){
        let result = await getLogin(phone, password)
        if(result.code === 200){
            commit('SET_TOKEN',result.data.token)
            console.log(result)
            return 'ok'
        }else{
            return Promise.reject(result.message)
        }
    }
}

const mutations = {
    // 设置 验证码
    GET_CODE(state, value){
        state.code = value
    },
    //设置 token
    SET_TOKEN(state, value){
        state.token = value
    }
}

const getters = {

}

const state = {
    code:'',
    token:'',
}


export default {
    actions,
    getters,
    mutations,
    state
}