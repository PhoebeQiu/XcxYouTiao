import {
  SETACCOUNTBOOK
} from '@/store/mutation-type'

const state = {
  accountBook: {}
}

const mutations = {
  [SETACCOUNTBOOK] (state, payLoad) {
    // const {
    //   accountBook = {}
    // } = payLoad
    // console.log(accountBook)
    state.accountBook = payLoad
  }
}

const getters = {
  vuexGetAccountBook (state) {
    return state.accountBook.accountBook
  }
}

const actions = {
  async vuexSetAccountBook ({commit}, data) {
    const payLoad = {
      accountBook: data
    }
    commit(SETACCOUNTBOOK, payLoad)
  }
}

export default {
  // 命名空间
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
