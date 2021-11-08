<!--
 * @Date: 2021-11-08 19:50:22
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-08 21:57:40
 * @FilePath: \VueProject\gshop\src\pages\Center\myOrder\index.vue
-->
<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <!-- 一共几笔交易 -->
        <table class="order-item" v-for="(order) in myOrder.records" :key="order.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  > {{order.createTime}} 订单编号：{{order.outTradeNo}}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
          <!-- 每一笔交易有几件物品 -->
            <tr v-for="(ereyOrder,index) in order.orderDetailList" :key="index">
              <td width="60%">
                <div class="typographic">
                  <img :src="ereyOrder.imgUrl" width="100" />
                  <a href="#" class="block-text"
                    >{{ereyOrder.skuName}}</a
                  >
                  <span>x {{ereyOrder.skuNum}}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <!-- 合并单元格, 合并的个数由订单的长度决定         
                只遍历一次, 在 index = 0 的时候 显示,别的都不显示  -->
              <td :rowspan="order.orderDetailList.length" width="8%" v-if='index == 0' class="center">{{order.consignee}}</td>
              <td :rowspan="order.orderDetailList.length" width="13%" v-if='index == 0' class="center">
                <ul class="unstyled">
                  <li>总金额¥{{order.totalAmount}}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td :rowspan="order.orderDetailList.length" width="8%" v-if='index == 0' class="center">
                <a href="#" class="btn"> {{order.orderStatusName}} </a>
              </td>
              <td :rowspan="order.orderDetailList.length" width="13%" v-if='index == 0' class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>

          </tbody>
        </table>

      </div>
      <div class="choose-order">
        <!-- <div class="pagination">
          <ul>
            <li class="prev disabled">
              <a href="javascript:">«上一页</a>
            </li>
            <li class="page actived">
              <a href="javascript:">1</a>
            </li>
            <li class="page">
              <a href="javascript:">2</a>
            </li>
            <li class="page">
              <a href="javascript:">3</a>
            </li>
            <li class="page">
              <a href="javascript:">4</a>
            </li>

            <li class="next disabled">
              <a href="javascript:">下一页»</a>
            </li>
          </ul>
          <div>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;共2页&nbsp;</span>
          </div>
        </div> -->
      
      <Pagination :total="myOrder.total" :pageNo="page"  :pageSize="limit" :continues="5" @goSearchPage='goSearchPage'/>
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'myOrder',
  data() {
    return {
      page:'1',     // 当前展示页码
      limit:'3',      // 一页展示多少条数据
      myOrder:{}      // 整个请求回来的数据对象
    }
  },
  methods: {
    // 获取购物列表数据的函数
    async getOrderData(){
    // 将 页码数 和 一页显示多少数据结构出来
      let {page, limit} = this
      // 获取到 请求回来的数据  需要传递两个参数 ,第一个 当前页码的位置 第二个参数为 一页展示多少条
      let {code, data} = await this.$API.getMyOrderList(page, limit)
      // console.log(result, '')
      if(code == '200'){
        this.myOrder = data;
      }else{
        alert(result.message)
      }
    },
    // 分页器的自定义事件的回调函数
    goSearchPage(page){
      this.page = page;
      this.getOrderData()
      // console.log(page, '')
    }
  },
  mounted() {
    this.getOrderData()
  }
};
</script>

<style>
</style>