const app = getApp()
const common = require('../../../../utils/common.js');
const validate = require('../../../../utils/validate.js');

let uploadNum = 0;

Page({
  data: {
    addressInfo: null,
    showLocationDialog: false,
    agree: [],

    form: {
      name: '',
      sfz: '',
      phone: '',
      enter_time: '',
      desc: ''
    },

    caridimg: [],
    caridzimg: [],
    caridfimg: []
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
    let form = this.data.form;
    
    if (!form.name) {
      app.showModal('请输入姓名');
      return false;
    }
    if (!form.sfz) {
      app.showModal('请输入身份证');
      return false;
    }
    if (!validate.phone(form.phone)) {
      app.showModal('请输入正确的手机号');
      return false;
    }
    if (!form.enter_time) {
      app.showModal('请输入入行年份');
      return false;
    }
    if (!this.data.addressInfo) {
      app.showModal('请定位联系地址');
      return false;
    }
    if (!this.data.caridimg.length) {
      app.showModal('请上传手持证件照');
      return false;
    }
    if (!this.data.caridzimg.length) {
      app.showModal('请上传身份证正面');
      return false;
    }
    if (!this.data.caridfimg.length) {
      app.showModal('请上传身份证反面');
      return false;
    }
    if (this.data.agree.length == 0) {
      app.showModal('请认真阅读并勾选同意师傅入驻协议书');
      return false;
    }
    
    form.address = this.data.addressInfo.address + e.detail.value.address;

    uploadNum = 0;
    wx.showLoading({
      title: '上传中',
    });
    this.upload('caridimg');
    this.upload('caridzimg');
    this.upload('caridfimg');
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
    common.uploadImg('uploadcm', this.data[name][0], function (res) {
      form[name] = res;
      uploadNum++;
      if (uploadNum == 3) {
        wx.hideLoading();
        that.submitFn();
      }
    })
  },

  submitFn() {
    app.request({
      url: '/applycraftsman',
      data: this.data.form,
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