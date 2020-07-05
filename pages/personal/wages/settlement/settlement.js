const app = getApp()

Page({
  data: {
    personType: 0,
    
    requestUrl: '/userprofit',
    list: [],
    sumprofit: 0,
    query: {},

    isPopup: false,
    radio: '2',
    form: {
      money: '',
      pay_name: '',
      pay_type: '',
      pay_username: ''
    },
  },

  changeList(e) {
    this.setData({
      list: e.detail.list,
      sumprofit: e.detail.data ? e.detail.data.sumprofit : 0
    })
  },

  openPopup() {
    if (this.data.sumprofit < 20) {
      return false;
    }
    this.setData({ 
      isPopup: true 
    })
  },
  
  closePopup() {
    this.setData({ 
      isPopup: false 
    })
  },

  onChange(e) {
    common.changeInput(this, e)
  },

  changeType(e) {
    this.setData({
      radio: e.detail
    })
  },

  applyRecord() {
    wx.navigateTo({
      url: '/pages/personal/wages/settlementRecord/settlementRecord'
    })
  },

  apply() {
    let that = this;
    let data = that.data.form;
    data.pay_type = this.data.radio;
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    app.request({
      url: '/userwithdrawal',
      data,
      hideLoading: true,
      complete: function() {
        num = num + 1;
        if (num == that.data.list.length) {
          wx.hideLoading()
          app.successToast('提交成功', function(){
            wx.redirectTo({
              url: '/pages/personal/wages/settlementRecord/settlementRecord'
            })
          })
        }
      }
    })
  }
})
