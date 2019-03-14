import wx from './wx'

function getUserMsg () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

// 将数字转换为金额格式
function toMoney (value) {
  let value1 = Math.round(parseFloat(value) * 100) / 100
  let xsd = value.toString().split('.')
  if (xsd.length === 1) {
    value = value1.toString() + '.00'
    return value
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value1.toString() + '0'
    }
    return value
  }
}

export default {
  getUserMsg,
  toMoney
}
