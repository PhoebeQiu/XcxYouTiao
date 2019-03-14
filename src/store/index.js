import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import accountBook from '@/store/modules/accountBook'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    accountBook
  }
})

export default store
