const app = getApp()

Page({
  data: {
    personType: 0,
    
    requestUrl: '/userintegrallist',
    list: [],
    sumintegral: '',
    query: {},
  },

  changeList(e) {
    this.setData({
      list: e.detail.list,
      sumintegral: e.detail.data ? e.detail.data.sumintegral : 0
    })
  },

  useIntegral() {
    wx.navigateTo({
      url: '/pages/shop/list/list'
    })
  }
})
