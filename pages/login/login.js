const app = getApp();
Page({
  data: {
    formType: 1,
    type: ['注 册', '登 录', '重置密码']
  },

  onLoad(params) {
    let formType = params.type || 1;
    this.setData({
      formType
    })
  },

  changeTab(e) {
    let dataset = e.currentTarget.dataset;
    this.setData({
      formType: dataset.idx
    })
  },

  showModel(text) {
    wx.showModal({
      showCancel: false,
      content: text
    })
  },

  formSubmit(e) {
    let formData = e.detail.value;
    if (!formData.username) {
      this.showModel('请输入手机号');
      return false;
    } else if (!formData.password) {
      this.showModel('请输入密码');
      return false;
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
        app.globalData.session = data
        wx.reLaunch({
          url: '/pages/personal/index/index'
        })
      }
    })
  },
})