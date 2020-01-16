const app = getApp()

Page({
  data: {
    type: '',
    query1: {
      pay_status: 0,
      pay_status_code: 'GETONE',
      cmorderstatus: 4
    },
    query2: {
      pay_status: 1,
      pay_status_code: 'GETTOW',
      cmorderstatus: 4
    },
    list: []
  },
  onLoad(params) {
    this.setData({
      type: params.type
    })
    if (this.data.type == 1) {
      this.getOrderList(this.data.query1)
    } else {
      this.getOrderList(this.data.query2)
    }
  },

  getOrderList(data = {}) {
    let that = this;
    app.request({
      url: '/craftsmanorderlist',
      data,
      success: function(data) {
        that.setData({
          list: data
        })
      }
    })
  },
})