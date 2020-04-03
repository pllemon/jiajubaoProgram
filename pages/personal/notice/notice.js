const app = getApp()

Page({
  data: {
  },
  onLoad() {
    app.request({
      url: '/webmessagelist',
      data: {},
      success: function(data) {
        console.log(data)
      }
    })
  }
})
