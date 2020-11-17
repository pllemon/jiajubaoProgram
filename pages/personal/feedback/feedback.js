const app = getApp()

Page({
  data: {
    order_sn: ''
  },

  onLoad(params) {
    this.setData({
      order_sn: params.order_sn
    })
  },

  formSubmit(e) {  
    let formData = e.detail.value;
    formData.order_sn = this.data.order_sn;
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
