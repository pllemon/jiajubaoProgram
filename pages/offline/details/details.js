const app = getApp()

Page({
  data: {
    finish: false,

    personType: 0,
    order_id: '',
    orderMes: {},
    masterList: [],
    orderStatus: {},
  },

  onLoad(params) {
    let that = this;
    let order_id = params.id;
    let personType = params.personType || 0;
    that.setData({
      order_id,
      personType
    })
    that.getInfo();
  },

  getInfo() {
    let that = this;
    let url = '/userunlinkorderinfo';
    if (this.data.personType == 2) {
      url = '/businessorderinfo';
    }
    app.request({
      url: url,
      data: {
        bo_id: this.data.order_id
      },
      success: function(data) {
        that.setData({
          orderMes: data,
          finish: true
        })
      }
    })
  },

  cancelOrder() {
    let that = this
    wx.showModal({
      content: '确定取消该订单？',
      success (res) {
        if (res.confirm) {
          app.request({
            url: '/businessancelorder',
            data: {
              bo_id: that.data.order_id,
              order_sn: that.data.orderMes.order_sn
            },
            success: function(data) {
              app.successToast('取消成功', function(){
                that.getInfo()
              })
            }
          })
        }
      }
    })
  },

  // 打电话
  makePhoneCall(e) {
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  confirmOrder() {
    let that = this;
    app.request({
      url: '/buscomorder',
      data: {
        bo_id: that.data.order_id,
        order_sn: that.data.orderMes.order_sn
      },
      loadText: '提交中',
      success: function(data) {
        let payinfo = data.payinfo
        wx.requestPayment({
          'nonceStr': payinfo.nonceStr,
          'package': payinfo.package,
          'signType': payinfo.signType,
          'timeStamp': payinfo.timeStamp.toString(),
          'paySign': payinfo.sign,
          'success':function(res){
            app.successToast('支付成功', function(){
              that.getInfo();
            })
          },
          'fail':function(res){
            app.showModal('支付失败')
          }
        })
      }
    })
  }
})
