<!--
 * @Date: 2021-10-18 08:50:14
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-18 16:33:19
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
  mounted(){
    console.log('tag',this, '')
  }
};
</script>

<style>
</style>
