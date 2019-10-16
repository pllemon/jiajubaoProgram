const app = getApp();
const validate = require('../../utils/validate.js');

Page({
  data: {
    formType: 1,
    type: ['注 册', '登 录', '重置密码'],
    phone: '',
    confirmPassword: '',
    password: '',
    formData: {
      username: '',
      phone: '',
      code: '',
      password: '',
      confirmPassword: '',
      personal: ''
    }
  },

  onLoad(params) {
    let formType = params.type || 1;
    let personal = params.personal || '';
    let formData = this.data.formData;
    formData.personal = personal;
    this.setData({
      formType,
      formData
    })

    // 已登录则跳转 
    let session = wx.getStorageSync('session');
    if (session) {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  },


  bindInput: function(e) {
    let key = e.currentTarget.dataset.key;
    this.setData({
      [key]: e.detail.value
    })
  },

  onGotUserInfo: function(e) {
    let userInfo = e.detail.userInfo;
    let formData = this.data.formData;
    formData.username = userInfo.nickName;
    this.setData({
      formData
    })
    app.globalData.userInfo = userInfo;
  },

  // 切换模式
  changeTab(e) {
    let dataset = e.currentTarget.dataset;
    this.setData({
      formType: dataset.idx
    })
  },

  // 获取手机验证码
  getCode() {
    let validateRes = validate.phone(this.data.phone);
    if (!validateRes) {
      app.showModal('请输入正确的手机号');
    }
  },

  // 重置表单
  formReset() {
    this.setData({
      formData: {}
    })
  },

  // 提交表单
  formSubmit(e) {
    console.log(app.globalData.userInfo);
    let that = this;
    let formData = e.detail.value;
    console.log(formData)
    if (this.data.formType == 0) {
      if (!formData.username) {
        app.showModal('请输入用户名或授权');
        return false;
      }
    }

    if (!validate.phone(this.data.phone)) {
      app.showModal('请输入正确的手机号');
      return false;
    } else if (!formData.password) {
      app.showModal('请输入密码');
      return false;
    }

    if (this.data.formType != 1) {
      if (!formData.code) {
        app.showModal('请输入手机验证码');
        return false;
      }else if (!validate.confirmPassword(this.data.password, this.data.confirmPassword)) {
        app.showModal('两次密码不一致');
        return false;
      }
    }

    
    let url = ''
    if (this.data.formType == 0) {
      url = '/register'
    } else if (this.data.formType == 1) {
      url = '/login'
    }
    app.request({
      url,
      data: formData,
      success: function(data) {
        that.formReset();
        if (that.data.formType == 0) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            formType: 1
          })
        } else if (that.data.formType == 1) {
          app.globalData.session = data
          wx.setStorage({
            key: 'session',
            data: data
          })
          app.request({
            url: '/userinfo',
            success: function(data) {
              app.globalData.loginInfo = data
            }
          })
          wx.reLaunch({
            url: '/pages/index/index'
          })
        } else if (that.data.formType == 2) {
          wx.showToast({
            title: '重置成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            formType: 1
          })
        }
      }
    })
  },
})