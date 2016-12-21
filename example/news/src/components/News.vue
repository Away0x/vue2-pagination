<script>
import { mapGetters } from 'vuex'
import Pagination from './pagination'

export default {
  components: { Pagination },

  created() {
    this.$store.dispatch('getAllNewsAction')
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters(['getNewsPaginationInfo', 'getNewsCurrentPage', 'getAllNews' ]),
  },

  methods: {
    clickPageButton(page) {
      this.$store.dispatch('getAllNewsAction', page);
    },
  },

}
</script>


<template lang="html">


<!-- BEGIN +++++++++++++++++ new +++++++++++++++ -->
<div class="personalCenter-news">

  <form action="/test.php" method="POST">
    <label for="newsUp"><span></span></label>
    <textarea name="name" rows="8" cols="40" id="newsUp"></textarea>
    <div class="clearfix">
      <i class="emoticon">表情</i><i class="images">图片</i><i class="video">视频</i><i class="attach">附件</i>
      <input type="submit" class="submit" value="发布">
    </div>
  </form>

  <div class="personalCenter-news-nav">
    <ul class="clearfix">
      <li class="active">全部</li>
      <li>私信</li>
      <li>动态</li>
      <li>关注</li>
      <li>粉丝</li>
    </ul>
  </div>

  <div class="personalCenter-news-CardWrap">

    <div class="newsCard-item" v-for="item in getAllNews">
      <img class="avater" :src="item.avater">
      <div class="item-content">
        <h3>{{ item.name }}</h3>
        <p>{{ item.message }}<a href="javascript:void(0)">查看详情 >></a></p>

        <img v-if="item.images" v-for="image in item.images" :src="image">

      </div>
      <div class="item-info clearfix">
        <span>{{ item.time }}</span><em>评论 ( <i>{{ item.reply }}</i> )</em>
      </div>
    </div>

  </div>

  <div class="pagination" id="Pagination-wrap">
    <Pagination
      @clickPageButton="clickPageButton"
      :currentPage="getNewsCurrentPage"
      :totalPage="parseInt(getNewsPaginationInfo.totalPage)"
    ></Pagination>
  </div>

</div>
<!-- END +++++++++++++++++ new +++++++++++++++ -->

</template>

<style lang="stylus" scoped>
  @import './News';
  .personalCenter-news-nav li.active
    color: #019ce4
</style>
