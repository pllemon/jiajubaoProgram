const app = getApp()

Page({
  data: {
    list: [],
    requestUrl: '/webmessagelist',
    query: {}
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
  },
})
