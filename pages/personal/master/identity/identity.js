const app = getApp()
const common = require('../../../../utils/common.js');
const validate = require('../../../../utils/validate.js');

Page({
  data: {
    addressInfo: null,
    agree: []
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

  readDoc() {
    wx.navigateTo({
      url: '/pages/personal/doc/doc?type=sfxy'
    })
  },

  formSubmit: function(e) {
    let formData = e.detail.value;
    formData.address = this.data.addressInfo.address + formData.address;
    console.log(formData)
    if (!formData.name) {
      app.showModal('请输入姓名');
      return false;
    }
    if (!formData.name) {
      app.showModal('请输入姓名');
      return false;
    }
    if (!formData.sfz) {
      app.showModal('请输入身份证');
      return false;
    }
    if (!validate.phone(formData.phone)) {
      app.showModal('请输入正确的手机号');
      return false;
    }
    if (!formData.enter_time) {
      app.showModal('请输入入行年份');
      return false;
    }
    if (this.data.agree.length == 0) {
      app.showModal('请认真阅读并勾选同意师傅入驻协议书');
      return false;
    }
    app.request({
      url: '/applycraftsman',
      data: formData,
      success: function(data) {
        app.successToast('提交成功', function(){
          wx.reLaunch({
            url: '/pages/personal/index/index?type=1'
          })
        })
      }
    })
  }
})