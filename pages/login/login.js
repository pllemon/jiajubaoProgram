const app = getApp();
Page({
  data: {
    formType: 0
  },

  onLoad(params) {
    let formType = params.type || 0;
    this.setData({
      formType
    })
  },

  formSubmit(e) {
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