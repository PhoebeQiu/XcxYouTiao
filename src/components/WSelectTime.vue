<template>
  <div class="contain">

    <div class="item">
      <div class="item_l">
        <span v-if="post.dotStatus === '1'" class="dot_r"></span>
        <span v-if="post.dotStatus !== '1'" class="dot_y"></span>
        <p class="item_name">{{post.title}}</p>
      </div>

      <div class="item_r">
        <picker mode="date" :start="pickerStartTime" :end="pickerEndTime"
          :value="post.date" @change="bindDateChange">
          {{ post.time }}
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
      // 时间选择限制时间
      pickerStartTime: '',
      pickerEndTime: ''
    }
  },

  methods: {

    bindDateChange (e) {
      let date = e.mp.detail.value
      let options = {
        type: this.post.type,
        msg: date
      }
      this.$emit('bindDateChange', options)
    },

    getTime () {
      // 获取时间
      const date = new Date()
      this.pickerStartTime = this.$time.getFirstTime(date)
      this.pickerEndTime = this.$time.getLastTime(date)
    }
  },

  onLoad () {
    this.msg = ''
    this.msg = this.post.msg
    this.maxLength = this.post.maxLength ? this.post.maxLength : 140
    this.placeholderMsg = this.post.placeholderMsg ? this.post.placeholderMsg : ''
    // 获取时间
    this.getTime()
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
