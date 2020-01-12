const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    list: [],
    page: 1,
    lastPage: 1,
    isLoadMore: false,
    isRefresh: false,

    searchValue: "",
    addressInfo: null,
    showLocationDialog: false,

    location: null
  },

  onLoad() {
    let that = this;
    common.getLocation(that, function(res){
      that.setData({
        location: res.location
      })
      that.getList(1);
    });
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
    wx.navigateTo({
      url: '/pages/offline/apply/apply?id=' + id
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
            that.getList();
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
      that.getList();
    });
  },

  getList(type) { // 1->刷新，2->加载
    let that = this;
    let page = this.data.page;

    if (type == 1) {
      page = 1;
      that.setData({
        isRefresh: true
      })  
    } else if (type == 2) {
      page = page++;
      that.setData({
        isLoadMore: true
      })  
    }
   
    app.request({
      url: '/businesslist',
      data: {
        lng: that.data.location.lng,
        lat: that.data.location.lat,
        page: page,
        limit: 10
      },
      hideLoading: true,
      success: function(data) {
        data = {
          current_page: 1,
          data: data,
          last_page: 1,
          per_page: 10
        }
        let list = that.data.list;
        if (type == 1) {
          list = data.data;
        } else {
          list = list.concat(data.data);
        }
        list.forEach(item => {
          if (item.distance > 1000) {
            item.distance = parseFloat(item.distance/1000).toFixed(1) + 'km'
          } else {
            item.distance = item.distance + 'm'
          }
        })
        that.setData({
          page,
          lastPage: data.last_page,
          list
        })
      },
      complete: function() {
        if (type == 1) {
          that.setData({
            isRefresh: false
          })
        } else if (type == 2) {
          that.setData({
            isLoadMore: false
          })
        }
      }
    })
  }
})
