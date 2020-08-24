const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    form: {
      total_price: '',
      offer_remark: '',
      order_sn: ''
    }
  },

  onLoad(params) {
    let that = this;
    this.setData({
      'form.order_sn': params.order_sn
    })
  },
  
  // 更改值
  onChange (e) {
    this.setData({
      [e.target.dataset.name]: e.detail
    })
  },

  formSubmit() {
    let form = this.data.form;

    if (!form.total_price) {
      app.showModal('请输入订单总价');
      return false;
    }
    if (!form.offer_remark) {
      app.showModal('请输入报价说明');
      return false;
    }
    
    app.request({
      url: '/busofferorder',
      data: form,
      loadText: '提交中',
      success: function(data) {
        app.successToast('报价成功', function(){
          let pages = getCurrentPages();
          let beforePage = pages[pages.length - 2];
          beforePage.getInfo();
          wx.navigateBack();    
        })
      }
    })
  }
})