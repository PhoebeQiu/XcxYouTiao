
<template>
  <div class="contain">

    <div class="item">
      <div class="item_l">
        <span v-if="post.dotStatus === '1'" class="dot_r"></span>
        <span v-if="post.dotStatus !== '1'" class="dot_y"></span>
        <p class="item_name">{{post.title}}</p>
      </div>

      <div class="item_r">
        <picker mode="selector" :value="post.cycle" :range="cycleArray" @change="bindCycleChange">
          {{ cycleArray[post.cycle] }}
        </picker>
        <image class="item_r_img" src="../../static/images/ic_bottom.png" mode='aspectFill'/>
      </div>
    </div>

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
      dateMsg: '',
      cycleArray: ['每天', '每周', '每月']
    }
  },

  methods: {
    bindCycleChange (e) {
      let cycle = e.mp.detail.value
      let options = {
        type: this.post.type,
        msg: cycle
      }
      this.$emit('bindCycleChange', options)
    },

    getTime () {
    }
  },

  onLoad () {
    this.msg = ''
    this.msg = this.post.msg
    this.maxLength = this.post.maxLength ? this.post.maxLength : 140
    this.placeholderMsg = this.post.placeholderMsg ? this.post.placeholderMsg : ''
  },

  onUnload () {
    this.msg = ''
    this.maxLength = 140
    this.placeholderMsg = ''
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
  justify-content: center;
  width: 160rpx;
  height: 40rpx;
  font-size: 30rpx;
  margin-right: 10rpx;
}

.item_r_img {
  width: 40rpx;
  height: 40rpx;
  margin-left: 10rpx;
}

</style>
