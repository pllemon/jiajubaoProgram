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

    that.request({
      url: '/userinfo',
      data: {},
      success: function(data) {
        that.globalData.loginInfo = data
      }
    })
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
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('不允许获取个人信息！！！')
        }
      }
    })
  },

  getLocation2: function () {
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
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'http://47.106.100.144' + obj.url,
      method: obj.method || 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': that.globalData.session
      },
      data: obj.data || {},
      success(res) {
        wx.hideLoading()
        if (res.statusCode == 200) {
          if (res.data.success) {
            obj.success(res.data.data)
          } else {
            if (res.data.code == 404) {
              wx.showModal({
                content: '登录失效，请重新登录',
                showCancel: false,
                success (res) {
                  if (res.confirm) {
                    wx.removeStorageSync('session');
                    wx.reLaunch({
                      url: '/pages/login/login?type=1'
                    })
                  }
                }
              })  
            } else {
              wx.showModal({
                content: res.data.message,
                showCancel: false
              })  
            }        
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '请求出错',
            showCancel: false
          })  
        }
      }
    })
  },

  showModal(text) {
    wx.showModal({
      showCancel: false,
      content: text
    })
  },

  // 成功提示
  successToast(text, callback) {
    wx.showToast({
      title: text,
      icon: 'success',
      duration: 1000
    })
    if (callback) {
      setTimeout(function () {
        callback()
      }, 1000)
    }
  },

  globalData: {
    session: '',
    userInfo: null,
    loginInfo: null, // 登录后账号信息
    addressInfo: null, // 地理位置信息
    personMessage: systemData.personMessage,
    service_demand: '' // 已选的项目名
  }
})