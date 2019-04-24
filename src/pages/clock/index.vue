<template>
  <div class="contain">

    <div class="clock">
      <div class="clock_item" @click="toClockInfo(index)" v-for="(item, index) in clockList" :key="index">
        <div class="item_img">
          <image class="item_icon" src="../../static/images/ic_clock.png" mode='aspectFill'/>
        </div>
        <div class="item_word">
          <span class="item_name">{{ item.name}}</span>
          <p class="item_desc">{{ item.desc }}</p>
        </div>
        <image class="item_icon" @click.stop="changeClockStatus(index)" :src="item.status === 0 ? '../../static/images/ic_open.png' : '../../static/images/ic_close.png'" mode='aspectFill'/>
      </div>
    </div>

    <div class="btn" @click="toAddClock">
      <WButton text="添加记账提醒" size="big_btn" bgstyle="bgcolor_red" />
    </div>

  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'
import WButton from '@/components/WButton'
export default {
  data () {
    return {
      clockList: {}
      // 固定数据
    }
  },

  components: {
    WButton
  },

  methods: {
    ...mapActions('clock', [
      'vuexSetClockInfo'
    ]),

    async getClockItem () {
      const data = {}
      let res = await this.$api.clock.listClock(data)
      if (res.error) {
        return
      }
      console.log('记账提醒列表', res.data)
      this.clockList = res.data
    },

    toClockInfo (index) {
      let clock = this.clockList[index]
      const clockInfo = {
        id: clock.id,
        cycle: clock.cycle,
        name: clock.name,
        desc: clock.desc,
        status: clock.status,
        time: clock.time
      }
      this.vuexSetClockInfo(clockInfo)
      wx.navigateTo({
        url: `../clockInfo/main`
      })
    },

    async changeClockStatus (index) {
      let status = this.clockList[index].status
      // 0打开，1关闭
      if (status === 0) {
        status = 1
      } else if (status === 1) {
        status = 0
      }
      this.clockList[index].status = status
      const data = {
        id: this.clockList[index].id,
        status: status
      }
      let res = await this.$api.clock.updateClock(data)
      if (res.error) {
        return
      }
      console.log('开关记账提醒', res.data)
    },

    toAddClock () {
      wx.navigateTo({
        url: `../addClock/main`
      })
    }
  },

  onShow () {
    // 得到 记账提醒 列表
    this.getClockItem()
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
  font-family: PingFangSC;
  color: #232323;
  background-color: white;
}

.clock {
  margin-top: 60rpx;
  width: 690rpx;
  border-top: 0.5rpx solid #bfbfbf;
}

.clock_item {
  display: flex;
  align-items: center;
  height: 100rpx;
  padding: 10rpx 20rpx;
  border-bottom: 0.5rpx solid #bfbfbf;
}

.item_img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56rpx;
  height: 56rpx;
}
.item_icon {
  width: 56rpx;
  height: 56rpx;
}

.item_word {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 20rpx;
}
.item_name {
  font-size: 30rpx;
  margin-bottom: 6rpx;
}
.item_desc {
  font-size: 24rpx;
  color: #bfbfbf;
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
