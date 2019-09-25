const app = getApp()

Page({
  data: {
  },

  formSubmit(e) {  
    let formData = e.detail.value;
    app.request({
      url: '/feedback',
      data: formData,
      success: function(data) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateBack()
        }, 2000)
      }
    })
  }

})
