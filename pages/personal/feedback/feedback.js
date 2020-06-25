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
        app.successToast('感谢反馈', function(){
          wx.navigateBack()
        })
      }
    })
  }
})
