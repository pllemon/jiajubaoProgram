const app = getApp();
const common = require('../../utils/common.js');

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    addressInfo: "",
    bannerList: []
  },

  onLoad() {
    let that = this;
    common.addressCallBack(app, that);

    that.getBanner();
  },

  getBanner() {
    let that = this;
    app.request({
      url: '/bannerlist',
      data: {},
      success: function(data) {
        that.setData({
          bannerList: data
        })
      }
    })
  },

  goDiscount() {
    app.showModal('该功能暂未开放，敬请期待')
  },

  goDemand() {
    common.checkLogin()
    wx.navigateTo({
      url: '/pages/demand/category/category'
    })
  },

  goShow() {
    common.checkLogin()
    let loginInfo = app.globalData.loginInfo
    if (loginInfo.is_criaftsman != 1) {
      wx.reLaunch({
        url: '/pages/personal/index/index?type=1'
      })
    } else {
      wx.navigateTo({
        url: '/pages/order/center/center'
      })
    }
  }
})