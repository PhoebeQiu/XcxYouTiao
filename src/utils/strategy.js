import wx from './wx'

// 策略模式 验证满足条件 使用情况 多条件判断
// 纯数字 + . 正则  价格
let reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/

// 手机正则
let regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/

// 纯数字
let regNumber = /^[0-9]*$/

// 表单校验，处理
let strategys = {
  // 是否为空
  isEmpty: (value, error) => {
    if (!value) {
      return error
    }
  },

  // 纯数字
  isNumber: (value, error) => {
    if (!regNumber.test(value)) {
      return error
    }
  },

  // 金额（数字0-9，小数点.）
  isPrice: (value, error) => {
    if (!reg.test(value)) {
      return error
    }
  },

  // 手机
  isPhone: (value, error) => {
    if (!regPhone.test(value)) {
      return error
    }
  }
}

// 属性名错误处理
// let testObj = {
//   test: (t) => {
//     if (!t.strategy) {
//     }
//     if (!t.error) {
//     }
//   }
// }

class Validator {
  constructor () {
    this.cache = []
  }

  addRule (value, rules) {
    rules.forEach(element => {
      // if (!element.strategy || !element.error) {
      //   this.cache.push(() => {
      //     testObj.test.call(this, element)
      //   })
      //   return
      // }
      let strategysAry = []
      // 属性名，例如 isPrice
      let strategy = element.strategy
      // 打印 isPrice
      let error = element.error
      // 打印 error 请填写价格
      // this.cache 数组里面 存在多个函数，使用 check 方法验证 msg
      this.cache.push(() => {
        strategysAry.unshift(value)
        strategysAry.push(error)
        // 使用 strategys 对象验证并返回 msg
        return strategys[strategy].apply(this, strategysAry)
        // strategysAry 为数组 [ 'isPrice', '请填写价格' ]
        // apply 自动把数组 解构为 value error
        //   相当于 return isPrice: (value, error) => {
        //     if (!reg.test(value)) {
        //       return error
        //     }
        //   }
      })
    })
  }

  check () {
    for (let i = 0; i < this.cache.length; i++) {
      // 开始校验
      let msg = this.cache[i]()
      if (msg) {
        wx.showToast({
          title: `${msg}`,
          icon: 'none'
        })
      }
      if (msg) {
        return msg
      }
    }
  }
}

export default function check () {
  return new Validator()
}
