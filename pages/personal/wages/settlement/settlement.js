const app = getApp()

Page({
  data: {
    personType: 0,
    
    requestUrl: '/userprofit',
    list: [],
    canusemoney: 0,
    sumprofit: 0,
    query: {}
  },

  changeList(e) {
    this.setData({
      list: e.detail.list || [],
      canusemoney: e.detail.data ? e.detail.data.canusemoney : 0,
      sumprofit: e.detail.data ? e.detail.data.sumprofit : 0
    })
  },

  applyNow() {
    if (this.data.canusemoney > 20) {
      wx.navigateTo({
        url: '/pages/personal/wages/submitForm/submitForm?personType=0&sumprofit=' + this.data.canusemoney
      })
    } else {
      app.showModal('满20.00才可申请提现哦');
    }
  },

  applyRecord() {
    wx.navigateTo({
      url: '/pages/personal/wages/settlementRecord/settlementRecord'
    })
  }
})
