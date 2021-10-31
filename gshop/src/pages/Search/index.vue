<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑是有可能有有可能没有的,所以我们需要根据 用户是否点击了 3级导航菜单来判断倒是有没有 -->
            <li class="with-x" v-show="searchGoodList.categoryName">
              {{ searchGoodList.categoryName }}<i @click="clearName">×</i>
            </li>

            <!-- 用户输入关键字也应该有面包屑,所以需要判断一下是否有 输入关键字 -->
            <li class="with-x" v-show="searchGoodList.keyword">
              {{ searchGoodList.keyword }}<i @click="clearKeyword">×</i>
            </li>

            <!-- 用户点击品牌以后,将品牌信息也添加到面包屑里边 -->
            <li class="with-x" v-show="searchGoodList.trademark">
              {{ searchGoodList.trademark.split(":")[1] }}
              <i @click="clearTradeMark">×</i>
            </li>

            <!-- 用户点击属性以后,将属性的信息也添加到面包屑里边 这里需要遍历 属性里一共有多少个属性-->
            <li
              class="with-x"
              v-for="(prop, index) in searchGoodList.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}
              <i @click="clearProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getTradeMark="getTradeMark" @getAttr="getAttr" />

        <!--搜索详情页-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: isComprehensive }"
                  @click="changeOrder('1')"
                >
                  <a
                    >综合 &nbsp;
                    <!-- 这个箭头的 显示与不显示 是由 当前谁高亮来决定的 所以这里也可以使用 active 的判断条件 -->
                    <i
                      class="iconfont"
                      v-show="isComprehensive"
                      :class="{ 'icon-down': isDesc, 'icon-up': isAsc }"
                    ></i>
                  </a>
                </li>
                <li :class="{ active: isPrice }" @click="changeOrder('2')">
                  <a
                    >价格 &nbsp;
                    <i
                      class="iconfont"
                      v-show="isPrice"
                      :class="{ 'icon-down': isDesc, 'icon-up': isAsc }"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div
                    class="price"
                    :style="{
                      color: good.price >= 1000 ? 'yellowgreen' : ' skyblue',
                    }"
                  >
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="good.title">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- <div class="fr page"> -->
          <Pagination
            :total="total"
            :pageNo="searchGoodList.pageNo"
            :pageSize="searchGoodList.pageSize"
            :continues="5"
            @goSearchPage="goSearchPage"
          />
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchGoodList: {
        category1Id: "", //一级联动的 id
        category2Id: "", //二级联动的 id
        category3Id: "", //三级联动的 id
        categoryName: "", //点击的内容
        keyword: "", //点击搜索按钮,传递的关键字
        props: [], //平台属性参数的选择
        trademark: "", //品牌的选择
        // 上边的这几个参数,的参数值必须默认为空,因为你不确定用户到底会点击或者搜索什么

        order: "2:asc", //排序(升序还是降序)
        pageNo: 1, //显示当前在第几页
        pageSize: 10, //一页展示多少条数据
      },
    };
  },
  components: {
    SearchSelector,
  },
  methods: {
    // 因为每点击一次,三级联动或搜索 按钮,都会发一次请求,所以我们直接将求情封装为一个函数,
    // 谁需要发请求,就调用一次这个函数就行
    SearchList() {
      this.$store.dispatch("searchList", this.searchGoodList);
    },
    // 清除三级联动的面包屑
    clearName() {
      this.searchGoodList.categoryName = "";

      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 清除关键字的面包屑
    clearKeyword() {
      this.searchGoodList.keyword = "";
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
      this.$bus.$emit("clearKeyWord");
    },
    // 清除广告的面包屑
    clearTradeMark() {
      // 这里不能将数据清空为 undefined , 因为后边有一个 split 方法,所以 不能改伪 undefined ,只能为一个 空字符串
      this.searchGoodList.trademark = "";
      this.SearchList();
    },
    // 清除选择属性值的面包屑
    clearProp(index) {
      this.searchGoodList.props.splice(index, 1);
      this.SearchList();
    },
    // 获取当前点击的那个广告的内容属性
    getTradeMark(trademark) {
      //   trademark	string	N	品牌: "ID:品牌名称"
      //    示例: "1:苹果"
      this.searchGoodList.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.SearchList();
    },
    getAttr(attr, attrValue) {
      let propList = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 完整版写法
      // if (this.searchGoodList.props.indexOf(propList) === -1) {
      //   // ["属性ID:属性值:属性名"]
      //   this.searchGoodList.props.push(propList);
      //   this.SearchList();
      // }
      // 简化写法
      this.searchGoodList.props.indexOf(propList) === -1 &&
        this.searchGoodList.props.push(propList) &&
        this.SearchList();
    },
    // 点击筛选排序按钮的回调函数
    changeOrder(flag) {
      // 判断,外部传入的那个 1 || 2 为啥传入 1 | 2 因为 1 2 分别代表了 综合 和 价格,方便一会写业务,穿别的也行,只要能让他们区分开呆的是谁就行
      // 先将外部的 需要传入的数据结构出来
      let [originId, originState] = this.searchGoodList.order.split(":");
      // 创建一个新的数据来保存变化后的数据
      let newOrder = "";

      // 判断当前外部传入的是 1 还是 2 ,
      if (originId == flag) {
        // 如果与原来的 id 一样的话,就证明当前用户点击的是,已经高亮显示的那个按钮,那么就需要将 排序方式进行一个修改
        newOrder = `${originId}:${originState == "desc" ? "asc" : "desc"}`;
        // 然后更新状态
        this.searchGoodList.order = newOrder;
        // 然后重新发送请求
        this.SearchList();
      } else {
        // 如果走的是 else 就证明当前用户点击的不是当前有 active 的那个按钮,就证明用户向切换显示方式
        // 因为 1 代表了 综合 2 代表了 价格,用户点击的地方与外部传入的那个地方的 id 不一样,所以我们只需要将 id 变为外部传入的 那个 id 就行
        // 然后因为 不管哪个按钮 ,默认值都是降序 所以 我们将状态改为 desc 就行
        newOrder = `${flag}:desc`;
        // 然后更新状态
        this.searchGoodList.order = newOrder;

        // 重新发送请求
        this.SearchList();
      }
    },
    // 子组件点击某一个页码,将数据发送过来,我们在这里进行跳转
    goSearchPage(page) {
      this.searchGoodList.pageNo = page;
      this.SearchList();
    },
  },
  computed: {
    ...mapGetters(["goodsList"]),
    // 计算出是否是 综合有类名
    isComprehensive() {
      return this.searchGoodList.order.indexOf("1") != -1;
    },
    // 计算出是否是价格有类名
    isPrice() {
      return this.searchGoodList.order.indexOf("2") != -1;
    },
    // 计算出图标是否向下
    isDesc() {
      return this.searchGoodList.order.indexOf("desc") != -1;
    },
    // 计算是否向上
    isAsc() {
      return this.searchGoodList.order.indexOf("asc") != -1;
    },
    // 获取总页数 , 一页展示多少数据, 和 总条数的数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  // 使用监视属性,监视 路由的路径是否发生变化,如果发生变化,就立刻去发送请求
  watch: {
    // 监视路由
    $route() {
      // 清除上一次残留的 categoryID
      this.searchGoodList.category1Id = undefined;
      this.searchGoodList.category2Id = undefined;
      this.searchGoodList.category3Id = undefined;

      // 在发送请求之前,再次收集一次数据
      Object.assign(this.searchGoodList, this.$route.query, this.$route.params);

      // 发送请求,在这里发送的请求,数据都是最新的,所以直接调用就行
      this.SearchList();
    },
  },
  beforeDestroy() {
    this.$bus.$emit("clearKeyWord");
  },
  beforeMount() {
    // 在发送请求之前,将需要携带的参数更新(这里可以放到 挂载之前,也可以 放在 挂载后,但是一定要放在 发送请求之前!!!!!!)
    // this.searchGoodList.category1Id = this.$route.query.category1Id;
    // this.searchGoodList.category2Id = this.$route.query.category2Id;
    // this.searchGoodList.category3Id = this.$route.query.category3Id;
    // this.searchGoodList.categoryName = this.$route.query.categoryName;
    // this.searchGoodList.keyword = this.$route.params.keyWord;

    Object.assign(this.searchGoodList, this.$route.query, this.$route.params);
  },
  mounted() {
    this.SearchList();
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>