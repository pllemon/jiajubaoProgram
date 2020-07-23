//app.js
const systemData = require('utils/data.js')

App({
  onLaunch: function () {
   let that = this;

   let session = wx.getStorageSync('session');
   console.log('session=' + session)
   if (session) {
    that.globalData.session = session;
    wx.login({
      success: res => {
        that.request({
          url: '/userinfo',
          data: {
            code: res.code
          },
          success: function(data) {
            that.globalData.loginInfo = data
            if (that.loginCallback) {
              that.loginCallback()
            }
          }
        })
      }
    })
   }
  },

  request: function (obj) {
    let that = this
    if (!obj.hideLoading) {
      wx.showLoading({
        title: obj.loadText || '加载中',
        mask: true
      })
    }
    wx.request({
      url: 'https://www.dsfjjwx.com' + obj.url,
      method: obj.method || 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'cookie': that.globalData.session
      },
      data: obj.data || {},
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.success) {
            if (obj.success) {
              obj.success(res.data.data)
            }
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
      },
      complete() {
        if (!obj.hideLoading) {
          wx.hideLoading()
        }
        if (obj.complete) {
          obj.complete()
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
      duration: 1000,
      mask: true
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
    service_demand: '', // 已选的项目名
    regionInfo: null, // 省市区信息
    otherData: null // 过渡数据
  }
})