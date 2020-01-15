const app = getApp()
const common = require('../../../../utils/common.js');
Page({
  data: {
    imgArr: [],

    form: {
      headerurl: '',
      username: ''
    }
  },

  onLoad() {
    let loginInfo = app.globalData.loginInfo;
    console.log(loginInfo)
    let form = {
      headerurl: loginInfo.headerurl,
      username: loginInfo.username
    };
    let imgArr = [{
      url: common.padUrl(loginInfo.headerurl),
      success: true,
      data: loginInfo.headerurl
    }]
    this.setData({
      form,
      imgArr
    })
    
  },

  formSubmit: function(e) {
    let form = this.data.form;

    if (!form.username) {
      app.showModal('请输入昵称');
      return false;
    }
    if (!this.data.imgArr.length) {
      app.showModal('请上传头像');
      return false;
    }

    wx.showLoading({
      title: '上传中',
    });
    this.upload('imgArr');
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
    common.uploadImg('uploaduserheader', this.data[name][0], function (res) {
      form.headerurl = res.data;
      wx.hideLoading();
      that.submitFn();
    })
  },

  submitFn() {
    app.request({
      url: '/saveuserinfo',
      data: this.data.form,
      success: function(data) {
        app.successToast('提交成功', function(){
          wx.reLaunch({
            url: '/pages/personal/index/index?type=0'
          })
        })
      }
    })
  }
})