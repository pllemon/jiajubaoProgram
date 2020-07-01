const app = getApp()

Page({
  data: {
    personType: 0,
    
    requestUrl: '/userprofit',
    list: [],
    sumprofit: 0,
    query: {},
  },

  changeList(e) {
    this.setData({
      list: e.detail.list,
      sumprofit: e.detail.data ? e.detail.data.sumprofit : 0
    })
  }
})
