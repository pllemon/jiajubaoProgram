const app = getApp()

Page({
  data: {
    action: [
      {
        img: 'at',
        text: '联系我们',
        url: '/pages/personal/doc/doc?type=lxwm'
      },
      {
        img: 'wechat',
        text: '企业文化',
        url: '/pages/personal/doc/doc?type=about'
      },
      {
        img: 'invite',
        text: '用户协议',
        url: '/pages/personal/doc/doc?type=hhxy'
      },
      {
        img: 'invite',
        text: '师傅协议',
        url: '/pages/personal/doc/doc?type=sfxy'
      },
      {
        img: 'invite',
        text: '商家协议',
        url: '/pages/personal/doc/doc?type=sjxy'
      }
    ]
  },

  loginOut() {
    wx.showModal({
      content: '确定退出该账号？',
      success (res) {
        if (res.confirm) {
          wx.removeStorageSync('session');
          app.globalData.session = '';
          app.globalData.loginInfo = null;
          wx.reLaunch({
            url: '/pages/login/login?type=1'
          })
        }
      }
    })
    
  }
})
