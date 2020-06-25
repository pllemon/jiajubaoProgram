const app = getApp()

Page({
  data: {
   info: {}
  },

  onLoad(params) {
    let id = params.id
    this.getDetails(id);
  },

  getDetails(id) {
    let that = this;
    app.request({
      url: '/ordershowinfo',
      data: {
        show_id: id
      },
      success: function(data) {
        that.setData({
          info: data
        })
      }
    })
  }
})
