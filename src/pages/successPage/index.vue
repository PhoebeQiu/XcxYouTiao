<template>
  <div class="contain">
    <div class="status">
      <image class="status_img" src="../../static/images/ic_successful.png" mode="aspectFill" />
      <p class="status_name">{{ title }}</p>
      <!-- <p class="status_desc">{{ content }}</p> -->
    </div>
    <div v-if="backStatus === 0" class="main_btn" @click="back">
      <WButton :text="btnLeft" size="big" bgcolor="red"/>
    </div>
    <div class="aid_btn" @click="toHome">
      <WButton :text="btnRight" size="big" bgcolor="white"/>
    </div>

  </div>
</template>

<script>
import WButton from '@/components/WButtonCover'
import {
  mapActions
} from 'vuex'

export default {
  data () {
    return {
      title: '成功',
      content: '操作成功',
      btnLeft: '返回',
      btnRight: '回到首页',
      type: 0,
      pageStatus: 0,
      // 页面显示
      backStatus: 0
    }
  },

  components: {
    WButton
  },

  methods: {
    ...mapActions('setInputValue', [
      'veuxSetInput'
    ]),

    setText (type) {
      // 更新用户信息
      if (type === '1') {
        this.title = '用户信息修改成功'
        this.btnLeft = '继续修改'
        this.btnRight = '我的页面'
      }
      // 账本：增加、修改、删除
      if (type === '2') {
        this.title = '添加账本成功'
        this.btnLeft = '继续添加'
        this.btnRight = '账本管理'
      }
      if (type === '3') {
        this.title = '修改账本成功'
        this.btnLeft = '继续修改'
        this.btnRight = '账本管理'
      }
      if (type === '4') {
        this.title = '删除账本成功'
        this.btnRight = '账本管理'
        this.backStatus = 1
      }
      // 费用：增加、修改、删除
      if (type === '5') {
        this.title = '添加费用成功'
        this.btnLeft = '继续添加'
        this.btnRight = '费用管理'
      }
      if (type === '6') {
        this.title = '修改费用成功'
        this.btnLeft = '继续修改'
        this.btnRight = '费用管理'
      }
      if (type === '7') {
        this.title = '删除费用成功'
        this.btnRight = '费用管理'
        this.backStatus = 1
      }
      // 预算：增加、修改、删除
      if (type === '8') {
        this.title = '添加预算成功'
        this.btnLeft = '继续添加'
        this.btnRight = '预算管理'
      }
      if (type === '9') {
        this.title = '修改预算成功'
        this.btnLeft = '继续修改'
        this.btnRight = '预算管理'
      }
      if (type === '10') {
        this.title = '删除预算成功'
        this.btnRight = '预算管理'
        this.backStatus = 1
      }
      if (type === '11') {
        this.title = '添加记账提醒成功'
        this.btnLeft = '继续添加'
        this.btnRight = '记账提醒管理'
      }
      if (type === '12') {
        this.title = '修改记账提醒成功'
        this.btnLeft = '继续修改'
        this.btnRight = '记账提醒管理'
      }
      if (type === '13') {
        this.title = '删除记账提醒成功'
        this.btnRight = '记账提醒管理'
        this.backStatus = 1
      }
      if (type === '14') {
        this.title = '用户注册成功'
        this.btnRight = '前往登录'
        this.backStatus = 1
      }
      if (type === '15') {
        this.title = '用户登录成功'
        this.btnRight = '前往首页'
        this.backStatus = 1
      }
      // 预留
      if (type === '112') {
        // this.title = '客户添加成功'
        // this.btnLeft = '继续新增'
        // this.btnRight = '客户管理'
        // // 录单 =》 新增客户 =》 返回录单
        // if (this.pageStatus) {
        //   this.btnLeft = '继续录单'
        // }
      }
    },

    back () {
      if (this.pageStatus) {
        wx.navigateBack({
          delta: 3
        })
      } else {
        wx.navigateBack({})
      }
      this.veuxSetInput(1)
    },

    toHome () {
      let type = this.type
      if (type === '1') {
        wx.switchTab({
          url: `../me/main`
        })
      } else if (type === '5') {
        wx.switchTab({
          url: `../index/main`
        })
      } else if (type === '15') {
        wx.redirectTo({
          url: `../account/main`
        })
      } else {
        wx.navigateBack({
          delta: 2
        })
      }
    },

    initState () {
      this.title = '成功'
      this.content = '操作成功'
      this.btnLeft = '返回'
      this.btnRight = '回到首页'
      this.backStatus = 0
    }
  },

  onUnload () {
    this.initState()
  },

  onLoad () {
    this.type = 0
    // this.pageStatus = 0
    // const { type, pageStatus } = this.$root.$mp.query
    const { type } = this.$root.$mp.query
    // if (pageStatus === '1') {
    //   this.pageStatus = pageStatus
    // }
    this.type = type
    this.setText(type)
  }
}
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: PingFangSC;
  color: #232323;
  text-align: center;
}

.status {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status_img {
  height: 240rpx;
  width: 240rpx;
  margin-top: 180rpx;
}

.status_name {
  width: 630rpx;
  height: 48rpx;
  margin-top: 60rpx;
  font-size: 34rpx;
  font-weight: 500;
}

.status_desc {
  width: 630rpx;
  height: 36rpx;
  margin-top: 28rpx;
  font-size: 26rpx;
  color: #b2b2b2;
}

.main_btn {
  margin-top: 120rpx;
}

.aid_btn {
  margin-top: 30rpx;
}
</style>
