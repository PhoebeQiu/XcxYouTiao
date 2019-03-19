<template>
  <div class="contain">
    <div class="budget">
      <BudgetCard :budgetItem="budgetList" />
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
      console.log('所有预算res', res.data.result)
      let budgetData = res.data.result
      this.budgetList = budgetData.map(item => {
        return {
          id: item.id,
          budget: item.budget,
          warnMoney: item.warnMoney,
          classification: item.classification,
          beginTime: this.$time.getTime(this.$time.turnTime(item.beginTime)),
          endTime: this.$time.getTime(this.$time.turnTime(item.endTime))
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
