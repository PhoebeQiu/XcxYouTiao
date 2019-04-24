import {
  SETCLOCKINFO
} from '@/store/mutation-type'

const state = {
  clockInfo: {}
}

const mutations = {
  [SETCLOCKINFO] (state, payLoad) {
    const {
      clockInfo = {}
    } = payLoad
    console.log(clockInfo)
    state.clockInfo = payLoad
  }
}

const getters = {
  vuexGetClockInfo (state) {
    return state.clockInfo.clockInfo
  }
}

const actions = {
  async vuexSetClockInfo ({commit}, data) {
    const payLoad = {
      clockInfo: data
    }
    commit(SETCLOCKINFO, payLoad)
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
