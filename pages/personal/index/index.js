const systemData = require('../../../utils/data.js')
const app = getApp()

Page({
  data: {
    type: '人员类型',
    currType: null,
    currMessage: {},

    userInfo: {},

    showEwm: false,
    ewmURL: '',

    status: {
      0: {
        text: '你还不是师傅哦，马上点击申请加入我们吧，更多惊喜等着你',
        text2: '你还不是商家哦，马上点击申请加入我们吧，更多惊喜等着你',
        btn: '立即申请',
        active: true
      },
      2: {
        text: '申请已提交，后台正在审核中，请耐心等待哦',
        text2: '申请已提交，后台正在审核中，请耐心等待哦',
        btn: '申请审核中',
        active: false
      },
      3: {
        text: '你的申请已驳回',
        text2: '你的申请已驳回',
        btn: '重新申请',
        active: true
      }
    },

    personType: {}, // 用户类型
  },

  onLoad(params) {
    let type = params.type || 0;
    console.log(type)
    this.setData({
      currType: type,
      personType: systemData.personType
    })

    this.getInfo();
  },

  getInfo() {
    let that = this;
    app.request({
      url: '/userinfo',
      success: function(data) {
        that.setData({
          userInfo: data
        })
      }
    })
  },

  applyMaster() {
    wx.navigateTo({
      url: '/pages/personal/master/identity/identity'
    })
  },

  applyBusiness() {
    wx.navigateTo({
      url: '/pages/personal/businessman/identity/identity'
    })
  },

  goMaster() {
    this.setData({
      currType: 1
    })
  },

  toggleEwm() {
    let that = this;
    if (!that.data.ewmURL) {
      app.request({
        url: '/businessorcode',
        success: function(data) {
          console.log(data)
          that.setData({
            showEwm: !that.data.showEwm
          })
        }
      })
    } else {
      that.setData({
        showEwm: !that.data.showEwm
      })
    }
  },

  changeType(e) {
    let type = e.detail.name;
    this.setData({
      currType: type
    })
  },

  bindAction(e) {
    let action = e.currentTarget.dataset.action;
    this[action]();
  }
})
