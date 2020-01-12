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

  formSubmit: function(e) {
    let form = this.data.form;

    if (!form.name) {
      app.showModal('请输入店铺名');
      return false;
    }
    if (!this.data.businessimg.length) {
      app.showModal('请上传营业执照');
      return false;
    }

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