import apiRequest from './net'

function request ({ path = '', method = 'GET', data = {} } = {}) {
  let type = 'token'
  let token = wx.getStorageSync('token')
  const header = {
    'content-type': 'application/json'
  }
  header[type] = token
  const d = {
    path,
    method,
    data,
    header
  }
  return apiRequest(d)
}

export default {

  // 用户
  auth: {
    // 小程序绑定
    xcxLogin (data) {
      const params = {
        path: `/auth/login`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 更新用户资料
    updateCustomer (data) {
      const params = {
        path: `/auth/updateCustomData`,
        method: 'POST',
        data
      }
      return request(params)
    }

  },

  // 账本
  accountBook: {
    // 得到所有账本
    getAllAccount (data) {
      const params = {
        path: `/accountBook/listAccountBook`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 添加账本
    addAccount (data) {
      const params = {
        path: `/accountBook/addAccountBook`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 得到账本具体信息
    getAccountById (data) {
      const params = {
        path: `/accountBook/getAccountBookById`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 更新账本信息
    updateAccount (data) {
      const params = {
        path: `/accountBook/updateAccountBook`,
        method: 'PUT',
        data
      }
      return request(params)
    },

    // 删除账本
    deleteAccount (data) {
      const params = {
        path: `/accountBook/deleteAccountBookById`,
        method: 'DELETE',
        data
      }
      return request(params)
    },

    // 更改账本打开历史
    resetAccountOpenHistory (data) {
      const params = {
        path: `/accountBook/resetOpenHistory`,
        method: 'PUT',
        data
      }
      return request(params)
    }
  },

  // 费用
  expenses: {
    // 展示所有费用
    getAllExpenses (data) {
      const params = {
        path: `/expenses/listExpenses`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 分数组展示每一天的所有费用
    getSomeDaysExpenses (data) {
      const params = {
        path: `/expenses/showEveryDayExpensesDetail`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 添加一笔费用
    addExpenses (data) {
      const params = {
        path: `/expenses/addExpenses`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 通过费用id得到费用详情
    getExpensesById (data) {
      const params = {
        path: `/expenses/QueryExpensesById`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 统计所选日期的费用
    getOneDayExpenses (data) {
      const params = {
        path: `/expenses/sumThisDayExpenses`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 报表的展示
    getExpensesGroup (data) {
      const params = {
        path: `/expenses/expensesGroupClassificationByTypeStatistic`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 统计某一个区间内的总支出与总收入
    getSumInAndOutExpenses (data) {
      const params = {
        path: `/expenses/sumInAndOutExpenses`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 更新一笔费用信息
    updateExpenses (data) {
      const params = {
        path: `/expenses/updateExpenses`,
        method: 'PUT',
        data
      }
      return request(params)
    },

    // 删除费用
    deleteExpenses (data) {
      const params = {
        path: `/expenses/deleteExpensesById`,
        method: 'DELETE',
        data
      }
      return request(params)
    }
  },

  // 预算
  budget: {
    // 添加预算
    addBudget (data) {
      const params = {
        path: `/budget/addBudget`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 展示所有预算
    getAllBudgetList (data) {
      const params = {
        path: `/budget/listBudgetByAccountBookId`,
        method: 'POST',
        data
      }
      return request(params)
    }

  }
}
