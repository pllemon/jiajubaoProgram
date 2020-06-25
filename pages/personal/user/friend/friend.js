const app = getApp()

Page({
  data: {
    list: []
  },

  onLoad() {
    this.getList()
  },

  getList() {
    let that = this;
    app.request({
      url: '/usersharelist',
      data: {},
      success: function(data) {
        that.setData({
          list: data
        })
      }
    })
  }
})
