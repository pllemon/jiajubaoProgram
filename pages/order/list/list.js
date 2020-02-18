const app = getApp()

Page({
  data: {
    searchValue: '',
    list: [],
    personType: 0,
    orderStatus: {}
  },
  onLoad(params) {
    this.setData({
      showNav: params.showNav || 0,
      personType: params.personType,
      orderStatus: app.globalData.personMessage[params.personType].orderStatus
    })
    this.getOrderList()
  },

  // 获取订单列表
  getOrderList(data = {}) {
    let that = this;
    let personType = that.data.personType;
    let url = '/userorderlist';
    if (personType == 1) {
      url = '/craftsmanorderlist';
    }
    app.request({
      url,
      data,
      success: function(data) {
        that.setData({
          list: data
        })
      }
    })
  },

  changeType(e) {
    let status = e.detail.name;
    if (this.data.personType == 0) {
      this.getOrderList({
        status: status
      })
    } else {
      this.getOrderList({
        cmorderstatus: status
      })
    }
  }

})
