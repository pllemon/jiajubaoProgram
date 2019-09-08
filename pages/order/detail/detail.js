const app = getApp()

Page({
  data: {
    imgUrls: [
      '/image/example/bg1.jpg',
      '/image/example/bg1.jpg',
      '/image/example/bg1.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    personType: 0,
    status: 2,
    orderMes: {}
  },

  onLoad(params) {
    let that = this;
    let personType = params.personType || 0;
    let orderStatus = app.globalData.orderStatus;
    let order_id = params.id || 6;
    // that.setData({
    //   personType,
    //   orderMes: orderStatus[personType][that.data.status]
    // })
    app.request({
      url: '/orderinfo',
      data: {
        order_id,
      },
      success: function(data) {
        that.setData({
          orderMes: data.info[0]
        })
      }
    })
  },

  signUp: function () {
    wx.showToast({
      title: '报名成功',
      icon: 'success',
      duration: 2000
    })
  }
})
