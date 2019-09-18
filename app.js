//app.js
const systemData = require('utils/data.js')
var QQMapWX = require('utils/qqmap-wx-jssdk.js');
var qqmapsdk;

App({
  onLaunch: function () {
   let that = this;

   let session = wx.getStorageSync('session');
   console.log('session=' + session)
   if (session) {
    that.globalData.session = session;
   }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    this.getLocation();
  },

  getLocation: function () {
    let that = this;
    qqmapsdk = new QQMapWX({
      key: '5KUBZ-FS2KK-RDVJY-AHNO4-GS7RS-PRFL5'
    });
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            console.log(res)
            that.globalData.addressInfo = res.result
            if (that.readyLocation) {
              that.readyLocation(res.result)
            }
          }
        })
      }
    })
  },

  request: function (obj) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      // url: 'http://192.168.1.104' + obj.url,
      url: 'http://47.106.100.144' + obj.url,
      method: obj.method || 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': this.globalData.session
      },
      data: obj.data || {},
      success(res) {
        if (res.data.success) {
          obj.success(res.data.data)
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false
          })          
        }
      },
      complete() {
        wx.hideLoading()
      }
    })
  },

  globalData: {
    session: '',
    userInfo: null,
    addressInfo: null, // 地理位置信息
    personMessage: systemData.personMessage,
    service_demand: '' // 已选的项目名
  }
})