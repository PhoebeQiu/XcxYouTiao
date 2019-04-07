<template>
  <div class="contain">
    <div class="header">
      <image @click="toAccount" class="header_account" src="../../static/images/ic_account.png" mode='aspectFill'/>
      <div class="header_text">
        <p @click="toAddBudget" v-if="totalBudgetId == null">添加预算</p>
        <p @click="toBudget" v-if="totalBudgetId !== null">剩余:{{ totalBudgetMoney }}</p>
      </div>
      <image @click="toShowDayFee" class="header_calendar" src="../../static/images/ic_calendar.png" mode='aspectFill'/>
    </div>

    <div class="cost">
      <div class="income">
        <p class="cost_month">{{ month }}月收入</p>
        <p class="cost_num">{{ sumInExpenses }}</p>
      </div>
      <div class="line"></div>
      <div class="note" @click="toAddFee">
        <image class="" src="../../static/images/ic_note.png" mode='aspectFill'/>
        <p>记一笔</p>
      </div>
      <div class="income">
        <p class="cost_month">{{ month }}月支出</p>
        <p class="cost_num">{{ sumOutExpenses }}</p>
      </div>
    </div>

    <div class="fee">
      <FeeCard :feeItem="feeItem" />
    </div>

    <WTabBar/>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import WTabBar from '@/components/TabBar'
import FeeCard from '@/components/fee/FeeCard'

