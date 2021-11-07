<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(shop, index) in shopList" :key="shop.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              v-model="shop.isChecked"
              @change="updateCheck($event, shop)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shop.imgUrl" />
            <div class="item-msg">
              {{ shop.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ shop.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="updateShopCart(shop, -1, 'jian')"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="shop.skuNum"
              @blur="updateShopCart(shop, $event.target.value * 1, 'input')"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="updateShopCart(shop, 1, 'jia')"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ shop.cartPrice * shop.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteShop(shop)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          v-model="isAllChecked"
          @change="changeAllCheck"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckShop">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <router-link class="sum-btn" href="###" target="_blank">结算</router-link> -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  methods: {
    // 因为多个页面需要向服务器发送请求,所以我们将他封装为一个函数,哪里需要哪里就调用一下函数就行
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },
    // 定义加减和输入框操作购物车数据的回调函数
    // 里边需要三个参数,第一个是 当前点击的那个商品的 id  第二个参数为 到底是加一还是减一 第三个参数是一个标识,标识当前的那个是按钮还是输入框\
    //  使用节流函数,防止用户多次点击减少按钮,出现 负数的 bug ,延迟时间要设置的高一点,要不然的话还是会出现负数
    updateShopCart: throttle(async function (shop, shopNum, flag) {
      // 请求 的 url
      // /api/cart/addToCart/{ skuId }/{ skuNum }
      // skuNum	string	Y	商品数量 正数代表增加 负数代表减少
      // 判断关键字标识符 flag
      switch (flag) {
        // 如果是 jia 的话
        case "jia":
          // 就向服务器传递 1 代表加一
          shopNum = 1;
          // 然后返回
          break;
        // 如果是 jian 的话
        case "jian":
          // 则需要进行判断 当前商品的购买的数量是否大于 1
          if (shop.skuNum > 1) {
            // 如果大于的话 就向服务器传递一个 -1  代表在当前购买数量上减一
            shopNum = -1;
          } else {
            // 否则的话,就证明当前购买数量 = 1或小于一了,就向服务器传递一个 0 代表不增加也不减少
            shopNum = 0;
          }
          break;
        case "input":
          if (isNaN(shopNum) || shopNum < 1) {
            shopNum = 0;
          } else {
            shopNum = parseInt(shopNum - shop.skuNum);
          }
          break;
      }

      try {
        // 将修改好的参数,带给服务器
        await this.$store.dispatch("addShopCarList", {
          skuId: shop.skuId,
          skuNum: shopNum,
        });
        // 通过 try catch 来判断,如果修改成功的话,就将 页面重新渲染,重新调用一下 上边的请求数据的函数就行
        this.getShopCartList();
      } catch (error) {
        // 如果失败了的话,就弹出一个 修改失败
        alert("修改失败!");
      }
    }, 2000),

    //删除购物车中的单个商品的回调函数(接收一个参数,就是当前点击的那个商品)
    async deleteShop(shop) {
      try {
        // 点击删除按钮后,向 actions 派发删除任务,让他发请求
        await this.$store.dispatch("deleteShop", shop.skuId);
        // 在发送请求成功后,再次调用 getShopCartList 获取商品数据列表,进行更新展示
        this.getShopCartList();
      } catch (error) {
        alert("删除失败");
      }
    },
    // 修改购物车数据是否选中的回调函数,需要传递一个参数,就是当前点击的单选框 是否选中
    async updateCheck(event, shop) {
      try {
        let isChecked = event.target.checked ? 1 : 0;
        await this.$store.dispatch("changeCheck", {
          skuId: shop.skuId,
          isChecked,
        });
        this.getShopCartList();
      } catch (error) {
        alert("修改失败");
      }
    },

    // 全选按钮的回调
    async changeAllCheck(event) {
      // 因为 我们在发请求那返回了一个 promise 对象,所以我们在这里就可以使用 try catch 来接收
      try {
        // 定义 是否选中的状态 1 还是 0
        let isChecked = event.target.checked ? 1 : 0;
        // 发送一次请求
        await this.$store.dispatch("changeAllCheck", isChecked);
        // 然后重新调用获取数据,更新数据
        this.getShopCartList();
      } catch (error) {
        alert("修改失败");
      }
    },

    // 删除已选中的回调
    async deleteAllCheckShop() {
      try {
        await this.$store.dispatch("deleteAllCheckShop");
        this.getShopCartList();
      } catch (error) {
        alert("删除失败")
      }
    },
  },
  computed: {
    // 通过 mapGetters 读取出 vuex 中计算出的 商品数据的那个对象
    ...mapGetters(["ShopCartList"]),

    // 然后计算购买的 商品的列表的那个数组
    shopList() {
      return this.ShopCartList.cartInfoList || [];
    },
    // 计算出总价
    totalPrice() {
      // 定义一个计数变量
      let sum = 0;
      //  遍历出每一个对象(也就是购买的每一个商品)
      this.shopList.forEach((item) => {
        // 将 每一个对象的 单价与他的 购买数量相乘 然后赋值给 计数变量
        return (sum = sum + item.cartPrice * item.skuNum);
      });
      // 将计算变量返回
      return sum;
    },
    // 计算出 全选框是否选中,他的选中根据数组中的所有元素来判断的
    isAllChecked() {
      return this.shopList.every(item => item.isChecked === 1 ) && this.shopList.length > 0;
    },
  },
  // 在组件刚刚挂载的时候,发送请求,获取购物车的数据,
  // (单单是这样的话,是无法获取到数据的,因为我们虽然添加了购物车的数据,但是在我们获取的时候,服务器不知道该为我们返回谁的数据
  //  ,所以我们需要在发送请求的时候,通过原来定义的请求拦截器中添加一个唯一的标识,来帮助我们获取数据)
  mounted() {
    this.getShopCartList();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>