<template>
  <div class="contain">

    <div class="user">
      <image class="user_img" :src="userInfo.avatarUrl" mode="aspectFill" />
      <div class="user_detail">
        <p class="user_name">
          <span v-if="userInfo.name">{{ userInfo.name }}</span>
          <span v-if="userInfo.name == ''">{{ userInfo.wxName }}</span>
        </p>
        <p class="user_desc">这个人没有留言哦</p>
      </div>
    </div>

    <div class="content">
      <div class="item" @click="toUserInfo">
        <image class="item_ic" src="../../static/images/ic_user.png" mode="aspectFill" />
        <p>账户</p>
        <image class="item_arrow" src="../../static/images/ic_arrow.png" mode="aspectFill" />
      </div>

      <div class="line"></div>

      <div class="item">
        <image class="item_ic" src="../../static/images/ic_vip.png" mode="aspectFill" />
        <p>特权</p>
        <image class="item_arrow" src="../../static/images/ic_arrow.png" mode="aspectFill" />
      </div>
    </div>

    <WTabBar/>
  </div>
</template>

<script>
import WTabBar from '@/components/TabBar'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  data () {
    return {
    }
  },

  components: {
    WTabBar
  },

  computed: {
    ...mapGetters('user', [
      'vuexGetUserInfo'
    ]),

    userInfo () {
      let userInfo = this.vuexGetUserInfo
      return userInfo
    }
  },

  methods: {
    ...mapActions('user', [
      'vuexSetUserInfo'
    ]),

    toUserInfo () {
      wx.navigateTo({
        url: `../userInfo/main`
      })
    },

    async getCustomer () {
      let wxUserInfo = this.userInfo
      // 请求：获取用户信息
      const data = {}
      const res = await this.$api.auth.getCustomer(data)
      console.log('获取用户信息', res.data)
      const userData = {
        name: res.data.name,
        realName: res.data.realName,
        phone: res.data.phone,
        signature: res.data.signature,
        avatarUrl: wxUserInfo.avatarUrl,
        wxName: wxUserInfo.wxName
      }
      this.vuexSetUserInfo(userData)
    }
  },

  onShow () {
    wx.hideTabBar()
    this.getCustomer()
  }
}
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  color: #232323;
}

.user {
  display: flex;
  justify-content: flex-start;
  width: 690rpx;
  border-bottom: 2rpx solid #fcfcfc;
  padding: 12rpx 0 0rpx 60rpx;
  /* margin: 30rpx 0 60rpx 0; */
  margin: 60rpx 0 90rpx 0;
}
.user_img {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  margin-right: 60rpx;
}
.user_detail {
  flex: 1 0 auto;
}
.user_name {
  width: 400rpx;
  height: 48rpx;
  font-size: 34rpx;
  font-weight: 500;
  letter-spacing: 0.26rpx;
}
.user_desc {
  height: 36rpx;
  width: 450rpx;
  font-size: 26rpx;
  letter-spacing: 0.2rpx;
  color: #b2b2b2;
}

.content {
  display: flex;
  flex-direction: column;
  width: 690rpx;
  /* height: 304rpx; */
  box-shadow: 0 16px 32px -16px rgba(0, 0, 0, 0.1);
  margin: 0 30rpx 28rpx 30rpx;
}
.item {
  display: flex;
  align-items: center;
  height: 100rpx;
}
.item p {
  flex: 1 0 auto;
  font-size: 28rpx;
  letter-spacing: 0.2rpx;
  color: #8d8d8d;
}
.item_ic, .item_arrow {
  width: 48rpx;
  height: 48rpx;
}
.item_ic {
  margin: 0 28rpx 0 30rpx;
}
.item_arrow {
  margin-right: 30rpx;
}

.line {
  width: 570rpx;
  height: 2rpx;
  border-radius: 6rpx;
  margin-left: 30rpx;
  background-color: #fcfcfc;
}
</style>
