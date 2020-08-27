const app = getApp()

Page({
  data: {
    personType: 0,
    
    requestUrl: '/userwithdrawallist',
    list: [],
    query: {},
  },

  changeList(e) {
    this.setData({
      list: e.detail.list || []
    })
  }
})
