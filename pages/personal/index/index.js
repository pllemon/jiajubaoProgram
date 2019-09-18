const app = getApp()

Page({
  data: {
    type: '人员类型',
    personMessage: {},
    currType: 0,
    currMessage: {},

    userInfo: {},

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
        text: '你的申请已驳回，可查看详情并重新编辑后提交哦',
        text2: '你的申请已驳回，可查看详情并重新编辑后提交哦',
        btn: '重新提交',
        active: true
      }
    }
  },

  onLoad(params) {
    let type = params.type || 0;
    let personMessage = app.globalData.personMessage;
    this.setData({
      personMessage,
      currType: type,
      currMessage: personMessage[type]
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

  changeType(e) {
    let type = e.detail.index;
    this.setData({
      currType: type,
      currMessage: this.data.personMessage[type]
    })
  }
})
