const app = getApp();
const common = require('../../utils/common.js');

Page({
  data: {},

  goCenter() {
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
  },

  goDemand() {
    common.checkLogin(function(){
      wx.navigateTo({
        url: '/pages/demand/applyForm/applyForm'
      })
    })
  },

  goMaster() {
    common.checkLogin(function(){
      let loginInfo = app.globalData.loginInfo
      if (loginInfo && loginInfo.is_criaftsman != 1) {
        wx.navigateTo({
          url: '/pages/personal/master/identity/identity'
        })
      } else {
        wx.reLaunch({
          url: '/pages/personal/index/index?type=1'
        })
      }
    })
  },

  
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: '加入我们，分享提成！',
      path: '/pages/index/index',
      imageUrl: '/image/example/share.jpg'
    }
  }
})