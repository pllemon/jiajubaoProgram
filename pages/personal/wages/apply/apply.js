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
    finish: false
  },
  onLoad(params) {
    let query = this.data.query
    let form = this.data.query
    if (params.type == 2) {
      query.pay_status_code = 'GETTOW'
      form.pay_status_code = 'GETTOW'
      this.setData({
        query,
        form
      })
    }
    this.getOrderList(this.data.query)
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


  getOrderList(data = {}) {
    let that = this;
    app.request({
      url: '/craftsmanorderlist',
      data,
      success: function(data) {
        that.setData({
          list: data,
          finish: true
        })
      }
    })
  },

  applySingle(order_id) {
    let that = this;
    let data = that.data.form;
    data.order_id = order_id;
    data.pay_type = this.data.radio;
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    app.request({
      url: '/craftsmancashout',
      data,
      hideLoading: true,
      complete: function() {
        num = num + 1;
        if (num == that.data.list.length) {
          wx.hideLoading()
          app.successToast('提交成功', function(){
            wx.redirectTo({
              url: '/pages/personal/wages/applyRecord/applyRecord'
            })
          })
        }
      }
    })
  },

  formSubmit() {
    num = 0;
    this.data.list.forEach(item => {
      this.applySingle(item.order_id) 
    })
  }
})