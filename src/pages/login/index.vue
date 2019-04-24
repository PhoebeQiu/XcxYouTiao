<template>
  <div class="contain">
    <div class="login" v-if="show === 1">
      <image src="../../static/images/ic_bground.png" class="logo" mode="aspectFill" />
      <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">授权</button>
    </div>

    <div class="warn-content" v-if="show === 1">
      <p class="warn" @click="toAccountLogin">用账号密码方式登录</p>
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
    },

    toAccountLogin () {
      wx.navigateTo({
        url: `../accountLogin/main`
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
  width: 630rpx;
  height: 750rpx;
  background: #fff;
  margin: 0 auto;
  margin-top: 150rpx;
  position: relative;
  box-shadow: 0 32rpx 64rpx -32rpx rgba(0, 0, 0, 0.1);
}
.logo {
  position: absolute;
  top: 60rpx;
  left: 50rpx;
  width: 520rpx;
  height: 600rpx;
}
.btn {
  position: absolute;
  bottom: -40rpx;
  right: 80rpx;
  width: 330rpx;
  height: 80rpx;
  border-radius: 40rpx;
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.1rpx;
  line-height: 80rpx;
  text-align: center;
  /* background-image: linear-gradient(256deg, #55f9ff, #55d9ff 51%, #55baff); */
  /* box-shadow: 0 8rpx 16rpx -8rpx #76bdec; */
  font-size: 34rpx;
  border: none;
  background-color: #de6f6f;
}
button::after {
  border: none;
}

.warn-content {
  position: absolute;
  top: 980rpx;
  left: 100rpx;
}
.warn {
  font-size: 28rpx;
  color: #b2b2b2;
}
</style>
