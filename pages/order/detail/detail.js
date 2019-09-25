const app = getApp()

Page({
  data: {
    imgUrls: [
      '/image/example/bg1.jpg',
      '/image/example/bg1.jpg',
      '/image/example/bg1.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    personType: 0,
    order_id: '',
    orderMes: {},
    masterList: [],
    orderStatus: {}
  },

  onLoad(params) {
    let that = this;
    let order_id = params.id || 6;
    let personType = params.personType || 0;
    that.setData({
      order_id,
      personType
    })
    this.getInfo();
    this.getMasterList();
  },

  // 获取订单信息
  getInfo() {
    let that = this;
    app.request({
      url: '/orderinfo',
      data: {
        order_id: this.data.order_id
      },
      success: function(data) {
        let orderStatus = app.globalData.personMessage[that.data.personType].orderStatus[data.info[0].status];
        console.log(orderStatus)
        that.setData({
          orderMes: data.info[0],
          orderStatus: orderStatus
        })
      }
    })
  },

  // 获取报名师傅
  getMasterList() {
    let that = this;
    app.request({
      url: '/craftsmanlist',
      data: {
        order_id: this.data.order_id
      },
      success: function(data) {
        that.setData({
          masterList: data
        })
      }
    })
  },

  // 选择师傅
  chooseMaster(e) {
    console.log(e)
    let that = this;
    let craftsman_id = e.currentTarget.dataset.id;
    app.request({
      url: '/choosecraftsman',
      data: {
        order_id: this.data.order_id,
        craftsman_id: craftsman_id
      },
      success: function(data) {
        wx.showToast({
          title: '选择成功',
          icon: 'success',
          duration: 2000
        });
        that.getInfo();
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
      success: function(data) {
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          duration: 2000
        });
        that.getInfo();
      }
    })
  },

  // 支付尾款
  payearnestprice() {
    let that = this;
    app.request({
      url: '/payearnestprice',
      data: {
        order_id: this.data.order_id
      },
      success: function(data) {
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        });
        that.getInfo();
      }
    })
  },
})
