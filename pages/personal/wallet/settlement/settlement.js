const app = getApp()

Page({
  data: {
    finish: false,
    isFocus: false,
    totalPoint: 0
  },

  onLoad (params) {
    this.getSumintegral();
  },

  getSumintegral() {
    let that = this;
    let url = '/busiintegrallist';
    app.request({
      url,
      data: {
        page: 0,
        limit: 20
      },
      success: function(data) {
        that.setData({
          finish: true,
          isFocus: true,
          totalPoint: data.sumintegral
        })
      }
    })
  },

  formSubmit(e) {
    let formData = e.detail.value
    if (!formData.cashinmoney) {
      app.showModal('请输入提现积分数');
      return false;
    }
    app.request({
      url: '/businesscashin',
      data: formData,
      success: function() {
        app.successToast('提交成功', function(){
          wx.redirectTo({
            url: '/pages/personal/wallet/settlementRecord/settlementRecord'
          })
        })
      }
    })
  }
})