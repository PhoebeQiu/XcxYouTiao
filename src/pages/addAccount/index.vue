<template>
  <div class="contain">

    <div class="newAccount">
      <div class="form">
        <WInput :post="input" @setInputValue="setInputValue"/>
        <WSelect :post="select" />
      </div>
      <div class="btn" @click="addAcc">
        <WButton text="添加" size="big_btn" bgstyle="bgcolor_red" />
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
      accSign: 0,
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
      this.accSign = 0
      this.accName = ''
    },

    removeColorStorage () {
      try {
        wx.removeStorageSync('colorId')
        console.log('删除colorId成功')
      } catch (e) {
        console.log('删除colorId失败')
      }
    },

    checked () {
      let validotr = this.$check()
      validotr.addRule(this.accName, [
        { strategy: 'isEmpty', error: '请填写用户账本名' }
      ])
      return validotr.check()
    },

    setInputValue (options) {
      console.log('options', options)
      // 账本名称
      if (options.type === 'accountName') {
        this.accName = options.msg
      }
    },

    async addAcc () {
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
        openHistory: this.accSign
      }
      console.log('添加账本data:', data)
      let res = await this.$api.accountBook.addAccount(data)
      if (res.error) {
        return
      }
      this.removeColorStorage()
      // wx.navigateTo({
      //   url: `../account/main`
      // })
      let type = 2
      wx.navigateTo({
        url: `../successPage/main?type=${type}`
      })
    }
  },

  onLoad: function () {
    wx.setStorageSync('colorId', this.select.colorId)
  },

  onShow () {
    let colorId = wx.getStorageSync('colorId')
    if (colorId) {
      this.select.colorId = colorId
    }
  },

  onUnload: function () {
    this.initState()
  },

  mounted () {
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
