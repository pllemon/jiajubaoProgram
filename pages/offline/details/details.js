const app = getApp()

Page({
  data: {
    finish: false,

    personType: 0,
    order_id: '',
    orderMes: {},
    masterList: [],
    orderStatus: {},

    craftsmannfo: {}, 
    showCancel: false
  },

  onLoad(params) {
    let that = this;
    let order_id = params.id;
    let personType = params.personType || 0;
    that.setData({
      order_id,
      personType
    })
    that.getInfo();
  },

  // 获取订单信息
  getInfo() {
    let that = this;
    let url = '/userunlinkorderinfo';
    if (this.data.personType == 2) {
      url = '/businessorderinfo';
    }
    app.request({
      url: url,
      data: {
        bo_id: this.data.order_id
      },
      success: function(data) {
        that.setData({
          orderMes: data,
          finish: true
        })
      }
    })
  },

  cancelOrder() {
    this.setData({
      showCancel: true
    })
  },
  hideCancel() {
    this.setData({
      showCancel: false
    })
  },

  // 打电话
  makePhoneCall(e) {
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  confirmOrder() {
    wx.navigateTo({
      url: '/pages/offline/confirm/confirm?id=' + this.data.order_id
    })
  }
})
