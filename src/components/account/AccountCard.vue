<template>
  <div class="contain">
    <div class="account_module">
      <div :class="[account, 'accountColor' + item.color]"
        @longpress="longpress(index)" @click="toIndex(index)"
        v-for="(item, index) in accountItem" :key="index">
        <image v-if="item.openHistory === 1" class="account_sign" src="../../static/images/ic_sign.png" mode='aspectFill'/>
        <div class="account_name">{{ item.name }}</div>
      </div>
      <div class="account_add" @click="toAddAccount">
        <div class="account_name">添加账本</div>
      </div>
      <div v-if="emptyAccount" class="account_empty"></div>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  props: {
    accountItem: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      emptyAccount: false,
      // 固定
      account: 'account',
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
    ...mapActions('accountBook', [
      'vuexSetAccountBook'
    ]),

    longpress (index) {
      let accBook = this.accountItem[index]
      this.vuexSetAccountBook(accBook)
      wx.navigateTo({
        url: `../accountInfo/main`
      })
    },

    toIndex (index) {
      let accBook = this.accountItem[index]
      this.vuexSetAccountBook(accBook)
      wx.switchTab({
        url: `../index/main`
      })
    },

    toAddAccount () {
      wx.navigateTo({
        url: `../addAccount/main`
      })
    },

    showEmptyAccount () {
      // 判断是否显示空账本
      let accountItem = this.accountItem
      // 判断账本数量
      let accNo = accountItem.length + 1
      if (accNo % 2 !== 0) {
        this.emptyAccount = true
      }
    }
  },

  onShow () {
    if (this.accountItem) {
      // 判断是否显示空账本
      this.showEmptyAccount()
    }
  },

  onLoad () {
    // 判断是否显示空账本
    this.showEmptyAccount()
  },

  onUnload () {
  }
}
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #b2b2b2;
}

.account_module {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 600rpx;
}

.account {
  position: relative;
  height: 250rpx;
  width: 220rpx;
  color: white;
  border-radius: 10rpx;
  margin-bottom: 50rpx;
}
.accountColor0 {
  background-color: #FFCCCC;
}
.accountColor1 {
  background-color: #66CCCC;
}
.accountColor2 {
  background-color: #66CCFF;
}
.accountColor3 {
  background-color: #FF9966;
}
.accountColor4 {
  background-color: #99CCCC;
}
.accountColor5 {
  background-color: #99CCFF;
}
.accountColor6 {
  background-color: #CCCCFF;
}
.accountColor7 {
  background-color: #FFCC99;
}
.account_add {
  box-sizing: border-box;
  height: 250rpx;
  width: 220rpx;
  border: 2rpx solid #b2b2b2;
  border-radius: 10rpx;
  margin-bottom: 50rpx;
}
.account_empty {
  box-sizing: border-box;
  height: 250rpx;
  width: 220rpx;
  border-radius: 10rpx;
  margin-bottom: 50rpx;
}

.account_sign {
  position: absolute;
  top: 0%;
  left: 10%;
  width: 60rpx;
  height: 60rpx;
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

</style>
