const app = getApp()
const common = require('../../../../utils/common.js');
const validate = require('../../../../utils/validate.js');

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

    sfz1: [],
    sfz2: [],
    sfz3: []
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
    if (this.data.agree.length == 0) {
      app.showModal('请认真阅读并勾选同意师傅入驻协议书');
      return false;
    }
    
    form.address = this.data.addressInfo.address + e.detail.value.address;
    
    console.log(form)
    return false
    app.request({
      url: '/applycraftsman',
      data: form,
      success: function(data) {
        app.successToast('提交成功', function(){
          wx.reLaunch({
            url: '/pages/personal/index/index?type=1'
          })
        })
      }
    })
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
  }
})