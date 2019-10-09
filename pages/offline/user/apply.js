const app = getApp()
const common = require('../../../../utils/common.js');
const validate = require('../../../../utils/validate.js');


Page({
  data: {
    addressInfo: null,
    agree: false,
    goodsimg: [],
    shopimg: [],
    businessimg: [],
    sharewximg: []
  },

  onLoad () {
    let that = this;
    common.addressCallBack(app, that);
  },

  // 更新图片
  updateImg(e) {
    let { name, arr } = e.detail;
    this.setData({
      [name]: arr
    })
  },
  formSubmit: function(e) {
    let formData = e.detail.value;
    formData.longitude = this.data.addressInfo.location.lng;
    formData.latitude = this.data.addressInfo.location.lat;
    formData.address = this.data.addressInfo.address + formData.address;
    if (!formData.name) {
      app.showModel('请输入店铺名');
      return false;
    }
    that.submitFn(formData);
  },

  submitFn(formData) {
    console.log(formData)
    app.request({
      url: '/applybusiness',
      data: formData,
      success: function(data) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/personal/index/index?type=2'
          })
        }, 2000)
      }
    })
  }
})