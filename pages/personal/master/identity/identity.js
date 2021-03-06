const app = getApp()
const common = require('../../../../utils/common.js');
const validate = require('../../../../utils/validate.js');

let uploadNum = 0;

Page({
  data: {
    addressInfo: null,
    showLocationDialog: false,
    agree: [],
    info: null,

    form: {
      name: '',
      sfz: '',
      phone: '',
      enter_time: '',
      desc: '',
      address: ''
    },

    headerurl: [],
    caridimg: [],
    caridzimg: [],
    caridfimg: [],
    
    readonly: 0,
    id: ''
  },

  onLoad (params) {
    let that = this;
    this.setData({
      readonly: params.readonly || 0,
      id: params.id
    })

    
    if (params.readonly) {
      wx.setNavigationBarTitle({
        title: '师傅资料'
      })
    } else {
      common.getLocation(that);
      wx.setNavigationBarTitle({
        title: '师傅申请'
      })
    }

    if (params.isFromOrder) {
      that.getCraftsmanInfo()
      return false
    }

    const craftsmannfo = app.globalData.loginInfo.craftsmannfo
    console.log(craftsmannfo)
    if (craftsmannfo) {
      let form = this.data.form;
      for (let i in form) {
        if (craftsmannfo[i]) {
          form[i] = craftsmannfo[i];
        }
      }
      craftsmannfo.sfz = craftsmannfo.sfz.substring(0,4)+'*'.repeat(craftsmannfo.sfz.length-(8))+craftsmannfo.sfz.substring(craftsmannfo.sfz.length-4)
      this.setData({
        info: craftsmannfo,
        form,
        headerurl: [{
          url: common.padUrl(craftsmannfo.headerurl),
          success: true,
          data: craftsmannfo.headerurl
        }],
        caridimg: [{
          url: common.padUrl(craftsmannfo.caridimg),
          success: true,
          data: craftsmannfo.caridimg
        }],
        caridzimg: [{
          url: common.padUrl(craftsmannfo.caridzimg),
          success: true,
          data: craftsmannfo.caridzimg
        }],
        caridfimg: [{
          url: common.padUrl(craftsmannfo.caridfimg),
          success: true,
          data: craftsmannfo.caridfimg
        }]
      })
    }
  },

  getCraftsmanInfo() {
    let that = this
    app.request({
      url: '/indexcraftsmaninfo',
      data: {
        craftsman_id: that.data.id
      },
      success: function(res) {
        console.log(res)
        that.setData({
          info: res,
          form: res
        })
      }
    })
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
    let that = this;
    let form = this.data.form;
    if (!this.data.headerurl.length) {
      app.showModal('请上传师傅头像');
      return false;
    }
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
    if (!that.data.addressInfo) {
      app.showModal('请定位联系地址');
      return false;
    }
    if (that.data.agree.length == 0) {
      app.showModal('请认真阅读并勾选同意师傅入驻协议书');
      return false;
    }
    
    form.address = that.data.addressInfo.address + e.detail.value.address;
    wx.showLoading({
      title: '上传中',
    });
    common.uploadImg('uploadcm', that.data.headerurl[0], function (res) {
      form.headerurl = res.data;
      wx.hideLoading();
      that.submitFn(form);
    })

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
      form[name] = res.data;
      uploadNum++;
      if (uploadNum == 3) {
        wx.hideLoading();
        that.submitFn();
      }
    })
  },

  submitFn(obj) {
    app.request({
      url: '/applycraftsman',
      data: obj,
      loadText: '提交中',
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