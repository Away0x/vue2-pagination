import Vue from 'vue'
import Vuex from 'vuex'

import news from './modules/news'

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);
Vue.config.debug = debug;

export default new Vuex.Store({
  modules: {
    news
  },
  strict: debug,
});
