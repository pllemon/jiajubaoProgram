const app = getApp()

Page({
  data: {
    type: '人员类型',
    personMessage: {},
    currType: 0,
    currMessage: {},

    userInfo: {}
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

  changeType(e) {
    let type = e.detail.index;
    this.setData({
      currType: type,
      currMessage: this.data.personMessage[type]
    })
  }
})
