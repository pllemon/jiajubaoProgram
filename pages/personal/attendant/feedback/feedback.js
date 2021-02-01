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
  },

  goOrder(e) {
    let id = e.currentTarget.dataset.id
    if (id) {
      wx.navigateTo({
        url: '/pages/order/detail/detail?id=' + id + '&personType=4'
      })
    }
  }
})
