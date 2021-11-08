/*
 * @Date: 2021-11-04 19:05:06
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-08 21:58:49
 * @FilePath: \VueProject\gshop\src\store\User\index.js
 */
import {getCode,finishRegister,getLogin,getUserInfo,getLogOut} from '@/api';
import {setToken , getToken , clearToken} from '@/utils/token'
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
        // 在获取到 token 之后,不仅仅往 state 中存一份,再往 本地存储仓库里边存一份
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(result.message)
        }
    },
    // 获取用户的信息
    async getUserInfo({ commit}) {
        let {code,data} = await getUserInfo()
        if(code === 200){
            commit('GET_USER_INFO',data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faille'))
        }
        
    },
    // 用户退出登录
    async logOut({commit}){
        let {code} = await getLogOut()
        if(code === 200){
            commit('LOG_OUT')
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
    },
    // 保存用户的详细信息
    GET_USER_INFO(state,value){
        state.userInfo = value
    },
    // 退出登录.清空state和本地存储仓库中的的所有数据
    LOG_OUT(state){
        state.userInfo = {},
        state.token = '',
        // 清除 token 的封装的函数
        clearToken()
    }
}

const getters = {

}

const state = {
    // 验证码
    code:'',
    // 在这里读取的话,就直接读取 本地仓库的数据就行了
    token:getToken(),
    // 用户的详细信息
    userInfo:{}
}


export default {
    actions,
    getters,
    mutations,
    state
}