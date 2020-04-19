const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    personType: 0,
    order_id: '',
    orderMes: {},
    masterList: [],
    orderStatus: {},
    finish: false,

    craftsmannfo: {}, // 自身师傅信息
    isPopup: false,
    cancelremark: ''
  },

  onLoad(params) {
    let that = this;
    let order_id = params.id;
    let personType = params.personType || 0;
    that.setData({
      order_id,
      personType,
      craftsmannfo: app.globalData.loginInfo.craftsmannfo
    })
    that.getInfo()
  },


  closePopup() {
    this.setData({ 
      isPopup: false 
    })
  },

  // 获取订单信息
  getInfo() {
    let that = this;
    app.request({
      url: '/orderinfo',
      data: {
        order_id: this.data.order_id,
        craftsman_id: this.data.craftsmannfo? this.data.craftsmannfo.id : ''
      },
      success: function(data) {
        let orderStatus = {};
        let personMessage = app.globalData.personMessage;

        let craftsmaninfo = {};
        craftsmaninfo = data.craftsmanlist.find(item => item.is_choose);
        data.craftsmaninfo = craftsmaninfo;

        if (that.data.personType == 0) {
          orderStatus = personMessage[0].orderStatus[data.info.status];
        } else if (that.data.personType == 1) { // 师傅
          if (data.info.status == 4) {
            if (!data.craftsmanorderinfo) {
              orderStatus = personMessage[1].orderStatus[5]; // 未报名
            } else {
              orderStatus = personMessage[1].orderStatus[1]; // 已报名
            }
          } else if (data.info.status >= 5 && data.info.status < 8) {
            if (data.craftsmaninfo.craftsman_id == data.craftsmanorderinfo.craftsman_id) {
              orderStatus = personMessage[1].orderStatus[2]; // 已承接
            } else {
              orderStatus = personMessage[1].orderStatus[4]; // 未承接
            }
          } else if (data.info.status == 8) {
            orderStatus = personMessage[1].orderStatus[3]; // 已完成
          }
        }
        that.setData({
          orderMes: data,
          orderStatus: orderStatus,
          finish: true
        })
      }
    })
  },

  // 打电话
  makePhoneCall(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },

  // 选择师傅
  chooseMaster(e) {
    let that = this;
    app.request({
      url: '/choosecraftsman',
      data: {
        order_id: this.data.order_id,
        craftsman_id: e.currentTarget.dataset.id
      },
      success: function() {
        app.successToast('选择成功', function(){
          that.getInfo();
        })
      }
    })
  },

  // 师傅报名
  masterSignUp() {
    let that = this;
    app.request({
      url: '/craftsmansignup',
      data: {
        order_id: this.data.order_id
      },
      success: function() {
        app.successToast('报名成功', function(){
          that.getInfo();
        })
      }
    })
  },

  // 支付
  payearnestprice() {
    let that = this;
    app.request({
      url: '/payearnestprice',
      data: {
        order_id: this.data.order_id,
        order_sn: this.data.orderMes.info.order_sn
      },
      success: function(data) {
        app.successToast('支付成功', function(){
          that.getInfo();
        })
      }
    })
  },

  // 确认工程已经完成
  paytailprice() {
    let that = this;
    wx.showModal({
      content: '确认工程已经完成？',
      success (res) {
        if (res.confirm) {
          app.request({
            url: '/paytailprice',
            data: {
              order_id: that.data.order_id,
              order_sn: that.data.orderMes.info.order_sn
            },
            success: function(data) {
              app.successToast('确认成功', function(){
                that.getInfo();
              })
            }
          })
        }
      }
    })
  },

  // 开始施工
  beginWork() {
    let that = this;
    wx.navigateTo({
      url: '/pages/order/show/show?order_id=' + that.data.order_id +  '&number=1'
    })
  },

  // 施工完成
  endWork() {
    let that = this;
    wx.navigateTo({
      url: '/pages/order/show/show?order_id=' + that.data.order_id + '&id=' + that.data.orderMes.ordersshow.id + '&number=2'
    })
  },

  // 师傅确认完工
  masterConfirm2() {
    let that = this
    wx.showModal({
      content: '确定工程已经完成？',
      success (res) {
        if (res.confirm) {
          app.request({
            url: '/craftsmanconfirmorder',
            data: {
              order_id: that.data.order_id
            },
            success: function(data) {
              app.successToast('确认成功', function(){
                that.getInfo();
              })
            }
          })
        }
      }
    })
  },

  // 用户取消订单
  formSubmit() {
    if (this.data.personType == 0) {
      this.cancelOrder()
    }
  },
  inputCancelRemark(e) {
    this.setData({
      cancelremark: e.detail.value
    })
  },
  showPopup() {
   this.setData({
     isPopup: true
   }) 
  },
  cancelOrder() {
    let that = this
    that.closePopup()
    app.request({
      url: '/usercancelorder',
      data: {
        order_id: that.data.order_id,
        cancelremark: that.data.cancelremark
      },
      success: function(data) {
        app.successToast('取消成功', function(){
          that.getInfo();
        })
      }
    })
  },

  // 师傅取消订单
  cancelOrder2() {
    wx.showModal({
      content: '确定取消承接该订单？',
      success (res) {
        if (res.confirm) {
          app.request({
            url: '/craftsmanCancelOrder',
            data: {
              order_id: that.data.order_id
            },
            success: function(data) {
              app.successToast('取消成功', function(){
                that.getInfo();
              })
            }
          })
        }
      }
    })
  },

  // 评价订单
  goComment() {
    wx.navigateTo({
      url: '/pages/order/score/score?id=' + this.data.order_id
    })
  },

  // 再次下单
  makeOrder() {
    wx.navigateTo({
      url: '/pages/demand/category/category'
    })
  },

  // 报名其他
  signUpOrder() {
    wx.navigateTo({
      url: '/pages/order/center/center'
    })
  }
})
