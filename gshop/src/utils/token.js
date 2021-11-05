/*
 * @Date: 2021-11-05 19:36:31
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-05 20:23:49
 * @FilePath: \VueProject\gshop\src\utils\token.js
 */

// 设置 token 登录
export const setToken = (token) =>{
    localStorage.setItem('TOKEN',token)
}

// 读取 token
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

// s删除 token
export const clearToken = () => {
    localStorage.removeItem('TOKEN')
}