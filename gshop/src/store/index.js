/*
 * @Date: 2021-10-19 18:07:55
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-31 18:08:35
 * @FilePath: \gshop\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex';
import home from './Home'
import search from './Search'
import detail from './Detail'
Vue.use(Vuex)



export default new Vuex.Store({
    modules: {
        home,
        search,
        detail
    }
})