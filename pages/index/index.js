const app = getApp();
const common = require('../../utils/common.js');

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    addressInfo: "",
    showLocationDialog: false,
    bannerList: []
  },

  onLoad() {
    let that = this;
    common.getLocation(that);

    that.getBanner();
  },

  upDateLocation() {
    this.setData({
      showLocationDialog: false
    })
    common.getLocation(this)
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

  bindAdvert(e) {
    let idx = e.currentTarget.dataset.idx
    let obj = this.data.bannerList[idx]
    if (obj.type == 1) {
      wx.navigateTo({
        url: obj.url
      })
    } else if (obj.type == 2){

    }
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