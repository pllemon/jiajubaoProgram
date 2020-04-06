const app = getApp();
const common = require('../../utils/common.js');

Page({
  data: {},

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