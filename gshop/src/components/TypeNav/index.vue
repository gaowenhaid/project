<!--
 * @Date: 2021-10-19 10:54:40
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-31 16:32:38
 * @FilePath: \gshop\src\components\TypeNav\index.vue
-->
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 为商品分类 和 下边的 item 共同绑定一个鼠标移除事件,从而达到公用样式的效果 -->
      <div @mouseleave="clearBg">
        <h2 class="all" @mouseenter="showList">全部商品分类</h2>
        <!-- 只要添加了 v-show||v-if 的组件元素,才可以使用 动画过度的效果 -->
        <transition name="sort">
          <div class="sort" @click="goSearch" v-show="show">
            <div class="all-sort-list2">
              <!-- 遍历一级数据菜单 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="getBg(index)"
                :style="{ background: currentIndex === index ? 'pink' : '' }"
              >
                <h3>
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 在这里使用 :style 的对象写法 控制这个二级菜单是否显示与隐藏 判断的条件为 当前鼠标划过的 index 是否与 遍历出来的数据的 index 相等,如果相等,就返回对应的 二级菜单 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入 lodash中的 throttle 函数文件
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  // async beforeCreate() {
  //   this.$store.dispatch("getList");
  // },

  methods: {
    // 使用lodash中的节流函数,来确保页面的渲染能跟的上用户的快速滑动
    // 节流函数: 在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
    getBg: throttle(function (index) {
      // console.log("tag", index, "");
      this.currentIndex = index;
    }, 20),

    // 未使用 节流函数
    //#region
    // getBg(index) {
    //   this.currentIndex = index;
    //   console.log('tag',index, '')
    // }
    // #endregion
    clearBg() {
      this.currentIndex = -1;
      // 这里同样判断时是否为 search 组件
      if (this.$route.path !== "/home") {
        // 如果是的话就为他绑定 鼠标移除事件
        this.show = false;
      }
    },

    // 点击三级联动 a 标签以后跳转到 search 组件页面,然后将 query 参数传递过去
    goSearch(event) {
      let nodeElement = event.target;
      let { categoryname, category1id, category2id, category3id } =
        nodeElement.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 在跳转以前,先进行一次判断
        // (其实这里这个判断是无意义的判断,因为 params 是一个空对象,他永远为 true 所以这个判断永远进的去,这里写只是为了方便阅读代码)
        if (this.$route.params) {
          location.query = query;
          // 如果当前有 params 参数的话,也将 params 一块传递过去
          location.params = this.$route.params;
        }
        // 跳转
        // 判断当前是在那个页面跳转的是决定使用 push  还是 replace
        if (this.$route.path != "/home") {
          this.$router.replace(location);
        } else {
          this.$router.push(location);
        }
      }
    },

    // 搜索页面下的typeNav列表的显示与隐藏
    showList() {
      // 判断当前所在路径是否为 非home 组件,如果是的话,就证明在 search 组件中
      if (this.$route.path !== "/home") {
        // 这样的话,就可以为 非 home 组件绑定这个鼠标移入事件了
        this.show = true;
      }
    },
  },
  mounted() {
    // 在组件刚挂载的时候,判断当前所在路由的 path 路径,将 search 组件的 是会显示改为 不显示
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
};
</script>

<style lang='less' scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 463px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 29px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              &:hover {
                cursor: pointer;
              }
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: -1px;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                  a:hover {
                    cursor: pointer;
                  }
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                    a:hover {
                      cursor: pointer;
                    }
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }

    // 如果 transition 的标签没有 name 属性的话,那么你的类名会自动变为 v-enter || v-enter-to || v-active
    // 如果有 name 的话 那么就是 name-enter  name-enter-to
    // 起始位置--进入的起始位置
    .sort-enter {
      // height: 0;
      opacity: 0;
    }
    // 起始的结束--进入的结束位置
    .sort-enter-to {
      // height: 463px;
      opacity: 1;
    }
    .sort-enter-active {
      transition: all 0.5s;
    }
  }
}
</style>