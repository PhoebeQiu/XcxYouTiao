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
        path: `/auth/authorize`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 账号密码登录
    login (data) {
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
        method: 'PUT',
        data
      }
      return request(params)
    },

    // 获取用户资料
    getCustomer (data) {
      const params = {
        path: `/auth/queryCustomDataById`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 注册
    register (data) {
      const params = {
        path: `/auth/register`,
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

    // 通过ID得到账本具体信息
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
    },

    // 展示某区间内的（收入、支出、结余）
    showExpensesTrendBetweenInterval (data) {
      const params = {
        path: `/expenses/showExpensesTrendBetweenIntervalByAccountBookId`,
        method: 'POST',
        data
      }
      return request(params)
    },

    exportExcel (data) {
      const params = {
        path: `/expenses/exportExcel`,
        method: 'POST',
        data
      }
      return request(params)
    }
  },

  // 预算
  budget: {
    // 添加分类预算
    addBudget (data) {
      const params = {
        path: `/budget/addBudget`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 添加总预算
    addTotalBudget (data) {
      const params = {
        path: `/budget/addTotalBudget`,
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
    },

    // 通过id得到预算
    getBudgetById (data) {
      const params = {
        path: `/budget/queryBudgetById`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 更新分类预算
    updateBudget (data) {
      const params = {
        path: `/budget/updateBudget`,
        method: 'PUT',
        data
      }
      return request(params)
    },

    // 更新总预算
    updateTotalBudget (data) {
      const params = {
        path: `/budget/updateTotalBudget`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 删除预算
    daleteBudget (data) {
      const params = {
        path: `/budget/deleteBudgetById`,
        method: 'DELETE',
        data
      }
      return request(params)
    },

    // 删除预算
    deleteTotalBudgetById (data) {
      const params = {
        path: `/budget/deleteTotalBudgetById`,
        method: 'DELETE',
        data
      }
      return request(params)
    }

  },

  // 记账提醒
  clock: {
    // 添加
    addClock (data) {
      const params = {
        path: `/clock/addClock`,
        method: 'POST',
        data
      }
      return request(params)
    },

    getClockById (data) {
      const params = {
        path: `/clock/queryClockById`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 修改
    updateClock (data) {
      const params = {
        path: `/clock/updateClock`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 删除
    deleteClock (data) {
      const params = {
        path: `/clock/deleteClock`,
        method: 'POST',
        data
      }
      return request(params)
    },

    // 展示所有
    listClock (data) {
      const params = {
        path: `/clock/listClock`,
        method: 'POST',
        data
      }
      return request(params)
    }
  },

  // 七牛云
  picture: {
    // 下载
    downloadImg (data) {
      const params = {
        path: `/file/download`,
        method: 'POST',
        data
      }
      return request(params)
    }
  }
}
