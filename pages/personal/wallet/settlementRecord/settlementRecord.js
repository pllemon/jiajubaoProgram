const app = getApp()

Page({
  data: {
    list: []
  },

  onLoad(params) {
    this.getList()
  },

  getList() {
    let that = this;
    let url = '/businesscashinlist';
    app.request({
      url,
      data: {
        page: 0,
        limit: 200
      },
      success: function(data) {
        that.setData({
          list: data.data
        })
      }
    })
  }
})
