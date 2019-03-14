<template>
  <div class="contain">

    <div :class="['bar', tab === 'index' ? 'bar-box' : '']" @click="changeBar('index')">
      <image class="img" src="../../static/images/ic_index.png" mode='aspectFill'/>
      <div class="text">首页</div>
    </div>

    <div :class="['bar', tab === 'chart' ? 'bar-box' : '']" @click="changeBar('chart')">
      <image class="img" src="../../static/images/ic_chart.png" mode='aspectFill'/>
      <div class="text">报表</div>
    </div>

    <div :class="['bar', tab === 'me' ? 'bar-box' : '']" @click="changeBar('me')">
      <image class="img" src="../../static/images/ic_me.png" mode='aspectFill'/>
      <div class="text">我的</div>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    tab () {
      return this.$root.$mp.page.route.split('/').slice(1, 2).pop()
    }
  },

  methods: {
    changeBar (page) {
      if (this.tab !== page) {
        wx.switchTab({
          url: `../${page}/main`
        })
      }
    }
  }

}
</script>

<style scoped>
.contain {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 120rpx;
  z-index: 9999;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #de6f6f;
}

.bar {
  box-sizing: border-box;
  padding-top: 10rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: .5;
}

.bar-box {
  opacity: 1;
  background-color: #e07a7a;
}

.img {
  width: 54rpx;
  height: 54rpx;
}

.text {
  font-size: 20rpx;
  color: #fff;
  margin-top: 6rpx;
}
</style>
