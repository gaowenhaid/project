<!--
 * @Date: 2021-10-18 08:50:14
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-25 20:47:26
 * @FilePath: \VueProject\gshop\src\App.vue
-->
<template>
  <div class="outer">
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
// 优化代码,在 App 组件中,挂载一次,只发送一次请求,这样就减少了,发送请求的频率,使用派发,同样发送请求
  beforeCreate(){
    this.$store.dispatch('getList')
  }
};
</script>

<style>
</style>
