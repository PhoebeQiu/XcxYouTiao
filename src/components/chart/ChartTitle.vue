<template>
  <div class="title-box">
    <div class="title-item" @click="changeStatus(0)">
      <span :class="[ status === 0 ? 'title-text' : '']">饼图</span>
      <span :class="[ status === 0 ? 'item-border' : 'item-border-c']"></span>
    </div>
    <div class="title-item" @click="changeStatus(1)">
      <span :class="[ status === 1 ? 'title-text' : '']">折线图</span>
      <span :class="[ status === 1 ? 'item-border' : 'item-border-c']"></span>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  data () {
    return {
      status: 0
    }
  },

  methods: {
    changeStatus (status) {
      if (this.status === status) {
        return
      }
      this.status = status
      this.$emit('changeTypeStatus', status)
    },

    initstate () {
      this.status = 0
    }
  },

  onLoad () {
    this.initstate()
  }
}
</script>

<style scoped>
.title-box {
  width: 100%;
  height: 76rpx;
  display: flex;
  /* justify-content: space-evenly; */
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  /* box-shadow: 0 8rpx 16rpx -8rpx rgba(30, 40, 50, 0.1) */
}

.title-item {
  /* flex: 1; */
  font-size: 30rpx;
  font-weight: 500;
  color: #b2b2b2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-text {
  color: #e07a7a;
}

.item-border {
  width: 160rpx;
  height: 4rpx;
  background-color: #e07a7a;
  border-radius: 2rpx;
  margin-top: 6rpx;
  transition: all .5s ease;
}
.item-border-c {
  width: 160rpx;
  height: 4rpx;
  margin-top: 6rpx;
  background-color: #fff;
}
</style>
