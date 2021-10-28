<!--
 * @Date: 2021-10-19 11:12:40
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-28 12:54:53
 * @FilePath: \VueProject\gshop\src\pages\Home\Floor\index.vue
-->
<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ floorInfo.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              :class="{ active: index === 0 }"
              v-for="(item, index) in floorInfo.navList"
              :key="index"
            >
              <a href="#tab1" data-toggle="tab">{{ item.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in floorInfo.keywords" :key="index">
                  {{ keyword }}
                </li>
              </ul>
              <img :src="floorInfo.imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- 在这里使用全局的轮播图 组件,然后将需要遍历的数据传递进去,一定要叫 bannerList ,因为内部的数据名字就叫 bannerList -->
              <Carousel :bannerList="floorInfo.carouselList"/>
            </div>

            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floorInfo.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floorInfo.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="floorInfo.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floorInfo.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floorInfo.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
  props: ["floorInfo"],

  // 这里是可以直接写 swiper 实例的,也不用使用啥监视属性,因为这里的 数据都是从父元素传递过来的,所以不会出现异步啥的,直接使用,就可以直接出结果
  // mounted() {
  //   new Swiper(this.$refs.floor1Swiper, {
  //     autoplay: true, //可选选项，自动滑动
  //     pagination: {
  //       el: ".swiper-pagination",
  //     },
  //     autoplay: true, //可选选项，自动滑动
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //     loop : true,
  //   });
  // },


  // 已经封装了一个全局的轮播图,所以这里就可以不用写了
  // watch: {
  //   floorInfo: {
  //     immediate: true,
  //     handler() {
  //       this.$nextTick(() => {
  //         new Swiper(this.$refs.floor1Swiper, {
  //           autoplay: true, //可选选项，自动滑动
  //           pagination: {
  //             el: ".swiper-pagination",
  //           },
  //           autoplay: true, //可选选项，自动滑动
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //           loop: true,
  //         });
  //       });
  //     },
  //   },
  // },
};
</script>

<style lang='less' scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>