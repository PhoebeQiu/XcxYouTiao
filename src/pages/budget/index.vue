<template>
  <div class="'wrap">
    <div class="budget">
      <BudgetCard :budgetItem="budgetList" />
    </div>

    <div class="btn" @click="toAddBudget">
      <WButton text="添加预算" size="big_btn" bgstyle="bgcolor_red" />
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import BudgetCard from '@/components/budget/BudgetCard'
import WButton from '@/components/WButton'

export default {
  data () {
    return {
      budgetList: {
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
    BudgetCard,
    WButton
  },

  methods: {

    toAddBudget () {
      wx.navigateTo({
        url: `../addBudget/main`
      })
    },

    async getBudgetList () {
      const data = {
        accountBookId: this.accountBook.id,
        pageNum: 1,
        pageSize: 10
      }
      let res = await this.$api.budget.getAllBudgetList(data)
      if (res.errCode) {
        return
      }
      console.log('所有预算res', res.data.result)
      if (res.data.result.length === 0) {
        wx.navigateBack({})
      }
      let budgetData = res.data.result
      // 处理总预算的classification
      for (let i = 0; i < budgetData.length; i++) {
        if (budgetData[i].classification === -1) {
          budgetData[i].classification = 9
        }
      }
      this.budgetList = budgetData.map(item => {
        return {
          id: item.id,
          budget: item.budget,
          warnMoney: item.warnMoney,
          classification: item.classification,
          beginTime: this.$time.getTime(this.$time.turnTime(item.beginTime)),
          endTime: this.$time.getTime(this.$time.turnTime(item.endTime)),
          spentMoney: item.spentMoney,
          remainMoney: (item.budget - item.spentMoney).toFixed(2),
          percent: ((item.budget - item.spentMoney) / item.budget) * 100,
          isWarn: (item.budget - item.spentMoney - item.warnMoney) > 0 ? 0 : 1
        }
      })
    }
  },

  onShow () {
    // 获取 预算列表
    this.getBudgetList()
  },

  onLoad () {
  }
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.budget {
  width: 690rpx;
  margin-bottom: 180rpx;
}

.btn {
  z-index: 3;
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
.mask {
  z-index: 2;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  background-color: white;
}
</style>
