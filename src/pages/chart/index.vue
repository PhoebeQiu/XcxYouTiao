<template>
  <div class="contain">

    <div class="title">
      <ChartTitle @changeTypeStatus="changeTypeStatus" />
    </div>

    <div class="time">
      <div class="time_item">
        <div class="time_item_title">
          <picker @change="TypePickerChange" :value="indexTypePicker" :range="TypePickerArray">
            {{ TypePickerArray[indexTypePicker] }}
          </picker>
          <image class="time_item_img" src="../../static/images/ic_bottom.png" mode='aspectFill'/>
        </div>
        <div v-if="indexTypePicker === 1" class="time_item_select">
          <picker mode="date" start="2018" end="2019" fields="year" @change="bindYearTimeChange">
            {{ yearTime }}
          </picker>
          <image class="time_item_img2" src="../../static/images/ic_bottom.png" mode='aspectFill'/>
        </div>
        <div v-if="indexTypePicker === 0" class="time_item_select">
          <picker mode="date" start="2018-01" :end="endMonthTime" fields="month" @change="bindMonthTimeChange">
            {{ monthTime }}
          </picker>
          <image class="time_item_img2" src="../../static/images/ic_bottom.png" mode='aspectFill'/>
        </div>
      </div>
    </div>

    <div class="chart">
      <div v-if="ChartsType === 0">
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
        <div>
          <p v-if="chartsData.length === 0" class="no_chart">没有记录任何费用~</p>
          <div v-if="chartsData.length !== 0" class="moon">
            <div class="echarts-wrap">
              <mpvue-echarts :echarts="echarts" :onInit="initChart"
                ref="echarts" disableTouch canvasId="chartMoon"
                />
            </div>
            <div class="export">
              <image @click="exportExcel" class="export_excel" src="../../static/images/ic_excel.png" mode='aspectFill'/>
              <label for="share">
                <image class="export_share" src="../../static/images/ic_share.png" mode='aspectFill'/>
              </label>
              <button class="btn" id="share" open-type="share">
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="ChartsType === 1">
        <div class="chartOption">
          <div class="chartOption_item" @click="changeBrokenInOutType(0)">
            <image class="chartOption_item_img" mode='aspectFill'
            :src="inOutBrokenType === 0 ? '../../static/images/ic_selected.png' : '../../static/images/ic_select.png'" />
            <div class="chartOption_item_write">
              <span :class="inOutBrokenType === 0 ? 'chartOption_item_red' : ''">总支出</span>
            </div>
          </div>
          <div class="chartOption_item" @click="changeBrokenInOutType(1)">
            <image class="chartOption_item_img" mode='aspectFill'
            :src="inOutBrokenType === 1 ? '../../static/images/ic_selected.png' : '../../static/images/ic_select.png'" />
            <div class="chartOption_item_write">
              <span :class="inOutBrokenType === 1 ? 'chartOption_item_red' : ''">总收入</span>
            </div>
          </div>
          <div class="chartOption_item" @click="changeBrokenInOutType(2)">
            <image class="chartOption_item_img" mode='aspectFill'
            :src="inOutBrokenType === 2 ? '../../static/images/ic_selected.png' : '../../static/images/ic_select.png'" />
            <div class="chartOption_item_write">
              <span :class="inOutBrokenType === 2 ? 'chartOption_item_red' : ''">总结余</span>
            </div>
          </div>
        </div>
        <div>
          <p v-if="brokenChartsData.length === 0" class="no_chart">没有记录任何费用~</p>
          <div v-if="brokenChartsData.length !== 0" class="broken">
            <div class="echarts-wrap">
              <mpvue-echarts :echarts="echarts" :onInit="initBrokenChart"
                ref="echarts" canvasId="chartBroken"
                />
            </div>
          </div>
        </div>
      </div>

    </div>

    <div v-if="ChartsType === 0">
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

    <WTabBar/>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import WTabBar from '@/components/TabBar'
import ChartTitle from '@/components/chart/ChartTitle'

import * as echarts from 'echarts/dist/echarts.simple.min'
import mpvueEcharts from 'mpvue-echarts'

let moonChart, brokenChart

