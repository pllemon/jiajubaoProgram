const app = getApp()

let personMes = {
  0: {
    url: '/userorderlist',
    status: 'status'
  },
  1: {
    url: '/craftsmanorderlist',
    status: 'cmorderstatus'
  },
  3: {
    url: '/networkorderlist',
    status: 'status'
  }
}

Page({
  data: {
    searchValue: '',
    personType: 0,
    orderStatus: {},

    requestUrl: '',
    statusName: '',
    list: [],
    query: {},

    tabList: {},
    currType: 0
  },
  onLoad(params) {
    let pageTitle = {
      0: '用户订单',
      1: '师傅订单',
      3: '本店订单'
    }
    let personType = params.personType
    let url = personMes[personType].url;
    let statusName = personMes[personType].status;
    let orderStatus = app.globalData.personMessage[personType].orderStatus;
    let tabList = {}
    for (let i in orderStatus) {
      if (orderStatus[i].show) {
        tabList[i] = orderStatus[i]
      }
    }

    wx.setNavigationBarTitle({
      title: pageTitle[personType]
    })

    console.log(tabList)

    this.setData({
      showNav: params.showNav || 0,
      personType,
      orderStatus,
      tabList,

      statusName: statusName,
      requestUrl: url,
      query: {
        [statusName]: '',
        keyword: ''
      }
    })

    this.selectComponent("#list").getData(1);
  },

  changeList(e) {
    this.setData({
      list: e.detail
    })
  },

  changeType(e) {
    this.setData({
      query: {
        [this.data.statusName]: e.detail.name,
        keyword: ''
      }
    })
    this.selectComponent("#list").getData(1);
  }
})
