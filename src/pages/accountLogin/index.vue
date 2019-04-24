<template>
  <dic class="contain">

    <div class="user_content">
      <WInput :post="postItem[0]" @setInputValue="setInputValue" />

      <WInputImg :post="postItem[1]" @setInputValue="setInputValue" />

      <div class="btn" @click="login">
        <button class="btn1" open-type="getUserInfo" @getuserinfo="getUserInfo">
          <p class="btn_title">登录</p>
        </button>
      </div>

      <p class="warn" @click="toRegister">还没有账号?前去注册用户</p>
    </div>

  </dic>
</template>

<script>
import WInput from '@/components/WInput'
import WButton from '@/components/WButton'
import WInputImg from '@/components/WInputImg'

export default {
  data () {
    return {
      name: '',
      psd: '',
      postItem: [
        {
          msg: '',
          title: '用户名称',
          dotStatus: '1',
          maxLength: 12,
          type: 'username',
          placeholderMsg: '填写用户名称'
        },
        {
          msg: '',
          title: '用户密码',
          dotStatus: '1',
          maxLength: 12,
          type: 'userpsd',
          placeholderMsg: '填写用户密码'
        }
      ]
    }
  },

  components: {
    WInput,
    WInputImg,
    WButton
  },

  computed: {
  },

  methods: {

    setInputValue (options) {
      // 名称
      if (options.type === 'username') {
        this.name = options.msg
      }
      if (options.type === 'userpsd') {
        this.psd = options.msg
      }
    },

    initState () {
      this.name = ''
      this.psd = ''
      this.postItem[0].msg = ''
      this.postItem[1].msg = ''
    },

    checked () {
      let validotr = this.$check()
      validotr.addRule(this.name, [
        { strategy: 'isEmpty', error: '请填写用户名称' }
      ])
      validotr.addRule(this.psd, [
        { strategy: 'isEmpty', error: '请填写用户密码' }
      ])
      return validotr.check()
    },

    async login () {
      // 表单验证
      let validotrMsg = this.checked()
      if (validotrMsg) {
        return
      }
      if (this.psd.length < 6) {
        wx.showToast({
          title: `用户密码不能低于6位`,
          icon: 'none'
        })
        return
      }
      // 请求：更新用户信息
      const data = {
        account: this.name,
        password: this.psd
      }
      let res = await this.$api.auth.login(data)
      if (res.errCode) {
        return
      }
      console.log('用户账号密码登录信息', res)
      let type = 15
      wx.navigateTo({
        url: `../successPage/main?type=${type}`
      })
    },

    toRegister () {
      wx.navigateTo({
        url: `../register/main`
      })
    }
  },

  onShow () {
  },

  onLoad () {
  },

  onUnload () {
    // 初始化data数据
    this.initState()
  }
}
</script>

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #232323;
}

.user_content {
  margin-top: 160rpx;
}

.img {
  margin: 60rpx 0;
  position: relative;
}
.user_img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 1px solid #bfbfbf;
}
.user_img_no {
  position: absolute;
  top: 32%;
  left: 28%;
  /* font-size: 20rpx; */
  color: #bfbfbf;
}
.textarea {
  width: 690rpx;
  height: 180rpx;
  background-color: #fff;
  box-sizing: border-box;
  padding: 30rpx;
  font-size: 28rpx;
  margin-bottom: 20rpx;
}

.btn {
  margin-top: 50rpx;
  margin-bottom: 20rpx;
}

.warn {
  font-size: 28rpx;
  color: #b2b2b2;
}

.btn1 {
  width: 690rpx;
  height: 80rpx;
  box-sizing: border-box;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  font-size: 28rpx;
  border-radius: 15rpx;
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.1rpx;
  background-color: #de6f6f;
}

</style>
