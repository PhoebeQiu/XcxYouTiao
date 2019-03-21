<template>
  <div class="contain">

    <div :class="[account_color, selectColor]">
      <p class="account_name">账本名称</p>
    </div>

    <div class="all_color">
      <div v-for="(item, index) in items" @click="toPage(index)" :key="index"  :class="[color, item.color]"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectColor: '',
      // 固定
      account_color: 'account_color',
      color: 'color',
      items: [
        {color: 'color0'},
        {color: 'color1'},
        {color: 'color2'},
        {color: 'color3'},
        {color: 'color4'},
        {color: 'color5'},
        {color: 'color6'},
        {color: 'color7'}
      ]
    }
  },

  methods: {
    toPage (index) {
      wx.setStorageSync('colorId', index)
      wx.navigateBack({
      })
    }
  },

  onLoad () {
    let colorId = wx.getStorageSync('colorId')
    let color = this.items[colorId].color
    this.selectColor = color
  },

  onUnload () {
    this.selectColor = 'color0'
  }
}
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #232323;
}

.account_color {
  height: 250rpx;
  width: 200rpx;
  color: white;
  border-radius: 20rpx;
  margin: 60rpx 0 60rpx 0;
}
.account_name {
  float:right;
  height: 250rpx;
  writing-mode: vertical-rl;
  font-size: 30rpx;
  letter-spacing: 8rpx;
  word-spacing: 8rpx;
  text-align: center;
  margin-right: 20rpx;
}

.all_color {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 680rpx;
}

.color {
  width: 140rpx;
  height: 80rpx;
  border-radius: 10rpx;
  margin-bottom: 30rpx;
}
.color0 {
  background-color: #FFCCCC;
}
.color1 {
  background-color: #66CCCC;
}
.color2 {
  background-color: #66CCFF;
}
.color3 {
  background-color: #FF9966;
}
.color4 {
  background-color: #99CCCC;
}
.color5 {
  background-color: #99CCFF;
}
.color6 {
  background-color: #CCCCFF;
}
.color7 {
  background-color: #FFCC99;
}

</style>
