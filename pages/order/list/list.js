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
    let personType = params.type;
    this.setData({
      personType: personType,
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
    let personType = that.data.personType;
    let url = '/userorderlist';
    console.log(personType)
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
    let index = e.detail.index;
    this.getOrderList({
      status: this.data.statusArr[index].status
    })
  }
})
