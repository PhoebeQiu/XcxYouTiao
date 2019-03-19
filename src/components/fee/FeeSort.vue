<template>
  <div class="contain">

    <div class="item" @click="changeStatus(item.num)" v-for="(item, index) in feeSort" :key="index">
      <div :class="['fee_img', status === item.num ? item.selectImgStyle : '']">
        <image class="fee_icon" :src="[status === item.num ? item.fee_img : item.select_fee_img]" mode='aspectFill'/>
      </div>
      <span :class="['fee_span', status === item.num ? item.selectSpanStyle : '']">{{ item.title }}</span>
    </div>
    <div v-if="showNullItem === 0" class="item">
    </div>

  </div>
</template>

<script>
export default {
  props: {
    feeSort: {
      type: Array,
      required: true
    },
    feeStatus: {
      type: String,
      required: true
    },
    feeNullItem: {
      type: Number
    }
  },

  data () {
    return {
      status: 0,
      showNullItem: 0
    }
  },

  methods: {
    changeStatus (num) {
      if (this.status === num) {
        return
      }
      this.status = num
      this.$emit('changeClassificationStatus', num)
    }
  },

  onLoad () {
    this.status = this.feeStatus
    if (this.feeNullItem) {
      this.showNullItem = this.feeNullItem
    }
  },

  watch: {
    feeStatus () {
      this.status = this.feeStatus
    }
  },

  onUnload: function () {
    this.status = 0
    this.showNullItem = 0
  }
}
</script>

<style scoped>
.contain {
  display: flex;
  align-content: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  text-align: center;
  background-color: white;
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 120rpx;
  height: 140rpx;
  font-size: 20rpx;
  margin-bottom: 14rpx;
}

.fee_icon {
  width: 64rpx;
  height: 64rpx;
  padding-top: 6rpx;
}

.fee_img {
  width: 80rpx;
  height: 80rpx;
  border: 2rpx solid white;
  border-radius: 50%;
  margin-left: 18rpx;
}
.fee_img_red {
  border: 2rpx solid #de6f6f;
  border-radius: 50%;
}
.fee_img_yellow {
  border: 2rpx solid #ffdeb3;
  border-radius: 50%;
}

.fee_span {
  color: #000;
  margin-top: 10rpx;
}
.fee_span_red {
  color: #de6f6f;
}
.fee_span_yellow {
  color: #ffdeb3;
}
</style>
