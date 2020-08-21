const app = getApp()
const common = require('../../../utils/common.js');

Page({
  data: {
    business_id: '',
    form: {
      goods_need_remark: ''
    }
  },

  onLoad(params) {
    this.setData({
      business_id: params.business_id
    })
  },

  onChange(e) {
    common.changeTextarea(this, e)
  },

  formSubmit() {  
    let that = this
    let formData = that.data.form;
    if (formData.goods_need_remark == '') {
      app.showModal('请输入您的需求');
      return false;
    }
    wx.requestSubscribeMessage({
      tmplIds: [
        '_2qnHOlTzMu_nTiJmamzCqrnhvrfzjh5ijGntI64mEA', // 下单成功通知
        'PCshYOrhnVT6H3pDkcIXFocq7D9r-kfSAtuVW1pprDo', // 订单状态通知
      ],
      success (res) {
        formData.type = 2;
        formData.business_id = that.data.business_id;
        app.request({
          url: '/markbusinessorder',
          data: formData,
          loadText: '下单中',
          success: function(data) {
            app.successToast('下单成功', function(){
              wx.redirectTo({
                url: '/pages/offline/list/list'
              })
            })
          }
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  }
})
