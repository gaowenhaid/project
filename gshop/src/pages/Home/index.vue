<!--
 * @Date: 2021-10-18 15:26:21
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-19 19:03:18
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
import TypeNav from "./TypeNav";
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { getDataList } from "../../api";
import "nprogress/nprogress.css"

export default {
  name: "Home",
  components: {
    TypeNav,
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  async mounted() {
    console.log('tag', '---------------------------------')
    let a = await getDataList();
    console.log('tag',a.data, '')
    console.log('tag',this, '--==========')
  },
};
</script>

<style>
</style>