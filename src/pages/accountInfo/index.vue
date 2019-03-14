<template>
  <div class="contain">

    <div class="EditAccount">
      <div class="form">
        <WInput :post="input" @setInputValue="setInputValue"/>
        <WSelect :post="select" />
      </div>
      <div class="btn">
        <div @click="updateAcc">
          <WButton text="保存" size="small_btn" bgstyle="bgcolor_red" />
        </div>
        <div @click="deleteAcc">
          <WButton text="删除" size="small_btn" bgstyle="border_red" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import WInput from '@/components/WInput'
import WSelect from '@/components/WSelectColor'
import WButton from '@/components/WButton'

export default {
  data () {
    return {
      accName: '',
      accountInfo: {},
      input: {
        msg: '',
        title: '账本名字',
        dotStatus: '1',
        maxLength: 10,
        type: 'accountName',
        placeholderMsg: '请填写5字以内的名称'
      },
      select: {
        title: '账本颜色',
        dotStatus: '1',
        type: 'accountColor',
        colorId: '0'
      }
    }
  },

  components: {
    WInput,
    WSelect,
    WButton
  },

  methods: {
    initState () {
      this.input.msg = ''
      this.select.colorId = '0'
      this.accountInfo = {}
    },

    removeColorStorage () {
      try {
        wx.removeStorageSync('colorId')
        console.log('删除colorId成功')
      } catch (e) {
        console.log('删除colorId失败')
      }
    },

    getAccountInfo (account) {
      this.accName = account.name
      this.accountInfo = account
      this.input.msg = account.name
      this.select.colorId = account.color
      wx.setStorageSync('colorId', this.select.colorId)
    },

    setInputValue (options) {
      console.log('options', options)
      // 账本名称
      if (options.type === 'accountName') {
        this.accName = options.msg
      }
    },

    checked () {
      let validotr = this.$check()
      validotr.addRule(this.accName, [
        { strategy: 'isEmpty', error: '请填写用户账本名' }
      ])
      return validotr.check()
    },

    async updateAcc () {
      // 表单验证
      let validotrMsg = this.checked()
      if (validotrMsg) {
        return
      }
      // 发起请求
      let accColor = wx.getStorageSync('colorId')
      const data = {
        color: accColor,
        name: this.accName,
        id: this.accountInfo.id
      }
      console.log('参数', data)
      let res = await this.$api.accountBook.updateAccount(data)
      if (res.error) {
        return
      }
      console.log('更新后：', res)
      this.removeColorStorage()
      wx.navigateBack({
      })
    },

    async deleteAcc () {
      const data = {
        id: this.accountInfo.id
      }
      let res = await this.$api.accountBook.deleteAccount(data)
      if (res.error) {
        return
      }
      this.removeColorStorage()
      // wx.navigateTo({
      //   url: `../account/main`
      // })
      wx.redirectTo({
        url: `../account/main`
      })
    }
  },

  onLoad: function (options) {
    let account = JSON.parse(options.account)
    this.getAccountInfo(account)
  },

  onShow () {
    let colorId = wx.getStorageSync('colorId')
    if (colorId) {
      this.select.colorId = colorId
    }
  },

  onUnload: function () {
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

.form {
  width: 690rpx;
  margin-top: 60rpx;
}

.btn {
  display: flex;
  justify-content: space-between;
  width: 690rpx;
  margin-top: 74rpx;
}

</style>
