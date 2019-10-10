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
        icon: 'coinpurse_line',
        text: '我的积分',
        url: '/pages/personal/wallet/wallet'
      },
      {
        icon: 'addresslist',
        text: '我要下单',
        url: '/pages/demand/category/category'
      },
      {
        icon: 'group',
        text: '我的朋友',
        url: '/pages/personal/friend/friend'
      },
      {
        icon: 'link',
        text: '我要推广',
        url: '/pages/personal/share/share'
      },
      {
        icon: 'service',
        text: '意见反馈',
        url: '/pages/personal/feedback/feedback'
      },
      {
        icon: 'namecard',
        text: '师傅加盟',
        url: '/pages/personal/index/index?type=1'
      },
      {
        icon: 'setting',
        text: '设置',
        url: '/pages/personal/setting/setting'
      }
    ]
  },
  methods: {
  }
})