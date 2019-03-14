<template>
  <div class="contain">
    <div class="fee_title">
      <FeeTitle @changeTypeStatus="changeTypeStatus" />
    </div>

    <div class="fee_money">
      <WInput :post="moneyInput" @setInputValue="setInputValue"/>
    </div>

    <div v-if="feeType === 0" class="fee_sort">
      <FeeSort :feeSort="inFeeSort" :feeStatus="feeStatus" />
    </div>
    <div v-if="feeType === 1" class="fee_sort">
      <FeeSort :feeSort="outFeeSort" :feeStatus="feeStatus" />
    </div>

    <div class="fee_other">
      <div class="fee_time">
        <image class="fee_time_img" src="../../static/images/ic_calendar_gray.png" mode="aspectFill" />
        <picker mode="date" start="2019-01-01" end="2022-01-01" @change="bindDateChange">
          {{ dateValue }}
        </picker>
      </div>
      <div class="line"></div>
      <div class="fee_desc">
        <image class="fee_desc_img" src="../../static/images/ic_write.png" mode="aspectFill" />
        <textarea placeholder="写点啥备注下"
          class="textarea"
          v-model="desc"
          placeholder-style="color: #bfbfbf"/>
      </div>
    </div>

    <div class="btn">
      <div @click="reAddFee">
        <WButton text="保存" size="small_btn" bgstyle="bgcolor_red" />
      </div>
      <div @click="addFee">
        <WButton text="删除" size="small_btn" bgstyle="border_red" />
      </div>
    </div>

  </div>
</template>

<script>
import WInput from '@/components/WInput'
import WButton from '@/components/WButton'
import FeeTitle from '@/components/fee/FeeTitle'
import FeeSort from '@/components/fee/FeeSort'

export default {
  data () {
    return {
      feeType: '',
      feeMoney: '',
      dateValue: '',
      // 组件
      feeStatus: '0',
      inFeeSort: [
        { num: '0',
          title: '工资',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_wage.png',
          select_fee_img: '../../static/images/incomeType/in_wage_gray.png'
        },
        { num: '1',
          title: '红包',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_redBag.png',
          select_fee_img: '../../static/images/incomeType/in_redBag_gray.png'
        },
        { num: '2',
          title: '生活费',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_livingExpense.png',
          select_fee_img: '../../static/images/incomeType/in_livingExpense_gray.png'
        },
        { num: '3',
          title: '奖金',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_bonus.png',
          select_fee_img: '../../static/images/incomeType/in_bonus_gray.png'
        },
        { num: '4',
          title: '报销',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_reimburse.png',
          select_fee_img: '../../static/images/incomeType/in_reimburse_gray.png'
        },
        { num: '5',
          title: '兼职',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_partTime.png',
          select_fee_img: '../../static/images/incomeType/in_partTime_gray.png'
        },
        { num: '6',
          title: '借入款',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_loan.png',
          select_fee_img: '../../static/images/incomeType/in_loan_gray.png'
        },
        { num: '7',
          title: '投资收益',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_income.png',
          select_fee_img: '../../static/images/incomeType/in_income_gray.png'
        },
        { num: '8',
          title: '其他收入',
          selectImgStyle: 'fee_img_red',
          selectSpanStyle: 'fee_span_red',
          fee_img: '../../static/images/incomeType/in_other.png',
          select_fee_img: '../../static/images/incomeType/in_other_gray.png'
        }
      ],
      outFeeSort: [
        { num: '0',
          title: '餐饮',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_food.png',
          select_fee_img: '../../static/images/outcomeType/out_food_gray.png'
        },
        { num: '1',
          title: '交通',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_traffic.png',
          select_fee_img: '../../static/images/outcomeType/out_traffic_gray.png'
        },
        { num: '2',
          title: '购物',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_shopping.png',
          select_fee_img: '../../static/images/outcomeType/out_shopping_gray.png'
        },
        { num: '3',
          title: '居住',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_live.png',
          select_fee_img: '../../static/images/outcomeType/out_live_gray.png'
        },
        { num: '4',
          title: '娱乐',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_recreation.png',
          select_fee_img: '../../static/images/outcomeType/out_recreation_gray.png'
        },
        { num: '5',
          title: '医疗',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_medical.png',
          select_fee_img: '../../static/images/outcomeType/out_medical_gray.png'
        },
        { num: '6',
          title: '教育',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_education.png',
          select_fee_img: '../../static/images/outcomeType/out_education_gray.png'
        },
        { num: '7',
          title: '人情',
          selectImgStyle: 'fee_img_yellow',
          selectSpanStyle: 'fee_span_yellow',
          fee_img: '../../static/images/outcomeType/out_human.png',
          select_fee_img: '../../static/images/outcomeType/out_human_gray.png'
        },
        { num: '8',
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

  components: {
    FeeTitle,
    WInput,
    FeeSort,
    WButton
  },

  methods: {
    initState () {
      this.feeType = ''
      this.feeMoney = ''
      this.moneyInput.msg = ''
      this.moneyInput.dotStatus = '1'
      this.moneyInput.placeholderMsg = '¥ 0.00'
    },

    changeTypeStatus (options) {
      let typeStatus = options
      console.log('费用类型：', options)
      this.feeType = typeStatus
      // 文本框
      if (typeStatus === 0) {
        this.moneyInput.dotStatus = '1'
      } else {
        this.moneyInput.dotStatus = '0'
      }
    },

    setInputValue (options) {
      // 账本金额
      if (options.type === 'feeMoney') {
        this.feeMoney = options.msg
      }
    },

    bindDateChange (e) {
      let date = e.mp.detail.value
      this.dateValue = date.slice(5)
    }
  },

  onLoad: function () {
    this.feeType = 0
    this.dateValue = '03-03'
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


<style scoped>

</style>
