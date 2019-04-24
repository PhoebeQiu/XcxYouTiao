<template>
  <div class="contain">

    <div class="personal_account">
      <div class="accountModule">
        <div class="title">
          <div class="title_line"></div>
          <p class="title_name">个人账本</p>
        </div>
        <div class="account">
          <AccountCard :accountItem="accountItem" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import AccountCard from '@/components/account/AccountCard'

export default {
  data () {
    return {
      accountItem: [],
      tmpToken: 0
    }
  },

  components: {
    AccountCard
  },

  computed: {
    ...mapGetters('user', [
      'vuexGetUserInfo'
    ]),
    userInfo () {
      return this.vuexGetUserInfo
    }
  },

  methods: {
    ...mapActions('user', [
      'vuexSetUserInfo'
    ]),

    initState () {
      this.accountItem = []
    },

    getToken () {
      return wx.getStorageSync('token')
    },

    async getAccount () {
      // 请求：账本数据
      const data = {
        pageNum: 1,
        pageSize: 10
      }
      let res = await this.$api.accountBook.getAllAccount(data)
      if (res.errCode) {
        return
      }
      console.log('请求所有账本', res.data.result)
      this.accountItem = res.data.result
    }
  },

  onLoad () {
    // 请求：账本数据
    const tmpToken = this.getToken()
    if (!tmpToken) {
      this.initState()
      this.$wxLogin.wxLogin(this)
    }
  },

  onShow () {
    // const tmpToken = this.getToken()
    // if (tmpToken) {
    //   // 请求：账本数据
    //   this.getAccount()
    // }
    this.getAccount()
  },

  onUnload () {
    // 初始化data数据
    // this.initState()
  }

}
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #b2b2b2;
}

.personal_account {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 750rpx;
  margin-top: 30rpx;
}

.accountModule {
  width: 690rpx;
  /* margin-top: 30rpx; */
}
.title {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  height: 48rpx;
  padding:30rpx 0 40rpx 0;
}
.title_line {
  width: 10rpx;
  height: 38rpx;
  border-radius: 2rpx;
  background-color: #de6f6f;
  margin:0 20rpx 0 15rpx;
}
.title_name {
  font-size: 30rpx;
  letter-spacing: 0.4rpx;
}

</style>
