<!--
 * @Date: 2021-10-19 10:54:40
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-20 18:48:28
 * @FilePath: \VueProject\gshop\src\pages\Home\TypeNav\index.vue
-->
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 为商品分类 和 下边的 item 共同绑定一个鼠标移除事件,从而达到公用样式的效果 -->
      <div @mouseleave="currentIndex = -1">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" @click="goSearch">
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
                :style="{ display: currentIndex === index ? 'block' : 'none' }"
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
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  async beforeCreate() {
    this.$store.dispatch("getList");
  },

  methods: {
    // 使用lodash中的节流函数,来确保页面的渲染能跟的上用户的快速滑动
    // 节流函数: 在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
    getBg: throttle(function (index) {
      console.log("tag", index, "");
      this.currentIndex = index;
    }, 20),

    // 未使用 节流函数
    // getBg(index) {
    //   this.currentIndex = index;
    //   console.log('tag',index, '')
    // }

    goSearch(event) {
      let nodeElement = event.target;
      let { categoryname, category1id, category2id, category3id } =
        nodeElement.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname};
        if (category1id) {
          query.category1Id = category1id;
          console.log("tag", 11111111111111, "");
        } else if (category2id) {
          query.category2Id = category2id;
          console.log("tag", 2222222222, "");
        } else {
          query.category3Id = category3id
          console.log("tag", 33333333333, "");
        }
        location.query = query
        this.$router.push(location)

      }
    },
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
              &:hover{
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
                  a:hover{
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
                    a:hover{
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
  }
}
</style>