<template>
  <div class="contain">
    <div class="cal">
      <calendar weeks-type="cn" end-date="2019-02"
        calendar-style="calendar" header-style="header" board-style="board"
        :days-color="dayStyle"
        @nextMonth="nextMonth"
        @prevMonth="prevMonth"
        @dateChange="dateChange"
        @dayClick="dayClick"
       />
    </div>

    <div v-if="listExpenses != false" class="total_fee">
      <div class="total_fee_word">
        <p>{{ date }} 账单</p>
        <p :class="sumExpenses > 0 ? 'total_fee_red' : 'total_fee_yellow'">
          <span v-if="sumExpenses > 0">+</span>
          {{ sumExpenses }}
        </p>
      </div>
      <div class="total_fee_inout">
        <p>收入:{{ sumInExpenses }}</p>
        <p>支出:{{ sumOutExpenses }}</p>
      </div>
    </div>

    <div class="show_fee">
      <FeeCard :feeItem="listExpenses" />
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import FeeCard from '@/components/fee/FeeCardDay'

export default {
  components: {
    FeeCard
  },

  data () {
    return {
      // 页面显示数据
      date: 0,
      listExpenses: [],
      sumInExpenses: 0,
      sumOutExpenses: 0,
      sumExpenses: 0,
      // 日历
      nowYear: 0,
      nowMonth: 0,
      nowDay: 0,
      year: 0,
      month: 0,
      day: 0,
      dayStyle: []
    }
  },

  computed: {
    ...mapGetters('accountBook', [
      'vuexGetAccountBook'
    ]),

    // 获取userInfo数据
    accountBook () {
      let accountBook = this.vuexGetAccountBook
      return accountBook
    }
  },

  methods: {
    initState () {
      this.days_style = []
      this.date = 0
    },

    setTodayStyle () {
      let that = this
      // 获取今天日期
      const date = new Date()
      that.nowYear = date.getFullYear()
      that.nowMonth = date.getMonth() + 1
      that.nowDay = date.getDate()
      // 设置选中日期格式
      const _dayStyle = [
        { month: 'current', day: this.nowDay, color: 'white', background: '#de6f6f' }
      ]
      that.dayStyle = _dayStyle
      // 初始化 时间数据
      const today = that.$time.getTimeValue(date)
      that.date = today
    },

    nextMonth (e) {
      console.log('next:', e.mp.detail)
    },

    prevMonth (e) {
      console.log('prev:', e.mp.detail)
    },

    // 修改日历的年月
    dateChange (e) {
      this.year = e.mp.detail.currentYear
      this.month = e.mp.detail.currentMonth
      console.log('dateChange:', e.mp.detail)
    },

    // 选择日期
    dayClick (e) {
      let clickDay = e.mp.detail
      this.year = clickDay.year
      this.month = clickDay.month
      this.day = clickDay.day
      const nowday = [this.nowYear, this.nowMonth, this.nowDay]
      const clickday = [this.year, this.month, this.day]
      // 设置选中日期，样式
      if (nowday.toString() === clickday.toString()) {
        const _dayStyle = [
          { month: 'current', day: this.nowDay, color: 'white', background: '#de6f6f' }
        ]
        this.dayStyle = _dayStyle
      } else {
        const _dayStyle = [
          { month: 'current', day: clickDay.day, color: 'white', background: '#ffdeb3' }
        ]
        this.dayStyle = _dayStyle
      }
      this.date = this.$time.ymdGetTime(this.year, this.month, this.day)
      this.getDayFee()
    },

    // 得到需要展示的费用数据
    async getDayFee () {
      // 得到时分秒
      const Second = new Date()
      const SecondTime = this.$time.formatTime(Second)
      const time = `${this.date} ${SecondTime}`
      // 时间转化为时间戳
      let date = this.$time.turnTimeStamp(time)
      // 请求：获取所选日期的费用信息
      const data = {
        accountBookId: this.accountBook.id,
        pageNum: 1,
        pageSize: 10,
        searchDay: date
      }
      let res = await this.$api.expenses.getOneDayExpenses(data)
      if (res.errCode) {
        return
      }
      let feeData = res.data.listExpenses
      if (feeData.length !== 0) {
        feeData = feeData.map(item => {
          return {
            accountBookId: item.accountBookId,
            budgetId: item.budgetId,
            classification: item.classification,
            createTime: item.createTime,
            description: item.description,
            id: item.id,
            lastModifyTime: item.lastModifyTime,
            type: item.type,
            expenseDate: this.$time.turnTime(item.expenseDate).slice(11, 16),
            expenses: this.$wxApi.toMoney(item.expenses)
          }
        })
      }
      console.log('所选日期的费用列表', res.data)
      this.listExpenses = feeData
      this.sumInExpenses = this.$wxApi.toMoney(res.data.sumInExpenses)
      this.sumOutExpenses = this.$wxApi.toMoney(res.data.sumOutExpenses)
      this.sumExpenses = Math.floor(parseFloat(res.data.sumInExpenses * 100 - res.data.sumOutExpenses * 100)) / 100
    }
  },

  onLoad: function () {
    this.setTodayStyle()
    this.getDayFee()
  },

  onUnload: function () {
    this.initState()
  }
}
</script>

<style scoped>
.total_fee {
  border-top: 2rpx solid #eee;
  border-radius: 6rpx;
  font-size: 30rpx;
  padding: 20rpx 30rpx;
  background-color: white;
}
.total_fee_word {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15rpx;
}
.total_fee_red {
  color: #de6f6f;
  font-family: 'League Gothic';
  font-size: 36rpx;
  letter-spacing: 0.2rpx;
}
.total_fee_yellow {
  color: #ffdeb3;
  font-family: 'League Gothic';
  font-size: 36rpx;
  letter-spacing: 0.4rpx;
}
.total_fee_inout {
  display: flex;
  justify-content: space-between;
  color: #b2b2b2;
  font-size: 26rpx;
}

.show_fee {
  background-color: white;
}
</style>

<style>
.calendar {
  background-color: white;
  padding-top: 20rpx;
  /* box-shadow: 0 32rpx 64rpx -32rpx rgba(0, 0, 0, 0.1); */
}
.header {
  font-size: large;
  color: black;
}
.board {
  font-weight: bold;
}
</style>

