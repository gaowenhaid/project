/*
 * @Date: 2021-10-31 18:06:12
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-02 21:47:29
 * @FilePath: \gshop\src\store\Detail\index.js
 */
import { getDetailData , getShopCarOrUpdate} from '@/api'
const actions = {
  // 获取商品详情的请求
  async getDetail({ commit }, skuId) {
    let { data, code } = await getDetailData(skuId)
    if (code === 200) {
      commit('GET_DETAIL', data)
    }
  },
  // 添加到购物车的请求
  async addShopCarList({commit},{skuId,skuNum}){
    let result = await getShopCarOrUpdate(skuId,skuNum)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('失败'))
    }
  }
}

const mutations = {
  GET_DETAIL(state, value) {
    state.detailList = value
  }
}

const getters = {
  // 面包屑的数据(保险起见 返回 undefined 或者 空对象)
  categoryView: state => state.detailList.categoryView || {},
  // 购买详情页的数据
  skuInfo: state => state.detailList.skuInfo || {},
  // 购买的商品的购买属性
  spuSaleAttrList: state => state.detailList.spuSaleAttrList,
}

const state = {
  detailList: {}
}

export default {
  actions,
  mutations,
  getters,
  state
}