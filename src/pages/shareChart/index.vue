<template>
  <div class="contain">

    <div class="user">
      <image class="user_img" :src="userInfo.avatarUrl" mode="aspectFill" />
      <div class="user_detail">
        <p class="user_name">
          <span>{{ userInfo.wxName }}</span>
        </p>
        <div class="user_desc">
          <span v-if="indexTypePicker === 0">{{ year }}年{{ month }}月的报表</span>
          <span v-if="indexTypePicker === 1">{{ month }}月的报表</span>
        </div>
      </div>
    </div>

    <div class="chart">
      <div>
        <p v-if="chartsData.length === 0" class="no_chart">这段时间没有记录任何费用~</p>
        <div v-if="chartsData.length !== 0" class="moon">
          <div class="chartOption">
            <div class="chartOption_item" @click="changeInOutType(0)">
              <image class="chartOption_item_img" mode='aspectFill'
              :src="inOutType === 0 ? '../../static/images/ic_selected.png' : '../../static/images/ic_select.png'" />
              <div class="chartOption_item_write">
                <span :class="inOutType === 0 ? 'chartOption_item_red' : ''">总支出</span>
                <p :class="inOutType === 0 ? 'chartOption_item_red' : ''">{{ totalOutExpenses }}</p>
              </div>
            </div>
            <div class="chartOption_item" @click="changeInOutType(1)">
              <image class="chartOption_item_img" mode='aspectFill'
              :src="inOutType === 1 ? '../../static/images/ic_selected.png' : '../../static/images/ic_select.png'" />
              <div class="chartOption_item_write">
                <span :class="inOutType === 1 ? 'chartOption_item_red' : ''">总收入</span>
                <p :class="inOutType === 1 ? 'chartOption_item_red' : ''">{{ totalInExpenses }}</p>
              </div>
            </div>
            <div class="chartOption_item" @click="changeInOutType(2)">
              <image class="chartOption_item_img" mode='aspectFill'
              :src="inOutType === 2 ? '../../static/images/ic_selected.png' : '../../static/images/ic_select.png'" />
              <div class="chartOption_item_write">
                <span :class="inOutType === 2 ? 'chartOption_item_red' : ''">总结余</span>
                <p :class="inOutType === 2 ? 'chartOption_item_red' : ''">{{ surplus }}</p>
              </div>
            </div>
          </div>
          <div class="echarts-wrap">
            <mpvue-echarts :echarts="echarts" :onInit="initChart"
              ref="echarts" disableTouch canvasId="chartMoon"
              />
          </div>
        </div>
      </div>

    </div>

    <div>
      <div v-if="listData"  class="datail">
        <div v-for="(item, index) in listData" :key="index" class="detail_item">
          <image class="detail_item_ic" :src="item.img" mode="aspectFill" />
          <p class="detail_item_name">{{ item.name }}</p>
          <p class="detail_item_percent">{{ item.percent }}</p>
          <p class="detail_item_value">{{ item.value }}</p>
          <image class="detail_item_arrow" src="../../static/images/ic_arrow.png" mode="aspectFill" />
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import * as echarts from 'echarts/dist/echarts.simple.min'
import mpvueEcharts from 'mpvue-echarts'

let moonChart

