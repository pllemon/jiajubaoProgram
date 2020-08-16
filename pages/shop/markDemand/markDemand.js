const app = getApp()

Page({
  data: {
    business_id: ''
  },

  onLoad(params) {
    this.setData({
      business_id: params.id
    })
  },

  formSubmit(e) {  
    let formData = e.detail.value;
    formData.type = 2;
    formData.business_id = this.data.business_id;
    app.request({
      url: '/markbusinessorder',
      data: formData,
      success: function(data) {
        app.successToast('下单成功', function(){
          wx.redirectTo({
            url: '/pages/offline/list/list'
          })
        })
      }
    })
  }
})
