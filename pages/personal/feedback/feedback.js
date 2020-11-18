const app = getApp()

Page({
  data: {
    order_sn: '',
    order_id: ''
  },

  onLoad(params) {
    this.setData({
      order_sn: params.order_sn,
      order_id: params.order_id
    })
  },

  formSubmit(e) {  
    let formData = e.detail.value;
    formData.order_sn = this.data.order_sn;
    formData.order_id = this.data.order_id;
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
