<!--
 * @Date: 2021-11-07 20:54:43
 * @LastEditors: 高文海
 * @LastEditTime: 2021-11-07 21:12:42
 * @FilePath: \VueProject\gshop\src\pages\Demo\index.vue
-->
<template>
  <el-button type="primary" round=true @click="haha">提交</el-button>
</template>

<script>
export default {
    name: "Demo",
    methods: {
        haha(){
            this.$msgbox('sadas')
            this.$notify({
                title: "Haha",
            })
        }
    },
}
</script>

<style>

</style>