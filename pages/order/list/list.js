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
    let personType = params.type || 0;
    this.setData({
      orderStatus: app.globalData.personMessage[personType].orderStatus
    })

    let statusArr = []
    for(let i in this.data.orderStatus) {
      statusArr.push(this.data.orderStatus[i])
    }
    this.setData({
      statusArr
    })
    this.getOrderList()
  },

  // 获取订单列表
  getOrderList(data = {}) {
    let that = this;
    app.request({
      url: '/userorderlist',
      data: data,
      success: function(data) {
        that.setData({
          list: data
        })
      }
    })
  },

  changeType(e) {
    let index = e.detail.index;
    this.getOrderList({
      status: this.data.statusArr[index].status
    })
  }
})
