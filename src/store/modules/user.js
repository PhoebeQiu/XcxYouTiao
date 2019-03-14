import {
  SETUSERINFO
} from '@/store/mutation-type'

const state = {
  userInfo: {}
}

const mutations = {
  [SETUSERINFO] (state, payLoad) {
    const {
      userInfo = {}
    } = payLoad
    console.log(userInfo)
    state.userInfo = payLoad
  }
}

const getters = {
  vuexGetUserInfo (state) {
    return state.userInfo.userInfo
  }
}

const actions = {
  async vuexSetUserInfo ({commit}, data) {
    const payLoad = {
      userInfo: data
    }
    commit(SETUSERINFO, payLoad)
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
