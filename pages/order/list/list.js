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
    query: {}
  },
  onLoad(params) {
    let personType = params.personType
    let url = personMes[personType].url;
    let statusName = personMes[personType].status;
    let orderStatus = app.globalData.personMessage[personType].orderStatus;
    orderStatus = orderStatus.filters(item => {
      return item.show
    })

    this.setData({
      showNav: params.showNav || 0,
      personType: personType,
      orderStatus: orderStatus,

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
