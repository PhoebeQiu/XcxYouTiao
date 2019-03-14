<template>
  <div class="item">
    <p v-if="budgetItem.isBudgetToal === 0" class="item_title">月总预算</p>
    <p v-if="budgetItem.isBudgetToal === 1" class="item_title">月分类预算 </p>
    <span v-show="budgetItem.isBudgetType" class="item_type">{{ enpenseType[budgetItem.enpenseType] }}</span>
    <p class="item_time">{{ budgetItem.startTime }}--{{ budgetItem.endTime }}</p>
    <div class="progress">
      <progress stroke-width="40rpx" border-radius="25rpx" backgroundColor="#eeeeee"
      :activeColor="budgetItem.isBudgetToal === 0 ? '#de6f6f' : '#ffdeb3'" :percent="budgetItem.percent" />
      <div class="overMoney">剩余：3000.00</div>
    </div>
    <div class="item_money">
      <p class="item_money_out">已花：<span>{{ budgetItem.cost }}</span></p>
      <p class="item_money_plan">计划：<span>{{ budgetItem.budget }}</span></p>
    </div>
  </div>
</template>

<script>
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
  margin: 30rpx 0;
}
.item_type {
  font-size: 30rpx;
  margin-top: 10rpx;
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
