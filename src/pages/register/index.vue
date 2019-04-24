<template>
  <dic class="contain">
    <div class="img" @click="chooseImg">
      <image v-if="userImg" class="user_img" :src="userImg" mode="aspectFill" />
      <image v-if="!userImg" class="user_img" mode="aspectFill" />
      <span v-if="!userImg" class="user_img_no">无图</span>
    </div>

    <div class="user_content">
      <WInput :post="postItem[0]" @setInputValue="setInputValue" />

      <WInputImg :post="postItem[1]" @setInputValue="setInputValue" />

      <WInputImg :post="postItem[2]" @setInputValue="setInputValue" />

      <WInput :post="postItem[3]" @setInputValue="setInputValue" />

      <WInput :post="postItem[4]" @setInputValue="setInputValue" />

      <WInput :post="postItem[5]" @setInputValue="setInputValue" />

      <textarea placeholder="个性签名(选填)"
      class="textarea"
      v-model="signature"
      placeholder-style="color: #eee"/>

      <div class="btn" @click="register">
        <button class="btn1" open-type="getUserInfo" @getuserinfo="getUserInfo">
          <p class="btn_title">注册</p>
        </button>
      </div>
    </div>

  </dic>
</template>

<script>
import WInput from '@/components/WInput'
import WInputImg from '@/components/WInputImg'

export default {
  data () {
    return {
      userImg: null,
      tUserImg: null,
      account: '',
      name: '',
      psd: '',
      twopsd: '',
      realNmae: '',
      phone: '',
      signature: '',
      postItem: [
        {
          msg: '',
          title: '用户账号',
          dotStatus: '1',
          maxLength: 12,
          type: 'account',
          placeholderMsg: '填写用户账号'
        },
        {
          msg: '',
          title: '用户密码',
          dotStatus: '1',
          maxLength: 12,
          type: 'userpsd',
          placeholderMsg: '填写用户密码'
        },
        {
          msg: '',
          title: '确认密码',
          dotStatus: '1',
          maxLength: 12,
          type: 'usertwopsd',
          placeholderMsg: '填写用户确认密码'
        },
        {
          msg: '',
          title: '用户名称',
          dotStatus: '1',
          maxLength: 12,
          type: 'username',
          placeholderMsg: '用户名称'
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
    WInputImg
  },

  computed: {
  },

  methods: {
    chooseImg () {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          console.log('选择图片res', res)
          this.userImg = tempFilePaths
          // 选择图片
          // wx.chooseMessageFile({
          //   count: 1,
          //   type: 'image',
          //   success: res => {
          //     // tempFilePath可以作为img标签的src属性显示图片
          //     // const tempFilePaths = res.tempFilePaths
          //     this.userImg = tempFilePaths
          //   }
          // })
          // 上传
          wx.uploadFile({
            // http://192.168.8.39:9090
            // http://120.77.86.76:9090
            url: 'http://192.168.8.39:9090/file/getTPath?type=1',
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if (res.statusCode !== 200) {
                wx.showModal({
                  title: '提示',
                  content: '上传失败',
                  showCancel: false
                })
                return
              }
              let aaaa = JSON.parse(res.data)
              this.tUserImg = aaaa.data.tpath
            }
          })
        }
      })
    },

    setInputValue (options) {
      // 名称
      if (options.type === 'account') {
        this.account = options.msg
      }
      if (options.type === 'userpsd') {
        this.psd = options.msg
      }
      if (options.type === 'usertwopsd') {
        this.twopsd = options.msg
      }
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
      this.tUserImg = null
      this.account = ''
      this.userImg = null
      this.name = ''
      this.realNmae = ''
      this.phone = ''
      this.signature = ''
      this.postItem[0].msg = ''
      this.postItem[1].msg = ''
      this.postItem[2].msg = ''
    },

    checked () {
      let validotr = this.$check()
      validotr.addRule(this.name, [
        { strategy: 'isEmpty', error: '请填写用户名称' }
      ])
      validotr.addRule(this.account, [
        { strategy: 'isEmpty', error: '请填写用户账号' }
      ])
      validotr.addRule(this.psd, [
        { strategy: 'isEmpty', error: '请填写用户密码' }
      ])
      validotr.addRule(this.twopsd, [
        { strategy: 'isEmpty', error: '请填写用户确认密码' }
      ])
      validotr.addRule(this.phone, [
        { strategy: 'isEmpty', error: '请填写手机号码' },
        { strategy: 'isPhone', error: '请填写正确的手机号码' }
      ])
      return validotr.check()
    },

    async register () {
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
      if (this.twopsd.length < 6) {
        wx.showToast({
          title: `用户确认密码不能低于6位`,
          icon: 'none'
        })
        return
      }
      if (this.usertwopsd !== this.userpsd) {
        wx.showToast({
          title: `用户密码与用户确认密码不一致`,
          icon: 'none'
        })
        return
      }
      // 注册
      wx.login({
        success: (res) => {
          let code = res.code
          wx.getUserInfo({
            success: (res) => {
              // 请求：注册
              const data = {
                avatarTPath: this.tUserImg,
                account: this.account,
                avatarUrl: res.userInfo.avatarUrl,
                wxName: res.userInfo.nickName,
                code: code,
                password: this.psd,
                name: this.name,
                realName: this.realName,
                phone: this.phone,
                signature: this.signature
              }
              console.log('zhuce--data', data)
              this.$api.auth.register(data)
                .then((res) => {
                  console.log('zhuce--res', res)
                  if (res.errMsg === '用户已经存在') {
                    wx.showToast({
                      title: `用户已经存在`,
                      icon: 'none'
                    })
                    return
                  }
                  if (res.errMsg) {
                    return
                  }
                  let type = 14
                  wx.navigateTo({
                    url: `../successPage/main?type=${type}`
                  })
                })
            }
          })
        }
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
  margin-top: 40rpx;
  margin-bottom: 20rpx;
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
