<template>
  <div class="contain">
    <div v-for="(item, index) in budgetItem" :key="index">
      <div @click="toBudgetInfo(index)" class="item">
        <p v-if="item.classification === 9" class="item_title">月总预算</p>
        <p v-if="item.classification !== 9" class="item_title">月分类预算 </p>
        <span v-if="item.classification !== 9" class="item_type">{{ enpenseType[item.classification] }}</span>
        <p class="item_time">{{ item.beginTime }}--{{ item.endTime }}</p>
        <div class="progress">
          <progress stroke-width="40rpx" border-radius="25rpx" backgroundColor="#dbdbdb"
          :activeColor="item.isWarn === 1 ? '#de6f6f' : '#ffdeb3'" :percent="item.percent" />
          <div class="overMoney">剩余：{{ item.remainMoney }}</div>
        </div>
        <div class="item_money">
          <p class="item_money_out">已花：<span>{{ item.spentMoney }}</span></p>
          <p class="item_money_plan">计划：<span>{{ item.budget }}</span></p>
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
    budgetItem: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      enpenseType: ['餐饮', '交通', '购物', '居住', '娱乐', '医疗', '教育', '人情', '其他支出']
    }
  },

  methods: {
    ...mapActions('budget', [
      'vuexSetBudgetInfo'
    ]),

    toBudgetInfo (index) {
      let budgetInfo = this.budgetItem[index]
      this.vuexSetBudgetInfo(budgetInfo)
      if (budgetInfo.classification === 9) {
        wx.navigateTo({
          url: `../totalBudgetInfo/main`
        })
      } else {
        wx.navigateTo({
          url: `../budgetInfo/main`
        })
      }
    }
  },

  onLoad () {
  }
}
</script>

<style scoped>
.item {
  margin-top: 30rpx;
  display: flex;
  flex-direction: column;
  border: 2rpx solid #eee;
  border-radius: 15rpx;
  background-color: white;
  padding: 0 10rpx;
  box-shadow: 0 32rpx 64rpx -32rpx rgba(0, 0, 0, 0.1)
}

.item_title {
  text-align: center;
  font-size: 34rpx;
  letter-spacing: 0.2rpx;
  margin-top: 30rpx;
  margin-bottom: 10rpx;
}
.item_type {
  font-size: 30rpx;
}
.item_time {
  font-size: 30rpx;
  color: #b2b2b2;
  margin: 20rpx 0;
}
.progress {
  display: flex;
  justify-content: center;
}
progress {
  width: 630rpx;
  position: relative;
}
.overMoney {
  position: absolute;
  font-size: 30rpx;
  color: white;
}
.item_money {
  display: flex;
  justify-content: space-between;
  font-size: 30rpx;
  margin: 20rpx 0 30rpx 0;
}
.item_money span {
  font-family: 'League Gothic';
  font-size: 34rpx;
  letter-spacing: 0.2rpx;
}
</style>
