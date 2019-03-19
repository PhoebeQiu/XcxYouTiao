import {
  SETBUDGETINFO
} from '@/store/mutation-type'

const state = {
  budgetInfo: {}
}

const mutations = {
  [SETBUDGETINFO] (state, payLoad) {
    const {
      budgetInfo = {}
    } = payLoad
    console.log(budgetInfo)
    state.budgetInfo = payLoad
  }
}

const getters = {
  vuexGetBudgetInfo (state) {
    return state.budgetInfo.budgetInfo
  }
}

const actions = {
  async vuexSetBudgetInfo ({commit}, data) {
    const payLoad = {
      budgetInfo: data
    }
    commit(SETBUDGETINFO, payLoad)
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
