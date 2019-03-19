<template>
  <div class="contain">

    <div class="item">
      <div class="item_l">
        <span v-if="post.dotStatus === '1'" class="dot_r"></span>
        <span v-if="post.dotStatus !== '1'" class="dot_y"></span>
        <p class="item_name">{{post.title}}</p>
      </div>

      <div class="item_r">
        <input :maxlength="maxLength"
          :placeholder="placeholderMsg"
          placeholder-style="color: #eee"
          class="input_textarea"
          @blur="blurFocus"
          name="name"
          type="text"
          v-model="msg"/>
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
      msg: '',
      maxLength: 140,
      placeholderMsg: ''
    }
  },

  methods: {
    blurFocus () {
      if (!this.msg) {
        this.msg = ''
      }
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
.input_textarea {
  width: 340rpx;
  height: 40rpx;
  font-size: 26rpx;
  text-align: right;
}

</style>
