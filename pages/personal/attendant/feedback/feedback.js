const app = getApp();

Page({
  data: {
    list: [],
    query: {}
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
  }
})
