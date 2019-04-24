<template>
  <div class="contain">
    <div class="header">
      <image @click="toAccount" class="header_account" src="../../static/images/ic_account.png" mode='aspectFill'/>
      <div class="header_text">
        <p @click="toAddBudget" v-if="totalBudgetId == null">添加预算</p>
        <p :class="warnStatus === 0 ? 'header_text_red' : ''" @click="toBudget" v-if="totalBudgetId !== null">剩余:{{ leftBudgetMoney }}</p>
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

    <div v-if="showMask === '0'" :style="maskHeight" class="mask"></div>
    <div v-if="showMask === '0'" class="tip">
      <!-- <p class="tip-title">记账提醒闹钟</p>
      <p class="tip-card">
        <span class="tip-word">提醒标题：</span>
        <span class="tip-price">啦啦啦啦啦啦啦啦啦</span>
      </p>
      <p class="tip-card">
        <span class="tip-word">提醒时长：</span>
        <span class="tip-price">20:00</span>
      </p>
      <p class="tip-card">
        <span class="tip-word">提醒备注：</span>
        <span class="tip-price-small">啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</span>
      </p>
      <image @click="closeClock" mode='aspectFill' class="tip-image" src="../../static/images/ic_bottom.png" /> -->
    </div>
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
      leftBudgetMoney: 0,
      warnStatus: 1,
      // webSocket
      lockReconnect: false,
      timer: null,
      limit: 12
      // 暂时无用
      // 蒙版，0展示，1不展示
      // showMask: 1,
      // maskHeight: ''
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
      console.log('vuex用户信息res', res)
      const imgUrl = 'http://pq92yp4cm.bkt.clouddn.com/'
      const imgUrl2 = res.data.avatarFPath
      const userData = {
        id: res.data.id,
        name: res.data.name,
        realName: res.data.realName,
        phone: res.data.phone,
        signature: res.data.signature,
        avatarUrl: wxUserInfo.avatarUrl,
        wxName: wxUserInfo.wxName,
        account: res.data.account,
        avatarFPath: `${imgUrl}${imgUrl2}`
      }
      console.log('vuex用户信息', userData)
      this.vuexSetUserInfo(userData)
      this.linkSocket()
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
      this.leftBudgetMoney = this.$wxApi.toMoney(res.data.leftBudgetMoney)
      if ((res.data.leftBudgetMoney - res.data.warnMoney) <= 0) {
        this.warnStatus = 0
      } else {
        this.warnStatus = 1
      }
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
    },

    linkSocket () {
      let that = this
      wx.connectSocket({
        // http://192.168.8.39:9090
        // http://120.77.86.76:9090
        url: 'ws://192.168.8.39:9090/socket/' + this.userInfo.id,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        method: 'GET',
        success () {
          console.log('连接成功')
          that.socketHandle()
        },
        fail (e) {
          console.log('连接失败', e)
        }
      })
    },

    socketHandle () {
      wx.onSocketOpen(() => {
        console.log('WebSocket连接打开')
      })
      wx.onSocketMessage((res) => {
        console.log('WebSocket连接打开,服务器信息4:', JSON.parse(res.data))
        const data = JSON.parse(res.data)
        // 判断传过来的类型: 1连接成功， 2闹钟
        if (data.type === 2) {
          const data1 = {
            id: data.message
          }
          console.log('id记账提醒data', data1)
          this.$api.clock.getClockById(data1)
            .then((res) => {
              if (res.orror) {
                return
              }
              console.log('id记账提醒res', res)
              const description = res.data.description || '空'
              const name = res.data.name
              let time = res.data.time
              const time1 = this.$time.turnTime(time).slice(5, 16)
              console.log('time1', time1)
              wx.showModal({
                title: '记账提醒',
                content: `    您于${time1}有一个标题栏为${name}，备注为${description}的记账提醒`,
                confirmText: '前往记账',
                confirmColor: '#de6f6f',
                cancelText: '稍后再去',
                cancelColor: '#eeeeee',
                success: (res) => {
                  // 暂时不用
                  // this.closeClock()
                  if (res.confirm) {
                    wx.navigateTo({
                      url: `../addFee/main`
                    })
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            })
        }
        // 暂时无用
        // this.showMask = 0
      })
      wx.onSocketError((res) => {
        console.log('WebSocket连接打开失败')
        // this.reconnect()
      })
      wx.onSocketClose((res) => {
        console.log('WebSocket 已关闭！')
        // this.reconnect()
      })
    },

    reconnectSocket () {
      if (this.lockReconnect) return
      this.lockReconnect = true
      clearTimeout(this.timer)
      if (this.data.limit < 12) {
        this.timer = setTimeout(() => {
          this.linkSocket()
          this.lockReconnect = false
        }, 5000)
        this.setData({
          limit: this.data.limit + 1
        })
      }
    },

    // 暂时无用
    closeClock () {
      this.showMask = 1
      console.log('3333')
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
    // 设置屏幕高度
    wx.getSystemInfo({
      success: (res) => {
        let height = parseInt(res.windowHeight) * 2
        this.maskHeight = `height:${height}rpx`
      }
    })
    console.log('this.showMask', this.showMask)
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
  text-align: center;
}

.header_text_red {
  color: #de6f6f;
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

.mask {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0.5;
  background-color: #000000;
}
.tip {
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 364rpx;
  left: 120rpx;
  width: 510rpx;
  height: 400rpx;
  border-radius: 10rpx;
  box-shadow: 0 16rpx 16rpx -8rpx rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
}
.tip-title {
  margin-top: 30rpx;
  margin-bottom: 40rpx;
  width: 306rpx;
  height: 48rpx;
  font-size: 34rpx;
  text-align: center;
  color: #232323;
  font-weight: 500;
}
.tip-card {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  width: 420rpx;
  height: 60rpx;
}
.tip-word {
  font-weight: 500;
  /* margin-top: 30rpx; */
  width: 140rpx;
  /* height: 20px; */
  font-size: 28rpx;
  color: #c8d2dc;
}
.tip-price {
  /* width: 47px; */
  /* height: 39px; */
  font-family: 'League Gothic';
  font-size: 30rpx;
  letter-spacing: 0.2rpx;
  text-align: left;
  color: #de6f6f;
}
.tip-price-small {
  font-family: 'League Gothic';
  font-size: 30rpx;
  letter-spacing: 0.2rpx;
  text-align: left;
  color: #de6f6f;
}
.tip-image {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 54rpx;
  height: 54rpx;
}
</style>
