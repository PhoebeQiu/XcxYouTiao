import {
  SETFEEINFO
} from '@/store/mutation-type'

const state = {
  feeInfo: {}
}

const mutations = {
  [SETFEEINFO] (state, payLoad) {
    const {
      feeInfo = {}
    } = payLoad
    console.log(feeInfo)
    state.feeInfo = payLoad
  }
}

const getters = {
  vuexGetFeeInfo (state) {
    return state.feeInfo.feeInfo
  }
}

const actions = {
  async vuexSetFeeInfo ({commit}, data) {
    const payLoad = {
      feeInfo: data
    }
    commit(SETFEEINFO, payLoad)
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
