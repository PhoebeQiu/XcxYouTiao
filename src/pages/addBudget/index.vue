<template>
  <div class="contain">

    <div class="budget_sort">
      <div class="budget_sort_title">
        <span class="dot_r"></span>
        <p>预算分类</p>
      </div>
      <div class="aline"></div>
      <FeeSort :feeSort="outBudgetSort" :feeStatus="budgetStatus" :feeNullItem="1"
        @changeClassificationStatus="changeClassificationStatus"/>
    </div>

    <div class="budget_money">
      <WInput :post="budgetInput[0]" @setInputValue="setInputValue"/>
    </div>

    <div class="budget_tipMoney">
      <WInput :post="budgetInput[1]" @setInputValue="setInputValue"/>
    </div>

    <div class="budget_startTime">
      <WSelectTime :post="startTimeInput" @bindDateChange="bindDateChange"/>
    </div>
    <div class="budget_endTime">
      <WSelectTime :post="endTimeInput" @bindDateChange="bindDateChange"/>
    </div>

    <div class="btn">
      <div @click="addBudget">
        <WButton text="添加" size="big_btn" bgstyle="bgcolor_red" />
      </div>
    </div>

  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import WInput from '@/components/WInput'
import WButton from '@/components/WButton'
import FeeSort from '@/components/fee/FeeSort'
import WSelectTime from '@/components/WSelectTime'

