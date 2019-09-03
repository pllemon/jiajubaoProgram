const app = getApp()

Page({
  data: {
    imgUrls: [
      '/image/example/bg1.jpg',
      '/image/example/bg1.jpg',
      '/image/example/bg1.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  signUp: function () {
    wx.showToast({
      title: '报名成功',
      icon: 'success',
      duration: 2000
    })
  }
})
