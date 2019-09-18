const app = getApp()
const common = require('../../../../utils/common.js');

Page({
  data: {
    addressInfo: null
  },

  onLoad () {
    let that = this;
    common.addressCallBack(app, that);
  },

  chooseAddress() {
    let that = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        let addressInfo = {
          address: res.address + res.name
        }        
        that.setData({
          addressInfo: addressInfo
        })
      }
    })
  },

  formSubmit: function(e) {
    let formData = e.detail.value;
    formData.address = this.data.addressInfo.address + formData.address;
    console.log(formData)
    app.request({
      url: '/applycraftsman',
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