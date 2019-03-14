<template>
  <div class="contain">
    <div :class="['btn', size, bgstyle]">
      <p class="btn_title">{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    bgstyle: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.btn {
  box-sizing: border-box;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  font-size: 28rpx;
  border-radius: 15rpx;
}

.big_btn {
  width: 690rpx;
}
.small_btn {
  width: 330rpx;
}

.bgcolor_red {
  color: white;
  background-color: #de6f6f;
}
.bgcolor_gray {
  color: white;
  background-color: #eeeeee;
}
.border_red {
  color: #de6f6f;
  border: 4rpx solid #de6f6f;
}

</style>