export default {
  components: {
    mpvueEcharts
  },

  data () {
    return {
      userInfo: {},
      accountBookId: 0,
      month: 0,
      year: 0,
      day: 0,
      // 判断月/年报表 0月，1年
      indexTypePicker: 0,
      // 报表的数据类型  0总支出，1总收入，2总结余
      inOutType: 0,
      // 固定
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
      ],
      inOutFeeSort: [
        {
          title: '总支出',
          fee_img: '../../static/images/outcomeType/out_total.png'
        },
        {
          title: '总收入',
          fee_img: '../../static/images/incomeType/in_total.png'
        }
      ],
      // 设置表格参数
      echarts,
      chartOption: null,
      // 表格所需数据
      chartsData: [],
      chartsAllData: [],
      chartsInData: [],
      chartsOutData: [],
      chartsSurplusData: [],
      totalInExpenses: 0,
      totalOutExpenses: 0,
      surplus: 0,
      // 列表显示数据
      listData: [],
      listAllData: [],
      listInData: [],
      listOutData: []
    }
  },

  methods: {
    initState () {
      this.inOutType = 0
      this.indexTypePicker = 0
    },

    // 饼图
    async getFeeChart () {
      // 请求：表格所需数据
      let data = {}
      if (this.indexTypePicker === 0) {
        data = {
          accountBookId: this.accountBookId,
          year: this.year,
          month: this.month
        }
      } else if (this.indexTypePicker === 1) {
        data = {
          accountBookId: this.accountBookId,
          year: this.year
        }
      }
      console.log('请求分享报表数据data', data)
      let res = await this.$api.expenses.getExpensesGroup(data)
      if (res.errCode) {
        return
      }
      console.log('请求报表数据', res.data)
      this.chartsAllData = res.data
      // 设置数据，总支出/总收入/总结余
      this.setInOutType()
      // 按照 0总支出，1总收入，2总结余，处理数据
      let tmpInOutType = this.inOutType
      if (tmpInOutType === 0) {
        this.chartsData = this.chartsOutData
        this.listData = this.listOutData
      } else if (tmpInOutType === 1) {
        this.chartsData = this.chartsInData
        this.listData = this.listInData
      } else if (tmpInOutType === 2) {
        this.chartsData = this.chartsSurplusData
        this.listData = this.listAllData
      }
      console.log('饼图chartsData', this.chartsData)
      this.setChartOption()
    },

    // 饼图，option配置
    setChartOption () {
      // 配置表格option项
      this.chartOption = {
        series: [
          {
            name: '费用报表',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                formatter: '{b} {d}%',
                color: '#232323',
                shadowBlur: 3,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: '#999'
              }
            },
            data: this.chartsData
          }
        ]
      }
      this.$refs.echarts.init()
    },

    // 饼图
    initChart (canvas, width, height) {
      // 加载表格
      moonChart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(moonChart)
      moonChart.setOption(this.chartOption)

      // 返回 chart 后可以自动绑定触摸操作
      return moonChart
    },

    // 饼图，设置数据，总支出/总收入/总结余
    setInOutType () {
      // 封装表格和列表需要的三个数据数组
      this.totalInExpenses = this.chartsAllData.totalInExpenses
      this.totalOutExpenses = this.chartsAllData.totalOutExpenses
      this.surplus = this.chartsAllData.surplus
      // 总支出
      let outCome = this.chartsAllData.outExpensesList
      this.chartsOutData = outCome.map(item => {
        return {
          value: item.total,
          name: this.outFeeSort[item.classification].title
        }
      })
      this.listOutData = outCome.map(item => {
        return {
          value: this.$wxApi.toMoney(item.total),
          percent: ((item.total / this.totalOutExpenses) * 100).toFixed(2) + '%',
          name: this.outFeeSort[item.classification].title,
          img: this.outFeeSort[item.classification].fee_img
        }
      })
      // 总收入
      let inCome = this.chartsAllData.inExpensesList
      this.chartsInData = inCome.map(item => {
        return {
          value: item.total,
          name: this.inFeeSort[item.classification].title
        }
      })
      this.listInData = inCome.map(item => {
        return {
          value: this.$wxApi.toMoney(item.total),
          percent: ((item.total / this.totalInExpenses) * 100).toFixed(2) + '%',
          name: this.inFeeSort[item.classification].title,
          img: this.inFeeSort[item.classification].fee_img
        }
      })
      // 总结余
      if (this.totalInExpenses !== 0 && this.totalOutExpenses !== 0) {
        this.chartsSurplusData = [
          { value: this.totalInExpenses, name: '总收入' },
          { value: this.totalOutExpenses, name: '总支出' }
        ]
        this.listAllData = [
          {
            value: this.$wxApi.toMoney(this.totalInExpenses),
            percent: ((this.totalInExpenses / (this.totalInExpenses + this.totalOutExpenses)) * 100).toFixed(2) + '%',
            name: this.inOutFeeSort[0].title,
            img: this.inOutFeeSort[0].fee_img
          },
          {
            value: this.$wxApi.toMoney(this.totalOutExpenses),
            percent: ((this.totalOutExpenses / (this.totalInExpenses + this.totalOutExpenses)) * 100).toFixed(2) + '%',
            name: this.inOutFeeSort[1].title,
            img: this.inOutFeeSort[1].fee_img
          }
        ]
      } else {
        this.chartsSurplusData = []
        this.listAllData = []
      }
    },

    // 饼图，修改表格显示的 总支出/总收入/总结余
    changeInOutType (num) {
      this.inOutType = num
      if (num === 0) {
        this.chartsData = this.chartsOutData
        this.listData = this.listOutData
      } else if (num === 1) {
        this.chartsData = this.chartsInData
        this.listData = this.listInData
      } else if (num === 2) {
        this.chartsData = this.chartsSurplusData
        this.listData = this.listAllData
      }
      this.setChartOption()
    },

    setTime () {
      const date = new Date()
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      this.day = d
    }
  },

  onShow () {
  },

  onLoad (options) {
    // 获取路由参数
    this.userInfo = JSON.parse(options.userInfo)
    this.accountBookId = options.accountBookId
    this.indexTypePicker = Number(options.indexTypePicker)
    this.year = options.year
    this.month = options.month
    this.setTime()
    // 加载报表数据
    this.getFeeChart()
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
  background-color: white;
  color: #232323;
}

