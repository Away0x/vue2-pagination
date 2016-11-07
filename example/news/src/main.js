import Vue from 'vue'
import VueResource from 'vue-resource'
import { mock } from 'mockjs'

import store from './vuex/store'

import App from './App'

// 开发时
const dev = process.env.NODE_ENV === 'development'

Vue.use(VueResource);

/* BEGIN resource 的配置 */
Vue.http.options.emulateJSON = true;

Vue.http.interceptors.push((request, next) => {
  const isRapData = request.url.search('http://rap.taobao.org/mockjs/')

  next(response => {
    if( ! response.ok) return // 这里用return不用throw是防止在该阶段就捕获到错误，应该在vuex的action中进行错误处理

    if (isRapData == -1)  // json化
      response.body = JSON.parse(response.body)
    else  // 开发时，用到 mockjs
      response.body = mock(response.body)
  })
})
/* END resource 的配置 */

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
