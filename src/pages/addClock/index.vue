<template>
  <div class="contain">

    <div class="budget_money">
      <WInput :post="clockInput[0]" @setInputValue="setInputValue"/>
    </div>

    <div class="budget_tipMoney">
      <WInput :post="clockInput[1]" @setInputValue="setInputValue"/>
    </div>

    <div class="budget_startTime">
      <WSelectSecond :post="clockTimeInput" @bindDateChange="bindDateChange"/>
    </div>

    <div class="budget_endTime">
      <WSelectCycle :post="clockCycleInput" @bindCycleChange="bindCycleChange"/>
    </div>

    <div class="btn">
      <div @click="addClock">
        <WButton text="添加" size="big_btn" bgstyle="bgcolor_red" />
      </div>
    </div>

  </div>
</template>

<script>
// import {
//   mapGetters
// } from 'vuex'
import WInput from '@/components/WInput'
import WButton from '@/components/WButton'
import WSelectSecond from '@/components/WSelectSecond'
import WSelectCycle from '@/components/WSelectCycle'

export default {
  data () {
    return {
      // 表单提交数据
      clockTitle: '',
      clockDesc: '',
      clockTime: '',
      clockCycle: 0,
      // 页面显示数据
      date: '',
      // 组件
      clockInput: [
        {
          msg: '',
          title: '记账提醒标题',
          dotStatus: '1',
          maxLength: 15,
          type: 'clockTitle',
          placeholderMsg: '有条理记账，有条理生活'
        },
        {
          msg: '',
          title: '记账提醒备注',
          dotStatus: '0',
          maxLength: 30,
          type: 'clockDesc',
          placeholderMsg: '备注说明'
        }
      ],
      clockTimeInput: {
        title: '提醒闹钟',
        dotStatus: '1',
        type: 'clockTimeInput',
        time: ''
      },
      clockCycleInput: {
        title: '提醒周期',
        dotStatus: '1',
        type: 'clockCycleInput',
        cycle: '0'
      }
    }
  },

  computed: {
    // ...mapGetters('accountBook', [
    //   'vuexGetAccountBook'
    // ]),

    // // 获取数据
    // accountBook () {
    //   let accountBook = this.vuexGetAccountBook
    //   return accountBook
    // }
  },

  components: {
    WInput,
    WButton,
    WSelectSecond,
    WSelectCycle
  },

  methods: {
    initState () {
    },

    setInputValue (options) {
      // 账本金额
      if (options.type === 'clockTitle') {
        this.clockTitle = options.msg
      } else if (options.type === 'clockDesc') {
        this.clockDesc = options.msg
      }
    },

    bindDateChange (options) {
      // 闹钟时间
      if (options.type === 'clockTimeInput') {
        this.clockTimeInput.time = options.msg
        this.clockTime = options.msg
      }
    },

    bindCycleChange (options) {
      // 闹钟周期
      if (options.type === 'clockCycleInput') {
        this.clockCycleInput.cycle = options.msg
        this.clockCycle = options.msg
      }
    },

    checked () {
      let validotr = this.$check()
      validotr.addRule(this.clockTitle, [
        { strategy: 'isEmpty', error: '请填写预算标题' }
      ])
      return validotr.check()
    },

    async addClock () {
      // 表单验证
      let validotrMsg = this.checked()
      if (validotrMsg) {
        return
      }
      // 把时间转化为时间戳
      const tmpStartTime = `${this.date} ${this.clockTime}:00`
      console.log('tmpStartTime', tmpStartTime)
      // 时间转化为时间戳
      let time = this.$time.turnTimeStamp(tmpStartTime)
      // 处理周期
      let cycle = this.clockCycle
      if (cycle === 0) {
        cycle = 1
      } else if (cycle === 1) {
        cycle = 3
      } else if (cycle === 2) {
        cycle = 5
      }
      // 发起请求
      const data = {
        cycle: cycle,
        name: this.clockTitle,
        desc: this.clockDesc,
        status: 0,
        time: time
      }
      console.log('添加记账提醒data', data)
      let res = await this.$api.clock.addClock(data)
      if (res.orror) {
        return
      }
      console.log('添加记账提醒res', res)
      let type = 11
      wx.navigateTo({
        url: `../successPage/main?type=${type}`
      })
    },

    getTime () {
      // 获取时间
      const date = new Date()
      this.date = this.$time.getTime(date)
      let m = date.getHours()
      m = m < 10 ? ('0' + m) : m
      let s = date.getMinutes()
      s = s < 10 ? ('0' + s) : s
      this.clockTimeInput.time = `${m}:${s}`
      this.clockTime = `${m}:${s}`
    }
  },

  onLoad: function () {
    // 获取时间
    this.getTime()
  },

  onUnload: function () {
    this.initState()
  }
}
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.budget_money, .budget_tipMoney {
  margin-top: 30rpx;
}

.budget_sort {
  display: flex;
  flex-direction: column;
  width: 690rpx;
  margin-top: 30rpx;
  background-color: white;
  font-size: 34rpx;
}
.budget_sort_title {
  display: flex;
  position: relative;
}
.dot_r {
  position: absolute;
  top: 47%;
  left: 5%;
  width: 24rpx;
  height: 24rpx;
  background-color: #de6f6f;
  border-radius: 50%;
}
.budget_sort p {
  line-height: 60rpx;
  margin-left: 70rpx;
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #b2b2b2;
}
.aline {
  width: 615rpx;
  height: 2rpx;
  background-color: #eee;
  border-radius: 5rpx;
  margin: 10rpx 0 10rpx 30rpx;
}

.fee_other {
  width: 690rpx;
  height: 80rpx;
  margin-top: 30rpx;
  display: flex;
}

.fee_time {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #232323;
}
.fee_time_img {
  width: 48rpx;
  height: 48rpx;
  margin-right: 20rpx;
}

.fee_desc {
  display: flex;
  align-items: center;
  color: #232323;
}
.fee_desc_img {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}
textarea {
  width: 400rpx;
  height: 34rpx;
  font-size: 28rpx;
}

.btn {
  position: fixed;
  z-index: 9998;
  bottom: 68rpx;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30rpx;
  padding-right: 30rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
