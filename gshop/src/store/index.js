/*
 * @Date: 2021-10-19 18:07:55
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-02 19:09:35
 * @FilePath: \gshop\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex';
import home from './Home'
import search from './Search'
import detail from './Detail'
import shopcart from './ShopCart'
Vue.use(Vuex)



export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart
    }
})