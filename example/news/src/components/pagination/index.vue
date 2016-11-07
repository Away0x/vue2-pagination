<script>
import { count_start_and_end_page } from './utils'

export default {
  name: 'pagination',

  props: {
    currentPage: { type: Number, required: true }, // 当前所在页数
    totalPage:   { type: Number, required: true }, // 一共有多少页

    howMuchPageButtons:            { type: Number, default: 5 },     // 会显示几个页码按钮
    baseOnCurrentPageButtonOffset: { type: Number, default: 2 },     // 当前页码前后会展示几个页码按钮
    canJump:                       { type: Boolean, default: true }, // 是否显示跳转框
  },

  data() {
    return {
      canJumpNum: null
    }
  },

  computed: {
    // 首尾按钮是否禁用
    headDisabled() { return !(this.currentPage > 1) },
    tailDisabled() { return !(this.currentPage < this.totalPage) },

    // 首尾省略号是否显示
    headEllipsisShow() {
      if (this.totalPage > this.howMuchPageButtons)
        if (this.currentPage > this.baseOnCurrentPageButtonOffset + 1) return true;
    },
    tailEllipsisShow() {
      if (this.totalPage > this.howMuchPageButtons)
        if (this.totalPage > (this.currentPage + this.baseOnCurrentPageButtonOffset)) return true;
    },

    // 结果： 最终显示的页码按钮数
    showBunNum() {
      return count_start_and_end_page(this.currentPage, this.totalPage,
                                      this.howMuchPageButtons,
                                      this.baseOnCurrentPageButtonOffset);
    },
  },

  methods: {
    toHeadPage() {
      if (this.headDisabled) return;
      let currentPage = 1
      this.$emit('clickPageButton', currentPage);
    },
    toPrevPage() {
      if (this.headDisabled) return;
      let currentPage = this.currentPage;
      this.$emit('clickPageButton', --currentPage);
    },
    toNextPage() {
      if (this.tailDisabled) return;
      let currentPage = this.currentPage;
      this.$emit('clickPageButton', ++currentPage);
    },
    toTailPage() {
      if (this.tailDisabled) return;
      let currentPage = this.totalPage;
      this.$emit('clickPageButton', currentPage);
    },
    toPage(page) {
      if (page > this.totalPage) return;
      let currentPage = parseInt(page);
      this.$emit('clickPageButton', currentPage);
    },
  },
}
</script>


<template>
<div class="PAGIANTION">


  <!-- 首部按钮 -->
  <span class="Pagination-button" :class="{disable: headDisabled}" @click.stop="toHeadPage">首页</span>
  <span class="Pagination-button" :class="{disable: headDisabled}" @click.stop="toPrevPage">上一页</span>

  <!-- 首部省略号 -->
  <span v-if="headEllipsisShow" class="Pagination-info">...</span>

  <!-- 页码按钮 -->
  <span v-for="i in showBunNum">
    <span v-if="currentPage === i" class="Pagination-button active">{{ i }}</span>
    <span v-else class="Pagination-button" @click.stop="toPage(i)">{{ i }}</span>
  </span>

  <!-- 尾部省略号 -->
  <span v-if="tailEllipsisShow" class="Pagination-info">...</span>

  <!-- 尾部按钮 -->
  <span class="Pagination-button" :class="{disable: tailDisabled}" @click.stop="toNextPage">下一页</span>
  <span class="Pagination-button" :class="{disable: tailDisabled}" @click.stop="toTailPage">尾页</span>
  <span class="Pagination-info">共 {{ totalPage }} 页</span>

  <!-- 跳转按钮 -->
  <span v-if="canJump">
    <span class="Pagination-input">到第 <input type="text" v-model="canJumpNum" @keyup.enter="toPage(canJumpNum)"> 页</span>
    <span class="Pagination-submit" @click.stop="toPage(canJumpNum)">确定</span>
  </span>


</div>
</template>

<style lang="scss" scoped>
  @import './index';
</style>
