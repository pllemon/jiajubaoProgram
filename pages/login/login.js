const app = getApp();
Page({
  data: {
  },

  formSubmit: function(e) {
    let formData = e.detail.value;
    app.request({
      url: '/login',
      data: formData,
      success: function(data) {
        app.globalData.session = data
        wx.reLaunch({
          url: '/pages/personal/index/index'
        })
      }
    })
  },
})