<template>
  <div class="contain">

    <div class="item">
      <div class="item_l">
        <span v-if="post.dotStatus === '1'" class="dot_r"></span>
        <span v-if="post.dotStatus !== '1'" class="dot_y"></span>
        <p class="item_name">{{post.title}}</p>
      </div>

      <div class="item_rr">
        <input :maxlength="maxLength"
          :placeholder="placeholderMsg"
          placeholder-style="color: #eee"
          class="input_textarea"
          @blur="blurFocus"
          name="name"
          :password="showPassword"
          type="text"
          v-model="msg"/>
        <!-- password="false" -->
      </div>

      <image @click.stop="see" class="r_img" :src="[seeImg === 1 ? '../../static/images/ic_seeing.png' : '../../static/images/ic_see.png']" mode="aspectFill" />
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
      msg: '',
      maxLength: 140,
      placeholderMsg: '',
      // 1看， 0没看
      seeImg: 0,
      // false看， true没看
      showPassword: true
    }
  },

  methods: {
    see () {
      if (this.seeImg === 0) {
        this.seeImg = 1
        this.showPassword = false
      } else if (this.seeImg === 1) {
        this.seeImg = 0
        this.showPassword = true
      }
    },

    blurFocus () {
      this.showPassword = true
      this.seeImg = 0
      let options = {
        type: this.post.type,
        msg: this.msg
      }
      this.$emit('setInputValue', options)
    }
  },

  onLoad () {
    this.msg = ''
    this.msg = this.post.msg
    this.maxLength = this.post.maxLength ? this.post.maxLength : 140
    this.placeholderMsg = this.post.placeholderMsg ? this.post.placeholderMsg : ''
  },

  onShow () {
    if (this.post.msg) {
      this.msg = this.post.msg
    }
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
  position: relative;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 340rpx;
  height: 40rpx;
  margin-right: 30rpx;
}
.item_rr {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 340rpx;
  height: 40rpx;
  margin-right: 70rpx;
}
.input_textarea {
  width: 340rpx;
  height: 40rpx;
  font-size: 26rpx;
  text-align: right;
}

.r_img {
  width: 48rpx;
  height: 48rpx;
  position: absolute;
  right: 10rpx;
}

</style>
