<template>
  <dic class="contain">
    <div class="img">
      <image class="user_img" src="../../static/images/user.png" mode="aspectFill" />
    </div>

    <div class="user_content">
      <WInput :post="postItem[0]" @setInputValue="setInputValue" />

      <WInput :post="postItem[1]" @setInputValue="setInputValue" />

      <WInput :post="postItem[2]" @setInputValue="setInputValue" />

      <textarea placeholder="备注(选填)"
      class="textarea"
      v-model="desc"
      placeholder-style="color: #eee"/>

      <div @click="save">
        <WButton text="保存" size="big_btn" bgstyle="bgcolor_red"/>
      </div>
    </div>

  </dic>
</template>

<script>
import WInput from '@/components/WInput'
import WButton from '@/components/WButton'

export default {
  data () {
    return {
      name: '',
      realNmae: '',
      phone: '',
      desc: '',
      postItem: [
        {
          msg: '',
          title: '用户名称',
          dotStatus: '1',
          maxLength: 12,
          type: 'username',
          placeholderMsg: '填写客户名称'
        },
        {
          msg: '',
          title: '真实名称(选填)',
          maxLength: 12,
          type: 'realName',
          placeholderMsg: '填写真实名称'
        },
        {
          msg: '',
          title: '手机号码',
          dotStatus: '1',
          maxLength: 11,
          type: 'phone',
          placeholderMsg: '填写手机号码'
        }
      ]
    }
  },

  components: {
    WInput,
    WButton
  },

  methods: {
    setInputValue (options) {
      console.log('options', options)
      // 名称
      if (options.type === 'username') {
        this.name = options.msg
      }
      // 真实姓名
      if (options.type === 'realName') {
        this.realName = options.msg
      }
      // 手机
      if (options.type === 'phone') {
        this.phone = options.msg
      }
    },

    initState () {
      this.name = ''
      this.realNmae = ''
      this.phone = ''
      this.desc = ''
      this.postItem[0].msg = ''
      this.postItem[1].msg = ''
      this.postItem[2].msg = ''
    },

    checked () {
      let validotr = this.$check()
      validotr.addRule(this.name, [
        { strategy: 'isEmpty', error: '请填写用户名称' }
      ])
      validotr.addRule(this.phone, [
        { strategy: 'isPhone', error: '请填写正确的手机号码' }
      ])
      return validotr.check()
    },

    async getUserInfo () {
      // 请求：得到用户信息数据
      // let res = await this.$api.user.()
      // if (res.error) {
      //   return
      // }
      // this.postItem[0].msg = res.nickname
    },

    async save () {
      // 表单验证
      let validotrMsg = this.checked()
      if (validotrMsg) {
        return
      }
      // 请求：更新用户信息
      const data = {
        name: this.name,
        realName: this.realName,
        phone: this.phone,
        signature: this.desc
      }
      console.log('data', data)
      // let res = await this.$api.auth.updateCustomData
      // if (res.error) {
      //   return
      // }
    }
  },

  onLoad () {
    // 请求：用户数据，并设置
    this.getUserInfo()
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

.img {
  margin: 60rpx 0 60rpx 0;
}
.user_img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
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

</style>
