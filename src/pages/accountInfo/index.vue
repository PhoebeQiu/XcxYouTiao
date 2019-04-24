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
import {
  mapGetters,
  mapActions
} from 'vuex'
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

  computed: {
    ...mapGetters('accountBook', [
      'vuexGetAccountBook'
    ]),

    // 获取数据
    accountBook () {
      let accountBook = this.vuexGetAccountBook
      return accountBook
    }
  },

  components: {
    WInput,
    WSelect,
    WButton
  },

  methods: {
    ...mapActions('accountBook', [
      'vuexSetAccountBook'
    ]),

    initState () {
      this.input.msg = ''
      this.select.colorId = '0'
      this.accountInfo = {}
    },

    removeColorStorage () {
      try {
        wx.removeStorageSync('colorId')
      } catch (e) {
        console.log('删除colorId失败')
      }
    },

    getAccountInfo () {
      let account = this.accountBook
      this.accName = account.name
      this.accountInfo = account
      this.input.msg = account.name
      this.select.colorId = account.color
      wx.setStorageSync('colorId', this.select.colorId)
    },

    setInputValue (options) {
      // 账本名称
      if (options.type === 'accountName') {
        this.accName = options.msg
        this.input.msg = options.msg
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
      if (res.errCode) {
        return
      }
      this.vuexSetAccountBook(data)
      this.removeColorStorage()
      let type = 3
      wx.navigateTo({
        url: `../successPage/main?type=${type}`
      })
    },

    async deleteAcc () {
      // 请求：账本数据
      const data1 = {
        pageNum: 1,
        pageSize: 10
      }
      let res1 = await this.$api.accountBook.getAllAccount(data1)
      if (res1.errCode) {
        return
      }
      console.log('请求所有账本', res1.data.result)
      let accountBookList = res1.data.result
      if (accountBookList.length === 1) {
        wx.showToast({
          title: `默认账本不可删除！`,
          icon: 'none'
        })
        return
      }
      // 请求：删除账本
      const data = {
        id: this.accountInfo.id
      }
      let res = await this.$api.accountBook.deleteAccount(data)
      if (res.errCode) {
        return
      }
      this.removeColorStorage()
      let type = 4
      wx.navigateTo({
        url: `../successPage/main?type=${type}`
      })
    }
  },

  onLoad: function () {
    this.getAccountInfo()
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
