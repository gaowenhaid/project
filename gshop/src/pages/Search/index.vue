<!--
 * @Date: 2021-10-18 15:27:06
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-18 16:54:04
 * @FilePath: \VueProject\gshop\src\pages\Search.vue
-->
<template>
  <div>
    <h1>
      <!-- 使用 query 来接收参数 -->
      接收到的query参数为: {{ $route.query.key1 }}
    </h1>
    <h1>
      <!-- 使用params来接收的参数 -->
      接收到的params参数为: {{ $route.params.keyWord }}
    </h1>
    <h1>
        接收到的 props 参数为 {{keyWord}}---{{key1}}---{{b}}
    </h1>
  </div>
</template>

<script>
export default {
    name:'Search',
    props: ['keyWord',"key1",'b'],
    
};
</script>

<style>
</style>