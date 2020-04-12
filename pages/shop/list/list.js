const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    list: [],
    page: 1,
    lastPage: 1,
    loadStatus: 0,

    keyword: "",
    addressInfo: null,
    showLocationDialog: false,

    location: null,
  },

  updateArea(e) {
    this.getList(1)
  },

  onShareAppMessage: function (e) {
    let idx = e.target.dataset.idx;
    let obj = this.data.list[idx];
    console.log(obj)
    return {
      title: '我在多师傅发现了一家好店：' + obj.name + '，进来看看吧',
      path: '/pages/shop/list/list?id=' + obj.id,
      imageUrl: 'http://47.106.100.144/' + obj.shopimg
    }
  },

  // 下单
  makeOffline(e) {
    let id = e.currentTarget.dataset.id;
    common.checkLogin(function(){
      wx.navigateTo({
        url: '/pages/offline/apply/apply?id=' + id
      })
    })
  },

  makePhoneCall(e) {
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  

  changeList(e) {
    this.getList(e.detail.type)
  },

  onOpenSetting() {
    let that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          common.getLocation(that, function(res){
            that.setData({
              location: res.location
            })
            that.getList(1);
          });
        }
      }
    })
  },

  getRoutePlan(e) {
    let that = this
    let idx = e.currentTarget.dataset.idx;
    common.getRoutePlan({
      'name': that.data.list[idx].name,
      'latitude': that.data.list[idx].latitude,
      'longitude': that.data.list[idx].longitude,
    })
  },

  upDateLocation() {
    let that = this;
    that.setData({
      showLocationDialog: false
    })
    common.getLocation(that, function(res){
      that.setData({
        location: res.location
      })
      that.getList(1);
    });
  },

  getList(type) { // 1->刷新，2->加载
    let that = this;
  
    that.setData({
      loadStatus: type || 1
    })

    app.request({
      url: '/businesslist',
      data: {
        lng: app.globalData.addressInfo? app.globalData.addressInfo.lng : '',
        lat: app.globalData.addressInfo? app.globalData.addressInfo.lat : '',
        keyword: that.data.keyword,
        province: app.globalData.regionInfo.code[0] || '',
        city: app.globalData.regionInfo.code[1] || '',
        district: app.globalData.regionInfo.code[2] || '',
      },
      hideLoading: true,
      success: function(data) {
        let list = data || []
        list.forEach(item => {
          if (item.distance > 1000) {
            item.distance = parseFloat(item.distance/1000).toFixed(1) + 'km'
          } else {
            item.distance = item.distance + 'm'
          }
        })
        that.setData({
          page: 1,
          lastPage: 1,
          list
        })
      },
      complete: function() {
        that.setData({
          loadStatus: 0
        })
      }
    })
  }
})
