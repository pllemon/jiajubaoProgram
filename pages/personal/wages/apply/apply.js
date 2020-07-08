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
    }
    this.selectComponent("#list").getData(1);
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