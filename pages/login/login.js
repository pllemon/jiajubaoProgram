const app = getApp();
const validate = require('../../utils/validate.js');

Page({
  data: {
    formType: 1,
    type: ['注 册', '登 录', '重置密码'],
    agree: [],
    isShowAgree: false,
    phone: '',
    confirmPassword: '',
    password: '',
    countDown: 0,
    formData: {
      username: '',
      phone: '',
      code: '',
      password: '',
      confirmPassword: '',
      invitation_code: ''
    },
    showEmpowerDialog: true
  },

  changeTab(e) {
    let idx = e.currentTarget.dataset.idx
    this.setData({
      formType: idx
    })
    this.formReset()
  },

  onLoad(params) {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          
        }
      }
    })

    let formType = params.type || 0;
    let invitation_code = params.invitation_code || '';
    let formData = this.data.formData;
    formData.invitation_code = invitation_code;
    this.setData({
      formType,
      formData
    })
  },

  upDateUserInfo() {

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

  readDoc() {
    wx.navigateTo({
      url: '/pages/personal/doc/doc?type=hhxy'
    })
  },

  // 获取手机验证码
  getCode() {
    let validateRes = validate.phone(this.data.phone);
    if (!validateRes) {
      app.showModal('请输入正确的手机号');
    }

    let countDown = 60;
    let timer = setInterval(() => {
      if (countDown == 0) {
        clearInterval(timer);
        return false;
      }
      countDown--;
      this.setData({
        countDown: countDown
      })
    }, 1000)
  },

  // 重置表单
  formReset() {
    this.setData({
      formData: {}
    })
  },

  checkboxChange(e){
    this.setData({
      agree: e.detail.value
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
        app.showModal('请输入用户名');
        return false;
      }
    }

    if (!validate.phone(this.data.phone)) {
      app.showModal('请输入正确的手机号');
      return false;
    } else if (!formData.password && formData.password.length < 5) {
      app.showModal('请输入密码，密码长度至少为5位');
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

    if (this.data.formType == 0 && this.data.agree.length == 0) {
      app.showModal('请认真阅读并勾选同意用户协议');
      return false;
    }
   
    let url = ''
    if (this.data.formType == 0) {
      url = '/register'
    } else if (this.data.formType == 1) {
      url = '/login'
    } else if (this.data.formType == 2) {
      url = '/resetpwd'
    }
    app.request({
      url,
      data: formData,
      success: function(data) {
        that.formReset();
        if (that.data.formType == 0) {
          app.showModal('注册成功，请登录');
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
          app.showModal('重置成功，请登录');
          that.setData({
            formType: 1
          })
        }
      }
    })
  },
})