const app = getApp()
const moment = require('../../../utils/moment.min.js')
let startTime = moment().subtract('days', 45).format('YYYY-MM-DD 00:00:00');
let endTime = moment().format('YYYY-MM-DD 23:59:59')

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
  },
  4: {
    url: '/customerorderlist',
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
    currType: 0,

    timeOptions: [
      { text: '全部时间', value: 0 },
      { text: '近期订单', value: 1 }
    ],
    timeValue: 1,
    statusOptions: [],
    statusValue: 0
  },

  onLoad(params) {
    let pageTitle = {
      0: '用户订单',
      1: '师傅订单',
      3: '本店订单',
      4: '客服订单'
    }
    let personType = params.personType
    let url = personMes[personType].url;
    let statusName = personMes[personType].status;
    let orderStatus = app.globalData.personMessage[personType].orderStatus;
    let statusOptions = []
    let tabList = {}
    for (let i in orderStatus) {
      if (orderStatus[i].show) {
        tabList[i] = orderStatus[i]
        statusOptions.push({
          text: orderStatus[i].label,
          value: orderStatus[i].status
        })
      }
    }

    wx.setNavigationBarTitle({
      title: pageTitle[personType]
    })


    this.setData({
      showNav: params.showNav || 0,
      personType,
      orderStatus,
      statusOptions,
      tabList,

      statusName: statusName,
      requestUrl: url,
      query: {
        start_time: personType ? startTime : '',
        end_time: personType ? endTime : '',
        [statusName]: '',
        keyword: ''
      }
    })

    this.selectComponent("#list").getData(1);
  },

  chooseTime(e) {
    if (e.detail == 1) {
      this.setData({
        'query.start_time': startTime,
        'query.end_time': endTime
      })
    } else {
      this.setData({
        'query.start_time': '',
        'query.end_time': ''
      })
    }
    this.selectComponent("#list").getData(1);
  },
  chooseStatus(e) {
    this.setData({
        ['query.' + this.data.statusName]: e.detail
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
      ['query.' + this.data.statusName]: e.detail.name
    })
    this.selectComponent("#list").getData(1);
  }
})
