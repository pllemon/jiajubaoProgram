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
    formData.stars = this.data.star;
    formData.order_id = this.data.order_id;
    app.request({
      url: '/usercomment',
      data: formData,
      success: function(data) {
        app.successToast('评价成功', function(){
          let pages = getCurrentPages();
          let beforePage = pages[pages.length - 2];
          beforePage.getInfo();
          wx.navigateBack();
        })
      }
    })
  }
})
