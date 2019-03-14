function wxLogin (data) {
  let that = data
  wx.login({
    success: (res) => {
      let code = res.code
      wx.getUserInfo({
        success: (res) => {
          that.vuexSetUserInfo(res.userInfo)
          const data = {
            avatarUrl: res.userInfo.avatarUrl,
            wxName: res.userInfo.nickName,
            code: code
          }
          if (res.error) {
            return
          }
          console.log('登录参数：', data)
          that.$api.auth.xcxLogin(data)
            .then((res) => {
              wx.setStorageSync('token', res.data.token)
              let a = wx.getStorageSync('token')
              console.log('登录后保存的token：', a)
              // 页面重定向
              wx.redirectTo({
                url: `../account/main`
              })
            })
        }
      })
    }
  })
  // wx.login({
  //   success: (res) => {

  //
  //         that.$api.auth.xcxLogin(data)
  //           .then((res) => {
  //
  //             } else {
  //               const d = {
  //                 token: res.token,
  //                 outNo: res.outNo
  //               }
  //               that.setToken(d)
  //             }
  //           })
  //       }
  //     })
  //   }
  // })
}

export default {
  wxLogin
}
