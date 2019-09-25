const app = getApp()

Page({
  data: {
    star: 0,
    order_id: ''
  },

  onLoad(params){
    this.setData({
      order_id: params.id
    })
  },

  changeStar(e) {
    this.setData({
      star: e.detail
    })
  },

  formSubmit(e) {
    let formData = e.detail.value;
    formData.star = this.data.star;
    formData.order_id = this.data.order_id;
    app.request({
      url: '/usercomment',
      data: formData,
      success: function(data) {
        wx.showToast({
          title: '评价成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/personal/index/index'
          })
        }, 2000)
      }
    })
  }
})
