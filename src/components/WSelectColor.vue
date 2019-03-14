<template>
  <div class="contain">
    <class class="item" @click="toAccountColor">
      <div class="item_l">
        <span v-if="post.dotStatus === '1'" class="dot_r"></span>
        <span v-if="post.dotStatus !== '1'" class="dot_y"></span>
        <p class="item_name">{{post.title}}</p>
      </div>
      <div class="item_r">
        <div :class="[item_color, 'color'+post.colorId]"></div>
        <image class="item_img" src="../../static/images/ic_right.png"/>
      </div>
    </class>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      // 固定
      item_color: 'item_color'
    }
  },

  methods: {
    toAccountColor () {
      wx.navigateTo({
        url: `../accountColor/main`
      })
    }
  }
}
</script>

<style scoped>
.contain {
  margin-bottom: 30rpx;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 690rpx;
  height: 100rpx;
}

.item_l{
  display: flex;
  align-items: center;
}
.dot_r {
  width: 24rpx;
  height: 24rpx;
  background-color: #de6f6f;
  border-radius: 50%;
  margin: 0 20rpx 0 30rpx;
}
.dot_y {
  width: 24rpx;
  height: 24rpx;
  background-color: #ffdeb3;
  border-radius: 50%;
  margin: 0 20rpx 0 30rpx;
}
.item_name {
  font-size: 28rpx;
  color: #b2b2b2;
}

.item_r {
  display: flex;
  align-items: center;
  height: 100rpx;
  margin-right: 30rpx;
}
.item_color {
  width: 100rpx;
  height: 60rpx;
  border-radius: 10rpx;
  margin-right: 10rpx;
}
.item_img {
  width: 48rpx;
  height: 48rpx;
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
