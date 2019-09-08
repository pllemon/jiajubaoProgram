const app = getApp()

Page({
  data: {
    searchValue: '',
    list: [],
    personType: 0,
    orderStatus: {}
  },
  onLoad(params) {
    let that = this;
    let personType = params.type || 0;
    this.setData({
      orderStatus: app.globalData.personMessage[personType].orderStatus
    })
    app.request({
      url: '/userorderlist',
      data: {},
      success: function(data) {
        that.setData({
          list: data
        })
      }
    })
  }
})
