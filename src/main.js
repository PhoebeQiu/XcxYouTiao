import Vue from 'vue'
import App from './App'
import store from '@/store'
import api from '@/utils/api'
import wxApi from '@/utils/wxApi'
import wxLogin from '@/utils/wxLogin'
import strategy from '@/utils/strategy'
import index from '@/utils/index'
import mixins from '@/mixins/index'
// 全局引入字体
import '../static/style/font.css'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$wxApi = wxApi
Vue.prototype.$wxLogin = wxLogin
Vue.prototype.$check = strategy
Vue.prototype.$time = index

Vue.mixin(mixins)

const app = new Vue({
  store,
  ...App
})
app.$mount()
