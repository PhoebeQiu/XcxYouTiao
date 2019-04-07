// const SERVER_URL = 'http://120.77.86.76:9090'
const SERVER_URL = 'http://192.168.8.39:9090'

async function apiRequest ({path = '', method = 'GET', data = {}, header = {}} = {}) {
  const url = SERVER_URL + path
  console.log('path:' + url)

  const msg = {
    url,
    method,
    data,
    header
  }

  let les = await wxRequest(msg)
  return les
}

function wxRequest ({url = '', method = 'GET', data = {}, header = {}} = {}) {
  return new Promise((resolve, reject) => {
    // wx.showLoading({
    //   title: '拼命加载中...'
    // })

    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: (res) => {
        // wx.hideLoading()
        if (res.data.errCode === 2000) {
          wx.removeStorageSync('token')
          wx.reLaunch({
            url: '../login/main'
          })
        }
        if (res.data.error) {
          wx.showToast({
            icon: 'none',
            title: res.data.error.msg
          })
        }
        resolve(res.data)
      },
      fail: error => {
        reject(error)
      }
    })
  })
}

export default apiRequest
