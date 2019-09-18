const app = getApp()

Page({
  data: {
    action: [
      {
        img: 'at',
        text: '联系我们',
        url: '/pages/personal/concat/concat'
      },
      {
        img: 'wechat',
        text: '关于我们',
        url: '/pages/personal/about/about'
      },
      {
        img: 'invite',
        text: '用户协议',
        url: '/pages/personal/agree/agree'
      }
    ]
  },

  loginOut() {
    wx.showModal({
      content: '确定退出该账号？',
      success (res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
    
  }
})