export default {
  data () {
    return {
      // 表单提交数据
      budgetClassification: 0,
      budgetMoney: 0,
      budgetTipMoney: 0,
      budgetStartTime: '',
      budgetEndTime: '',
      // 页面显示数据
      // 分类组件
      budgetStatus: 0,
      outBudgetSort: [
        { num: 0,
          title: '餐饮',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_food.png',
          select_fee_img: '../../static/images/outcomeType/out_food_gray.png'
        },
        { num: 1,
          title: '交通',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_traffic.png',
          select_fee_img: '../../static/images/outcomeType/out_traffic_gray.png'
        },
        { num: 2,
          title: '购物',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_shopping.png',
          select_fee_img: '../../static/images/outcomeType/out_shopping_gray.png'
        },
        { num: 3,
          title: '居住',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_live.png',
          select_fee_img: '../../static/images/outcomeType/out_live_gray.png'
        },
        { num: 4,
          title: '娱乐',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_recreation.png',
          select_fee_img: '../../static/images/outcomeType/out_recreation_gray.png'
        },
        { num: 5,
          title: '医疗',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_medical.png',
          select_fee_img: '../../static/images/outcomeType/out_medical_gray.png'
        },
        { num: 6,
          title: '教育',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_education.png',
          select_fee_img: '../../static/images/outcomeType/out_education_gray.png'
        },
        { num: 7,
          title: '人情',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_human.png',
          select_fee_img: '../../static/images/outcomeType/out_human_gray.png'
        },
        { num: 8,
          title: '其他支出',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_other.png',
          select_fee_img: '../../static/images/outcomeType/out_other_gray.png'
        },
        { num: 9,
          title: '总预算',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_total.png',
          select_fee_img: '../../static/images/outcomeType/out_total_gray.png'
        }
      ],
      budgetInput: [
        {
          msg: '',
          title: '预算金额',
          dotStatus: '1',
          maxLength: 15,
          type: 'budgetMoney',
          placeholderMsg: '¥ 0.00'
        },
        {
          msg: '',
          title: '提示金额',
          dotStatus: '1',
          maxLength: 15,
          type: 'budgetTipMoney',
          placeholderMsg: '¥ 0.00'
        }
      ],
      startTimeInput: {
        title: '开始时间',
        dotStatus: '1',
        type: 'budgetStartTime',
        time: '',
        date: ''
      },
      endTimeInput: {
        title: '结束时间',
        dotStatus: '1',
        type: 'budgetEndTime',
        time: '',
        date: ''
      }
    }
  },

  computed: {
    ...mapGetters('accountBook', [
      'vuexGetAccountBook'
    ]),

    // 获取数据
    accountBook () {
      let accountBook = this.vuexGetAccountBook
      return accountBook
    }
  },

  components: {
    WInput,
    FeeSort,
    WButton,
    WSelectTime
  },

  methods: {
    initState () {
      this.budgetClassification = 0
    },

    changeClassificationStatus (options) {
      let budgetClassification = options
      this.budgetClassification = budgetClassification
    },

    setInputValue (options) {
      // 账本金额
      if (options.type === 'budgetMoney') {
        this.budgetMoney = options.msg
      } else if (options.type === 'budgetTipMoney') {
        this.budgetTipMoney = options.msg
      }
    },

    bindDateChange (options) {
      // 预算时间
      if (options.type === 'budgetStartTime') {
        this.startTimeInput.time = options.msg.slice(5)
        this.startTimeInput.date = options.msg
        this.budgetStartTime = options.msg
      } else if (options.type === 'budgetEndTime') {
        this.endTimeInput.time = options.msg.slice(5)
        this.endTimeInput.date = options.msg
        this.budgetEndTime = options.msg
      }
    },

    checked () {
      let validotr = this.$check()
      validotr.addRule(this.budgetMoney, [
        { strategy: 'isEmpty', error: '请填写预算金额' },
        { strategy: 'isPrice', error: '请填写数字（预算金额）' }
      ])
      validotr.addRule(this.budgetTipMoney, [
        { strategy: 'isEmpty', error: '请填写提示金额' },
        { strategy: 'isPrice', error: '请填写数字（提示金额）' }
      ])
      return validotr.check()
    },

    async addBudget () {
      // 表单验证
      let validotrMsg = this.checked()
      if (validotrMsg) {
        return
      }
      // 预算金额 > 提示金额
      if ((this.budgetMoney - this.budgetTipMoney) < 0) {
        console.log('this.budgetMoney', this.budgetMoney)
        console.log('this.budgetTipMoney', this.budgetTipMoney)
        wx.showToast({
          title: `提示金额不能超过预算金额`,
          icon: 'none'
        })
        return
      }
      // 开始时间 < 结束时间
      let startTime = this.budgetStartTime
      let endTime = this.budgetEndTime
      let aStartTime = startTime.slice(8, 10)
      let aEndTime = endTime.slice(8, 10)
      if (aStartTime > aEndTime) {
        wx.showToast({
          title: `开始时间不能大于结束时间`,
          icon: 'none'
        })
        return
      }
      // 把时间转化为时间戳
      const tmpStartTime = `${this.budgetStartTime} 00:00:00`
      const tmpEndTime = `${this.budgetEndTime} 00:00:00`
      console.log('tmpStartTime', tmpStartTime)
      console.log('tmpEndTime', tmpEndTime)
      // 时间转化为时间戳
      let startDate = this.$time.turnTimeStamp(tmpStartTime)
      let endDate = this.$time.turnTimeStamp(tmpEndTime)
      // 发起请求
      if (this.budgetClassification === 9) {
        // 添加总预算
        const data = {
          accountBookId: this.accountBook.id,
          totalBudget: this.budgetMoney,
          warnMoney: this.budgetTipMoney,
          beginTime: startDate,
          endTime: endDate
        }
        console.log('添加总预算data', data)
        let res = await this.$api.budget.addTotalBudget(data)
        if (res.errCode === 103) {
          wx.showToast({
            title: `该账本存在总预算`,
            icon: 'none'
          })
          return
        }
        if (res.orror) {
          return
        }
        console.log('添加总预算res', res)
        let type = 8
        wx.navigateTo({
          url: `../successPage/main?type=${type}`
        })
      }
      if (this.budgetClassification !== 9) {
        // 判断预算是否只剩下总预算
        const data = {
          accountBookId: this.accountBook.id,
          pageNum: 1,
          pageSize: 10
        }
        let res = await this.$api.budget.getAllBudgetList(data)
        if (res.errCode) {
          return
        }
        console.log('一共多少个预算', res.data.result.length)
        if (res.data.result.length !== 0) {
          this.add()
        } else {
          wx.showModal({
            title: '添加分类预算',
            content: '添加分类预算的同时，会添加一样的总预算，是否仍要添加？',
            success: (res) => {
              if (res.confirm) {
                this.add()
              }
            }
          })
        }
      }
    },

    async add () {
      // 把时间转化为时间戳
      const tmpStartTime = `${this.budgetStartTime} 00:00:00`
      const tmpEndTime = `${this.budgetEndTime} 00:00:00`
      console.log('tmpStartTime', tmpStartTime)
      console.log('tmpEndTime', tmpEndTime)
      // 时间转化为时间戳
      let startDate = this.$time.turnTimeStamp(tmpStartTime)
      let endDate = this.$time.turnTimeStamp(tmpEndTime)
      // 添加分类预算
      const data = {
        accountBookId: this.accountBook.id,
        classification: this.budgetClassification,
        budget: this.budgetMoney,
        warnMoney: this.budgetTipMoney,
        beginTime: startDate,
        endTime: endDate
      }
      console.log('添加分类预算data', data)
      let res = await this.$api.budget.addBudget(data)
      if (res.errCode === 101) {
        wx.showToast({
          title: `预算金额超過总预算`,
          icon: 'none'
        })
        return
      } else if (res.errCode === 102) {
        wx.showToast({
          title: `开始与结束时间不位于总预算時間区间内`,
          icon: 'none'
        })
        return
      } else if (res.errCode === 104) {
        wx.showToast({
          title: `与该种类的预算有时间重叠`,
          icon: 'none'
        })
        return
      }
      if (res.orror) {
        return
      }
      console.log('添加分类预算res', res)
      let type = 8
      wx.navigateTo({
        url: `../successPage/main?type=${type}`
      })
    },

    getTime () {
      // 获取时间
      const date = new Date()
      let firstTime = this.$time.getFirstTime(date)
      let lastTime = this.$time.getLastTime(date)
      this.startTimeInput.time = firstTime.slice(5)
      this.startTimeInput.date = firstTime
      this.endTimeInput.time = lastTime.slice(5)
      this.endTimeInput.date = lastTime
      this.budgetStartTime = firstTime
      this.budgetEndTime = lastTime
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

.budget_money, budget_tipMoney {
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
