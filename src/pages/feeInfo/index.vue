<template>
  <div class="contain">
    <div class="fee_title">
      <FeeTitle :postStatus="typeStatus" @changeTypeStatus="changeTypeStatus" />
    </div>

    <div class="fee_money">
      <WInput :post="moneyInput" @setInputValue="setInputValue"/>
    </div>

    <div v-if="feeType === 0" class="fee_sort">
      <FeeSort :feeSort="inFeeSort" :feeStatus="feeStatus" @changeClassificationStatus="changeClassificationStatus"/>
    </div>
    <div v-if="feeType === 1" class="fee_sort">
      <FeeSort :feeSort="outFeeSort" :feeStatus="feeStatus" @changeClassificationStatus="changeClassificationStatus"/>
    </div>

    <div class="fee_other">
      <div class="fee_time">
        <image class="fee_time_img" src="../../static/images/ic_calendar_gray.png" mode="aspectFill" />
        <picker mode="date" start="2018-01-01" :end="endTime" @change="bindDateChange">
          {{ dateValue }}
        </picker>
      </div>
      <div class="line"></div>
      <div class="fee_desc">
        <image class="fee_desc_img" src="../../static/images/ic_write.png" mode="aspectFill" />
        <textarea placeholder="写点啥备注下"
          class="textarea"
          v-model="feeDesc"
          placeholder-style="color: #bfbfbf"/>
      </div>
    </div>

    <div class="btn">
      <div @click="deletaFee">
        <WButton text="删除" size="small_btn" bgstyle="border_red" />
      </div>
      <div @click="updateFee">
        <WButton text="保存" size="small_btn" bgstyle="bgcolor_red" />
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
import FeeTitle from '@/components/fee/FeeTitle'
import FeeSort from '@/components/fee/FeeSort'

