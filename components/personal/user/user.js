var app = getApp();
Component({
  properties: {
    name: { // 键值名
      type: String,
      value: ''
    }
  },
  data: {
    action: [
      {
        img: 'coinpurse_line',
        text: '我的钱包',
        url: '/pages/system/releaseDemand/step1/step1'
      },
      {
        img: 'addresslist',
        text: '我要下单',
        url: '/pages/demand/category/category'
      },
      {
        img: 'group',
        text: '我的朋友',
        url: '/pages/system/releaseDemand/step1/step1'
      },
      {
        img: 'link',
        text: '我要推广',
        url: '/pages/system/releaseDemand/step1/step1'
      },
      {
        img: 'service',
        text: '意见反馈',
        url: '/pages/personal/feedback/feedback'
      },
      {
        img: 'namecard',
        text: '师傅加盟',
        url: '/pages/personal/index/index?type=1'
      },
      {
        img: 'setting',
        text: '设置',
        url: '/pages/personal/setting/setting'
      }
    ]
  },
  methods: {
  }
})