.user {
  display: flex;
  justify-content: flex-start;
  width: 690rpx;
  padding: 12rpx 0 20rpx 60rpx;
  margin: 15rpx 0;
  box-shadow: 0 16px 32px -16px rgba(0, 0, 0, 0.1);
}
.user_img {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  margin-right: 60rpx;
}
.user_detail {
  flex: 1 0 auto;
}
.user_name {
  width: 400rpx;
  height: 48rpx;
  font-size: 34rpx;
  font-weight: 500;
  letter-spacing: 0.26rpx;
  margin-bottom: 5rpx;
  color: #b2b2b2;
}
.user_desc {
  height: 36rpx;
  width: 450rpx;
  font-size: 34rpx;
  letter-spacing: 0.2rpx;
  color: #b2b2b2;
}

.chart {
  width: 690rpx;
  height: 600rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30rpx;
  box-shadow: 0 32rpx 64rpx -32rpx rgba(0, 0, 0, 0.1);
  border: 2rpx solid #eeeeee;
  margin: 10rpx 0;
}
.no_chart {
  line-height: 600rpx;
  font-size: 34rpx;
  color: #b2b2b2;
}
.moonChart {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.chartOption {
  width: 690rpx;
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.chartOption_item {
  height: 100rpx;
  display: flex;
  align-items: center;
}
.chartOption_item_img {
  width: 36rpx;
  height: 36rpx;
  margin-right: 15rpx;
}
.chartOption_item_write {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80rpx;
}
.chartOption_item_write span {
  font-size: 24rpx;
  margin-bottom: 5rpx;
}
.chartOption_item_write p {
  font-size: 36rpx;
  letter-spacing: 0.2rpx;
  font-family: 'League Gothic';
}
.chartOption_item_red {
  color: #de6f6f;
}
.echarts-wrap {
  width: 690rpx;
  height: 460rpx;
  justify-content: center;
  align-items: center;
}

.datail {
  width: 690rpx;
  border-top: 2rpx solid #eeeeee;
  /* box-shadow: 0 32rpx 64rpx -32rpx rgba(0, 0, 0, 0.1); */
  margin: 20rpx 30rpx 28rpx 30rpx;
  display: flex;
  flex-direction: column;
}
.detail_item {
  display: flex;
  align-items: center;
  height: 100rpx;
  position: relative;
  font-size: 28rpx;
  letter-spacing: 0.2rpx;
}

.detail_item_name {
  width: 100rpx;
  flex: 1 0 auto;
}
.detail_item_percent {
  text-align: right;
  width: 110rpx;
  margin-right: 20rpx;
}
.detail_item_value {
  width: 200rpx;
  text-align: right
}

.detail_item_ic, .detail_item_arrow {
  width: 48rpx;
  height: 48rpx;
}
.detail_item_ic {
  margin: 0 20rpx 0 30rpx;
}
.detail_item_arrow {
  margin: 10rpx;
  /* background-color: tomato; */
}
.line {
  width: 650rpx;
  height: 2rpx;
  bottom: 0%;
  right: 0%;
  border-radius: 6rpx;
  background-color: #eee;
  position: absolute;
}
</style>
