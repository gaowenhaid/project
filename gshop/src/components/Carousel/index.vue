<!--
 * @Date: 2021-10-26 22:15:50
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-26 22:23:40
 * @FilePath: \VueProject\gshop\src\components\Carousel\index.vue
-->
<!--封装全局组件轮播图-->
<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["bannerList"],
  watch: {
    bannerList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.floor1Swiper, {
            autoplay: true, //可选选项，自动滑动
            pagination: {
              el: ".swiper-pagination",
            },
            autoplay: true, //可选选项，自动滑动
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            loop: true,
          });
        });
      },
    },
  },
};
</script>

<style>
</style>