export default {
  components: {
    WTabBar,
    mpvueEcharts,
    ChartTitle
  },

  data () {
    return {
      month: 0,
      year: 0,
      day: 0,
      // 选择月/年报表 0月，1年
      indexTypePicker: 0,
      monthTime: 0,
      yearTime: 0,
      endMonthTime: 0,
      // 报表的显示类型 0饼图,1折线图
      ChartsType: 0,
      // 报表的数据类型  0总支出，1总收入，2总结余
      inOutType: 0,
      // 折线图报表的数据类型  0总支出，1总收入，2总结余
      inOutBrokenType: 0,
      // 固定
      TypePickerArray: ['月报表', '年报表'],
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
      chartBrokenOption: null,
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
      listOutData: [],
      // 折线图所需数据
      brokenDate: 0,
      brokenInterval: 0,
      // 表格所需数据
      brokenChartsData: [],
      brokenChartsDate: [],
      brokenChartsAllData: [],
      brokenChartsInData: [],
      brokenChartsOutData: [],
      brokenChartsSurplusData: []
    }
  },

  computed: {
    ...mapGetters('accountBook', [
      'vuexGetAccountBook'
    ]),

    ...mapGetters('user', [
      'vuexGetUserInfo'
    ]),

    // 获取userInfo数据
    userInfo () {
      let userInfo = this.vuexGetUserInfo
      return userInfo
    },

    // 获取userInfo数据
    accountBook () {
      let accountBook = this.vuexGetAccountBook
      return accountBook
    }
  },

  onShareAppMessage: function () {
    let userInfo = JSON.stringify(this.userInfo)
    const t = {
      title: `${this.userInfo.wxName}分享了费用报表`,
      path: `/pages/shareChart/main?&accountBookId=${this.accountBook.id}&userInfo=${userInfo}&year=${this.year}&month=${this.month}&indexTypePicker=${this.indexTypePicker}`,
      imageUrl: '../../static/images/ic_bground.png'
    }
    return t
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
          accountBookId: this.accountBook.id,
          year: this.year,
          month: this.month
        }
      } else if (this.indexTypePicker === 1) {
        data = {
          accountBookId: this.accountBook.id,
          year: this.year
        }
      }
      console.log('请求表格数据data', data)
      let res = await this.$api.expenses.getExpensesGroup(data)
      if (res.errCode) {
        return
      }
      console.log('请求表格数据', res.data)
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
      if (this.totalInExpenses !== 0 || this.totalOutExpenses !== 0) {
        this.chartsSurplusData = [
          { value: this.totalInExpenses, name: '总收入' },
          { value: this.totalOutExpenses, name: '总支出' }
        ]
        this.listAllData = [
          {
            value: this.$wxApi.toMoney(this.totalInExpenses),
            percent: ((this.totalInExpenses / (this.totalInExpenses + this.totalOutExpenses)) * 100).toFixed(2) + '%',
            name: this.inOutFeeSort[1].title,
            img: this.inOutFeeSort[1].fee_img
          },
          {
            value: this.$wxApi.toMoney(this.totalOutExpenses),
            percent: ((this.totalOutExpenses / (this.totalInExpenses + this.totalOutExpenses)) * 100).toFixed(2) + '%',
            name: this.inOutFeeSort[0].title,
            img: this.inOutFeeSort[0].fee_img
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

    // 折线图
    async getBrokenFeeChart () {
      // 请求：某区间内的（收入、支出、结余）
      // 得到时分秒
      const Second = new Date()
      const SecondTime = this.$time.formatTime(Second)
      const time = `${this.brokenDate} ${SecondTime}`
      // 时间转化为时间戳
      let date = this.$time.turnTimeStamp(time)
      // 请求：所需数据
      const data = {
        accountBookId: this.accountBook.id,
        date: date,
        interval: this.brokenInterval
      }
      console.log('请求折线图表格数据data', data)
      let res = await this.$api.expenses.showExpensesTrendBetweenInterval(data)
      if (res.errCode) {
        return
      }
      console.log('请求折线图表格数据', res.data)
      this.brokenChartsAllData = res.data
      // 设置数据，总支出/总收入/总结余
      this.setBrokenInOutType()
      // 按照 0总支出，1总收入，2总结余，处理数据
      let tmpinOutBrokenType = this.inOutBrokenType
      if (tmpinOutBrokenType === 0) {
        this.brokenChartsData = this.brokenChartsOutData
      } else if (tmpinOutBrokenType === 1) {
        this.brokenChartsData = this.brokenChartsInData
      } else if (tmpinOutBrokenType === 2) {
        this.brokenChartsData = this.brokenChartsSurplusData
      }
      this.setBrokenChartOption()
    },

    // 折线图，设置数据，总支出/总收入/总结余
    setBrokenInOutType () {
      // brokenChartsData: [],
      // 封装表格需要的四个数据数组
      // 时间，总支出
      let outCome = this.brokenChartsAllData.outExpenses
      this.brokenChartsDate = []
      if (this.indexTypePicker === 0) {
        outCome.forEach(element => {
          this.brokenChartsDate.push(element.date)
        })
      } else if (this.indexTypePicker === 1) {
        outCome.forEach(element => {
          this.brokenChartsDate.push(element.date.slice(0, 7))
        })
      }
      this.brokenChartsOutData = []
      outCome.forEach(element => {
        this.brokenChartsOutData.push(element.number)
      })
      // 总收入
      let inCome = this.brokenChartsAllData.inExpenses
      this.brokenChartsInData = []
      inCome.forEach(element => {
        this.brokenChartsInData.push(element.number)
      })
      // 总结余
      let surplus = this.brokenChartsAllData.surplus
      this.brokenChartsSurplusData = []
      surplus.forEach(element => {
        this.brokenChartsSurplusData.push(element.number)
      })
    },

    // 折线图,修改表格显示的 总支出/总收入/总结余
    changeBrokenInOutType (num) {
      this.inOutBrokenType = num
      if (num === 0) {
        this.brokenChartsData = this.brokenChartsOutData
      } else if (num === 1) {
        this.brokenChartsData = this.brokenChartsInData
      } else if (num === 2) {
        this.brokenChartsData = this.brokenChartsSurplusData
      }
      this.setBrokenChartOption()
    },

    // 折线图，option配置
    setBrokenChartOption () {
      console.log('折线图brokenChartsDate', this.brokenChartsDate)
      console.log('折线图brokenChartsData000', this.brokenChartsData)
      // 配置表格option项
      this.chartBrokenOption = {
        visualMap: {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 500
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: this.brokenChartsDate
        },
        yAxis: {
          splitLine: {show: false}
        },
        grid: [{
          bottom: '20%',
          left: '20%',
          right: '10%'
        }],
        series: [{
          type: 'line',
          showSymbol: false,
          data: this.brokenChartsData
        }]
      }
      this.$refs.echarts.init()
    },

    // 折线图
    initBrokenChart (canvas, width, height) {
      // 加载表格
      brokenChart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(brokenChart)
      brokenChart.setOption(this.chartBrokenOption)

      // 返回 chart 后可以自动绑定触摸操作
      return brokenChart
    },

    // 修改表格的图型
    changeTypeStatus (options) {
      let typeStatus = options
      this.ChartsType = typeStatus
      // ChartsType,折线图设置
      if (typeStatus === 0) {
        console.log('饼图')
        this.brokenChartsData = []
        this.brokenChartsDate = []
        this.getFeeChart()
      } else if (typeStatus === 1) {
        this.chartsData = []
        this.getBrokenFeeChart()
      }
    },

    // 修改 0月/1年报表
    TypePickerChange (e) {
      if (e.mp.detail.value === '0') {
        this.indexTypePicker = 0
        const date = new Date()
        this.month = date.getMonth() + 1
        this.brokenInterval = 2
        if (this.ChartsType === 0) {
          this.getFeeChart()
        } else if (this.ChartsType === 1) {
          this.getBrokenFeeChart()
        }
      } else if (e.mp.detail.value === '1') {
        this.indexTypePicker = 1
        this.month = 0
        this.brokenInterval = 1
        if (this.ChartsType === 0) {
          this.getFeeChart()
        } else if (this.ChartsType === 1) {
          this.getBrokenFeeChart()
        }
      }
    },

    // 选择 哪个月
    bindMonthTimeChange (e) {
      let date = e.mp.detail.value
      this.year = date.slice(0, 4)
      this.month = date.slice(5)
      let y = date.slice(0, 4)
      let m = date.slice(5)
      this.monthTime = `${y}年${m}月`
      if (this.ChartsType === 0) {
        this.getFeeChart()
      } else if (this.ChartsType === 1) {
        let date = e.mp.detail.value
        this.brokenDate = `${date}-${this.day}`
        console.log('选择月', this.brokenDate)
        this.getBrokenFeeChart()
      }
    },

    // 选择 哪一年
    bindYearTimeChange (e) {
      let date = e.mp.detail.value
      this.year = date
      this.yearTime = `${date}年`
      if (this.ChartsType === 0) {
        this.getFeeChart()
      } else if (this.ChartsType === 1) {
        let date = e.mp.detail.value
        const dateTmp = new Date()
        let m = dateTmp.getMonth() + 1
        this.brokenDate = `${date}-${m}-${this.day}`
        console.log('选择年', this.brokenDate)
        this.getBrokenFeeChart()
      }
    },

    // 导出Excel文件
    async exportExcel () {
      // 处理时间
      const dateTmp = new Date()
      let y = this.year
      let m = this.month
      if (m === 0) {
        m = dateTmp.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
      }
      let d = dateTmp.getDate()
      d = d < 10 ? ('0' + d) : d
      const Second = new Date()
      const SecondTime = this.$time.formatTime(Second)
      const time = `${y}-${m}-${d} ${SecondTime}`
      let date = this.$time.turnTimeStamp(time)
      // 处理 年/月报表
      let intervalTmp = this.indexTypePicker
      if (intervalTmp === 0) {
        intervalTmp = 2
      } else if (intervalTmp === 1) {
        intervalTmp = 1
      }
      // http://192.168.8.39:9090
      // http://120.77.86.76:9090
      let url = 'http://120.77.86.76:9090/expenses/exportExcel?accountBookId=' +
      this.accountBook.id + '&date=' + date + '&interval=' + intervalTmp
      wx.downloadFile({
        url: url,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success: (res) => {
          console.log('下载res', res)
          if (res.statusCode === 200) {
            console.log('文件下载后地址', res.tempFilePath)
            wx.saveFile({
              tempFilePath: res.tempFilePath,
              success: (res) => {
                console.log('保存res', res)
                var savedFilePath = res.savedFilePath
                console.log('文件已下载到' + savedFilePath)
                // 查看下载的文件列表
                wx.getSavedFileList({
                  success: (res) => {
                    console.log('查看文件列表res', res.fileList)
                  }
                })
                // 打开文档
                wx.openDocument({
                  filePath: savedFilePath,
                  fileType: 'xlsx',
                  success: (res) => {
                    console.log('打开文档成功', res)
                  },
                  fail: (res) => {
                    console.log('打开文档失败', res)
                  }
                })
              }
            })
          }
        },
        fail: (res) => {
          console.log('文件下载失败res', res)
        }
      })
    },

    setTime () {
      const date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let time = this.$time.getTime(date)
      this.endMonthTime = time.slice(0, 7)
      this.year = y
      this.month = m
      this.day = d
      // 设置，饼图日期
      this.monthTime = `${y}年${m}月`
      this.yearTime = `${y}年`
      // 设置，折线图日期
      this.brokenDate = time
      this.brokenInterval = 2
    }
  },

  onShow () {
    wx.hideTabBar()
  },

  onLoad () {
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

.time {
  margin: 10rpx 0;
}

.time_item {
  width: 690rpx;
  height: 100rpx;
  position: relative;
  font-size: 30rpx;
}
.time_item_title {
  position: absolute;
  top: 20%;
  left: 25%;
  width: 160rpx;
  height: 60rpx;
  border: 2rpx solid #eee;
  border-radius: 18rpx;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.time_item_img {
  width: 36rpx;
  height: 36rpx;
}
.time_item_select {
  position: absolute;
  top: 20%;
  left: 55%;
  height: 60rpx;
  line-height: 60rpx;
  color: #de6f6f;
  border-bottom: 2rpx solid #eee;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.time_item_img2 {
  width: 36rpx;
  height: 36rpx;
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
  position: relative;
}
.no_chart {
  line-height: 460rpx;
  text-align: center;
  font-size: 34rpx;
  color: #b2b2b2;
}
.moon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.broken {
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
.export {
  position: absolute;
  bottom: 0%;
  right: 2%;
}
.export_share, .export_excel {
  width: 48rpx;
  height: 48rpx;
}
.export_share {
  margin-left: 20rpx;
  /* margin-bottom: 2rpx; */
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
