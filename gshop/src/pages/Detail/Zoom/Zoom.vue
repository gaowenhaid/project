<!--
 * @Date: 2021-10-31 17:50:24
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-01 19:53:13
 * @FilePath: \gshop\src\pages\Detail\Zoom\Zoom.vue
-->
<template>
  <div class="spec-preview">
    <!-- 小图 -->
    <img :src="imageBig.imgUrl" />
    <!-- 事件容器 -->
    <div class="event" @mousemove="magnifying"></div>
    <!-- 大图区域 -->
    <div class="big">
      <img :src="imageBig.imgUrl" ref="bigImg" />
    </div>
    <!-- 蒙版区域 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      currentIndex:0
    }
  },
  props: ["imageList"],
  computed: {
    imageBig() {
      return this.imageList[this.currentIndex] || {};
    },
  },
  methods: {
    magnifying(event) {
      // 获取蒙版
      let mask = this.$refs.mask;
      // 获取鼠标的 x 的位置 并且用 x 位置 减去 蒙版宽度的一半 主要目的是为了 让鼠标一直保持在 蒙版的正中心
      let l = event.offsetX - mask.offsetWidth / 2;
      // 获取鼠标的 y 的位置  y 轴的位置 同理
      let t = event.offsetY - mask.offsetHeight / 2;

      // 边界值判断,小于0 就等于 0 
      if(l < 0) l = 0;
      // 如果大于蒙版的宽度(其实这里最严谨的写法是 父盒子的宽度减去蒙版的宽度,但是在这里他两个的值一样,所以说我们直接判断蒙版的宽度就行)
      if(l > mask.offsetWidth) l = mask.offsetWidth;
      // 高度的边界值判断与宽度同理
      if(t < 0 ) t = 0;
      if(t > mask.offsetHeight) t = mask.offsetHeight;

      // 为蒙版的 left 和 top 值进行赋值
      mask.style.left = l + "px";
      mask.style.top = t + "px";

      // 将大图片的 left 值 和 top 值 ,进行取反操作,然后 *2 因为 大图正好是小图的二倍
      this.$refs.bigImg.style.left = -2 * l + "px";
      this.$refs.bigImg.style.top = -2 * t + "px";

    },
  },
  mounted() {
    this.$bus.$on('send',(index)=>{
      this.currentIndex = index;
    })
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>