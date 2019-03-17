<template>
  <div class="contain">
    <div class="budget">
      <BudgetCard :budgetItem="budgetItem" />
    </div>

    <div class="btn" @click="toAddBudget">
      <WButton text="添加预算" size="big_btn" bgstyle="bgcolor_red" />
    </div>
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
      budgetItem: {
        isBudgetToal: 1,
        isBudgetType: true,
        percent: 60,
        startTime: '2019.03.01',
        endTime: '2019.03.31',
        budget: 5000.00,
        cost: 2000.00,
        enpenseType: 4
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
      console.log('所有预算data', data)
      let res = await this.$api.budget.getAllBudgetList(data)
      console.log('所有预算res', res)
    }
  },

  onLoad () {
    // 获取时间
    this.getBudgetList()
  }
}
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.budget {
  width: 690rpx;
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
