import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import accountBook from '@/store/modules/accountBook'
import feeInfo from '@/store/modules/feeInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    accountBook,
    feeInfo
  }
})

export default store
