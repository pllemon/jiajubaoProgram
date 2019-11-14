const app = getApp()


Page({
  data: {
    isFocus: true,
    money: '',
    point: 0,
    maxPoint: 0,
    totalPoint: 0,
    business_id: '',
    checked: false
  },

  onLoad (params) {
    this.setData({
      business_id: params.id
    });
    this.getInfo();
  },

  getInfo() {
    let that = this;
    app.request({
      url: '/businessorderinfo',
      data: {
        bo_id: this.data.business_id
      },
      success: function(data) {
        that.setData({
          orderMes: data
        })
        that.getSumintegral();
      }
    })
  },

  changeSwitch(event) {
    this.setData({
      checked: event.detail
    })
  },

  getSumintegral() {
    let that = this;
    let url = '/busiintegrallist';
    app.request({
      url,
      data: {
        page: 0,
        limit: 20
      },
      success: function(data) {
        let maxPoint = Math.min(that.data.orderMes.pay_money, data.integralsum);
        that.setData({
          point: maxPoint,
          totalPoint: data.integralsum,
          maxPoint: maxPoint
        })
      }
    })
  },

  formSubmit() {
    let that = this;
    let obj = {
      bo_id: that.data.business_id,
      order_sn: that.data.orderMes.order_sn,
      use_integral: that.data.checked ? that.data.maxPoint : 0
    }
    app.request({
      url: '/buscomorder',
      data: obj,
      success: function(data) {
        app.successToast('提交成功', function(){
          wx.redirectTo({
            url: '/pages/offline/list/list?personType=2'
          })
        })
      }
    })
  }
})