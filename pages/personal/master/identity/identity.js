const app = getApp()
const common = require('../../../../utils/common.js');
const validate = require('../../../../utils/validate.js');

Page({
  data: {
    addressInfo: null,
    showLocationDialog: false,
    agree: []
  },

  onLoad () {
    let that = this;
    common.getLocation(that);
  },

  openSetting() {
    let that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          common.getLocation(that)
        }
      }
    })
  },

  upDateLocation() {
    this.setData({
      showLocationDialog: false
    })
    common.getLocation(this)
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

  checkboxChange(e){
    this.setData({
      agree: e.detail.value
    })
  },

  readDoc() {
    wx.navigateTo({
      url: '/pages/personal/doc/doc?type=sfxy'
    })
  },

  formSubmit: function(e) {
    let formData = e.detail.value;
    
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
    if (!this.data.addressInfo) {
      app.showModal('请定位联系地址');
      return false;
    }
    if (this.data.agree.length == 0) {
      app.showModal('请认真阅读并勾选同意师傅入驻协议书');
      return false;
    }
    
    formData.address = this.data.addressInfo.address + formData.address;
    
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