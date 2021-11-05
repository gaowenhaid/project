<!--
 * @Date: 2021-10-18 15:26:21
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-05 22:07:55
 * @FilePath: \VueProject\gshop\src\pages\Home\index.vue
-->
<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :floorInfo="floor"/>
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import "nprogress/nprogress.css";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("getFloorList");
    // 在组件挂载的时候,向服务器发送请求,获取用户信息
    // this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: (state) => {
        return state.home.floorList
      },
    }),
  },
};
</script>

<style>
</style>