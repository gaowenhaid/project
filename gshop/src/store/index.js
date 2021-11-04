/*
 * @Date: 2021-10-19 18:07:55
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-04 19:06:06
 * @FilePath: \gshop\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex';
import home from './Home'
import search from './Search'
import detail from './Detail'
import shopcart from './ShopCart'
import user from './User'
Vue.use(Vuex)



export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
    }
})