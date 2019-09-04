const app = getApp()

Page({
  data: {
    type: '人员类型',
    message: {
      1: {
        text: '我是用户',
        icon: '/image/icon/vip.svg',
        order: [],
        action: [
          {
            img: '/image/icon/icon_coinpurse_line.svg',
            text: '我的钱包',
            url: '/pages/system/releaseDemand/step1/step1'
          },
          {
            img: '/image/icon/icon_addresslist.svg',
            text: '我要下单',
            url: '/pages/system/releaseDemand/step1/step1'
          },
          {
            img: '/image/icon/icon_group.svg',
            text: '我的朋友',
            url: '/pages/system/releaseDemand/step1/step1'
          },
          {
            img: '/image/icon/icon_link.svg',
            text: '我要推广',
            url: '/pages/system/releaseDemand/step1/step1'
          },
          {
            img: '/image/icon/icon_service.svg',
            text: '我要投诉',
            url: '/pages/system/releaseDemand/step1/step1'
          },
          {
            img: '/image/icon/icon_namecard.svg',
            text: '师傅加盟',
            url: '/pages/system/releaseDemand/step1/step1'
          },
          {
            img: '/image/icon/icon_setting.svg',
            text: '设置',
            url: '/pages/system/releaseDemand/step1/step1'
          }
        ]
      },
      2: {
        text: '我是师傅',
        icon: '/image/icon/master.svg',
        order: [],
        action: []
      },
      3: {
        text: '我是商家',
        icon: '/image/icon/business.svg',
        order: [],
        action: []
      }
    },
    currType: 1,
    currMessage: {}
  },

  onLoad(params) {
    this.setData({
      type: params.type
    })
  },

  changeType(e) {
    let type = e.currentTarget.dataset.idx;
    this.setData({
      currType: type,
      currMessage: this.data.message[type]
    })
  }
})
