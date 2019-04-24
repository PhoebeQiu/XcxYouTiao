<template>
  <dic class="contain">
    <div class="img" @click="chooseImg">
      <image v-if="userImg" class="user_img" :src="userImg" mode="aspectFill" />
      <image v-if="!userImg" class="user_img" mode="aspectFill" />
      <span v-if="!userImg" class="user_img_no">无图</span>
    </div>

    <div class="user_content">
      <div class="item">
        <div class="item_l">
          <span class="dot_r"></span>
          <p class="item_name">用户账号</p>
        </div>

        <div class="item_r">
          <span class="input_textarea">{{ account }}</span>
        </div>
      </div>

      <WInputImg :post="postItem[5]" @setInputValue="setInputValue" />

      <WInputImg :post="postItem[3]" @setInputValue="setInputValue" />

      <WInputImg :post="postItem[4]" @setInputValue="setInputValue" />

      <WInput :post="postItem[0]" @setInputValue="setInputValue" />

      <WInput :post="postItem[1]" @setInputValue="setInputValue" />

      <WInput :post="postItem[2]" @setInputValue="setInputValue" />

      <textarea placeholder="个性签名(选填)"
      class="textarea"
      v-model="signature"
      placeholder-style="color: #eee"/>
    </div>

    <div class="btn" @click="save">
      <WButton text="保存" size="big_btn" bgstyle="bgcolor_red"/>
    </div>

    <div class="mask"></div>

  </dic>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import WInput from '@/components/WInput'
import WButton from '@/components/WButton'
import WInputImg from '@/components/WInputImg'

export default {
  data () {
    return {
      name: '',
      realNmae: '',
      phone: '',
      signature: '',
      account: '',
      psd: '',
      twopsd: '',
      tUserImg: '',
      userImg: '',
      userPsdLast: '',
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
          title: '原始密码',
          dotStatus: '1',
          maxLength: 12,
          type: 'userPsdLast',
          placeholderMsg: '填写用户原始密码'
        }
      ]
    }
  },

  components: {
    WInput,
    WButton,
    WInputImg
  },

  computed: {
    ...mapGetters('user', [
      'vuexGetUserInfo'
    ]),

    // 获取userInfo数据
    userInfo () {
      let userInfo = this.vuexGetUserInfo
      console.log('vuex,userInfo', userInfo)
      return userInfo
    }
  },

  methods: {
    ...mapActions('user', [
      'vuexSetUserInfo'
    ]),

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
      if (options.type === 'userPsdLast') {
        this.userPsdLast = options.msg
      }
      if (options.type === 'userpsd') {
        this.psd = options.msg
      }
      if (options.type === 'usertwopsd') {
        this.twopsd = options.msg
      }
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
      this.account = ''
      this.psd = ''
      this.twopsd = ''
      this.name = ''
      this.realNmae = ''
      this.phone = ''
      this.signature = ''
      this.tUserImg = ''
      this.userImg = ''
      this.userPsdLast = ''
      this.postItem[0].msg = ''
      this.postItem[1].msg = ''
      this.postItem[2].msg = ''
      this.postItem[3].msg = ''
      this.postItem[4].msg = ''
      this.postItem[5].msg = ''
    },

    checked () {
      let validotr = this.$check()
      validotr.addRule(this.name, [
        { strategy: 'isEmpty', error: '请填写用户名称' }
      ])
      validotr.addRule(this.account, [
        { strategy: 'isEmpty', error: '请填写用户账号' }
      ])
      validotr.addRule(this.userPsdLast, [
        { strategy: 'isEmpty', error: '请填写用户密码' }
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

    async save () {
      // 表单验证
      let validotrMsg = this.checked()
      if (validotrMsg) {
        return
      }
      if (this.userPsdLast.length < 6) {
        wx.showToast({
          title: `用户初始密码不能低于6位`,
          icon: 'none'
        })
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
      // 请求：更新用户信息
      const data = {
        path: this.tUserImg,
        newPassword: this.psd,
        name: this.name,
        realName: this.realName,
        phone: this.phone,
        signature: this.signature,
        password: this.userPsdLast
      }
      console.log('更新用户信息data', data)
      let res = await this.$api.auth.updateCustomer(data)
      if (res.errCode === -19) {
        wx.showToast({
          title: `原始密码错误，修改密码失败！`,
          icon: 'none'
        })
        return
      }
      console.log('更新用户信息res', res)
      // 请求：获取用户信息，更新vuex
      let wxUserInfo = this.userInfo
      // 请求：获取用户信息
      const data2 = {}
      const res2 = await this.$api.auth.getCustomer(data2)
      if (res2.errCode) {
        return
      }
      const imgUrl = 'http://pq92yp4cm.bkt.clouddn.com/'
      const imgUrl2 = res2.data.avatarFPath
      const userData = {
        id: res2.data.id,
        name: res2.data.name,
        realName: res2.data.realName,
        phone: res2.data.phone,
        signature: res2.data.signature,
        avatarUrl: wxUserInfo.avatarUrl,
        wxName: wxUserInfo.wxName,
        account: res2.data.account,
        avatarFPath: `${imgUrl}${imgUrl2}`
      }
      this.vuexSetUserInfo(userData)
      console.log('vuex用户信息', userData)
      let type = 1
      wx.navigateTo({
        url: `../successPage/main?type=${type}`
      })
    }
  },

  onShow () {
    let tmpUser = this.userInfo
    if (tmpUser.avatarFPath) {
      this.userImg = tmpUser.avatarFPath
    } else {
      this.userImg = tmpUser.avatarUrl
    }
    this.account = tmpUser.account
    this.name = tmpUser.name
    this.realNmae = tmpUser.realName
    this.phone = tmpUser.phone
    this.signature = tmpUser.signature
    this.postItem[0].msg = tmpUser.name
    this.postItem[1].msg = tmpUser.realName
    this.postItem[2].msg = tmpUser.phone
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
  margin-bottom: 160rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #232323;
}

.img {
  margin: 60rpx 0 60rpx 0;
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
  z-index: 3;
  position: fixed;
  z-index: 9998;
  bottom: 68rpx;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30rpx;
  padding-right: 30rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.mask {
  z-index: 2;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  background-color: white;
}

.item {
  margin-bottom: 30rpx;
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
</style>
