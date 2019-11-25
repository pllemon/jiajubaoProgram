const app = getApp()

Page({
  data: {
    searchValue: '',
    list: [],
    personType: 0,
    orderStatus: {},
    statusArr: []
  },
  onLoad(params) {
    let personType = params.personType;
    this.setData({
      personType: personType,
      orderStatus: app.globalData.personMessage[personType].orderStatus
    })

    let statusArr = []
    for(let i in this.data.orderStatus) {
      if (this.data.orderStatus[i].show) {
        statusArr.push(this.data.orderStatus[i])
      }
    }
    this.setData({
      statusArr
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
