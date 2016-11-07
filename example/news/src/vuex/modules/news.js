import Vue from 'vue'
import * as type from '../mutation_types'
export default {
  // 存储数据
  state: {
    news: [],
    pagination: {},
  },

  // 用于组件中获取数据 ...mapGetters(['getAllCards']) 或 this.$store.getters.getAllCards
  getters: {
    getAllNews: state => state.news,

    // 分页信息
    getNewsPaginationInfo: state => state.pagination,
    getNewsCurrentPage: state => parseInt(state.pagination.currentPage),
  },

  actions: {
    getAllNewsAction: ({commit}, page=1) => {

      Vue.http.get(`http://rap.taobao.org/mockjs/7312/api/personal/news`, {params: {page: page}})
        .then(res => {
          commit(type.GET_NEWS_DATA, res.body);
        })
        .catch(err => {
          console.log('getAllNewsAction failed: ', err);
        })
    },
  },

  // 用于接收actions的数据，并进行状态转化
  mutations: {
    [type.GET_NEWS_DATA](state, data) {
      state.news = data.data;
      state.pagination = data.pagination;
    },
  },
}
