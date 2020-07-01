const app = getApp();
const common = require('../../../../utils/common.js');
let num = 0;

Page({
  data: {
    query: {
      pay_status: 1,
      pay_status_code: 'GETONE',
      cmorderstatus: 4
    },

    list: [],

    form: {
      order_id: '',
      pay_status_code: 'GETONE',
      pay_name: '',
      pay_type: '',
      pay_username: ''
    },

    isPopup: false,
    radio: '2',
    sumMoney: 0
  },
  onLoad(params) {
    let query = this.data.query
    let form = this.data.form
    if (params.type == 2) {
      query.pay_status_code = 'GETTOW'
      form.pay_status_code = 'GETTOW'
      this.setData({
        query,
        form
      })
    }
    this.selectComponent("#list").getData(1);
  },
  
  openPopup() {
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

  changeList(e) {
    this.setData({
      list: e.detail
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