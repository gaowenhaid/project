<!--
 * @Date: 2021-10-18 15:25:45
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-08 22:01:26
 * @FilePath: \VueProject\gshop\src\components\Header\index.vue
-->
<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo.name">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>{{userInfo.name}} <a class="register" @click="logOut">退出登录</a></p>
          
          
        </div>
        <div class="typeList">
          <router-link to='/center'>我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="getSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    getSearch() {
      // params 传递参数
      // this.$router.push({name:'search',params:{keyWord:this.keyWord}})

      // query传递参数
      // this.$router.push({name:'search',query:{keyWord:this.keyWord}})

      // query 和 params 一块传递
      // 判断当前是否有 query 参数
      if (this.$route.query) {
        // 定义地址栏
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        // 如果有 query 参数,将其 添加到 location 中
        location.query = this.$route.query;
        // 进行跳转(修改push 和 replace)
        if (this.$route.path !== "/home") {
          this.$router.replace(location);
        } else {
          this.$router.push(location);
        }
      }
    },
    // 退出登录的逻辑
    logOut(){
      this.$store.dispatch('logOut')
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  mounted() {
    this.$bus.$on("clearKeyWord", () => {
      this.keyword = "";
    });
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>