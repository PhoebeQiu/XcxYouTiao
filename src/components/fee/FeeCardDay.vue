<template>
  <div class="contain">
    <div v-if="feeItem == false" class="no_fee">
      <p>这一天还没有记录过费用~</p>
    </div>

    <div v-if="feeItem" class="fee">

      <div v-for="(item, index) in feeItem" :key="index" >
        <div @click="toFeeInfo(item.id)" class="fee_detail">
          <p class="fee_time">{{ item.expenseDate }}</p>
          <div :class="['fee_img', item.type === 0 ? 'fee_icon_red' : 'fee_icon_yellow']">
            <image v-if="item.type === 0" class="fee_icon" :src="inFeeSort[item.classification].fee_img" mode='aspectFill'/>
            <image v-if="item.type === 1" class="fee_icon" :src="outFeeSort[item.classification].fee_img" mode='aspectFill'/>
          </div>
          <div class="fee_word">
            <span v-if="item.type === 0" class="fee_name">{{ inFeeSort[item.classification].title }}</span>
            <span v-if="item.type === 1" class="fee_name">{{ outFeeSort[item.classification].title }}</span>
            <p class="fee_desc">{{ item.description }}</p>
          </div>
          <p :class="['fee_money', item.type === 0 ? 'fee_money_red' : 'fee_money_yellow']">
            <span v-if="item.type === 0">+</span>
            <span v-if="item.type === 1">-</span>
            {{ item.expenses }}
          </p>
          <div class="line"></div>
        </div>
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

    async toFeeInfo (id) {
      console.log('费用id', id)
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

  onLoad () {
    console.log('feeItem', this.feeItem)
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

.no_fee {
  border-top: 2rpx solid #eee;
  border-radius: 6rpx;
  font-size: 30rpx;
  padding: 20rpx 30rpx;
  background-color: white;
  width: 690rpx;
  height: 95rpx;
  text-align: center;
}
.no_fee p {
  line-height: 100rpx;
  color: #b2b2b2;
}

.fee {
  border-top: 2rpx solid #eee;
  border-radius: 6rpx;
}

.fee_detail {
  position: relative;
  width: 690rpx;
  margin:0 30rpx;
  position: relative;
  display: flex;
  align-items: center;
  height: 120rpx;
  /* margin-bottom: 10rpx; */
}
.fee_time {
  color: #b2b2b2;
  font-size: 30rpx;
  margin-right: 40rpx;
}
.fee_img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56rpx;
  height: 56rpx;
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
  margin-left: 30rpx;
}
.fee_name {
  font-size: 34rpx;
  margin-bottom: 6rpx;
}
.fee_desc {
  font-size: 24rpx;
  color: #bfbfbf;
}
.fee_money {
  font-size: 38rpx;
  font-family: 'League Gothic';
  color: #de6f6f;
}
.fee_money_red {
  color: #de6f6f;
}
.fee_money_yellow {
  color: #ffdeb3;

}
.line {
  position: absolute;
  right: 0%;
  bottom: 5%;
  width: 570rpx;
  height: 2rpx;
  background-color: #eee;
  border-radius: 5rpx;
}
</style>
