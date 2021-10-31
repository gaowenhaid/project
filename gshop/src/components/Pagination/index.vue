<!--
 * @Date: 2021-10-30 18:19:39
 * @LastEditors: 高文海
 * @LastEditTime: 2021-10-31 17:23:53
 * @FilePath: \gshop\src\components\Pagination\index.vue
-->
<template>
  <div class="pagination">
    <h1>{{ startAndEnd }}</h1>
    <button @click="goPage(pageNo - 1)" :disabled="pageNo==1">上一页</button>
    <!-- 当开始页码数必须大于或者等于2的时候,我们才需要最前边的这个一,别的时候都不要 -->
    <button v-if="startAndEnd.start >= 2" @click="goPage('1')">1</button>
    <button v-if="startAndEnd.start >= 2">···</button>
    <!-- v-for 是可以和 v-if 一起用的,而v-for 的优先级是比 v-if 优先级要高的 -->
    <button 
      v-for="page in startAndEnd.end" 
      :key="page" 
      v-if="page >= startAndEnd.start"
      @click="goPage(page)"
      :class="{active:pageNo == page}"
      >{{page}}</button>

    <button v-if="startAndEnd.end <= totalPage-1">···</button>
    <!-- 判断当前结束的页码数是否 小于 总页数 -1 如过小于的话就让他显示,如果大于的话,就将它隐藏 -->
    <button v-if="startAndEnd.end <= totalPage-1" @click="goPage(totalPage)">{{ totalPage }}</button>
    <button  @click="goPage(pageNo + 1)" :disabled="pageNo==totalPage">下一页</button>
    <button style="margin-left: 30px">共 {{ totalPage }} 页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
// import {mapGetters} from "vuex";
export default {
  name: "Pagination",
  //   一共有多少条数据                                           total
  //   一页展示多少条数据                                         pageSize
  //   当前是第几页                                               pageNo
  //  连续的页码数   一般是 5 , 7  9  因为这样比较好看              continues
  props: ["total", "pageNo", "pageSize", "continues"],
  //   computed: {
  //     startAndEnd: {
  //       start: this.pageNo + Math.ceil(this.continues / 2),
  //     },
  //   },
  computed: {
    // 计算出总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出页码的开始页码和结束的页码
    startAndEnd() {
      let { pageNo, continues } = this;
      // 计算出页码数的开头页
      let start = pageNo - parseInt(continues / 2);
      // 计算出页码数的结尾页
      let end = pageNo + parseInt(continues / 2);

      // 判断 如果开头页小于 1 的话,就让他等于 1 让结尾页 等于 页码总数
      if (start < 1) {
        start = 1;
        end = continues + 1 ;
      }
      // 判断 如果结尾页大于 总页数的话,就让他 等于总页数 开头等于总页数 - 页码数
      if (end > this.totalPage) {
        end = this.totalPage;
        start = this.totalPage - continues;
      }
      return { start, end };
    },
  },
  methods: {
    // 点击页码数跳转新页面 的逻辑
    goPage(page){
      this.$emit('goSearchPage',page)
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>