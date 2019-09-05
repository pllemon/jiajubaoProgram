const app = getApp()
Page({
  data: {
    addressInfo: null
  },

  onLoad () {
    this.setData({
      addressInfo: app.globalData.addressInfo
    })
  },

  formSubmit: function(e) {
    let formData = e.detail.value;
    formData.address = this.data.addressInfo.address + formData.address;
    console.log(formData)
    return false;
    app.request({
      url: '/markorder',
      data: formData,
      success: function(data) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/personal/index/index?type=1'
          })
        }, 2000)
      }
    })
  }
})