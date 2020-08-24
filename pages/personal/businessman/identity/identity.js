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
      phone: '',
      address: ''
    },

    addressInfo: null,
    showLocationDialog: false,
    readonly: 0
  },

  onLoad (params) {
    let that = this;

    this.setData({
      readonly: params.readonly || 0
    })

    if (params.readonly) {
      wx.setNavigationBarTitle({
        title: '我的资料'
      })
    } else {
      common.getLocation(that);
      wx.setNavigationBarTitle({
        title: '商家申请'
      })
    }

    const businessinfo = app.globalData.loginInfo.businessinfo
    if (businessinfo) {
      let form = this.data.form;
      for (let i in form) {
        if (businessinfo[i]) {
          form[i] = businessinfo[i];
        }
      }
      this.setData({
        form,
        goodsimg: [{
          url: common.padUrl(businessinfo.goodsimg),
          success: true,
          data: businessinfo.goodsimg
        }],
        shopimg: [{
          url: common.padUrl(businessinfo.shopimg),
          success: true,
          data: businessinfo.shopimg
        }],
        businessimg: [{
          url: common.padUrl(businessinfo.businessimg),
          success: true,
          data: businessinfo.businessimg
        }],
        sharewximg: [{
          url: common.padUrl(businessinfo.sharewximg),
          success: true,
          data: businessinfo.sharewximg
        }]
      })
    }
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
        common.getLocationMes(res, function(data) {
          data.address = res.address + res.name
          app.globalData.addressInfo = data
          that.setData({
            addressInfo: data
          })
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
      app.showModal('请上传宣传图片');
      return false;
    }
    if (this.data.agree.length == 0) {
      app.showModal('请认真阅读并勾选同意商家入驻协议书');
      return false;
    }
    
    form.longitude = this.data.addressInfo.location.lng;
    form.latitude = this.data.addressInfo.location.lat;
    form.address = this.data.addressInfo.address + e.detail.value.address;
    let ad_info = this.data.addressInfo.ad_info;
    form.region = ad_info.province + ad_info.city + ad_info.district;
    form.province = ad_info.provincecode;
    form.city = ad_info.citycode;
    form.district = ad_info.adcode;

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
    common.readImage(this, e)
  },  
  deleteImage(e) {
    common.deleteImage(this, e)
  },
  onChange(e) {
    common.changeInput(this, e)
  },

  upload(name) {
    let that = this;
    let form = this.data.form;
    common.uploadImg('uploadobusinessimg', this.data[name][0], function (res) {
      form[name] = res.data;
      uploadNum++;
      if (uploadNum == 3) {
        wx.hideLoading();
        that.submitFn();
      }
    })
  },

  submitFn() {
    console.log(this.data.form)
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