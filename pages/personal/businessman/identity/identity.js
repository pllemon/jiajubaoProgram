const app = getApp()
const common = require('../../../../utils/common.js');
const validate = require('../../../../utils/validate.js');

let uploadNum = 0;

Page({
  data: {
    addressInfo: null,
    agree: [],
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

  readDoc() {
    wx.navigateTo({
      url: '/pages/personal/doc/doc?type=sjxy'
    })
  },

  chooseAddress() {
    let that = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        let addressInfo = {
          address: res.address + res.name,
          location: {
            lng: res.longitude,
            lat: res.latitude
          }
        }        
        that.setData({
          addressInfo: addressInfo
        })
      }
    })
  },

  formSubmit: function(e) {
    let formData = e.detail.value;
    formData.longitude = this.data.addressInfo.location.lng;
    formData.latitude = this.data.addressInfo.location.lat;
    formData.address = this.data.addressInfo.address + formData.address;
    if (!formData.name) {
      app.showModal('请输入店铺名');
      return false;
    }
    if (!validate.phone(formData.phone)) {
      app.showModal('请输入正确的手机号');
      return false;
    }
    if (!this.data.shopimg.length) {
      app.showModal('请上传门面图片');
      return false;
    }
    if (!this.data.goodsimg.length) {
      app.showModal('请上传产品图片');
      return false;
    }
    if (!this.data.businessimg.length) {
      app.showModal('请上传营业执照');
      return false;
    }
    if (!this.data.sharewximg.length) {
      app.showModal('请上传分享图片');
      return false;
    }
    if (this.data.agree.length == 0) {
      app.showModal('请认真阅读并勾选同意商家入驻协议书');
      return false;
    }
    uploadNum = 0;
    wx.showLoading({
      title: '上传中',
    });
    this.upload('shopimg', formData);
    this.upload('goodsimg', formData);
    this.upload('businessimg', formData);
    this.upload('sharewximg', formData);
  },

  upload(name, formData) {
    let that = this;
    common.uploadImg('uploadobusinessimg', this.data[name][0], function (res) {
      formData[name] = res;
      uploadNum++;
      if (uploadNum == 4) {
        wx.hideLoading();
        that.submitFn(formData);
      }
    })
  },

  submitFn(formData) {
    console.log(formData)
    app.request({
      url: '/applybusiness',
      data: formData,
      success: function(data) {
        app.successToast('提交成功', function(){
          wx.reLaunch({
            url: '/pages/personal/index/index?type=2'
          })
        })
      }
    })
  }
})