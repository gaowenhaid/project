<!--
 * @Date: 2021-10-18 15:26:21
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-25 19:19:19
 * @FilePath: \VueProject\gshop\src\pages\Home\index.vue
-->
<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor />
    <Floor />
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
import "nprogress/nprogress.css"

export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
};
</script>

<style>
</style>