<template>
  <div class="contain">
    <div class="login" v-if="show === 1">
      <image src="../../../static/images/ic_note.png" class="logo" mode="aspectFill" />
      <button open-type="getUserInfo" @getuserinfo="getUserInfo">授权</button>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  data () {
    return {
      show: 0
    }
  },

  methods: {
    ...mapActions('user', [
      'vuexSetUserInfo'
    ]),

    getUserInfo (e) {
      let errMag = e.mp.detail.errMsg
      if (errMag === 'getUserInfo:ok') {
        this.login()
      }
    },

    async login () {
      let res = await this.$wxApi.getUserMsg()
      // 有“获取个人资料”接口后：
      // let _token = this.getToken()
      // 本地有 token 请求个人资料接口
      // if (token) {
      //   let profile = await this.$api.my.profile()
      //   if (profile.error) {
      //     return
      //   }
      //   this.vuexSetUserInfo(profile)
      // } else {
      //   const data = {
      //     nickname: res.userInfo.nickName
      //   }
      //   this.vuexSetUserInfo(data)
      // }
      const data = {
        avatarUrl: res.userInfo.avatarUrl,
        wxName: res.userInfo.nickName
      }
      this.vuexSetUserInfo(data)
      this.show = 0
      // const _token = this.getToken()
      // if (_token) {
      //   this.toPage()
      // }
      this.toPage()
    },

    getToken () {
      let _token = ''
      _token = wx.getStorageSync('token')
      return _token
    },

    toPage () {
      // 前往 tab 页
      // wx.switchTab({
      //   url: `../account/main`
      // })
      // 前往普通页面
      // wx.navigateTo({
      //   url: `../account/main`
      // })
      // 页面返回
      // wx.navigateBack({
      // })
      // 页面重定向
      wx.redirectTo({
        url: `../account/main`
      })
    }

  },

  onLoad () {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.login()
        } else {
          this.show = 1
        }
      }
    })
  }

}
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #232323;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 690rpx;
  margin-top: 60rpx;
}
.logo {
  width: 48rpx;
  height: 48rpx;
  margin-bottom: 30rpx;
}
</style>
