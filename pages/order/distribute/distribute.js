const app = getApp();
const common = require('../../../utils/common.js');

Page({
  data: {
    form: {
      network_id: '',
      order_id: ''
    },
    networkArr: [],
    networkIdx: ''
  },

  onLoad(params) {
    this.setData({
      'form.order_id': params.id
    })
    this.getNetwork();
  },

  // 获取网点列表
  getNetwork() {
    let that = this;
    app.request({
      url: '/networklist',
      method: 'POST',
      data: {},
      success: function(data) {
        that.setData({
          networkArr: data
        })
      }
    })
  },

  // 更改值
  bindChange (e) {
    this.setData({
      [e.target.dataset.label]: e.detail.value
    })
  },

  formSubmit() {
    let form = this.data.form;
    if (this.data.networkIdx === '') {
      app.showModal('请选择服务网点');
      return false;
    }
    form.network_id = this.data.networkArr[this.data.networkIdx].id;
    
    app.request({
      url: '/networklist',
      method: 'POST',
      data: form,
      success: function(data) {
        app.successToast('提交成功', function(){
          let pages = getCurrentPages();
          let beforePage = pages[pages.length - 2];
          beforePage.getInfo();
          wx.navigateBack();        
        })
      }
    }) 
  }
})