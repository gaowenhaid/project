<!--
 * @Date: 2021-10-31 17:50:24
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-01 19:58:06
 * @FilePath: \gshop\src\pages\Detail\ImageList\ImageList.vue
-->
<template>
  <div class="swiper-container" ref="myswiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in imageList"
        :key="item.id"
        @click="handler(index)"
      >
        <!-- 为这个图片 动态添加一个 类名,判断条件就是 当前点击的那个元素的下标是否与我们的动态的数据是否相等 -->
        <img :src="item.imgUrl" :class="{ active: currentIndex == index }" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: ["imageList"],
  watch: {
    imageList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.myswiper, {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          slidesPerView: 3,
          slidesPerGroup: 2,
        });
      });
    },
  },
  methods: {
    handler(index) {
      // 将动态数据修改为 外部传入的那个索引,然后动态添加类名
      this.currentIndex = index;
      //绑定单机事件,将当前点击的这个图的 索引位置发送到兄弟组件上边$bus.去
      this.$bus.$emit("send", index);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>