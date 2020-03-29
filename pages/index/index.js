const app = getApp();
const common = require('../../utils/common.js');

Page({
  data: {
    addressInfo: null,
    showLocationDialog: false
  },

  onLoad() {
    let that = this;
    common.getLocation(that);
  },

  openSetting() {
    let that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          common.getLocation(that)
        }
      }
    })
  },

  upDateLocation() {
    this.setData({
      showLocationDialog: false
    })
    common.getLocation(this)
  },


  

  goDiscount() {
    app.showModal('该功能暂未开放，敬请期待')
  },

  goDemand() {
    common.checkLogin(function() {
      wx.navigateTo({
        url: '/pages/demand/category/category'
      })
    })
  },

  goShow() {
    common.checkLogin(function(){
      let loginInfo = app.globalData.loginInfo
      if (loginInfo && loginInfo.is_criaftsman != 1) {
        wx.reLaunch({
          url: '/pages/personal/index/index?type=1'
        })
      } else {
        wx.navigateTo({
          url: '/pages/order/center/center'
        })
      }
    })
  }
})