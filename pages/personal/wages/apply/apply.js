const app = getApp();

Page({
  data: {
    query: {
      pay_status: 1,
      pay_status_code: 'GETONE',
      cmorderstatus: 6
    },
    list: [],
  },
  onLoad(params) {
    let query = this.data.query
    if (params.type == 2) {
      query.pay_status_code = 'GETTOW'
      this.setData({
        query
      })
      wx.setNavigationBarTitle({
        title: '二期佣金申请'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '一期佣金申请'
      })
    }
    this.selectComponent("#list").getData(1);
  },

  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order/detail/detail?id='+ id + '&personType=1'
    })
  },

  singleApply(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/personal/wages/submitForm/submitForm?personType=1&pay_status_code=' + this.data.query.pay_status_code + '&order_id=' + id
    })
  },

  applyNow() {
    app.globalData.otherData = this.data.list.map(item => {
      return item.order_id
    })
    console.log(app.globalData.otherData)
    wx.navigateTo({
      url: '/pages/personal/wages/submitForm/submitForm?personType=1&pay_status_code=' + this.data.query.pay_status_code
    })
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
  }
})