export default {
  data () {
    return {
      feeItem: [],
      sumInExpenses: 0,
      sumOutExpenses: 0,
      month: 0,
      // 预算
      totalBudgetId: null,
      totalBudgetMoney: 0
    }
  },

  components: {
    WTabBar,
    FeeCard
  },

  computed: {
    ...mapGetters('accountBook', [
      'vuexGetAccountBook'
    ]),

    ...mapGetters('user', [
      'vuexGetUserInfo'
    ]),

    // 获取数据
    accountBook () {
      let accountBook = this.vuexGetAccountBook
      return accountBook
    },

    userInfo () {
      let userInfo = this.vuexGetUserInfo
      return userInfo
    }
  },

  methods: {
    ...mapActions('user', [
      'vuexSetUserInfo'
    ]),

    toAccount () {
      wx.navigateTo({
        url: `../account/main`
      })
    },

    toShowDayFee () {
      wx.navigateTo({
        url: `../showDayFee/main`
      })
    },

    toAddFee () {
      wx.navigateTo({
        url: `../addFee/main`
      })
    },

    toBudget () {
      wx.navigateTo({
        url: `../budget/main`
      })
    },

    toAddBudget () {
      wx.navigateTo({
        url: `../addBudget/main`
      })
    },

    getToken () {
      return wx.getStorageSync('token')
    },

    async getFeeWeek () {
      // 获取一周内的费用信息
      const data = {
        accountBookId: this.accountBook.id,
        recentDay: 7
      }
      let res = await this.$api.expenses.getSomeDaysExpenses(data)
      if (res.errCode) {
        return
      }
      console.log('近7天的费用列表', res.data)
      let feeData = res.data
      for (let i = 0; i < feeData.length; i++) {
        if (feeData[i].length !== 0) {
          feeData[i] = feeData[i].map(item => {
            return {
              classification: item.classification,
              description: item.description,
              time: item.time,
              type: item.type,
              id: item.id,
              expenses: this.$wxApi.toMoney(item.expenses)
            }
          })
        }
      }
      this.feeItem = feeData
    },

    async getCustomer () {
      let wxUserInfo = this.userInfo
      // 请求：获取用户信息
      const data = {}
      const res = await this.$api.auth.getCustomer(data)
      if (res.errCode) {
        return
      }
      const userData = {
        id: res.data.id,
        name: res.data.name,
        realName: res.data.realName,
        phone: res.data.phone,
        signature: res.data.signature,
        avatarUrl: wxUserInfo.avatarUrl,
        wxName: wxUserInfo.wxName
      }
      console.log('vuex用户信息', userData)
      this.vuexSetUserInfo(userData)
    },

    async getFeeTotal () {
      // 得到年月日
      const mydate = new Date()
      this.month = mydate.getMonth() + 1
      const today = this.$time.getTime(mydate)
      let feeDate = today
      // 得到时分秒
      const Second = new Date()
      const SecondTime = this.$time.formatTime(Second)
      const time = `${feeDate} ${SecondTime}`
      // 时间转化为时间戳
      let date = this.$time.turnTimeStamp(time)
      // 请求：获取一周内的费用信息
      const data = {
        accountBookId: this.accountBook.id,
        type: 2,
        date: date
      }
      let res = await this.$api.expenses.getSumInAndOutExpenses(data)
      if (res.errCode) {
        return
      }
      console.log('该月份的的总费用', res.data)
      this.sumInExpenses = this.$wxApi.toMoney(res.data.sumInExpenses)
      this.sumOutExpenses = this.$wxApi.toMoney(res.data.sumOutExpenses)
    },

    async getAccountById () {
      // 获取一周内的费用信息
      const data = {
        id: this.accountBook.id
      }
      let res = await this.$api.accountBook.getAccountById(data)
      if (res.errCode) {
        return
      }
      console.log('该账本详细信息', res.data)
      this.totalBudgetId = res.data.totalBudgetId
      this.totalBudgetMoney = this.$wxApi.toMoney(res.data.totalBudgetMoney)
    },

    async resetAccountOpenHistory (accountId) {
      // 请求：更改账本的打开历史状态
      const data = {
        accountBookId: accountId
      }
      let res = await this.$api.accountBook.resetAccountOpenHistory(data)
      if (res.errCode) {
        return
      }
      console.log()
    }
  },

  onShow () {
    wx.hideTabBar()
    // 账本id改变,修改账本选中状态
    let accountId = this.accountBook.id
    if (accountId) {
      // 请求：更改账本的打开历史状态
      this.resetAccountOpenHistory(accountId)
      // 请求：获取费用统计
      this.getFeeTotal()
      // 请求：获取费用信息
      this.getFeeWeek()
      // 请求：账本详细信息
      this.getAccountById()
    }
  },

  onLoad () {
    this.getCustomer()
  }

}
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #232323;
  background-color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 690rpx;
  height: 50rpx;
  margin-top: 30rpx;
}
.header_account, .header_calendar {
  width: 48rpx;
  height: 48rpx;
}
.header_text {
  width: 220rpx;
  height: 44rpx;
  border: 1rpx solid #bfbfbf;
  border-radius: 30rpx;
}
.header_text p {
  line-height: 44rpx;
  font-size: 26rpx;
  color: #2c2c2c;
  text-align: center;
}

.cost {
  position: relative;
  height: 330rpx;
  margin-bottom: 30rpx;
}
.line {
  position: absolute;
  left: 50%;
  top: 0%;
  width: 2rpx;
  /* height: 145rpx; */
  height: 46%;
  background-color: #bfbfbf;
}
.note {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: 38.4%;
  top: 45.7%;
  width: 174rpx;
  height: 174rpx;
  border: 2rpx solid #de6f6f;
  border-radius: 50%;
}
.note image {
  width: 58rpx;
  height: 58rpx;
  margin-left: 6rpx;
}
.note p{
  font-size: 24rpx;
  color: #de6f6f;
  margin-top: 10rpx;
}
.income {
  float: left;
  width: 375rpx;
  height: 100rpx;
  text-align: center;
  margin-top: 60rpx;
}
.cost_month {
  font-size: 24rpx;
  color: #b2b2b2;
}
.cost_num {
  font-size: 48rpx;
  font-family: 'League Gothic';
  letter-spacing: 0.4rpx;
  color: #de6f6f;
  padding-top: 10rpx;
}

.fee {
  width: 690rpx;
  box-shadow: 0 32rpx 64rpx -32rpx rgba(0, 0, 0, 0.1);
  margin-top: 20rpx;
  margin-bottom: 135rpx;
}
</style>
