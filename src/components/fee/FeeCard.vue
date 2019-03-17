<template>
  <div class="contain">

    <div v-for="(item, index) in dayItem" :key="index" class="fee">
      <div class="line"></div>
      <div class="fee_day">{{ item }}</div>

      <div v-if="feeItem[index]">
        <div v-for="(item2, index2) in feeItem[index]" :key="index2" >
          <div @click="toFeeInfo(item2.id)" class="fee_detail">
            <div class="line_small"></div>
            <div :class="['fee_img', item2.type === 0 ? 'fee_icon_red' : 'fee_icon_yellow']">
              <image v-if="item2.type === 0" class="fee_icon" :src="inFeeSort[item2.classification].fee_img" mode='aspectFill'/>
              <image v-if="item2.type === 1" class="fee_icon" :src="outFeeSort[item2.classification].fee_img" mode='aspectFill'/>
            </div>
            <div class="fee_word">
              <span v-if="item2.type === 0" class="fee_name">{{ inFeeSort[item2.classification].title }}</span>
              <span v-if="item2.type === 1" class="fee_name">{{ outFeeSort[item2.classification].title }}</span>
              <p class="fee_desc">{{ item2.description }}</p>
            </div>
            <p :class="['fee_money', item2.type === 0 ? 'fee_money_red' : 'fee_money_yellow']">
              <span v-if="item2.type === 0">+</span>
              <span v-if="item2.type === 1">-</span>
              {{ item2.expenses }}
            </p>
          </div>
        </div>
      </div>

      <div class="fee_no" v-if="feeItem[index] == false" >
        <div class="line_small"></div>
        <p class="no_fee">该天没有费用～</p>
      </div>
    </div>

  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  props: {
    feeItem: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      dayItem: [],
      // 固定数据
      inFeeSort: [
        {
          title: '工资',
          fee_img: '../../static/images/incomeType/in_wage.png'
        },
        {
          title: '红包',
          fee_img: '../../static/images/incomeType/in_redBag.png'
        },
        {
          title: '生活费',
          fee_img: '../../static/images/incomeType/in_livingExpense.png'
        },
        {
          title: '奖金',
          fee_img: '../../static/images/incomeType/in_bonus.png'
        },
        {
          title: '报销',
          fee_img: '../../static/images/incomeType/in_reimburse.png'
        },
        {
          title: '兼职',
          fee_img: '../../static/images/incomeType/in_partTime.png'
        },
        {
          title: '借入款',
          fee_img: '../../static/images/incomeType/in_loan.png'
        },
        {
          title: '投资收益',
          fee_img: '../../static/images/incomeType/in_income.png'
        },
        {
          title: '其他收入',
          fee_img: '../../static/images/incomeType/in_other.png'
        }
      ],
      outFeeSort: [
        {
          title: '餐饮',
          fee_img: '../../static/images/outcomeType/out_food.png'
        },
        {
          title: '交通',
          fee_img: '../../static/images/outcomeType/out_traffic.png'
        },
        {
          title: '购物',
          fee_img: '../../static/images/outcomeType/out_shopping.png'
        },
        {
          title: '居住',
          fee_img: '../../static/images/outcomeType/out_live.png'
        },
        {
          title: '娱乐',
          fee_img: '../../static/images/outcomeType/out_recreation.png'
        },
        {
          title: '医疗',
          fee_img: '../../static/images/outcomeType/out_medical.png'
        },
        {
          title: '教育',
          fee_img: '../../static/images/outcomeType/out_education.png'
        },
        {
          title: '人情',
          fee_img: '../../static/images/outcomeType/out_human.png'
        },
        {
          title: '其他支出',
          fee_img: '../../static/images/outcomeType/out_other.png'
        }
      ]
    }
  },

  methods: {
    ...mapActions('feeInfo', [
      'vuexSetFeeInfo'
    ]),

    // 得到最近几天的时间列表
    getWeekTime () {
      const date = new Date()
      const month = date.getMonth() + 1
      for (let i = 0; i < 7; i++) {
        let day = date.getDate() - i
        let temp = `${month}月${day}号`
        this.dayItem.push(temp)
      }
    },

    async toFeeInfo (id) {
      const data = {
        id: id
      }
      let res = await this.$api.expenses.getExpensesById(data)
      if (res.error) {
        return
      }
      console.log('费用详细信息', res.data)
      const feeInfo = {
        id: res.data.id,
        budgetId: res.data.budgetId,
        classification: res.data.classification,
        description: res.data.description,
        expenseDate: res.data.expenseDate,
        expenses: res.data.expenses,
        type: res.data.type
      }
      this.vuexSetFeeInfo(feeInfo)
      wx.navigateTo({
        url: `../feeInfo/main`
      })
    }

  },

  onShow () {
  },

  onLoad () {
    // 得到最近几天的时间列表
    this.getWeekTime()
  }
}
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: PingFangSC;
  color: #232323;
}

.fee {
  width: 630rpx;
}

.line {
  height: 2rpx;
  background-color: #eeeeee;
  border-radius: 6rpx;
  margin-top: 12rpx;
}
.fee_day {
  font-size: 32rpx;
  font-weight: 500;
  padding-top: 22rpx;
  padding-bottom: 10rpx;
}

.fee_detail {
  position: relative;
  display: flex;
  align-items: center;
  height: 100rpx;
  padding-left: 120rpx;
  /* padding-bottom: 10rpx; */
  padding-top: 10rpx;
}

.fee_img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56rpx;
  height: 56rpx;
  margin:0 20rpx;
}
.fee_icon {
  width: 48rpx;
  height: 48rpx;
}
.fee_icon_red {
  border: 2rpx solid #de6f6f;
  border-radius: 50%;
}
.fee_icon_yellow {
  border: 2rpx solid #ffdeb3;
  border-radius: 50%;
}

.fee_word {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.fee_name {
  font-size: 30rpx;
}
.fee_desc {
  font-size: 24rpx;
  color: #bfbfbf;
}
.fee_money {
  font-size: 38rpx;
  font-family: 'League Gothic';
}
.fee_money_red {
  color: #de6f6f;
}
.fee_money_yellow {
  color: #ffdeb3;
}

.line_small {
  position: absolute;
  right: 0%;
  top: 0%;
  width: 500rpx;
  height: 2rpx;
  background-color: #eee;
  border-radius: 5rpx;
}

.fee_no {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100rpx;
  padding-left: 130rpx;
}
.no_fee {
  font-size: 30rpx;
  color: #bfbfbf;
  display: flex;
  align-items: center;
  padding-top: 10rpx;
  height: 60rpx;
}
</style>
