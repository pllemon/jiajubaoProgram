const app = getApp()

Page({
  data: {
    finish: false,

    personType: 0,
    order_id: '',
    orderMes: {},
    offlineStatus: {}
  },

  onLoad(params) {
    let that = this;
    let order_id = params.id;
    let personType = params.personType || 0;
    that.setData({
      order_id,
      personType,
      offlineStatus: app.globalData.offlineStatus,
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

  // 报价，改
  setMoney() {
    let that = this
    app.request({
      url: '/busofferorder',
      data: {
        total_price: 400,
        offer_remark: '44333',
        order_sn: that.data.orderMes.order_sn
      },
      loadText: '提交中',
      success: function(data) {
        app.successToast('报价成功', function(){
          that.getInfo()
        })
      }
    })
  },

  // 用户取消
  userChoose(e) {
    let that = this
    let type = e.target.dataset.type
    let mes = type == 1 ? '已确认' : '已取消'
    app.request({
      url: '/userhandleneedorder',
      data: {
        status: type, // 1 确认，6取消
        order_sn: that.data.orderMes.order_sn
      },
      loadText: '提交中',
      success: function(data) {
        app.successToast(mes, function(){
          that.getInfo()
        })
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
