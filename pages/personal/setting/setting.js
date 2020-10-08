const app = getApp()

Page({
  data: {
    action: [
      {
        img: 'iconicon_at',
        text: '使用说明',
        url: '/pages/personal/doc/doc?type=lxwm'
      },
      {
        img: 'iconfont2 icon-comments',
        text: '意见反馈',
        url: '/pages/personal/feedback/feedback'
      },
      {
        img: 'iconicon_wechat',
        text: '企业文化',
        url: '/pages/personal/doc/doc?type=about'
      },
      {
        img: 'iconicon_invite',
        text: '用户须知',
        url: '/pages/personal/doc/doc?type=regulations'
      },
      {
        img: 'iconicon_invite',
        text: '用户协议',
        url: '/pages/personal/doc/doc?type=hhxy'
      },
      // {
      //   img: 'iconicon_invite',
      //   text: '师傅协议',
      //   url: '/pages/personal/doc/doc?type=sfxy'
      // },
      // {
      //   img: 'iconicon_invite',
      //   text: '商家协议',
      //   url: '/pages/personal/doc/doc?type=sjxy'
      // }
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
