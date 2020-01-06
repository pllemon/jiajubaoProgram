const app = getApp()
const common = require('../../../../utils/common.js');
const validate = require('../../../../utils/validate.js');

let uploadNum = 0;

Page({
  data: {
    agree: [],
    goodsimg: [],
    shopimg: [],
    businessimg: [],
    sharewximg: [],

    form: {
      name: '',
      phone: ''
    },

    addressInfo: null,
    showLocationDialog: false,
  },

  onLoad () {
    let that = this;
    common.getLocation(that);
  },
  
  onOpenSetting() {
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

  // 更新图片
  updateImg(e) {
    let { name, arr } = e.detail;
    this.setData({
      [name]: arr
    })
  },

  checkboxChange(e) {
    this.setData({
      agree: e.detail.value
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
    let form = this.data.form;

    if (!form.name) {
      app.showModal('请输入店铺名');
      return false;
    }
    if (!validate.phone(form.phone)) {
      app.showModal('请输入正确的手机号');
      return false;
    }
    if (!this.data.addressInfo) {
      app.showModal('请定位店铺地址');
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
    
    form.longitude = this.data.addressInfo.location.lng;
    form.latitude = this.data.addressInfo.location.lat;
    form.address = this.data.addressInfo.address + e.detail.value.address;

    uploadNum = 0;
    wx.showLoading({
      title: '上传中',
    });
    this.upload('shopimg');
    this.upload('goodsimg');
    this.upload('businessimg');
    this.upload('sharewximg');
  },

  afterRead(e) {
    const type = e.currentTarget.dataset.type;
    const path = e.detail.file.path;
    let fileList = this.data[type]
    fileList = [
      {
        url: path
      }
    ]
    this.setData({
      [type]: fileList
    })
  },
  deleteImage(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      [type]: []
    })
  },
  onChange(e) {
    let form = this.data.form;
    form[e.currentTarget.dataset.name] = e.detail;
    this.setData({
      form
    })
  },

  upload(name) {
    let that = this;
    let form = this.data.form;
    common.uploadImg('uploadobusinessimg', this.data[name][0].url, function (res) {
      form[name] = res;
      uploadNum++;
      if (uploadNum == 4) {
        wx.hideLoading();
        that.submitFn();
      }
    })
  },

  submitFn() {
    console.log(this.data.form)
    return false
    app.request({
      url: '/applybusiness',
      data: this.data.form,
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