export default {
  data () {
    return {
      // 表单提交数据
      feeId: 0,
      feeType: '',
      feeClassification: 0,
      feeMoney: '',
      feeDate: '',
      feeDesc: '',
      // 页面显示数据
      dateValue: '',
      // 时间选择限制时间
      endTime: '',
      // 组件
      feeStatus: 0,
      typeStatus: 0,
      inFeeSort: [
        { num: 0,
          title: '工资',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_wage.png',
          select_fee_img: '../../static/images/incomeType/in_wage_gray.png'
        },
        { num: 1,
          title: '红包',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_redBag.png',
          select_fee_img: '../../static/images/incomeType/in_redBag_gray.png'
        },
        { num: 2,
          title: '生活费',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_livingExpense.png',
          select_fee_img: '../../static/images/incomeType/in_livingExpense_gray.png'
        },
        { num: 3,
          title: '奖金',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_bonus.png',
          select_fee_img: '../../static/images/incomeType/in_bonus_gray.png'
        },
        { num: 4,
          title: '报销',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_reimburse.png',
          select_fee_img: '../../static/images/incomeType/in_reimburse_gray.png'
        },
        { num: 5,
          title: '兼职',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_partTime.png',
          select_fee_img: '../../static/images/incomeType/in_partTime_gray.png'
        },
        { num: 6,
          title: '借入款',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_loan.png',
          select_fee_img: '../../static/images/incomeType/in_loan_gray.png'
        },
        { num: 7,
          title: '投资收益',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_income.png',
          select_fee_img: '../../static/images/incomeType/in_income_gray.png'
        },
        { num: 8,
          title: '其他收入',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_other.png',
          select_fee_img: '../../static/images/incomeType/in_other_gray.png'
        }
      ],
      outFeeSort: [
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
        }
      ],
      moneyInput: {
        msg: '',
        title: '账单金额',
        dotStatus: '1',
        maxLength: 15,
        type: 'feeMoney',
        placeholderMsg: '¥ 0.00'
      }
    }
  },

  computed: {
    ...mapGetters('accountBook', [
      'vuexGetAccountBook'
    ]),

    ...mapGetters('feeInfo', [
      'vuexGetFeeInfo'
    ]),

    // 获取数据
    accountBook () {
      let accountBook = this.vuexGetAccountBook
      return accountBook
    },

    feeInfo () {
      let feeInfo = this.vuexGetFeeInfo
      return feeInfo
    }
  },

  components: {
    FeeTitle,
    WInput,
    FeeSort,
    WButton
  },

  methods: {
    initState () {
      this.feeDesc = ''
      this.feeType = ''
      this.feeMoney = ''
      this.moneyInput.msg = ''
      this.moneyInput.dotStatus = '1'
      this.moneyInput.placeholderMsg = '¥ 0.00'
    },

    changeTypeStatus (options) {
      let typeStatus = options
      this.feeType = typeStatus
      // 文本框
      if (typeStatus === 0) {
        this.moneyInput.dotStatus = '1'
      } else {
        this.moneyInput.dotStatus = '0'
      }
    },

    changeClassificationStatus (options) {
      let feeClassification = options
      this.feeClassification = feeClassification
    },

    setInputValue (options) {
      // 账本金额
      if (options.type === 'feeMoney') {
        this.feeMoney = options.msg
      }
    },

    bindDateChange (e) {
      let that = this
      let date = e.mp.detail.value
      that.feeDate = that.$time.getTime(date)
      that.dateValue = that.$time.getTimeValue(date).slice(5)
    },

    checked () {
      let validotr = this.$check()
      validotr.addRule(this.feeMoney, [
        { strategy: 'isEmpty', error: '请填写费用金额' },
        { strategy: 'isPrice', error: '请填写数字（费用金额）' }
      ])
      return validotr.check()
    },

    async updateFee () {
      // 表单验证
      let validotrMsg = this.checked()
      if (validotrMsg) {
        return
      }
      // 得到时分秒
      const Second = new Date()
      const SecondTime = this.$time.formatTime(Second)
      const time = `${this.feeDate} ${SecondTime}`
      // 时间转化为时间戳
      let date = this.$time.turnTimeStamp(time)
      // 发起请求
      const data = {
        id: this.feeId,
        type: this.feeType,
        classification: this.feeClassification,
        description: this.feeDesc,
        expenses: this.feeMoney,
        expensesDate: date
      }
      let res = await this.$api.expenses.updateExpenses(data)
      if (res.errCode) {
        return
      }
      console.log('更新费用信息', res)
      let type = 6
      wx.navigateTo({
        url: `../successPage/main?type=${type}`
      })
    },

    async deletaFee () {
      // 发起请求
      const data = {
        id: this.feeId
      }
      let res = await this.$api.expenses.deleteExpenses(data)
      if (res.errCode) {
        return
      }
      console.log('删除费用信息', res)
      let type = 7
      wx.navigateTo({
        url: `../successPage/main?type=${type}`
      })
    },

    getFeeInfo () {
      console.log('this.feeInfo', this.feeInfo)
      let feeInfo = this.feeInfo
      this.feeId = feeInfo.id
      this.feeType = feeInfo.type
      this.typeStatus = feeInfo.type
      this.feeClassification = feeInfo.classification
      this.feeStatus = feeInfo.classification
      this.feeMoney = feeInfo.expenses
      this.moneyInput.msg = feeInfo.expenses
      this.feeDesc = feeInfo.description
      // 处理时间
      let date = feeInfo.expenseDate
      this.feeDate = this.$time.getTime(date)
      this.dateValue = this.$time.getTimeValue(date).slice(5)
    }
  },

  onLoad: function () {
    const { pageStatus } = this.$root.$mp.query
    if (pageStatus === '1') {
      this.pageStatus = pageStatus
    }
    // 时间
    const mydate = new Date()
    const today = this.$time.getTime(mydate)
    this.feeType = 0
    this.feeDate = today
    const time = this.$time.getTimeValue(mydate).slice(5)
    this.dateValue = time
    this.endTime = today
    this.getFeeInfo()
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

.fee_title {
  width: 100%;
}

.fee_money {
  margin-top: 30rpx;
}

.fee_sort {
  width: 690rpx;
  margin-top: 10rpx;
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

.line {
  width: 2rpx;
  height: 34rpx;
  border-radius: 4rpx;
  margin: 25rpx 20rpx 0 20rpx;
  background-color: #bfbfbf;
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
